import { useState, useEffect } from 'react';
import { Lightbulb, Send, ThumbsUp, Clock, Tag, ChevronDown } from 'lucide-react';
import { supabase, type Idea } from '../lib/supabase';

const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

type FormData = {
  name: string;
  year: string;
  idea_title: string;
  description: string;
  skills_required: string;
};

const initialForm: FormData = {
  name: '',
  year: '',
  idea_title: '',
  description: '',
  skills_required: '',
};

export default function Ideas() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loadingIdeas, setLoadingIdeas] = useState(true);
  const [votingId, setVotingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    fetchIdeas();
  }, []);

  async function fetchIdeas() {
    setLoadingIdeas(true);
    const { data } = await supabase
      .from('ideas')
      .select('*')
      .order('votes', { ascending: false })
      .order('created_at', { ascending: false });
    if (data) setIdeas(data as Idea[]);
    setLoadingIdeas(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: err } = await supabase.from('ideas').insert([form]);
    if (err) {
      setError('Something went wrong. Please try again.');
    } else {
      setSuccess(true);
      setForm(initialForm);
      fetchIdeas();
      setTimeout(() => {
        setSuccess(false);
        setShowForm(false);
      }, 2500);
    }
    setLoading(false);
  }

  async function handleVote(idea: Idea) {
    setVotingId(idea.id);
    const { error: err } = await supabase
      .from('ideas')
      .update({ votes: idea.votes + 1 })
      .eq('id', idea.id);
    if (!err) {
      setIdeas((prev) =>
        prev.map((i) => (i.id === idea.id ? { ...i, votes: i.votes + 1 } : i))
      );
    }
    setVotingId(null);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-[#050a14] text-white pt-16">
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-yellow-500/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-4 block">Idea Board</span>
          <h1 className="text-5xl sm:text-6xl font-black mb-6">
            Got an idea?{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Share it.
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Every great product started as a crazy idea. Submit yours, find your team, and start building. The community votes for the most exciting concepts.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Submit Form */}
          <div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center justify-between w-full mb-6 group"
            >
              <h2 className="text-2xl font-black flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                  <Lightbulb size={18} className="text-white" />
                </div>
                Submit Your Idea
              </h2>
              <ChevronDown
                size={20}
                className={`text-gray-400 transition-transform duration-300 ${showForm ? 'rotate-180' : ''}`}
              />
            </button>

            <div className={`transition-all duration-500 overflow-hidden ${showForm ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Alex Johnson"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 focus:bg-white/8 transition-all duration-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Academic Year *</label>
                    <select
                      name="year"
                      required
                      value={form.year}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500/50 transition-all duration-200 text-sm appearance-none"
                    >
                      <option value="" className="bg-[#0d1525]">Select year</option>
                      {years.map((y) => (
                        <option key={y} value={y} className="bg-[#0d1525]">{y}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Idea Title *</label>
                  <input
                    type="text"
                    name="idea_title"
                    required
                    value={form.idea_title}
                    onChange={handleChange}
                    placeholder="e.g. CampusConnect — a social platform for students"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 focus:bg-white/8 transition-all duration-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Describe Your Idea *</label>
                  <textarea
                    name="description"
                    required
                    rows={5}
                    value={form.description}
                    onChange={handleChange}
                    placeholder="What problem does it solve? Who would use it? What makes it unique?"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 focus:bg-white/8 transition-all duration-200 text-sm resize-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Skills Required</label>
                  <input
                    type="text"
                    name="skills_required"
                    value={form.skills_required}
                    onChange={handleChange}
                    placeholder="e.g. React, Node.js, UI/UX Design, Machine Learning"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 focus:bg-white/8 transition-all duration-200 text-sm"
                  />
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 text-green-400 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Idea submitted! The community will see it shortly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-sm shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <>
                      <Send size={16} />
                      Submit Idea
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Ideas List */}
          <div>
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Tag size={18} className="text-white" />
              </div>
              Community Ideas
              <span className="ml-auto text-gray-600 text-sm font-normal">{ideas.length} ideas</span>
            </h2>

            {loadingIdeas ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white/3 border border-white/8 rounded-2xl p-5 animate-pulse">
                    <div className="h-4 bg-white/10 rounded w-3/4 mb-3" />
                    <div className="h-3 bg-white/5 rounded w-full mb-2" />
                    <div className="h-3 bg-white/5 rounded w-2/3" />
                  </div>
                ))}
              </div>
            ) : ideas.length === 0 ? (
              <div className="bg-white/3 border border-white/8 rounded-2xl p-12 text-center">
                <Lightbulb size={40} className="text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500">No ideas yet. Be the first to submit one!</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[700px] overflow-y-auto pr-1 custom-scroll">
                {ideas.map((idea) => (
                  <div
                    key={idea.id}
                    className="group bg-white/3 border border-white/8 rounded-2xl p-5 hover:border-yellow-500/20 hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-white font-bold text-base leading-snug">{idea.idea_title}</h3>
                      <button
                        onClick={() => handleVote(idea)}
                        disabled={votingId === idea.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 text-sm font-semibold hover:bg-blue-500/20 hover:text-blue-300 transition-all duration-200 flex-shrink-0 disabled:opacity-50"
                      >
                        <ThumbsUp size={13} className={votingId === idea.id ? 'animate-bounce' : ''} />
                        {idea.votes}
                      </button>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">{idea.description}</p>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="font-medium text-gray-500">{idea.name}</span>
                        <span>·</span>
                        <span>{idea.year}</span>
                        {idea.skills_required && (
                          <>
                            <span>·</span>
                            <span className="text-blue-400 truncate max-w-[140px]">{idea.skills_required}</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 text-xs">
                        <Clock size={11} />
                        {new Date(idea.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
