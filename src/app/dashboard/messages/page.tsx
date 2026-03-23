"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiTrash2,
  FiChevronRight,
  FiArrowLeft,
  FiSend,
  FiCircle,
  FiCheckCircle,
} from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import Toast from "@/components/dashboard/Toast";

interface Reply {
  id: string;
  body: string;
  date: string;
}

interface MessageItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  body: string;
  date: string;
  read: boolean;
  replies: Reply[];
}

export default function MessagesDashboardPage() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [toast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [loading, setLoading] = useState(true);

  // Load messages from Supabase
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*, message_replies(*)")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading messages:", error);
        setLoading(false);
        return;
      }

      const mapped: MessageItem[] = (data || []).map((m) => ({
        id: m.id,
        firstName: m.first_name,
        lastName: m.last_name,
        email: m.email,
        phone: m.phone,
        service: m.service,
        body: m.body,
        date: m.created_at,
        read: m.read,
        replies: (m.message_replies || [])
          .sort((a: { created_at: string }, b: { created_at: string }) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          )
          .map((r: { id: string; body: string; created_at: string }) => ({
            id: r.id,
            body: r.body,
            date: r.created_at,
          })),
      }));

      setMessages(mapped);
      setLoading(false);
    };

    fetchMessages();
  }, []);

  const selectedMessage = messages.find((m) => m.id === selectedId);
  const unreadCount = messages.filter((m) => !m.read).length;

  const openMessage = async (msg: MessageItem) => {
    setSelectedId(msg.id);
    if (!msg.read) {
      // Mark as read in Supabase
      await supabase.from("messages").update({ read: true }).eq("id", msg.id);
      setMessages((prev) => prev.map((m) => m.id === msg.id ? { ...m, read: true } : m));
    }
  };

  const deleteMessage = async (id: string) => {
    await supabase.from("messages").delete().eq("id", id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selectedId === id) setSelectedId(null);
    setToastMsg("Message deleted");
    setToast(true);
  };

  const sendReply = async () => {
    if (!replyText.trim() || !selectedId) return;

    const { data: inserted, error } = await supabase
      .from("message_replies")
      .insert({ message_id: selectedId, body: replyText.trim() })
      .select()
      .single();

    if (error) {
      console.error("Error sending reply:", error);
      return;
    }

    const reply: Reply = {
      id: inserted.id,
      body: inserted.body,
      date: inserted.created_at,
    };

    setMessages((prev) =>
      prev.map((m) => m.id === selectedId ? { ...m, replies: [...m.replies, reply] } : m)
    );
    setReplyText("");

    // Send email reply to the original sender
    const targetMsg = messages.find((m) => m.id === selectedId);
    if (targetMsg) {
      try {
        const res = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "reply",
            toEmail: targetMsg.email,
            toName: `${targetMsg.firstName} ${targetMsg.lastName}`.trim(),
            replyBody: inserted.body,
          }),
        });
        if (res.ok) {
          setToastMsg("Reply sent & emailed!");
        } else {
          setToastMsg("Reply saved (email failed)");
        }
      } catch {
        setToastMsg("Reply saved (email failed)");
      }
    } else {
      setToastMsg("Reply sent!");
    }
    setToast(true);
  };

  const toggleRead = async (id: string) => {
    const msg = messages.find((m) => m.id === id);
    if (!msg) return;
    await supabase.from("messages").update({ read: !msg.read }).eq("id", id);
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read: !m.read } : m));
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
  };

  const closeToast = useCallback(() => setToast(false), []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold font-mono text-white">
          Messages
          {unreadCount > 0 && (
            <span className="ml-3 text-sm bg-accent/20 text-accent px-2.5 py-1 rounded-full font-mono">
              {unreadCount} unread
            </span>
          )}
        </h1>
        <p className="text-[#9a9aaa] font-mono text-sm mt-1">
          View and reply to messages from your contact form.
        </p>
      </motion.div>

      {messages.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-[#1e1e26] flex items-center justify-center mb-4">
            <FiMail size={28} className="text-[#9a9aaa]/40" />
          </div>
          <p className="text-[#9a9aaa] font-mono text-sm">No messages yet</p>
          <p className="text-[#9a9aaa]/50 font-mono text-xs mt-1">Messages from your contact form will appear here.</p>
        </motion.div>
      ) : (
        <div className="flex gap-6 min-h-[600px]">
          {/* Message List */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className={`${selectedId ? "hidden lg:flex" : "flex"} flex-col w-full lg:w-[380px] shrink-0 gap-2 overflow-y-auto max-h-[600px] pr-2`}
          >
            {messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                onClick={() => openMessage(msg)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border group ${
                  selectedId === msg.id ? "bg-accent/10 border-accent/30" : "bg-[#1e1e26] border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    {!msg.read ? (
                      <FiCircle size={10} className="text-accent mt-1.5 shrink-0 fill-accent" />
                    ) : (
                      <FiCheckCircle size={10} className="text-[#9a9aaa]/30 mt-1.5 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className={`font-mono text-sm truncate ${msg.read ? "text-[#9a9aaa]" : "text-white font-bold"}`}>
                        {msg.firstName} {msg.lastName}
                      </p>
                      <p className="text-[#9a9aaa]/60 font-mono text-xs truncate">{msg.email}</p>
                      <p className="text-[#9a9aaa]/40 font-mono text-xs mt-1 truncate">{msg.body}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[#9a9aaa]/30 font-mono text-[10px] whitespace-nowrap">
                      {new Date(msg.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                    <FiChevronRight size={14} className="text-[#9a9aaa]/20 group-hover:text-accent transition-colors" />
                  </div>
                </div>
                {msg.service && (
                  <span className="inline-block mt-2 ml-6 text-accent/60 bg-accent/5 px-2 py-0.5 rounded text-[10px] font-mono">{msg.service}</span>
                )}
                {msg.replies.length > 0 && (
                  <span className="inline-block mt-2 ml-2 text-green-400/60 bg-green-400/5 px-2 py-0.5 rounded text-[10px] font-mono">
                    {msg.replies.length} {msg.replies.length === 1 ? "reply" : "replies"}
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Message Detail */}
          {selectedId && selectedMessage ? (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 flex flex-col bg-[#1e1e26] rounded-xl border border-white/5 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <button onClick={() => setSelectedId(null)} className="lg:hidden text-[#9a9aaa] hover:text-white transition-colors"><FiArrowLeft size={18} /></button>
                  <div>
                    <p className="text-white font-mono font-bold text-sm">{selectedMessage.firstName} {selectedMessage.lastName}</p>
                    <p className="text-[#9a9aaa]/50 font-mono text-xs">{selectedMessage.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleRead(selectedMessage.id)} className="text-[#9a9aaa]/40 hover:text-accent transition-colors p-2" title={selectedMessage.read ? "Mark unread" : "Mark read"}>
                    {selectedMessage.read ? <FiCheckCircle size={16} /> : <FiCircle size={16} />}
                  </button>
                  <button onClick={() => deleteMessage(selectedMessage.id)} className="text-red-400/40 hover:text-red-400 transition-colors p-2"><FiTrash2 size={16} /></button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="flex flex-wrap gap-3 text-[#9a9aaa]/40 font-mono text-xs">
                  <span>{formatDate(selectedMessage.date)}</span>
                  {selectedMessage.phone && <span>• {selectedMessage.phone}</span>}
                  {selectedMessage.service && <span className="text-accent/60 bg-accent/5 px-2 py-0.5 rounded">{selectedMessage.service}</span>}
                </div>
                <div className="bg-[#14141a] rounded-lg p-5 border border-white/5">
                  <p className="text-white/90 font-mono text-sm leading-relaxed whitespace-pre-wrap">{selectedMessage.body}</p>
                </div>

                {selectedMessage.replies.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-[#9a9aaa] font-mono text-xs font-bold">REPLIES</h4>
                    {selectedMessage.replies.map((reply) => (
                      <div key={reply.id} className="bg-accent/5 border border-accent/10 rounded-lg p-4 ml-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-accent font-mono text-xs font-bold">You</span>
                          <span className="text-[#9a9aaa]/30 font-mono text-[10px]">{formatDate(reply.date)}</span>
                        </div>
                        <p className="text-white/80 font-mono text-sm leading-relaxed whitespace-pre-wrap">{reply.body}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-white/5 p-4">
                <div className="flex gap-3">
                  <textarea
                    rows={2} value={replyText} onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply..."
                    className="flex-1 bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5 resize-none"
                    onKeyDown={(e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) sendReply(); }}
                  />
                  <button onClick={sendReply} disabled={!replyText.trim()} className="self-end px-4 py-3 bg-accent hover:bg-accent-hover disabled:opacity-30 disabled:cursor-not-allowed text-[#1b1b22] rounded-lg transition-all">
                    <FiSend size={16} />
                  </button>
                </div>
                <p className="text-[#9a9aaa]/30 font-mono text-[10px] mt-1.5">Ctrl+Enter to send</p>
              </div>
            </motion.div>
          ) : (
            <div className="hidden lg:flex flex-1 items-center justify-center bg-[#1e1e26] rounded-xl border border-white/5">
              <div className="text-center">
                <FiMail size={32} className="text-[#9a9aaa]/20 mx-auto mb-3" />
                <p className="text-[#9a9aaa]/40 font-mono text-sm">Select a message</p>
              </div>
            </div>
          )}
        </div>
      )}

      <Toast message={toastMsg} visible={toast} onClose={closeToast} />
    </div>
  );
}
