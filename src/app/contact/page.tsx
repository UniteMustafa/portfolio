"use client";

import { useReducer, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FiChevronDown, FiCheck, FiAlertCircle } from "react-icons/fi";
import { usePortfolio } from "@/data/portfolio-context";
import { countryCodes } from "@/data/country-codes";
import type { IconType } from "react-icons";

const contactIconMap: Record<string, IconType> = {
  phone: FaPhoneAlt,
  email: FaEnvelope,
  address: FaMapMarkerAlt,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Form state managed with useReducer ────────────────────────────────
type CountryCode = (typeof countryCodes)[number];

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  emailError: string;
  phone: string;
  countryCode: CountryCode;
  countrySearch: string;
  message: string;
  selectedService: string;
  submitError: string;
  sent: boolean;
  sending: boolean;
  openSelect: boolean;
  openCountry: boolean;
}

type FormAction =
  | { type: "SET_FIELD"; field: keyof Omit<FormState, "countryCode">; value: string | boolean }
  | { type: "SET_COUNTRY_CODE"; value: CountryCode }
  | { type: "SET_EMAIL_ERROR"; value: string }
  | { type: "TOGGLE_SELECT" }
  | { type: "CLOSE_SELECT" }
  | { type: "TOGGLE_COUNTRY" }
  | { type: "CLOSE_COUNTRY" }
  | { type: "RESET" };

const defaultCountry = countryCodes.find((c) => c.code === "EG") || countryCodes[0];

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  emailError: "",
  phone: "",
  countryCode: defaultCountry,
  countrySearch: "",
  message: "",
  selectedService: "",
  submitError: "",
  sent: false,
  sending: false,
  openSelect: false,
  openCountry: false,
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_COUNTRY_CODE":
      return { ...state, countryCode: action.value, openCountry: false, countrySearch: "" };
    case "SET_EMAIL_ERROR":
      return { ...state, emailError: action.value };
    case "TOGGLE_SELECT":
      return { ...state, openSelect: !state.openSelect, openCountry: false };
    case "CLOSE_SELECT":
      return { ...state, openSelect: false };
    case "TOGGLE_COUNTRY":
      return { ...state, openCountry: !state.openCountry, openSelect: false, countrySearch: "" };
    case "CLOSE_COUNTRY":
      return { ...state, openCountry: false, countrySearch: "" };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

