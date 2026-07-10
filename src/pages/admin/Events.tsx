import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

type Event = {
  id: number;
  title: string;
  type: string;
  status: string;
  date: string;
  attendees: number;
  featured: boolean;
};

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    setLoading(true);

    const { data } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: true });

    if (data) setEvents(data);

    setLoading(false);
  }

  return (
    <div>

      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Manage Events
          </h1>

          <p className="text-gray-400 mt-2">
            Add, edit and manage FusionX events.
          </p>
        </div>

        <button
          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black hover:bg-cyan-400"
        >
          <FaPlus />
          Add Event
        </button>

      </div>

      {loading ? (

        <div className="text-gray-400">
          Loading...
        </div>

      ) : (

        <div className="space-y-5">

          {events.map((event) => (

            <div
              key={event.id}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#101827] p-6"
            >

              <div>

                <h2 className="text-xl font-bold text-white">
                  {event.title}
                </h2>

                <div className="mt-2 flex gap-4 text-sm text-gray-400">

                  <span>{event.type}</span>

                  <span>{event.date}</span>

                  <span>{event.attendees} Registered</span>

                  <span
                    className={
                      event.status === "upcoming"
                        ? "text-cyan-400"
                        : "text-red-400"
                    }
                  >
                    {event.status}
                  </span>

                  {event.featured && (
                    <span className="text-yellow-400">
                      ⭐ Featured
                    </span>
                  )}

                </div>

              </div>

              <div className="flex gap-3">

                <button
                  className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  <FaEdit />
                </button>

                <button
                  className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  <FaTrash />
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}