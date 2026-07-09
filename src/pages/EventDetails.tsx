import { useNavigate, useParams } from "react-router-dom";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { mapDatabaseEvent } from "../types/databaseEvent";
import type { Event } from "../types/event";

export default function EventDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

const [event, setEvent] = useState<Event | null>(null);
const [loading, setLoading] = useState(true);
useEffect(() => {
  loadEvent();
}, [slug]);

async function loadEvent() {
  setLoading(true);

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!error && data) {
    setEvent(mapDatabaseEvent(data));
  }

  setLoading(false);
}
if (loading) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#08111f] text-white">
      Loading event...
    </div>
  );
}
  const now = new Date();

const regOpen = new Date(event?.registrationOpen ?? "");

const regClose = new Date(event?.registrationClose ?? "");

const registrationState =
  now < regOpen
    ? "upcoming"
    : now > regClose
    ? "closed"
    : "open";

  if (!event) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08111f] text-white">
        Event not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08111f] text-white pt-28 pb-16">
      <div className="mx-auto max-w-6xl px-6">

        <button
          onClick={() => navigate("/events")}
          className="mb-8 rounded-lg border border-white/10 px-4 py-2 hover:bg-white/5 transition"
        >
          ← Back to Events
        </button>

        <div
          className={`h-[360px] rounded-3xl flex items-center justify-center bg-gradient-to-br ${event.color}`}
        >
          <event.icon size={110} className="text-white" />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">

          <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-cyan-300">
            {event.type}
          </span>

          <span className="rounded-full bg-blue-500/20 px-4 py-2 text-blue-300">
            {event.status}
          </span>

          {event.featured && (
            <span className="rounded-full bg-yellow-400 px-4 py-2 font-semibold text-black">
              ⭐ Featured
            </span>
          )}

        </div>

        <h1 className="mt-6 text-5xl font-bold">
          {event.title}
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-300">
          {event.description}
        </p>

        <h2 className="mt-12 text-2xl font-bold">
          Event Information
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">

          <div className="rounded-xl bg-white/5 p-5">
            <Calendar className="mb-3 text-cyan-400" />
            <p className="text-gray-400">Date</p>
            <h3>{event.date}</h3>
          </div>

          <div className="rounded-xl bg-white/5 p-5">
            <Clock className="mb-3 text-cyan-400" />
            <p className="text-gray-400">Time</p>
            <h3>{event.time}</h3>
          </div>

          <div className="rounded-xl bg-white/5 p-5">
            <MapPin className="mb-3 text-cyan-400" />
            <p className="text-gray-400">Venue</p>
            <h3>{event.venue}</h3>
          </div>

          <div className="rounded-xl bg-white/5 p-5">
            <Users className="mb-3 text-cyan-400" />
            <p className="text-gray-400">Capacity</p>
            <h3>{event.maxAttendees} Seats</h3>
          </div>

        </div>

        <h2 className="mt-12 text-2xl font-bold">
          Registration
        </h2>

        {registrationState === "upcoming" && (
  <button
    disabled
    className="mt-6 w-full rounded-xl bg-white/10 px-8 py-4 font-semibold text-gray-400 cursor-not-allowed"
  >
    Registration Opens Soon
  </button>
)}

{registrationState === "open" && (
  <button
    onClick={() =>
      navigate(`/contact?event=${encodeURIComponent(event.title)}`)
    }
    className="mt-6 w-full rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-black hover:bg-cyan-400 transition"
  >
    Register Now
  </button>
)}

{registrationState === "closed" && (
  <button
    disabled
    className="mt-6 w-full rounded-xl bg-red-500/20 px-8 py-4 font-semibold text-red-300 cursor-not-allowed"
  >
    Registrations Closed
  </button>
)}

      </div>
    </div>
  );
}