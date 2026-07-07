import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Project } from "../lib/supabase";
import ProjectCard from "../components/projects/ProjectCard";

export default function ProjectShowcase() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredProjects = projects.filter((project) => {
  const matchesSearch =
    project.title.toLowerCase().includes(search.toLowerCase()) ||
    project.category.toLowerCase().includes(search.toLowerCase()) ||
    project.tech_stack.some((tech) =>
      tech.toLowerCase().includes(search.toLowerCase())
    );

  const matchesCategory =
    selectedCategory === "All" ||
    project.category === selectedCategory;

  return matchesSearch && matchesCategory;
});

const featuredProjects = filteredProjects.filter((p) => p.featured);
const normalProjects = filteredProjects;
const categories = [
  "All",
  ...new Set(projects.map((project) => project.category)),
];
  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProjects(data as Project[]);
    }

    setLoading(false);
  }

  return (
  <div className="min-h-screen bg-[#08111f] text-white pt-32 px-8">

      <h1 className="text-4xl font-bold mb-2">
        Project Showcase
      </h1>

      <p className="text-gray-400 mb-10">
  Explore projects built by FusionX students.
</p>

<div className="my-10 grid grid-cols-1 md:grid-cols-3 gap-6">

  <div className="rounded-xl bg-[#101827] p-6 text-center">
    <h2 className="text-3xl font-bold text-cyan-400">
      {projects.length}
    </h2>
    <p className="text-gray-400">Projects</p>
  </div>

  <div className="rounded-xl bg-[#101827] p-6 text-center">
    <h2 className="text-3xl font-bold text-yellow-400">
      {featuredProjects.length}
    </h2>
    <p className="text-gray-400">Featured</p>
  </div>

  <div className="rounded-xl bg-[#101827] p-6 text-center">
    <h2 className="text-3xl font-bold text-green-400">
      {new Set(projects.map((p) => p.category)).size}
    </h2>
    <p className="text-gray-400">Categories</p>
  </div>

</div>

      {loading ? (
  <p>Loading projects...</p>
) : (
  <>
    <input
  type="text"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="🔍 Search Projects..."
  className="mb-10 w-full rounded-xl border border-white/10 bg-[#101827] px-5 py-4 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:outline-none"
/>

<div className="mb-10 flex flex-wrap gap-3">
  {categories.map((category) => (
    <button
  key={category}
  onClick={() => setSelectedCategory(category)}
  className={`rounded-full px-4 py-2 transition ${
    selectedCategory === category
      ? "bg-cyan-500 text-black"
      : "border border-white/10 hover:bg-cyan-500 hover:text-black"
  }`}
>
  {category}
</button>
  ))}
</div>

    {featuredProjects.length > 0 && (
      <>
        <h2 className="text-3xl font-bold mb-6">
          ⭐ Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </>
    )}

    <h2 className="text-3xl font-bold mb-6">
      All Projects
    </h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {normalProjects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
        />
      ))}
    </div>
  </>
)}

    </div>
  );
}