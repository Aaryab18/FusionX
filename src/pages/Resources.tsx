import { ExternalLink, BookOpen, Code2, Brain, Smartphone, Database, Cloud, Shield, Layers } from 'lucide-react';

type Resource = {
  title: string;
  desc: string;
  url: string;
  type: 'Course' | 'Docs' | 'Tool' | 'Book' | 'Roadmap';
};

type Roadmap = {
  icon: typeof Code2;
  title: string;
  color: string;
  steps: string[];
  resources: Resource[];
};

const roadmaps: Roadmap[] = [
  {
    icon: Code2,
    title: 'Web Development',
    color: 'from-blue-500 to-cyan-500',
    steps: ['HTML & CSS', 'JavaScript', 'React / Vue', 'Node.js', 'Databases', 'Deployment'],
    resources: [
      { title: 'The Odin Project', desc: 'Free, full-stack web dev curriculum', url: 'https://www.theodinproject.com', type: 'Course' },
      { title: 'React Docs', desc: 'Official React documentation', url: 'https://react.dev', type: 'Docs' },
      { title: 'MDN Web Docs', desc: 'Comprehensive web technology reference', url: 'https://developer.mozilla.org', type: 'Docs' },
    ],
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    color: 'from-green-500 to-emerald-500',
    steps: ['Python Basics', 'NumPy & Pandas', 'ML Fundamentals', 'Deep Learning', 'NLP / CV', 'Deployment'],
    resources: [
      { title: 'fast.ai', desc: 'Practical deep learning for coders', url: 'https://www.fast.ai', type: 'Course' },
      { title: 'Kaggle Learn', desc: 'Free micro-courses in ML and data science', url: 'https://www.kaggle.com/learn', type: 'Course' },
      { title: 'Papers With Code', desc: 'Browse ML papers with implementations', url: 'https://paperswithcode.com', type: 'Tool' },
    ],
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    color: 'from-pink-500 to-rose-500',
    steps: ['Dart Basics', 'Flutter Widgets', 'State Management', 'Firebase', 'APIs', 'App Store'],
    resources: [
      { title: 'Flutter Docs', desc: 'Official Flutter documentation & codelabs', url: 'https://flutter.dev/docs', type: 'Docs' },
      { title: 'Dart.dev', desc: 'Dart language reference and tutorials', url: 'https://dart.dev', type: 'Docs' },
      { title: 'FlutterFire', desc: 'Firebase plugins for Flutter apps', url: 'https://firebase.flutter.dev', type: 'Docs' },
    ],
  },
  {
    icon: Database,
    title: 'Backend & Databases',
    color: 'from-orange-500 to-amber-500',
    steps: ['API Design', 'Node.js / Django', 'SQL Basics', 'PostgreSQL', 'Caching', 'Scaling'],
    resources: [
      { title: 'Supabase Docs', desc: 'Open-source Firebase alternative', url: 'https://supabase.com/docs', type: 'Docs' },
      { title: 'PostgreSQL Tutorial', desc: 'Comprehensive SQL and PostgreSQL guide', url: 'https://www.postgresqltutorial.com', type: 'Course' },
      { title: 'Node.js Best Practices', desc: 'Production-ready Node.js practices', url: 'https://github.com/goldbergyoni/nodebestpractices', type: 'Docs' },
    ],
  },
  {
    icon: Cloud,
    title: 'DevOps & Cloud',
    color: 'from-cyan-500 to-sky-500',
    steps: ['Linux Basics', 'Git & GitHub', 'Docker', 'CI/CD', 'AWS / GCP', 'Kubernetes'],
    resources: [
      { title: 'Docker Docs', desc: 'Containers from beginner to advanced', url: 'https://docs.docker.com', type: 'Docs' },
      { title: 'GitHub Actions', desc: 'Automate workflows with CI/CD', url: 'https://docs.github.com/en/actions', type: 'Docs' },
      { title: 'roadmap.sh / devops', desc: 'Step-by-step DevOps roadmap', url: 'https://roadmap.sh/devops', type: 'Roadmap' },
    ],
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    color: 'from-red-500 to-rose-600',
    steps: ['Networking', 'Linux', 'Web Security', 'Cryptography', 'CTF Practice', 'Pentesting'],
    resources: [
      { title: 'TryHackMe', desc: 'Learn cybersecurity through hands-on labs', url: 'https://tryhackme.com', type: 'Course' },
      { title: 'OWASP Top 10', desc: 'Top web application security risks', url: 'https://owasp.org/www-project-top-ten', type: 'Docs' },
      { title: 'Hack The Box', desc: 'CTF platform for real-world pentesting', url: 'https://www.hackthebox.com', type: 'Tool' },
    ],
  },
];

