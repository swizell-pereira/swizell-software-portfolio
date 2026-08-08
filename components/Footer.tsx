import Link from "next/link";
import { desktopNavLinks } from "@/lib/navigation";

export default function Footer() {
  return (
    <footer className="px-6 py-8 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2">
          {desktopNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-neutral-500 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-sm text-neutral-600">
          © {new Date().getFullYear()} Swizell Pereira
        </p>
      </div>
    </footer>
  );
}
