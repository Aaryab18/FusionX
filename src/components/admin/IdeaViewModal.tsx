type Props = {
  open: boolean;
  onClose: () => void;
  idea: any;
};

export default function IdeaViewModal({
  open,
  onClose,
  idea,
}: Props) {
  if (!open || !idea) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-3xl rounded-2xl bg-[#0b1220] p-8 text-white">

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {idea.idea_title}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-6">

          <div>
            <p className="text-gray-400">Student</p>
            <p>{idea.name}</p>
          </div>

          <div>
            <p className="text-gray-400">USN</p>
            <p>{idea.usn}</p>
          </div>

          <div>
            <p className="text-gray-400">Votes</p>
            <p>{idea.votes}</p>
          </div>

          <div>
            <p className="text-gray-400">Status</p>
            <p>{idea.status}</p>
          </div>

          <div className="col-span-2">
            <p className="text-gray-400">Skills Required</p>
            <p>{idea.skills_required}</p>
          </div>

          <div className="col-span-2">
            <p className="text-gray-400">Team</p>
            <p>{idea.team || "Seeking Team"}</p>
          </div>

          <div className="col-span-2">
            <p className="text-gray-400">Description</p>

            <div className="mt-2 rounded-xl bg-white/5 p-4 leading-7">
              {idea.description}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}