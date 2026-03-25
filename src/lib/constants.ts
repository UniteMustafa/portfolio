import { FaGithub, FaLinkedinIn, FaYoutube, FaTwitter } from "react-icons/fa";
import type { IconType } from "react-icons";

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
  twitter: FaTwitter,
};
