"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { usePortfolio } from "@/data/portfolio-context";
import type { IconType } from "react-icons";

const contactIconMap: Record<string, IconType> = {
  phone: FaPhoneAlt,
  email: FaEnvelope,
  address: FaMapMarkerAlt,
};

export default function ContactPage() {
  const { data, addMessage } = usePortfolio();
  const [openSelect, setOpenSelect] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const serviceNames = data.services.map((s) => s.title);

  const handleSelect = (s: string) => {
    setSelectedService(s);
    setOpenSelect(false);
  };

  const handleSubmit = async () => {
    if (!firstName.trim() || !email.trim() || !message.trim()) return;

    await addMessage({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
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
    setPhone("");
    setMessage("");
    setSelectedService("");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
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
              <input
                type="email"
                placeholder="Email address *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1b1b22] text-white p-4 rounded-lg outline-none focus:ring-1 focus:ring-accent transition-all placeholder:text-white/40 font-mono text-sm"
              />
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#1b1b22] text-white p-4 rounded-lg outline-none focus:ring-1 focus:ring-accent transition-all placeholder:text-white/40 font-mono text-sm"
              />
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
                  className={`text-white/60 text-lg transition-transform duration-300 ${
                    openSelect ? "rotate-180" : ""
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
                        className={`px-4 py-3 font-mono text-sm font-semibold rounded-md cursor-pointer transition-colors ${
                          selectedService === service
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
            <button
              onClick={handleSubmit}
              disabled={sent}
              className={`w-max px-8 py-3.5 mt-2 font-bold rounded-full transition-all font-mono flex items-center gap-2 ${
                sent
                  ? "bg-green-500 text-white cursor-default"
                  : "text-[#1b1b22] bg-accent hover:bg-accent-hover"
              }`}
            >
              {sent ? (
                <>
                  <FiCheck size={16} /> Message Sent!
                </>
              ) : (
                "Send message"
              )}
            </button>
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
