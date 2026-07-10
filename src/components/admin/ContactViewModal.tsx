import { X, Mail, Phone, User } from "lucide-react";

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

type Props = {
  open: boolean;
  message: ContactMessage | null;
  onClose: () => void;
};

export default function ContactViewModal({
  open,
  message,
  onClose,
}: Props) {
  if (!open || !message) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-[#08111f] border border-white/10">

        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <h2 className="text-2xl font-bold text-white">
            Contact Message
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        <div className="space-y-6 p-6">

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <p className="text-gray-500 mb-1">Name</p>
              <p className="text-white flex items-center gap-2">
                <User size={16}/>
                {message.name}
              </p>
            </div>

            <div>
              <p className="text-gray-500 mb-1">USN</p>
              <p className="text-white">
                {message.usn}
              </p>
            </div>

            <div>
              <p className="text-gray-500 mb-1">Email</p>
              <p className="text-white flex items-center gap-2">
                <Mail size={16}/>
                {message.email}
              </p>
            </div>

            <div>
              <p className="text-gray-500 mb-1">Phone</p>
              <p className="text-white flex items-center gap-2">
                <Phone size={16}/>
                {message.phone}
              </p>
            </div>

          </div>

          <div>
            <p className="text-gray-500 mb-2">
              Subject
            </p>

            <p className="text-white font-semibold">
              {message.subject}
            </p>
          </div>

          <div>
            <p className="text-gray-500 mb-2">
              Message
            </p>

            <div className="rounded-xl bg-white/5 p-4 text-gray-300 leading-7">
              {message.message}
            </div>
          </div>

          <div>
            <p className="text-gray-500">
              Submitted
            </p>

            <p className="text-white">
              {new Date(message.created_at).toLocaleString()}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}