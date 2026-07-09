import { Trophy, Code2, Users } from "lucide-react";
import type { Event } from "../types/event";

export const events: Event[] = [
  {
    id: 1,
    slug: "fusionx-club-launch",
    title: "FusionX Club Launch",
    type: "Club Event",
    date: "Coming Soon",
    time: "TBA",
    venue: "College Auditorium",
    attendees: 0,
    maxAttendees: 200,
    description:
      "Join us for the official launch of FusionX! Meet the core team, explore our vision, upcoming projects, and opportunities to innovate together.",
    status: "upcoming",
    icon: Users,
    color: "from-cyan-500 to-blue-500",
    registrationOpen: "2026-07-09T09:00:00",
registrationClose: "2026-12-20T23:59:00",
  },

  {
    id: 2,
    slug: "web-dev-bootcamp",
    title: "Web Development Bootcamp",
    type: "Workshop",
    date: "Coming Soon",
    time: "10:00 AM - 4:00 PM",
    venue: "Computer Lab",
    attendees: 0,
    maxAttendees: 100,
    description:
      "Learn HTML, CSS, JavaScript, React, Git and Tailwind CSS by building your first full-stack web application.",
    status: "upcoming",
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
    registrationOpen: "2026-11-15T09:00:00",
registrationClose: "2026-12-20T23:59:00",
  },

  {
    id: 3,
    slug: "fusionx-idea-pitch-day",
    title: "FusionX Idea Pitch Day",
    type: "Innovation",
    date: "Coming Soon",
    time: "11:00 AM - 3:00 PM",
    venue: "Innovation Center",
    attendees: 0,
    maxAttendees: 80,
    description:
      "Present your innovative ideas, receive valuable feedback and build teams to transform ideas into real-world projects.",
    status: "upcoming",
    icon: Trophy,
    color: "from-yellow-500 to-orange-500",
    registrationOpen: "2026-11-15T09:00:00",
registrationClose: "2026-12-20T23:59:00",
  },

  {
    id: 4,
    slug: "mini-hackathon",
    title: "Mini Hackathon",
    type: "Hackathon",
    date: "Coming Soon",
    time: "9:00 AM - 6:00 PM",
    venue: "Innovation Lab",
    attendees: 0,
    maxAttendees: 150,
    description:
      "A one-day coding challenge where teams collaborate to build innovative solutions for real-world problems.",
    status: "upcoming",
    icon: Trophy,
    color: "from-orange-500 to-red-500",
    prizes: "Certificates & Exciting Rewards",
    registrationOpen: "2026-11-15T09:00:00",
    registrationClose: "2026-12-20T23:59:00",
    featured: true,
  },
];