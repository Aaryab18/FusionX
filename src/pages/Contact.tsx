import { useState } from 'react';
import { Mail, MapPin, Send, Github, Twitter, Linkedin, Instagram, MessageSquare, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

type FormData = { name: string; email: string; message: string };
const initialForm: FormData = { name: '', email: '', message: '' };

const socials = [
  { icon: Github, label: 'GitHub', handle: '@fusionhubtechlab', href: '#', color: 'hover:text-white hover:bg-white/10' },
  { icon: Twitter, label: 'Twitter / X', handle: '@fusionhub', href: '#', color: 'hover:text-cyan-400 hover:bg-cyan-400/10' },
  { icon: Linkedin, label: 'LinkedIn', handle: 'FusionX', href: '#', color: 'hover:text-blue-400 hover:bg-blue-400/10' },
  { icon: Instagram, label: 'Instagram', handle: '@fusionhubtechlab', href: '#', color: 'hover:text-pink-400 hover:bg-pink-400/10' },
];

const faqs = [
  { q: 'Who can join FusionX?', a: 'Anyone with passion for building and innovation. Students, professionals, and visionaries — if you want to create something great, you belong here.' },
  { q: 'Do I need coding experience to submit an idea?', a: 'No! Anyone can submit an idea. If you have a vision, we\'ll help you find the technical co-founders to build it.' },
  { q: 'How are teams matched?', a: 'Once an idea gains traction, interested senior students reach out. We facilitate introductions and help form balanced teams.' },
  { q: 'Is there a joining fee?', a: 'Absolutely not. FusionX is free for everyone. We believe great ideas shouldn\'t have a paywall.' },
];

export default function Contact() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: err } = await supabase.from('contact_messages').insert([form]);
    if (err) {
      setError('Something went wrong. Please try again or email us directly.');
    } else {
      setSuccess(true);
      setForm(initialForm);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#050a14] text-white pt-16">
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-600/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4 block">Get In Touch</span>
          <h1 className="text-5xl sm:text-6xl font-black mb-6">
            Let's{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">connect</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a question, want to join, or just want to say hi? We'd love to hear from you. Our team typically responds within 24 hours.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="bg-white/3 border border-white/8 rounded-2xl p-6 space-y-4">
              <h2 className="text-xl font-bold mb-5">Contact Information</h2>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-0.5">Email</div>
                  <a href="mailto:fusionhub@college.edu" className="text-white font-semibold hover:text-cyan-400 transition-colors">
                    fusionhub@college.edu
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-cyan-400" />
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-0.5">Location</div>
                  <div className="text-white font-semibold">Innovation Hub, Block C</div>
                  <div className="text-gray-500 text-sm">Department of CS, College Campus</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={18} className="text-green-400" />
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-0.5">Response Time</div>
                  <div className="text-white font-semibold">Within 24 hours</div>
                  <div className="text-gray-500 text-sm">Mon – Sat, 9am – 6pm</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-5">Follow Us</h2>
              <div className="space-y-3">
                {socials.map(({ icon: Icon, label, handle, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    className={`flex items-center gap-4 p-3 rounded-xl border border-white/5 text-gray-400 transition-all duration-200 ${color} group`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-white">{label}</div>
                      <div className="text-xs text-gray-500">{handle}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form + FAQ */}
          <div className="space-y-8">
            {/* Form */}
            <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6">Send a Message</h2>
              {success ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle size={48} className="text-green-400 mb-4" />
                  <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
                  <p className="text-gray-500">Thanks for reaching out. We'll get back to you soon.</p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-6 px-5 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 text-sm transition-all"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Alex Johnson"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all duration-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="alex@college.edu"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all duration-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us why you want to join, or ask us anything..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all duration-200 text-sm resize-none"
                    />
                  </div>
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm shadow-lg shadow-blue-600/20 hover:shadow-blue-500/40 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* FAQs */}
            <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-5">FAQs</h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.q} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <h4 className="text-white font-semibold text-sm mb-1.5">{faq.q}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
