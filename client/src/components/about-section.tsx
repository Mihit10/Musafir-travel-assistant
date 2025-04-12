// src/components/about-section.tsx
"use client"; // Needed for Framer Motion

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { Users, Leaf, Target, Sparkles } from "lucide-react"; // Icons

const SITE_NAME = "raste pe";
const CITIES = ["Goa", "Kerala", "Himachal", "Uttarakhand", "Rajasthan"];
export const PREFERENCES = [
  "Historic",
  "Adventure",
  "Nature",
  "Religious",
  "Beach",
  "Mountain",
  "Shopping",
];

type FeatureCardProps = {
  title: string;
  Icon: React.ElementType;
  children: ReactNode;
};

const FeatureCard = ({ title, Icon, children }: FeatureCardProps) => (
  <motion.div
    className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md border border-gray-100"
    whileHover={{
      y: -5,
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    }}
    transition={{ duration: 0.3 }}
  >
    <div className="p-3 bg-emerald-100 rounded-full mb-4">
      <Icon className="w-8 h-8 text-emerald-600" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{children}</p>
  </motion.div>
);

export function AboutSection() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Travel Smarter, Impact Deeper
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {SITE_NAME} is more than just an itinerary planner. We're building
            a bridge between travelers seeking authentic experiences and the
            local communities that make destinations unique.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <FeatureCard Icon={Sparkles} title="AI-Powered Personalization">
              Get smart itineraries tailored to your dates, interests, and
              real-time conditions like weather, ensuring a seamless trip.
            </FeatureCard>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <FeatureCard Icon={Users} title="Local Community Upliftment">
              We directly connect you with grassroots providers – artisans,
              guides, street vendors, homestays – ensuring fair income and
              visibility.
            </FeatureCard>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <FeatureCard Icon={Leaf} title="Sustainable & Eco-Conscious">
              Discover eco-friendly options and lesser-known gems. We promote
              responsible tourism that respects nature and local culture.
            </FeatureCard>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <FeatureCard Icon={Target} title="Travel as a Tool for Good">
              Your journey becomes a positive force, contributing directly to
              equitable income distribution and sustainable local economies.
            </FeatureCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
