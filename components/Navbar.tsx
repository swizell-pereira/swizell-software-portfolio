"use client";

const links = [
  { href: "#who", label: "Who I Am" },
  { href: "#work", label: "Work" },
  { href: "#principles", label: "Principles" },
  { href: "#ecosystem", label: "Ecosystem" },
  { href: "#playground", label: "Systems" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8">
        <a href="#" className="text-lg font-semibold tracking-wide">
          Swizell Pereira
        </a>

        <div className="hidden items-center gap-7 text-sm text-neutral-300 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
