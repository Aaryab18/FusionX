import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { supabase } from "../../lib/supabase";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  event?: any;
};

export default function EventFormModal({
  open,
  onClose,
  onSuccess,
  event,
}: Props) {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    type: "",
    date: "",
    time: "",
    venue: "",
    description: "",
    max_attendees: 100,
    color: "from-cyan-500 to-blue-500",
    icon: "Users",
    registration_open: "",
    registration_close: "",
    featured: false,
    prizes: "",
  });

  useEffect(() => {
  if (event) {
    setForm({
      title: event.title,
      slug: event.slug,
      type: event.type,
      date: event.date,
      time: event.time,
      venue: event.venue,
      description: event.description,
      max_attendees: event.max_attendees,
      color: event.color,
      icon: event.icon,
      registration_open: event.registration_open,
      registration_close: event.registration_close,
      featured: event.featured,
      prizes: event.prizes || "",
    });
  }
}, [event]);

  if (!open) return null;

  function handleChange(
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
) {
  const { name, value, type } = e.target;

  setForm((prev) => {
    const updated = {
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    };

    if (name === "title") {
      updated.slug = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    }

    return updated;
  });
}

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  const payload = {
    title: form.title,
    slug: form.slug,
    type: form.type,
    date: form.date,
    time: form.time,
    venue: form.venue,
    description: form.description,
    status: "upcoming",
    attendees: event?.attendees ?? 0,
    max_attendees: Number(form.max_attendees),
    color: form.color,
    icon: form.icon,
    registration_open: form.registration_open,
    registration_close: form.registration_close,
    featured: form.featured,
    prizes: form.prizes || null,
  };

  let error;

  if (event) {
    // EDIT
    ({ error } = await supabase
      .from("events")
      .update(payload)
      .eq("id", event.id));
  } else {
    // ADD
    ({ error } = await supabase
      .from("events")
      .insert(payload));
  }

  if (error) {
    alert(error.message);
    return;
  }

  onSuccess();

  setForm({
    title: "",
    slug: "",
    type: "",
    date: "",
    time: "",
    venue: "",
    description: "",
    max_attendees: 100,
    color: "from-cyan-500 to-blue-500",
    icon: "Users",
    registration_open: "",
    registration_close: "",
    featured: false,
    prizes: "",
  });

  onClose();
}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5">

      <div className="w-full max-w-3xl rounded-2xl bg-[#101827] p-8">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-white">
            Add Event
          </h2>

          <button onClick={onClose}>
            <X className="text-white" />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-5"
        >

          <input
            required
            name="title"
            placeholder="Event Title"
            value={form.title}
            onChange={handleChange}
            className="rounded-lg bg-white/5 p-3 text-white border border-white/10"
          />

          <input
  name="slug"
  value={form.slug}
  readOnly
  className="rounded-lg bg-white/10 p-3 text-gray-400"
/>
<select
  name="type"
  value={form.type}
  onChange={handleChange}
  className="rounded-lg border border-white/10 bg-[#111827] p-3 text-white"
>
  <option value="" className="bg-[#111827] text-white">
    Select Type
  </option>
  <option value="Workshop" className="bg-[#111827] text-white">
    Workshop
  </option>
  <option value="Hackathon" className="bg-[#111827] text-white">
    Hackathon
  </option>
  <option value="Club Event" className="bg-[#111827] text-white">
    Club Event
  </option>
  <option value="Innovation" className="bg-[#111827] text-white">
    Innovation
  </option>
  <option value="Seminar" className="bg-[#111827] text-white">
    Seminar
  </option>
</select>

<select
  name="icon"
  value={form.icon}
  onChange={handleChange}
  className="rounded-lg border border-white/10 bg-[#111827] p-3 text-white"
>
  <option value="Users" className="bg-[#111827] text-white">
    Users
  </option>
  <option value="Code2" className="bg-[#111827] text-white">
    Code
  </option>
  <option value="Trophy" className="bg-[#111827] text-white">
    Trophy
  </option>
  <option value="Calendar" className="bg-[#111827] text-white">
    Calendar
  </option>
</select>

<select
  name="color"
  value={form.color}
  onChange={handleChange}
  className="rounded-lg border border-white/10 bg-[#111827] p-3 text-white"
>
  <option
    value="from-cyan-500 to-blue-500"
    className="bg-[#111827] text-white"
  >
    Cyan
  </option>

  <option
    value="from-blue-500 to-cyan-500"
    className="bg-[#111827] text-white"
  >
    Blue
  </option>

  <option
    value="from-yellow-500 to-orange-500"
    className="bg-[#111827] text-white"
  >
    Yellow
  </option>

  <option
    value="from-orange-500 to-red-500"
    className="bg-[#111827] text-white"
  >
    Orange
  </option>
</select>

          <input
            required
            name="date"
            placeholder="20 Aug 2026"
            value={form.date}
            onChange={handleChange}
            className="rounded-lg bg-white/5 p-3 text-white border border-white/10"
          />

          <input
            required
            name="time"
            placeholder="10 AM - 4 PM"
            value={form.time}
            onChange={handleChange}
            className="rounded-lg bg-white/5 p-3 text-white border border-white/10"
          />

          <input
            required
            name="venue"
            placeholder="Innovation Lab"
            value={form.venue}
            onChange={handleChange}
            className="rounded-lg bg-white/5 p-3 text-white border border-white/10"
          />

          <textarea
            required
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="rounded-lg bg-white/5 p-3 text-white border border-white/10"
          />

          <input
            type="number"
            name="max_attendees"
            value={form.max_attendees}
            onChange={handleChange}
            className="rounded-lg bg-white/5 p-3 text-white border border-white/10"
          />

          <input
            name="prizes"
            placeholder="Certificates"
            value={form.prizes}
            onChange={handleChange}
            className="rounded-lg bg-white/5 p-3 text-white border border-white/10"
          />

          <input
            type="datetime-local"
            name="registration_open"
            value={form.registration_open}
            onChange={handleChange}
            className="rounded-lg bg-white/5 p-3 text-white border border-white/10"
          />

          <input
            type="datetime-local"
            name="registration_close"
            value={form.registration_close}
            onChange={handleChange}
            className="rounded-lg bg-white/5 p-3 text-white border border-white/10"
          />

          <label className="col-span-2 flex items-center gap-3 text-white">

  <input
    type="checkbox"
    name="featured"
    checked={form.featured}
    onChange={handleChange}
  />

  Featured Event

</label>

          <button
            type="submit"
            className="col-span-2 rounded-xl bg-cyan-500 py-3 font-bold text-black"
          >
            Save Event
          </button>

        </form>

      </div>

    </div>
  );
}