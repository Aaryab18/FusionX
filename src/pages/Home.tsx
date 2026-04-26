import { Link } from 'react-router-dom';
import {
  Zap, ArrowRight, Lightbulb, Users, Rocket, Globe,
  ChevronRight, Star, Code2, Brain, Layers
} from 'lucide-react';

const features = [
  {
    icon: Lightbulb,
    title: 'Submit Your Idea',
    description: 'Got a concept that could change the world? Share it with the community and find the right team.',
    color: 'from-yellow-500 to-orange-500',
    glow: 'shadow-yellow-500/20',
  },
  {
    icon: Users,
    title: 'Find Your Team',
    description: 'Get matched with seniors who have the skills to bring your vision to life through guided collaboration.',
    color: 'from-blue-500 to-cyan-500',
    glow: 'shadow-blue-500/20',
  },
  {
    icon: Code2,
    title: 'Build & Ship',
    description: 'Turn ideas into working products with real tech stacks, code reviews, and production deployments.',
    color: 'from-green-500 to-emerald-500',
    glow: 'shadow-green-500/20',
  },
  {
    icon: Globe,
    title: 'Create Impact',
    description: 'Ship products that solve real problems. Build your portfolio and make a lasting impact.',
    color: 'from-pink-500 to-rose-500',
    glow: 'shadow-pink-500/20',
  },
];

const stats = [
  { value: '50+', label: 'Projects Built' },
  { value: '200+', label: 'Active Members' },
  { value: '30+', label: 'Mentors' },
  { value: '15+', label: 'Events/Year' },
];

const workflow = [
  { step: '01', label: 'Idea', icon: Lightbulb, desc: 'Submit your concept' },
  { step: '02', label: 'Team', icon: Users, desc: 'Get matched with builders' },
  { step: '03', label: 'Build', icon: Code2, desc: 'Develop with mentorship' },
  { step: '04', label: 'Launch', icon: Rocket, desc: 'Ship to the world' },
  { step: '05', label: 'Impact', icon: Globe, desc: 'Create real change' },
];

const perks = [
  { icon: Brain, title: 'Expert Mentorship', desc: 'Learn from seniors who have shipped real products and navigated the tech industry.' },
  { icon: Layers, title: 'Real-World Projects', desc: 'Work on production-grade applications, not just classroom exercises.' },
  { icon: Star, title: 'Skill Recognition', desc: 'Build a portfolio that stands out. Every contribution is tracked and rewarded.' },
  { icon: Rocket, title: 'Launch Support', desc: 'Get help with deployment, marketing, and taking your project to the next level.' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050a14] text-white overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-blue-400/6 rounded-full blur-3xl animate-pulse delay-2000" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(99,179,237,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 backdrop-blur-sm">
            <Zap size={14} className="text-cyan-400" />
            Innovate · Collaborate · Build
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight mb-6 leading-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300">FusionX</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-300 mb-4">
            Where{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Innovation</span>
            {' '}Meets{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Execution</span>
          </p>

          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            Where passionate builders connect with world-changing ideas to create innovative solutions that matter.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link
              to="/contact"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-lg shadow-2xl shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
            >
              Join Now
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/ideas"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl border border-blue-500/30 text-blue-400 font-semibold text-lg hover:bg-blue-500/10 hover:border-blue-400/50 transition-all duration-300"
            >
              Submit Idea
              <Lightbulb size={20} className="group-hover:scale-110 transition-transform" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/3 backdrop-blur-sm rounded-2xl border border-white/5 p-5">
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  {stat.value}
                </div>
                <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gray-600 to-transparent" />
        </div>
      </section>

      {/* About intro */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4 block">What We Do</span>
              <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">
                We're not just a club.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  We're a launchpad.
                </span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                FusionX is where innovation meets execution. We connect passionate builders with groundbreaking ideas to create products that solve real problems.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                Together, we build products that matter — from mobile apps to AI tools, from web platforms to hardware projects. Every idea gets a fair shot, every builder gets recognized.
              </p>
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-cyan-400 transition-colors"
              >
                Learn more about us
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 rounded-3xl blur-2xl" />
              <div className="relative bg-white/3 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-gray-400 text-sm">Workflow</span>
                  <Zap size={16} className="text-cyan-400" />
                </div>
                <div className="space-y-4">
                  {workflow.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.step} className="flex items-center gap-4">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                            <Icon size={16} className="text-cyan-400" />
                          </div>
                          <div>
                            <div className="text-white font-semibold text-sm">{item.label}</div>
                            <div className="text-gray-500 text-xs">{item.desc}</div>
                          </div>
                        </div>
                        {i < workflow.length - 1 && (
                          <div className="w-6 h-px bg-gradient-to-r from-blue-500/40 to-transparent" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4 block">The Process</span>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              Idea{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">→</span>
              {' '}Team{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">→</span>
              {' '}Product{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">→</span>
              {' '}Impact
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              A structured path from raw concept to shipped product, with expert guidance at every step.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className={`group relative bg-white/3 backdrop-blur-sm border border-white/8 rounded-2xl p-6 hover:border-white/20 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${f.glow}`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} bg-opacity-20 flex items-center justify-center mb-5 shadow-lg`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Perks / Why Join */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4 block">Why FusionX</span>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              Built different,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">for builders</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {perks.map((perk) => {
              const Icon = perk.icon;
              return (
                <div
                  key={perk.title}
                  className="flex gap-5 bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-blue-500/20 hover:bg-blue-500/3 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={22} className="text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">{perk.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{perk.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-blue-800/15 to-cyan-900/20 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
            Ready to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">build</span>
            {' '}something
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">extraordinary?</span>
          </h2>
          <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
            Join FusionX. Bring your idea or your skills — either way, you belong here.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg shadow-2xl shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
            >
              Join the Club
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/projects"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-gray-300 font-semibold text-lg hover:bg-white/5 hover:border-white/20 transition-all duration-300"
            >
              See Our Work
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
