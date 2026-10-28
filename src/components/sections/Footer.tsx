import { BRAND } from "@/lib/content";

export function Footer() {
  return (
    <footer id="kontak" className="px-6 pb-12 pt-24 md:px-8">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 border-t border-black/10 pt-10 md:flex-row md:items-center">
        <p className="text-lg font-semibold tracking-tight">{BRAND}</p>
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {BRAND}. Semua hak dilindungi.
        </p>
      </div>
    </footer>
  );
}
