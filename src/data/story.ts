import assets from "@/assets";
import type { StaticImageData } from "next/image";

export type StoryPoint = {
  label: string;
  title: string;
  text: string;
};

export type Chapter = {
  tag: string;
  title: string;
  text: string;
  text2?: string;
  image?: StaticImageData;
  aspect?: "wide" | "tall";
  points?: StoryPoint[];
  stats?: { value: number; suffix: string; label: string }[];
};

export const chapters: Chapter[] = [
  {
    tag: "Brand Positioning",
    title: "Flavour-focused fast food for modern consumers.",
    text: "Originated in Coimbatore, The Hot Chick was built to deliver uncompromising crunch, intense spice marination, and signature glazes tailored to modern Indian palates.",
    text2:
      "Rapid order prep and consistent recipe standards make it an approachable, premium casual dining experience across high-footfall commercial zones.",
    image: assets.images.burger,
    aspect: "wide",
  },
  {
    tag: "Mission & Vision",
    title: "Consistent taste. Shared success.",
    text: "Two promises that guide every outlet, every recipe and every partner we work with.",
    points: [
      {
        label: "Our Mission",
        title: "Consistent taste & unmatched quality",
        text: "To serve crave-worthy, high-crunch fried chicken and fast-food favorites with consistent taste, standardized quality, and rapid service across all outlets.",
      },
      {
        label: "Our Vision",
        title: "Growth & partner success",
        text: "To expand from 60+ outlets across India into key international markets with a partner-first, 0% royalty franchise model built for long-term sustainability.",
      },
    ],
  },
  {
    tag: "Operational Pillars",
    title: "Why the brand scales.",
    text: "Three foundations that let every new outlet taste, run and perform like the first one.",
    points: [
      {
        label: "01",
        title: "Consistent taste",
        text: "Pre-measured marinations and standardized prep guidelines ensure flavor accuracy across every store location.",
      },
      {
        label: "02",
        title: "Diverse product offering",
        text: "Fried chicken, high-stack burgers, Korean glazed wings, loaded fries and beverages for multiple customer occasions.",
      },
      {
        label: "03",
        title: "Partner-first structure",
        text: "0% royalty fee and a structured base investment from ₹3.75 Lakh* designed for entrepreneurial growth.",
      },
    ],
  },
  {
    tag: "The Growth",
    title: "Too hot to handle, and still growing.",
    text: "From Coimbatore to 60+ outlets across India, with Sri Lanka and Dubai expansion in progress. Partner with us from ₹3.75 Lakh*.",
    stats: [
      { value: 60, suffix: "+", label: "Outlets in India" },
      { value: 0, suffix: "%", label: "Royalty fee" },
      { value: 3, suffix: "", label: "Markets" },
    ],
  },
];
