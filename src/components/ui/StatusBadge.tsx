import Badge from "./Badge";

type Props = {
  status: string;
};

export default function StatusBadge({ status }: Props) {
  switch (status) {
    case "Completed":
      return <Badge color="green">{status}</Badge>;

    case "Ongoing":
      return <Badge color="blue">{status}</Badge>;

    case "Planning":
      return <Badge color="yellow">{status}</Badge>;

    case "On Hold":
      return <Badge color="gray">{status}</Badge>;

    default:
      return <Badge>{status}</Badge>;
  }
}