"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { PortfolioData, defaultPortfolioData, Message } from "./portfolio-data";
import { supabase } from "@/lib/supabase";

const STORAGE_KEY = "portfolio-dashboard-data";

interface PortfolioContextValue {
  data: PortfolioData;
  updateSection: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => void;
  addMessage: (msg: Omit<Message, "id">) => void;
  resetAll: () => void;
  loading: boolean;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

// Map our PortfolioData keys to Supabase site_sections keys
const SECTION_KEYS: (keyof PortfolioData)[] = [
  "hero", "stats", "services", "projects", "resume", "contactInfo", "testimonials", "blogPosts", "settings",
];

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
  const [loading, setLoading] = useState(true);

  // Load data from Supabase on mount, fallback to localStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch all site sections from Supabase
        const { data: rows, error } = await supabase
          .from("site_sections")
          .select("key, value");

        if (error) throw error;

        if (rows && rows.length > 0) {
          const loaded: Partial<PortfolioData> = {};
          for (const row of rows) {
            (loaded as Record<string, unknown>)[row.key] = row.value;
          }
          setData((prev) => ({ ...prev, ...loaded }));

          // Also update localStorage cache
          const merged = { ...defaultPortfolioData, ...loaded };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        } else {
          // No data in Supabase yet, try localStorage
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            const parsed = JSON.parse(stored) as Partial<PortfolioData>;
            setData((prev) => ({ ...prev, ...parsed }));
          }
        }
      } catch {
        // Supabase failed — fall back to localStorage
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            const parsed = JSON.parse(stored) as Partial<PortfolioData>;
            setData((prev) => ({ ...prev, ...parsed }));
          }
        } catch {
          // ignore
        }
      }
      setLoading(false);
    };

    // Load messages separately (they're in a different table)
    const loadMessages = async () => {
      try {
        const { data: msgs, error } = await supabase
          .from("messages")
          .select("*, message_replies(*)")
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (msgs) {
          const mapped: Message[] = msgs.map((m) => ({
            id: m.id,
            firstName: m.first_name,
            lastName: m.last_name,
            email: m.email,
            phone: m.phone,
            service: m.service,
            body: m.body,
            date: m.created_at,
            read: m.read,
            replies: (m.message_replies || []).map((r: { id: string; body: string; created_at: string }) => ({
              id: r.id,
              body: r.body,
              date: r.created_at,
            })),
          }));
          setData((prev) => ({ ...prev, messages: mapped }));
        }
      } catch {
        // Messages will stay as whatever was loaded from localStorage
      }
    };

    loadData();
    loadMessages();
  }, []);

  const updateSection = useCallback(
    <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => {
      setData((prev) => {
        const updated = { ...prev, [key]: value };
        // Update localStorage cache
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });

      // For messages, we handle them separately
      if (key === "messages") {
        // Messages are managed through their own table, sync handled elsewhere
        return;
      }

      // Persist to Supabase (only for site_sections keys)
      if (SECTION_KEYS.includes(key)) {
        supabase
          .from("site_sections")
          .upsert({ key, value: value as unknown as Record<string, unknown>, updated_at: new Date().toISOString() })
          .then(({ error }) => {
            if (error) console.error("Supabase upsert error:", error);
          });
      }
    },
    []
  );

  const addMessage = useCallback(async (msg: Omit<Message, "id">) => {
    // Insert into Supabase messages table
    const { data: inserted, error } = await supabase
      .from("messages")
      .insert({
        first_name: msg.firstName,
        last_name: msg.lastName,
        email: msg.email,
        phone: msg.phone,
        service: msg.service,
        body: msg.body,
        read: false,
      })
      .select()
      .single();

    if (error) {
      console.error("Error inserting message:", error);
      return;
    }

    // Add to local state
    const newMsg: Message = {
      id: inserted.id,
      firstName: inserted.first_name,
      lastName: inserted.last_name,
      email: inserted.email,
      phone: inserted.phone,
      service: inserted.service,
      body: inserted.body,
      date: inserted.created_at,
      read: inserted.read,
      replies: [],
    };

    setData((prev) => ({
      ...prev,
      messages: [newMsg, ...prev.messages],
    }));
  }, []);

  const resetAll = useCallback(async () => {
    setData(defaultPortfolioData);
    localStorage.removeItem(STORAGE_KEY);

    // Reset Supabase data too
    for (const key of SECTION_KEYS) {
      const defaultValue = defaultPortfolioData[key];
      await supabase
        .from("site_sections")
        .upsert({ key, value: defaultValue as unknown as Record<string, unknown>, updated_at: new Date().toISOString() });
    }
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, updateSection, addMessage, resetAll, loading }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error("usePortfolio must be used within a PortfolioProvider");
  return ctx;
}
