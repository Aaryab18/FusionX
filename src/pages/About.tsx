import { Lightbulb, Users, Code2, Rocket, Globe, Target, Eye, Heart } from 'lucide-react';

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation First',
    desc: 'Every idea, no matter how wild, deserves a hearing. We celebrate bold thinking and creative problem-solving.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Users,
    title: 'Radical Collaboration',
    desc: 'Juniors and seniors work as equals. The best products come from diverse perspectives united by a shared goal.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Code2,
    title: 'Ship It',
    desc: 'We believe in execution. Ideas are great, but shipped products are what move the world forward.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Heart,
    title: 'Community Driven',
    desc: 'Every member\'s growth matters. We celebrate wins together, learn from failures, and support each other always.',
    color: 'from-pink-500 to-rose-500',
  },
];

const workflow = [
  {
    step: '01',
    icon: Lightbulb,
    title: 'Idea',
    desc: 'A first-year student (or anyone!) submits an idea through our Idea Board. No gatekeeping — all concepts welcome.',
  },
  {
    step: '02',
    icon: Users,
    title: 'Team',
    desc: 'Senior students browse ideas and express interest based on their skills. A team forms organically around the concept.',
  },
  {
    step: '03',
    icon: Code2,
    title: 'Build',
    desc: 'The team gets assigned a mentor, defines their tech stack, and starts building in weekly sprints with check-ins.',
  },
  {
    step: '04',
    icon: Rocket,
    title: 'Launch',
    desc: 'The project ships — deployed, live, and real. A showcase event celebrates every launch.',
  },
  {
    step: '05',
    icon: Globe,
    title: 'Impact',
    desc: 'Projects go on to serve real users, win competitions, or evolve into startups. The impact outlasts the semester.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#050a14] text-white pt-16">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4 block">About Us</span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            Not a club.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              A movement.
            </span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            FusionX is where innovation and execution collide to create solutions that change the world.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4 block">Who We Are</span>
              <h2 className="text-4xl font-black mb-6">
                The bridge between
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  imagination & code
                </span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Founded by a group of passionate engineers and visionaries, FusionX started with a simple mission: connect brilliant minds with world-changing ideas.
              </p>
              <p className="text-gray-500 leading-relaxed">
                We created a structured platform to connect these two groups, guided by industry mentors, powered by weekly sprints, and fueled by a culture of building real things that matter.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/10 border border-blue-500/20 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <Target size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">Our Mission</h3>
                    <p className="text-gray-400 leading-relaxed">
                      "To bridge the gap between imagination and implementation by connecting juniors with ideas and seniors with technical skills."
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/10 border border-cyan-500/20 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <Eye size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">Our Vision</h3>
                    <p className="text-gray-400 leading-relaxed">
                      "To create a generation of innovators and builders who ship products with purpose and make technology serve humanity."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4 block">Our Values</span>
            <h2 className="text-4xl font-black">What drives us</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="group bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-white/20 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-5`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4 block">How It Works</span>
            <h2 className="text-4xl font-black">
              From idea to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">impact</span>
            </h2>
          </div>
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-8">
              {workflow.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.step} className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center mb-4 relative">
                      <Icon size={28} className="text-cyan-400" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                        {item.step.slice(1)}
                      </div>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
