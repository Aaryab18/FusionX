import { useEffect, useState } from "react";
import { Eye, Search, Trash2 } from "lucide-react";
import { supabase } from "../../lib/supabase";
import ContactViewModal from "../../components/admin/ContactViewModal";
import { toast } from "sonner";

type ContactMessage = {
  id: string;
  name: string;
  usn: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
};

export default function ContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [selectedMessage, setSelectedMessage] =
    useState<ContactMessage | null>(null);

  const [viewOpen, setViewOpen] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    setLoading(true);

    const { data, error } = await supabase
  .from("contact_messages")
  .select("*")
  .order("created_at", { ascending: false });

console.log("Contact data:", data);
console.log("Contact error:", error);

    if (error) {
      console.error(error);
    } else {
      setMessages(data as ContactMessage[]);
    }

    setLoading(false);
  }

  async function deleteMessage(id: string) {
    const ok = window.confirm(
      "Delete this message?"
    );

    if (!ok) return;

    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    setMessages((prev) =>
      prev.filter((m) => m.id !== id)
    );
  }

  const filtered = messages.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    m.usn.toLowerCase().includes(search.toLowerCase()) ||
    m.subject.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold text-white">
          Contact Messages
        </h1>

        <div className="relative">

          <Search
            className="absolute left-3 top-3 text-gray-500"
            size={18}
          />

          <input
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="rounded-xl border border-white/10 bg-[#111827] py-2 pl-10 pr-4 text-white outline-none"
          />

        </div>

      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220]">

        <table className="w-full">

          <thead className="bg-white/5">

            <tr className="text-left">

             <th className="p-4">Name</th>
<th>USN</th>
<th>Email</th>
<th>Phone</th>
<th>Subject</th>
<th>Date</th>
<th className="text-center">
  Actions
</th>

            </tr>

          </thead>

          <tbody>

            {filtered.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="py-12 text-center text-gray-400"
                >
                  No messages found.
                </td>

              </tr>

            ) : (

              filtered.map((message) => (

                <tr
                  key={message.id}
                  className="border-t border-white/5 hover:bg-white/5"
                >

                  <td className="p-4">
  {message.name}
</td>

<td>{message.usn}</td>

<td>{message.email}</td>

<td>{message.phone}</td>

<td>{message.subject}</td>

<td>
  {new Date(message.created_at).toLocaleDateString()}
</td>

                  <td>

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => {
                          setSelectedMessage(message);
                          setViewOpen(true);
                        }}
                        className="rounded-lg bg-cyan-500/20 p-2 hover:bg-cyan-500/30"
                      >
                        <Eye
                          size={18}
                          className="text-cyan-400"
                        />
                      </button>

                      <button
                        onClick={() =>
                          deleteMessage(message.id)
                        }
                        className="rounded-lg bg-red-500/20 p-2 hover:bg-red-500/30"
                      >
                        <Trash2
                          size={18}
                          className="text-red-400"
                        />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      <ContactViewModal
        open={viewOpen}
        message={selectedMessage}
        onClose={() => {
          setViewOpen(false);
          setSelectedMessage(null);
        }}
      />

    </div>
  );
}