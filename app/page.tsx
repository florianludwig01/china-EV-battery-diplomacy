import SystemsMap from "@/components/SystemsMap";

export default function Home() {
  return (
    <main className="h-screen bg-slate-950 text-white">
      <header className="p-6">
        <h1 className="text-3xl font-bold">
          China EV Battery Diplomacy
        </h1>

        <p className="text-slate-400">
          Interactive Systems Map
        </p>
      </header>

      <SystemsMap />
    </main>
  );
}