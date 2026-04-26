import { useState } from 'react';
import { ExternalLink, Github, Filter } from 'lucide-react';

type Status = 'Idea' | 'Ongoing' | 'Completed';

type Project = {
  id: number;
  title: string;
  description: string;
  stack: string[];
  status: Status;
  team: string;
  image: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'CampusConnect',
    description: 'A real-time event management and social networking platform for college students to discover clubs, events, and meet peers.',
    stack: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    status: 'Completed',
    team: 'Team Alpha',
    image: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    title: 'StudyBuddy AI',
    description: 'An AI-powered study assistant that generates personalized quizzes, summaries, and flashcards from uploaded lecture notes.',
    stack: ['Python', 'FastAPI', 'OpenAI', 'React', 'Supabase'],
    status: 'Ongoing',
    team: 'Team Nexus',
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 3,
    title: 'GreenTrack',
    description: 'A carbon footprint tracker for campus activities. Students log daily activities and compete on sustainability leaderboards.',
    stack: ['React Native', 'Firebase', 'Charts.js'],
    status: 'Ongoing',
    team: 'Team EcoCode',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 4,
    title: 'SkillSwap',
    description: 'A peer-to-peer skill exchange platform where students teach what they know and learn what they don\'t.',
    stack: ['Vue.js', 'Express', 'PostgreSQL', 'WebRTC'],
    status: 'Idea',
    team: 'Seeking Team',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 5,
    title: 'MedAlert',
    description: 'Smart medication reminder app with IoT integration for college students managing health conditions away from home.',
    stack: ['Flutter', 'Arduino', 'Firebase', 'Dart'],
    status: 'Completed',
    team: 'Team HealthByte',
    image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 6,
    title: 'CodeCollab',
    description: 'Real-time collaborative code editor with built-in video chat, perfect for remote pair programming sessions.',
    stack: ['React', 'WebSockets', 'Monaco Editor', 'WebRTC'],
    status: 'Ongoing',
    team: 'Team DevSync',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 7,
    title: 'LocalHeroes',
    description: 'Platform connecting students with local NGOs and community projects for meaningful volunteer opportunities.',
    stack: ['Next.js', 'Supabase', 'Maps API', 'Stripe'],
    status: 'Idea',
    team: 'Seeking Team',
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 8,
    title: 'FoodRadar',
    description: 'Discover the best food stalls and canteens on campus with real-time queue updates and menu information.',
    stack: ['React', 'Node.js', 'Redis', 'PostgreSQL'],
    status: 'Completed',
    team: 'Team HungryDevs',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const statusConfig: Record<Status, { bg: string; text: string; dot: string }> = {
  Idea: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', dot: 'bg-yellow-400' },
  Ongoing: { bg: 'bg-blue-500/10', text: 'text-blue-400', dot: 'bg-blue-400' },
  Completed: { bg: 'bg-green-500/10', text: 'text-green-400', dot: 'bg-green-400' },
};

const filters: (Status | 'All')[] = ['All', 'Idea', 'Ongoing', 'Completed'];

export default function Projects() {
  const [active, setActive] = useState<Status | 'All'>('All');

  const filtered = active === 'All' ? projects : projects.filter((p) => p.status === active);

  return (
    <div className="min-h-screen bg-[#050a14] text-white pt-16">
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-600/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4 block">Our Work</span>
          <h1 className="text-5xl sm:text-6xl font-black mb-6">
            Projects that{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">ship</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From classroom ideas to deployed products. Every project here started with someone saying "what if..."
          </p>
        </div>
      </section>

      {/* Filter */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={16} className="text-gray-500 mr-1" />
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                active === f
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/20'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {f}
              {f !== 'All' && (
                <span className="ml-2 text-xs opacity-70">
                  ({projects.filter((p) => p.status === f).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((project) => {
              const sc = statusConfig[project.status];
              return (
                <div
                  key={project.id}
                  className="group bg-white/3 border border-white/8 rounded-2xl overflow-hidden hover:border-blue-500/30 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-950/50"
                >
                  <div className="relative overflow-hidden h-40">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-[#050a14]/60 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${sc.bg} ${sc.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot} animate-pulse`} />
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-white font-bold text-lg mb-2">{project.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-300 text-xs font-medium border border-blue-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <span className="text-gray-600 text-xs">{project.team}</span>
                      <div className="flex gap-2">
                        <button className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                          <Github size={13} />
                        </button>
                        <button className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all">
                          <ExternalLink size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
