import { Github, Linkedin, Twitter } from 'lucide-react';

type Member = {
  name: string;
  role: string;
  year: string;
  avatar: string;
  socials: { github?: string; linkedin?: string; twitter?: string };
  specialty: string;
};

const coreTeam: Member[] = [
  {
    name: 'Yashwanth',
    role: 'President',
    year: '2nd Year',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
    socials: { github: '#', linkedin: '#', twitter: '#' },
    specialty: 'Full-Stack · AI/ML',
  },
  {
    name: 'Akshay',
    role: 'Vice President & UI Lead',
    year: '2nd Year',
    avatar: 'https://tse3.mm.bing.net/th/id/OIP.Dn-8K_TiXbuob_1fMEFurQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3&auto=compress&cs=tinysrgb&w=300',
    socials: { github: '#', linkedin: '#' },
    specialty: 'UI/UX · Frontend',
  },
  {
    name: 'Aaryab',
    role: 'Tech Lead',
    year: '2nd Year',
    avatar: 'https://img.freepik.com/premium-photo/portrait-young-boy-professional-look_785361-73.jpg?auto=compress&cs=tinysrgb&w=300',
    socials: { github: '#', linkedin: '#' },
    specialty: 'Backend · DevOps',
  },
  {
    name: 'Priyanka',
    role: 'Design Lead',
    year: '2nd Year',
    avatar: 'https://imgcdn.stablediffusionweb.com/2024/10/2/e422911e-e632-4a91-a4af-110348c278f4.jpg?auto=compress&cs=tinysrgb&w=300',
    socials: { github: '#', linkedin: '#', twitter: '#' },
    specialty: 'UI/UX · Branding',
  },
  {
    name: 'Karan Mehta',
    role: 'Events & Community',
    year: '2nd Year',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=300',
    socials: { linkedin: '#', twitter: '#' },
    specialty: 'Community · Marketing',
  },
  {
    name: 'Ananya',
    role: 'Operations lead',
    year: '2nd Year',
    avatar: 'https://imgcdn.stablediffusionweb.com/2025/4/18/2a4f52aa-4348-4764-a494-94f69948de8c.jpg?auto=compress&cs=tinysrgb&w=300',
    socials: { github: '#', linkedin: '#' },
    specialty: 'AI/ML · Research',
  },
];

const mentors: Member[] = [
  {
    name: 'Dr. Vijay Kumar',
    role: 'Faculty Mentor · CS Dept.',
    year: 'Professor',
    avatar: 'https://images.pexels.com/photos/5792641/pexels-photo-5792641.jpeg?auto=compress&cs=tinysrgb&w=300',
    socials: { linkedin: '#' },
    specialty: 'System Design · AI',
  },
  {
    name: 'Neha Joshi',
    role: 'Industry Mentor · Google',
    year: 'Alumni \'21',
    avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=300',
    socials: { linkedin: '#', twitter: '#' },
    specialty: 'Product · Cloud',
  },
  {
    name: 'Rohan Das',
    role: 'Startup Mentor · Founder',
    year: 'Alumni \'19',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=300',
    socials: { linkedin: '#', twitter: '#' },
    specialty: 'Startup · Business',
  },
];

const contributors: Member[] = [
  {
    name: 'Aditi Singh',
    role: 'Frontend Developer',
    year: '2nd Year',
    avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=300',
    socials: { github: '#' },
    specialty: 'React · TypeScript',
  },
  {
    name: 'Varun Gupta',
    role: 'Mobile Developer',
    year: '2nd Year',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300',
    socials: { github: '#', linkedin: '#' },
    specialty: 'Flutter · Dart',
  },
  {
    name: 'Meera Pillai',
    role: 'Data & ML',
    year: '2nd Year',
    avatar: 'https://images.pexels.com/photos/3727464/pexels-photo-3727464.jpeg?auto=compress&cs=tinysrgb&w=300',
    socials: { github: '#' },
    specialty: 'Python · ML',
  },
  {
    name: 'Dev Patel',
    role: 'Backend Developer',
    year: '2nd Year',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=300',
    socials: { github: '#', linkedin: '#' },
    specialty: 'Node.js · PostgreSQL',
  },
];

function MemberCard({ member, size = 'md' }: { member: Member; size?: 'lg' | 'md' | 'sm' }) {
  return (
    <div className={`group bg-white/3 border border-white/8 rounded-2xl overflow-hidden hover:border-blue-500/30 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1 ${size === 'lg' ? 'p-6' : 'p-5'}`}>
      <div className="flex items-start gap-4">
        <div className={`rounded-xl overflow-hidden flex-shrink-0 ${size === 'lg' ? 'w-16 h-16' : 'w-12 h-12'}`}>
          <img
            src={member.avatar}
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`text-white font-bold truncate ${size === 'lg' ? 'text-lg' : 'text-base'}`}>{member.name}</h3>
          <p className="text-cyan-400 text-sm font-medium mb-0.5">{member.role}</p>
          <p className="text-gray-600 text-xs mb-2">{member.year}</p>
          <p className="text-gray-500 text-xs mb-3">{member.specialty}</p>
          <div className="flex items-center gap-2">
            {member.socials.github && (
              <a href={member.socials.github} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/15 transition-all">
                <Github size={13} />
              </a>
            )}
            {member.socials.linkedin && (
              <a href={member.socials.linkedin} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 transition-all">
                <Linkedin size={13} />
              </a>
            )}
            {member.socials.twitter && (
              <a href={member.socials.twitter} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all">
                <Twitter size={13} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <div className="min-h-screen bg-[#050a14] text-white pt-16">
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-600/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4 block">The People</span>
          <h1 className="text-5xl sm:text-6xl font-black mb-6">
            Meet the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">builders</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Passionate individuals who believe technology should solve real problems. We're students, dreamers, and builders — all in one.
          </p>
        </div>
      </section>

      {/* Core Team */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 rounded-full bg-gradient-to-b from-blue-500 to-cyan-500" />
            <h2 className="text-3xl font-black">Core Team</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreTeam.map((m) => <MemberCard key={m.name} member={m} size="lg" />)}
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 rounded-full bg-gradient-to-b from-yellow-500 to-orange-500" />
            <h2 className="text-3xl font-black">Mentors</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {mentors.map((m) => <MemberCard key={m.name} member={m} size="lg" />)}
          </div>
        </div>
      </section>

      {/* Contributors */}
      <section className="py-16 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 rounded-full bg-gradient-to-b from-green-500 to-emerald-500" />
            <h2 className="text-3xl font-black">Contributors</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contributors.map((m) => <MemberCard key={m.name} member={m} size="md" />)}
          </div>
        </div>
      </section>
    </div>
  );
}
