import { Trophy, Code2, Users, Calendar } from "lucide-react";

const icons = {
  Trophy,
  Code2,
  Users,
  Calendar,
};

export function mapDatabaseEvent(event: any) {
  return {
    id: event.id,
    slug: event.slug,
    title: event.title,
    type: event.type,
    date: event.date,
    time: event.time,
    venue: event.venue,
    description: event.description,
    attendees: event.attendees,
    maxAttendees: event.max_attendees,
    status: event.status,
    color: event.color,
    prizes: event.prizes,
    speakers: event.speakers,
    featured: event.featured,
    registrationOpen: event.registration_open,
    registrationClose: event.registration_close,
    icon: icons[event.icon as keyof typeof icons] ?? Calendar,
  };
}