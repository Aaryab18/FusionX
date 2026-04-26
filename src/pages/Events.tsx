import { Calendar, Clock, MapPin, Users, ArrowRight, Trophy, BookOpen, Code2, Cpu } from 'lucide-react';

type EventStatus = 'upcoming' | 'past';

type Event = {
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
  venue: string;
  attendees: number;
  maxAttendees: number;
  description: string;
  status: EventStatus;
  icon: typeof Trophy;
  color: string;
  prizes?: string;
  speakers?: string[];
};

const events: Event[] = [
  {
    id: 1,
    title: 'HackFusion 2025',
    type: 'Hackathon',
    date: 'May 15–16, 2025',
    time: '9:00 AM – 6:00 PM',
    venue: 'Innovation Hub, Block C',
    attendees: 0,
    maxAttendees: 150,
    description: '36-hour hackathon where teams of 2–4 build solutions for real-world challenges in education, healthcare, and sustainability.',
    status: 'upcoming',
    icon: Trophy,
    color: 'from-yellow-500 to-orange-500',
    prizes: '₹50,000 in prizes',
  },
  {
    id: 2,
    title: 'Web Dev Bootcamp',
    type: 'Workshop',
    date: 'April 28, 2025',
    time: '10:00 AM – 4:00 PM',
    venue: 'Lab 204, CS Block',
    attendees: 45,
    maxAttendees: 60,
    description: 'Intensive one-day workshop covering React, Tailwind CSS, and Supabase. Build a full-stack app from scratch by end of day.',
    status: 'upcoming',
    icon: Code2,
    color: 'from-blue-500 to-cyan-500',
    speakers: ['Aryan Sharma', 'Rahul Verma'],
  },
  {
    id: 3,
    title: 'AI/ML Workshop Series',
    type: 'Workshop',
    date: 'May 5, 12, 19, 2025',
    time: '3:00 PM – 5:00 PM',
    venue: 'Seminar Hall A',
    attendees: 30,
    maxAttendees: 80,
    description: 'Three-week intensive covering Python for ML, neural networks, and deploying AI models to production using modern tools.',
    status: 'upcoming',
    icon: Cpu,
    color: 'from-green-500 to-emerald-500',
    speakers: ['Ananya Roy', 'Dr. Vijay Kumar'],
  },
  {
    id: 4,
    title: 'FusionX Launch Demo Day',
    type: 'Showcase',
    date: 'March 22, 2025',
    time: '2:00 PM – 6:00 PM',
    venue: 'Auditorium',
    attendees: 200,
    maxAttendees: 200,
    description: 'Six teams presented their semester-long projects to industry judges, faculty, and 200+ attendees. Three projects won funding offers.',
    status: 'past',
    icon: BookOpen,
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 5,
    title: 'Git & GitHub Workshop',
    type: 'Workshop',
    date: 'February 14, 2025',
    time: '10:00 AM – 1:00 PM',
    venue: 'Lab 102, CS Block',
    attendees: 120,
    maxAttendees: 120,
    description: 'Beginner-friendly workshop covering version control fundamentals, branching, pull requests, and collaborative workflows.',
    status: 'past',
    icon: Code2,
    color: 'from-gray-500 to-slate-500',
  },
  {
    id: 6,
    title: 'Ideathon Winter 2024',
    type: 'Ideathon',
    date: 'December 10, 2024',
    time: '9:00 AM – 5:00 PM',
    venue: 'Innovation Hub',
    attendees: 80,
    maxAttendees: 100,
    description: '30 teams pitched ideas in 5 minutes each. Top 6 ideas were selected for the next semester\'s development cycle.',
    status: 'past',
    icon: Trophy,
    color: 'from-orange-500 to-red-500',
    prizes: 'Top 6 ideas funded',
  },
];

function EventCard({ event }: { event: Event }) {
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
            <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md mb-2 inline-block ${
              isUpcoming ? 'bg-blue-500/10 text-blue-400' : 'bg-white/5 text-gray-500'
            }`}>
              {event.type}
            </span>
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

        {isUpcoming && (
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-blue-500/30 text-blue-300 text-sm font-semibold hover:from-blue-600/30 hover:to-cyan-500/30 hover:text-white transition-all duration-200 group">
            Register Now
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function Events() {
  const upcoming = events.filter((e) => e.status === 'upcoming');
  const past = events.filter((e) => e.status === 'past');

  return (
    <div className="min-h-screen bg-[#050a14] text-white pt-16">
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-600/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4 block">Events</span>
          <h1 className="text-5xl sm:text-6xl font-black mb-6">
            Where builders{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">gather</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From hackathons to workshops, every event is a chance to learn, build, and connect with the most passionate tech community on campus.
          </p>
        </div>
      </section>

      {/* Upcoming */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 rounded-full bg-gradient-to-b from-blue-500 to-cyan-500" />
            <h2 className="text-3xl font-black">Upcoming Events</h2>
            <span className="ml-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold border border-blue-500/20">
              {upcoming.length} events
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        </div>
      </section>

      {/* Past */}
      <section className="py-16 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 rounded-full bg-gradient-to-b from-gray-600 to-gray-700" />
            <h2 className="text-3xl font-black text-gray-300">Past Events</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80">
            {past.map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
