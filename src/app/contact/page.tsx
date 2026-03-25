"use client";

import { useState, useRef, useEffect } from "react";
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

export default function ContactPage() {
  const { data, addMessage } = usePortfolio();
  const [openSelect, setOpenSelect] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState(
    countryCodes.find((c) => c.code === "EG") || countryCodes[0]
  );
  const [countrySearch, setCountrySearch] = useState("");
  const [message, setMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const countryRef = useRef<HTMLDivElement>(null);

  const serviceNames = data.services.map((s) => s.title);

  // Close country dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setOpenCountry(false);
        setCountrySearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredCountries = countrySearch
    ? countryCodes.filter(
        (c) =>
          c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
          c.dial.includes(countrySearch)
      )
    : countryCodes;

  const handleSelect = (s: string) => {
    setSelectedService(s);
    setOpenSelect(false);
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      setEmailError("");
      return;
    }
    if (!EMAIL_REGEX.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async () => {
    if (!firstName.trim() || !email.trim() || !message.trim()) return;
    if (emailError) return;

    // Final email validation
    if (!EMAIL_REGEX.test(email.trim())) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setSubmitError("");
    setSent(false);
    setSending(true);

    try {
      await addMessage({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        countryCode: countryCode.dial,
        service: selectedService,
        body: message.trim(),
        date: new Date().toISOString(),
        read: false,
        replies: [],
      });

      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setEmailError("");
      setPhone("");
      setCountryCode(countryCodes.find((c) => c.code === "EG") || countryCodes[0]);
      setMessage("");
      setSelectedService("");
      setSent(true);
      setTimeout(() => setSent(false), 5000);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    } finally {
      setSending(false);
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
          <div className="w-full xl:w-[60%] order-2 xl:order-none bg-[#232329] p-6 lg:p-10 rounded-xl flex flex-col gap-6">
            <h2 className="text-4xl text-accent font-bold font-mono border-b-2 border-accent pb-3 w-fit mb-2">
              Let&apos;s work together
            </h2>
            <p className="text-[#9a9aaa] font-mono text-sm leading-relaxed mb-4">
              Send me a message and I&apos;ll get back to you as soon as possible.
            </p>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <input
                type="text"
                placeholder="Firstname *"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-[#1b1b22] text-white p-4 rounded-lg outline-none focus:ring-1 focus:ring-accent transition-all placeholder:text-white/40 font-mono text-sm"
              />
              <input
                type="text"
                placeholder="Lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-[#1b1b22] text-white p-4 rounded-lg outline-none focus:ring-1 focus:ring-accent transition-all placeholder:text-white/40 font-mono text-sm"
              />

              {/* Email field with validation */}
              <div className="flex flex-col gap-1">
                <input
                  type="email"
                  placeholder="Email address *"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) validateEmail(e.target.value);
                  }}
                  onBlur={() => validateEmail(email)}
                  className={`w-full bg-[#1b1b22] text-white p-4 rounded-lg outline-none focus:ring-1 transition-all placeholder:text-white/40 font-mono text-sm ${
                    emailError
                      ? "ring-1 ring-red-500/60 focus:ring-red-500"
                      : "focus:ring-accent"
                  }`}
                />
                <AnimatePresence>
                  {emailError && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="flex items-center gap-1.5 text-red-400 font-mono text-xs pl-1"
                    >
                      <FiAlertCircle size={12} />
                      {emailError}
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
                    onClick={() => {
                      setOpenCountry(!openCountry);
                      setCountrySearch("");
                    }}
                    className="flex items-center gap-1.5 bg-[#1b1b22] text-white px-3 py-4 rounded-l-lg outline-none focus:ring-1 focus:ring-accent transition-all font-mono text-sm border-r border-white/5 h-full hover:bg-[#22222a]"
                  >
                    <span className="text-base leading-none">{countryCode.flag}</span>
                    <span className="text-white/70 text-xs">{countryCode.dial}</span>
                    <FiChevronDown
                      className={`text-white/40 text-xs transition-transform duration-300 ${
                        openCountry ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {openCountry && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 left-0 w-[260px] bg-[#1b1b22] rounded-lg shadow-2xl border border-white/5 overflow-hidden z-40"
                      >
                        {/* Search input */}
                        <div className="p-2 border-b border-white/5">
                          <input
                            type="text"
                            placeholder="Search country..."
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            className="w-full bg-[#14141a] text-white p-2.5 rounded-md outline-none focus:ring-1 focus:ring-accent font-mono text-xs placeholder:text-white/30"
                            autoFocus
                          />
                        </div>
                        <div className="max-h-[220px] overflow-y-auto">
                          {filteredCountries.map((c) => (
                            <button
                              key={c.code}
                              type="button"
                              onClick={() => {
                                setCountryCode(c);
                                setOpenCountry(false);
                                setCountrySearch("");
                              }}
                              className={`w-full flex items-center gap-3 px-3 py-2.5 font-mono text-xs transition-colors text-left ${
                                countryCode.code === c.code
                                  ? "bg-accent text-[#1b1b22] font-bold"
                                  : "text-[#9a9aaa] hover:bg-accent/10 hover:text-white"
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 min-w-0 bg-[#1b1b22] text-white p-4 rounded-r-lg outline-none focus:ring-1 focus:ring-accent transition-all placeholder:text-white/40 font-mono text-sm"
                />
              </div>
            </div>

            {/* Custom Select Service Dropdown */}
            <div className="relative w-full z-20">
              <button
                type="button"
                onClick={() => setOpenSelect(!openSelect)}
                className="w-full bg-[#1b1b22] p-4 rounded-lg outline-none flex justify-between items-center transition-all font-mono text-sm border-none focus:ring-1 focus:ring-accent"
              >
                <span className={selectedService ? "text-white" : "text-white/40"}>
                  {selectedService || "Select a service"}
                </span>
                <FiChevronDown
                  className={`text-white/60 text-lg transition-transform duration-300 ${openSelect ? "rotate-180" : ""
                    }`}
                />
              </button>

              <AnimatePresence>
                {openSelect && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 left-0 w-full bg-[#1b1b22] rounded-lg p-2 shadow-2xl flex flex-col z-30"
                  >
                    <span
                      className="px-4 py-3 text-white/40 font-mono text-sm font-bold cursor-default border-b border-white/5 mb-1"
                    >
                      Select a service
                    </span>
                    {serviceNames.map((service, idx) => (
                      <span
                        key={idx}
                        onClick={() => handleSelect(service)}
                        className={`px-4 py-3 font-mono text-sm font-semibold rounded-md cursor-pointer transition-colors ${selectedService === service
                          ? "bg-accent text-[#1b1b22]"
                          : "text-[#9a9aaa] hover:bg-accent hover:text-[#1b1b22]"
                          }`}
                      >
                        {service}
                      </span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Message Textarea */}
            <textarea
              rows={5}
              placeholder="Your message *"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-[#1b1b22] text-white p-4 rounded-lg outline-none focus:ring-1 focus:ring-accent transition-all placeholder:text-white/40 font-mono text-sm resize-none"
            />

            {/* Submit Button */}
            <div className="flex flex-col gap-3 mt-2">
              <button
                onClick={handleSubmit}
                disabled={sent || sending || !!emailError}
                className={`w-max px-8 py-3.5 font-bold rounded-full transition-all font-mono flex items-center gap-2 ${sent
                  ? "bg-green-500 text-white cursor-default"
                  : sending
                    ? "bg-accent/60 text-[#1b1b22]/80 cursor-wait"
                    : emailError
                      ? "bg-accent/40 text-[#1b1b22]/60 cursor-not-allowed"
                      : "text-[#1b1b22] bg-accent hover:bg-accent-hover"
                  }`}
              >
                {sent ? (
                  <>
                    <FiCheck size={16} /> Message Sent!
                  </>
                ) : sending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#1b1b22]/30 border-t-[#1b1b22] rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send message"
                )}
              </button>
              <AnimatePresence>
                {submitError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex items-center gap-1.5 text-red-400 font-mono text-xs pl-1"
                  >
                    <FiAlertCircle size={14} />
                    {submitError}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Block (Contact Info) */}
          <div className="w-full xl:w-[40%] flex xl:flex-col justify-center gap-10 xl:gap-14 order-1 xl:order-none flex-col">
            {data.contactInfo.map((item, index) => {
              const Icon = contactIconMap[item.iconKey] || FaPhoneAlt;
              return (
                <div key={index} className="flex items-center gap-6">
                  <div className="w-[50px] h-[50px] xl:w-[70px] xl:h-[70px] bg-[#232329] rounded-xl flex items-center justify-center text-accent text-xl xl:text-3xl shrink-0">
                    <Icon />
                  </div>
                  <div>
                    <p className="text-[#9a9aaa] text-sm md:text-base font-mono mb-1 xl:mb-2">
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