const generalResources: Resource[] = [
  { title: 'CS50 by Harvard', desc: 'Best intro to computer science, completely free', url: 'https://cs50.harvard.edu', type: 'Course' },
  { title: 'freeCodeCamp', desc: '3,000+ hours of free coding curriculum', url: 'https://www.freecodecamp.org', type: 'Course' },
  { title: 'GitHub Student Pack', desc: 'Free dev tools worth $200k+ for students', url: 'https://education.github.com/pack', type: 'Tool' },
  { title: 'Figma for Education', desc: 'Free Figma professional plan for students', url: 'https://www.figma.com/education', type: 'Tool' },
  { title: 'Vercel', desc: 'Deploy frontends and serverless functions for free', url: 'https://vercel.com', type: 'Tool' },
  { title: 'roadmap.sh', desc: 'Developer roadmaps for every career path', url: 'https://roadmap.sh', type: 'Roadmap' },
];

const typeColors: Record<Resource['type'], string> = {
  Course: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Docs: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  Tool: 'bg-green-500/10 text-green-400 border-green-500/20',
  Book: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  Roadmap: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
};

export default function Resources() {
  return (
    <div className="min-h-screen bg-[#050a14] text-white pt-16">
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-600/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4 block">Learning Hub</span>
          <h1 className="text-5xl sm:text-6xl font-black mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Resources</span>
            {' '}to level up
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Curated learning materials, roadmaps, and tools handpicked by our senior members. Everything you need to go from zero to builder.
          </p>
        </div>
      </section>

      {/* Quick Resources */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 rounded-full bg-gradient-to-b from-yellow-500 to-orange-500" />
            <h2 className="text-3xl font-black">Must-Have Resources</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {generalResources.map((r) => (
              <a
                key={r.title}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 bg-white/3 border border-white/8 rounded-2xl p-5 hover:border-blue-500/30 hover:bg-white/5 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={18} className="text-cyan-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-white font-semibold text-sm">{r.title}</h3>
                    <ExternalLink size={13} className="text-gray-600 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed mb-2">{r.desc}</p>
                  <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium border ${typeColors[r.type]}`}>
                    {r.type}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmaps */}
      <section className="py-16 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 rounded-full bg-gradient-to-b from-blue-500 to-cyan-500" />
            <h2 className="text-3xl font-black">Learning Roadmaps</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmaps.map((rm) => {
              const Icon = rm.icon;
              return (
                <div
                  key={rm.title}
                  className="bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-white/15 hover:bg-white/5 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${rm.color} flex items-center justify-center mb-4`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-4">{rm.title}</h3>

                  {/* Steps */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {rm.steps.map((step, i) => (
                      <div key={step} className="flex items-center gap-1">
                        <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-md">{step}</span>
                        {i < rm.steps.length - 1 && <Layers size={10} className="text-gray-700 flex-shrink-0" />}
                      </div>
                    ))}
                  </div>

                  {/* Resources */}
                  <div className="space-y-2 border-t border-white/5 pt-4">
                    {rm.resources.map((r) => (
                      <a
                        key={r.title}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-2 hover:text-cyan-400 transition-colors"
                      >
                        <span className="text-gray-400 text-sm group-hover:text-cyan-400 transition-colors truncate">{r.title}</span>
                        <ExternalLink size={12} className="text-gray-600 group-hover:text-cyan-400 flex-shrink-0" />
                      </a>
                    ))}
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
