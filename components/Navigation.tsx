import { BatteryCharging } from "lucide-react";

const links = [
  { href: "#story", label: "Story" },
  { href: "#explorer", label: "Explorer" },
  { href: "#methodology", label: "Methodology" },
  { href: "#sources", label: "Sources" },
];

export default function Navigation() {
  return (
    <header className="site-nav">
      <a href="#top" className="flex items-center gap-2 font-semibold text-white">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-amber-400 text-slate-950">
          <BatteryCharging size={17} aria-hidden="true" />
        </span>
        <span className="hidden sm:inline">China EV Battery Diplomacy</span>
      </a>

      <nav aria-label="Main navigation">
        <ul className="flex items-center gap-1 sm:gap-5">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-2 py-2 text-xs text-slate-300 transition hover:bg-white/10 hover:text-white sm:px-0 sm:text-sm sm:hover:bg-transparent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
