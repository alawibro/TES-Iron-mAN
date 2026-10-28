import { BRAND } from "@/lib/content";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-white/40 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-8">
        <a href="#top" className="text-lg font-semibold tracking-tight">
          {BRAND}
        </a>
        <div className="hidden gap-8 text-sm text-muted md:flex">
          <a href="#fitur" className="transition-colors hover:text-foreground">Fitur</a>
          <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
          <a href="#kontak" className="transition-colors hover:text-foreground">Kontak</a>
        </div>
      </nav>
    </header>
  );
}
