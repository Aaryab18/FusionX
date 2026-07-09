import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  Trophy,
  Code2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Event } from "../types/event";
import { Link } from "react-router-dom";
import { events } from "../data/events";
import {
  Container,
  SectionHeading,
  StatCard,
  SearchInput,
  Badge,
} from "../components/ui";


function EventCard({ event }: { event: Event }) {
  const navigate = useNavigate();

const now = new Date();

const regOpen = new Date(event.registrationOpen);

const regClose = new Date(event.registrationClose);

const registrationState =
  now < regOpen
    ? "upcoming"
    : now > regClose
    ? "closed"
    : "open";
  const Icon = event.icon;
  const fillPercent = Math.min((event.attendees / event.maxAttendees) * 100, 100);
  const isUpcoming = event.status === 'upcoming';

  return (
    <div className={`group relative bg-white/3 border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-950/50 ${
      isUpcoming ? 'border-blue-500/20 hover:border-blue-400/40' : 'border-white/8 hover:border-white/15'
    }`}>
      {isUpcoming && (
        <div className="absolute top-4 right-4 z-10">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Upcoming
          </span>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${event.color} flex items-center justify-center flex-shrink-0`}>
            <Icon size={22} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <Badge>
  {event.type}
</Badge>
            <h3 className="text-white font-bold text-xl leading-snug">{event.title}</h3>
          </div>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-5">{event.description}</p>

        {event.prizes && (
          <div className="mb-4 flex items-center gap-2 text-yellow-400 text-sm font-semibold">
            <Trophy size={14} />
            {event.prizes}
          </div>
        )}
        {event.speakers && event.speakers.length > 0 && (
          <div className="mb-4 flex items-center gap-2 text-cyan-400 text-sm">
            <Users size={14} />
            <span>Speakers: {event.speakers.join(', ')}</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 mb-5 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Calendar size={13} className="text-gray-600" />
            {event.date}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={13} className="text-gray-600" />
            {event.time}
          </div>
          <div className="flex items-center gap-1.5 col-span-2">
            <MapPin size={13} className="text-gray-600" />
            {event.venue}
          </div>
        </div>

        {/* Attendance bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1.5">
            <span>{isUpcoming ? 'Registered' : 'Attended'}</span>
            <span>{event.attendees}/{event.maxAttendees}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/5">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${event.color} transition-all duration-700`}
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        </div>

        <div className="flex gap-3">
  <Link
    to={`/events/${event.slug}`}
    className="flex-1 flex items-center justify-center rounded-xl border border-cyan-500 py-3 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-500 hover:text-black"
  >
    View Details
  </Link>

  {registrationState === "upcoming" && (
  <button
    disabled
    className="flex-1 rounded-xl bg-white/10 py-3 text-sm font-semibold text-gray-400 cursor-not-allowed"
  >
    Registration Opens Soon
  </button>
)}

{registrationState === "open" && (
  <button
    onClick={() =>
      navigate(`/contact?event=${encodeURIComponent(event.title)}`)
    }
    className="flex-1 rounded-xl bg-cyan-500 py-3 text-sm font-semibold text-black hover:bg-cyan-400 transition"
  >
    Register Now
  </button>
)}

{registrationState === "closed" && (
  <button
    disabled
    className="flex-1 rounded-xl bg-red-500/20 py-3 text-sm font-semibold text-red-300 cursor-not-allowed"
  >
    Registrations Closed
  </button>
)}
</div>
      </div>
    </div>
  );
}

export default function Events() {
  const [search, setSearch] = useState("");

const upcoming = events.filter(
  (e) => e.status === "upcoming"
);

const featuredEvent =
  upcoming.find((e) => e.featured) || upcoming[0];

const filteredEvents = upcoming.filter((event) =>
  event.title.toLowerCase().includes(search.toLowerCase()) ||
  event.type.toLowerCase().includes(search.toLowerCase())
);


  return (
    <div className="min-h-screen bg-[#050a14] text-white pt-16">
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-600/8 rounded-full blur-3xl" />
        </div>
        <Container className="text-center">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4 block">Events</span>
          <h1 className="text-5xl sm:text-6xl font-black mb-6">
  Building the{" "}
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
    Future Together
  </span>
</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
  Join FusionX workshops, hackathons, technical sessions, and innovation events designed to help students learn, collaborate, and build impactful projects together.
</p>
        </Container>
      </section>

      <section className="pb-8">
  <Container>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

      <StatCard
        title="Upcoming Events"
        value={upcoming.length}
        color="cyan"
      />

      <StatCard
        title="Workshops"
        value={
          events.filter(
            (e) => e.type === "Workshop"
          ).length
        }
        color="green"
      />

      <StatCard
        title="Hackathons"
        value={
          events.filter(
            (e) => e.type === "Hackathon"
          ).length
        }
        color="yellow"
      />

    </div>
  </Container>
</section>

<section className="pb-12">
  <Container>

    <SectionHeading
      title="⭐ Featured Event"
      subtitle="Don't miss our highlighted event"
    />

    {featuredEvent && (
      <div className="mt-8 rounded-3xl overflow-hidden border border-white/10 bg-[#101827]">

        <div className="grid lg:grid-cols-2">

          <div
  className={`flex items-center justify-center p-12 bg-gradient-to-br ${featuredEvent.color}`}
>
  <featuredEvent.icon size={90} className="text-white" />
</div>

          <div className="p-8 flex flex-col justify-center">

            <Badge>
              {featuredEvent.type}
            </Badge>

            <h2 className="mt-4 text-3xl font-bold">
              {featuredEvent.title}
            </h2>

            <p className="mt-4 text-gray-400">
              {featuredEvent.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-300">

              <span>📅 {featuredEvent.date}</span>

              <span>📍 {featuredEvent.venue}</span>

              <span>👥 {featuredEvent.attendees} Attendees</span>

            </div>

            <button className="mt-8 w-fit rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black hover:bg-cyan-400 transition">
              Register Now
            </button>

          </div>

        </div>

      </div>
    )}

  </Container>
</section>

      {/* Upcoming */}
      <section className="py-16">
        <Container>
          <SectionHeading
  title="Upcoming Events"
  subtitle={`${upcoming.length} upcoming events available`}
/>
        
          <div className="mt-8 mb-8">
  <SearchInput
    value={search}
    onChange={setSearch}
    placeholder="🔍 Search Events..."
  />
</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        </Container>
      </section>
      

      
    </div>
  );
}