export default function ContactPage() {
  const { data, addMessage } = usePortfolio();
  const [form, dispatch] = useReducer(formReducer, initialState);
  const countryRef = useRef<HTMLDivElement>(null);

  const serviceNames = data.services.map((s) => s.title);

  // Close country dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        dispatch({ type: "CLOSE_COUNTRY" });
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredCountries = form.countrySearch
    ? countryCodes.filter(
        (c) =>
          c.name.toLowerCase().includes(form.countrySearch.toLowerCase()) ||
          c.dial.includes(form.countrySearch)
      )
    : countryCodes;

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      dispatch({ type: "SET_EMAIL_ERROR", value: "" });
      return true;
    }
    if (!EMAIL_REGEX.test(value)) {
      dispatch({ type: "SET_EMAIL_ERROR", value: "Please enter a valid email address" });
      return false;
    }
    dispatch({ type: "SET_EMAIL_ERROR", value: "" });
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.email.trim() || !form.message.trim()) return;
    if (!validateEmail(form.email)) return;

    dispatch({ type: "SET_FIELD", field: "submitError", value: "" });
    dispatch({ type: "SET_FIELD", field: "sending", value: true });

    try {
      await addMessage({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        countryCode: form.countryCode.dial,
        service: form.selectedService,
        body: form.message.trim(),
        date: new Date().toISOString(),
        read: false,
        replies: [],
      });

      dispatch({ type: "RESET" });
      dispatch({ type: "SET_FIELD", field: "sent", value: true });
      setTimeout(() => dispatch({ type: "SET_FIELD", field: "sent", value: false }), 5000);
    } catch (err: unknown) {
      dispatch({
        type: "SET_FIELD",
        field: "submitError",
        value: err instanceof Error ? err.message : "Failed to send message. Please try again.",
      });
    } finally {
      dispatch({ type: "SET_FIELD", field: "sending", value: false });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-screen flex items-center justify-center py-12 xl:py-0 w-full pt-[80px] md:pt-[100px]"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 mt-8 md:mt-24 pb-20 xl:pb-0">
        <div className="flex flex-col xl:flex-row gap-[60px] xl:gap-[30px]">

          {/* Left Block (Form Content) */}
          <div className="w-full xl:w-[60%] order-2 xl:order-none bg-bg-secondary p-6 lg:p-10 rounded-xl flex flex-col gap-6">
            <h2 className="text-4xl text-accent font-bold font-mono border-b-2 border-accent pb-3 w-fit mb-2">
              Let&apos;s work together
            </h2>
            <p className="text-muted font-mono text-sm leading-relaxed mb-4">
              Send me a message and I&apos;ll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
              {/* Inputs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <input
                  type="text"
                  placeholder="Firstname *"
                  value={form.firstName}
                  onChange={(e) => dispatch({ type: "SET_FIELD", field: "firstName", value: e.target.value })}
                  required
                  className="w-full bg-bg text-white p-4 rounded-lg outline-none focus:ring-1 focus:ring-accent transition-all placeholder:text-white/40 font-mono text-sm"
                />
                <input
                  type="text"
                  placeholder="Lastname"
                  value={form.lastName}
                  onChange={(e) => dispatch({ type: "SET_FIELD", field: "lastName", value: e.target.value })}
                  className="w-full bg-bg text-white p-4 rounded-lg outline-none focus:ring-1 focus:ring-accent transition-all placeholder:text-white/40 font-mono text-sm"
                />

                {/* Email field with validation */}
                <div className="flex flex-col gap-1">
                  <input
                    type="email"
                    placeholder="Email address *"
                    value={form.email}
                    onChange={(e) => {
                      dispatch({ type: "SET_FIELD", field: "email", value: e.target.value });
                      if (form.emailError) validateEmail(e.target.value);
                    }}
                    onBlur={() => validateEmail(form.email)}
                    required
                    className={`w-full bg-bg text-white p-4 rounded-lg outline-none focus:ring-1 transition-all placeholder:text-white/40 font-mono text-sm ${
                      form.emailError
                        ? "ring-1 ring-red-500/60 focus:ring-red-500"
                        : "focus:ring-accent"
                    }`}
                  />
                  <AnimatePresence>
                    {form.emailError && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="flex items-center gap-1.5 text-red-400 font-mono text-xs pl-1"
                      >
                        <FiAlertCircle size={12} />
                        {form.emailError}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Phone field with country selector */}
                <div className="flex gap-0 w-full" ref={countryRef}>
                  {/* Country code dropdown */}
                  <div className="relative z-30 shrink-0">
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "TOGGLE_COUNTRY" })}
                      className="flex items-center gap-1.5 bg-bg text-white px-3 py-4 rounded-l-lg outline-none focus:ring-1 focus:ring-accent transition-all font-mono text-sm border-r border-white/5 h-full hover:bg-white/5"
                    >
                      <span className="text-base leading-none">{form.countryCode.flag}</span>
                      <span className="text-white/70 text-xs">{form.countryCode.dial}</span>
                      <FiChevronDown
                        className={`text-white/40 text-xs transition-transform duration-300 ${
                          form.openCountry ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {form.openCountry && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full mt-2 left-0 w-[260px] bg-bg rounded-lg shadow-2xl border border-white/5 overflow-hidden z-40"
                        >
                          {/* Search input */}
                          <div className="p-2 border-b border-white/5">
                            <input
                              type="text"
                              placeholder="Search country..."
                              value={form.countrySearch}
                              onChange={(e) =>
                                dispatch({ type: "SET_FIELD", field: "countrySearch", value: e.target.value })
                              }
                              className="w-full bg-[#14141a] text-white p-2.5 rounded-md outline-none focus:ring-1 focus:ring-accent font-mono text-xs placeholder:text-white/30"
                              autoFocus
                            />
                          </div>
                          <div className="max-h-[220px] overflow-y-auto">
                            {filteredCountries.map((c) => (
                              <button
                                key={c.code}
                                type="button"
                                onClick={() => dispatch({ type: "SET_COUNTRY_CODE", value: c })}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 font-mono text-xs transition-colors text-left ${
                                  form.countryCode.code === c.code
                                    ? "bg-accent text-bg font-bold"
                                    : "text-muted hover:bg-accent/10 hover:text-white"
                                }`}
                              >
                                <span className="text-base leading-none">{c.flag}</span>
                                <span className="flex-1 truncate">{c.name}</span>
                                <span className="text-white/40 shrink-0">{c.dial}</span>
                              </button>
                            ))}
                            {filteredCountries.length === 0 && (
                              <p className="px-3 py-4 text-white/30 font-mono text-xs text-center">
                                No countries found
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Phone input */}
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={form.phone}
                    onChange={(e) => dispatch({ type: "SET_FIELD", field: "phone", value: e.target.value })}
                    className="flex-1 min-w-0 bg-bg text-white p-4 rounded-r-lg outline-none focus:ring-1 focus:ring-accent transition-all placeholder:text-white/40 font-mono text-sm"
                  />
                </div>
              </div>

              {/* Custom Select Service Dropdown */}
              <div className="relative w-full z-20">
                <button
                  type="button"
                  onClick={() => dispatch({ type: "TOGGLE_SELECT" })}
                  className="w-full bg-bg p-4 rounded-lg outline-none flex justify-between items-center transition-all font-mono text-sm border-none focus:ring-1 focus:ring-accent"
                >
                  <span className={form.selectedService ? "text-white" : "text-white/40"}>
                    {form.selectedService || "Select a service"}
                  </span>
                  <FiChevronDown
                    className={`text-white/60 text-lg transition-transform duration-300 ${form.openSelect ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {form.openSelect && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 left-0 w-full bg-bg rounded-lg p-2 shadow-2xl flex flex-col z-30"
                    >
                      <span className="px-4 py-3 text-white/40 font-mono text-sm font-bold cursor-default border-b border-white/5 mb-1">
                        Select a service
                      </span>
                      {serviceNames.map((service) => (
                        <button
                          type="button"
                          key={service}
                          onClick={() => {
                            dispatch({ type: "SET_FIELD", field: "selectedService", value: service });
                            dispatch({ type: "CLOSE_SELECT" });
                          }}
                          className={`px-4 py-3 font-mono text-sm font-semibold rounded-md text-left transition-colors ${
                            form.selectedService === service
                              ? "bg-accent text-bg"
                              : "text-muted hover:bg-accent hover:text-bg"
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Message Textarea */}
              <textarea
                rows={5}
                placeholder="Your message *"
                value={form.message}
                onChange={(e) => dispatch({ type: "SET_FIELD", field: "message", value: e.target.value })}
                required
                className="w-full bg-bg text-white p-4 rounded-lg outline-none focus:ring-1 focus:ring-accent transition-all placeholder:text-white/40 font-mono text-sm resize-none"
              />

              {/* Submit Button */}
              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={form.sent || form.sending || !!form.emailError}
                  className={`w-max px-8 py-3.5 font-bold rounded-full transition-all font-mono flex items-center gap-2 ${
                    form.sent
                      ? "bg-green-500 text-white cursor-default"
                      : form.sending
                      ? "bg-accent/60 text-bg/80 cursor-wait"
                      : form.emailError
                      ? "bg-accent/40 text-bg/60 cursor-not-allowed"
                      : "text-bg bg-accent hover:bg-accent-hover"
                  }`}
                >
                  {form.sent ? (
                    <>
                      <FiCheck size={16} /> Message Sent!
                    </>
                  ) : form.sending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send message"
                  )}
                </button>
                <AnimatePresence>
                  {form.submitError && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="flex items-center gap-1.5 text-red-400 font-mono text-xs pl-1"
                    >
                      <FiAlertCircle size={14} />
                      {form.submitError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>

          {/* Right Block (Contact Info) */}
          <div className="w-full xl:w-[40%] flex xl:flex-col justify-center gap-10 xl:gap-14 order-1 xl:order-none flex-col">
            {data.contactInfo.map((item, index) => {
              const Icon = contactIconMap[item.iconKey] || FaPhoneAlt;
              return (
                <div key={index} className="flex items-center gap-6">
                  <div className="w-[50px] h-[50px] xl:w-[70px] xl:h-[70px] bg-bg-secondary rounded-xl flex items-center justify-center text-accent text-xl xl:text-3xl shrink-0">
                    <Icon />
                  </div>
                  <div>
                    <p className="text-muted text-sm md:text-base font-mono mb-1 xl:mb-2">
                      {item.title}
                    </p>
                    <h3 className="text-base sm:text-lg md:text-xl font-mono text-white break-all md:break-normal">
                      {item.description}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </motion.section>
  );
}
