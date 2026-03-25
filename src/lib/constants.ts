import React from "react";
import { FaGithub, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import type { IconType } from "react-icons";

/** Custom X (formerly Twitter) icon — the installed react-icons doesn't include it */
const XIcon: IconType = (props) =>
  React.createElement(
    "svg",
    {
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0",
      viewBox: "0 0 24 24",
      height: "1em",
      width: "1em",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
    },
    React.createElement("path", {
      d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    })
  );

/** Shared navigation links used in Navbar and Footer */
export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Resume", href: "/resume" },
  { name: "Work", href: "/work" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

/** Shared social icon map used in Hero and Footer */
export const socialIconMap: Record<string, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
  twitter: XIcon,
};
