import type { LucideIcon } from "lucide-react";

export type Event = {
  id: number;
  slug: string;

  title: string;
  description: string;

  type: string;

  status: "upcoming" | "ongoing" | "completed";

  date: string;
  time: string;
  venue: string;

  attendees: number;
  maxAttendees: number;

  icon: LucideIcon;
  color: string;

  featured?: boolean;
  speakers?: string[];
  prizes?: string;
};