import { usePage } from "@/hooks/usePage";

export default function HomePage() {
  const { data, isLoading } = usePage("main");

  if (isLoading) return <div className="p-6">Loading…</div>;

  return <main></main>;
}
