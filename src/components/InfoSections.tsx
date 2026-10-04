import { businessConfig } from "../config/business";
import { GENERAL_CONSULTATION_MESSAGE } from "../lib/whatsapp";
import { Logo } from "./Logo";
import { NAV_LINKS } from "./Navbar";
import { SectionHeading } from "./SectionHeading";
import { WhatsAppButton } from "./WhatsAppButton";
import { ClockIcon, MapPinIcon } from "./ui/Icons";

// ── Cara Pesan ─────────────────────────────────────────────────────────

const steps = [
  {
    title: "Pilih produk dan spesifikasi",
    text: "Buka katalog, pilih produk, lalu tentukan bahan, ukuran, dan jumlah yang kamu butuhkan.",
  },
  {
    title: "Kirim detail melalui WhatsApp",
    text: "Tekan tombol WhatsApp. Pesan berisi pilihanmu akan tersusun otomatis dan siap dikirim.",
  },
  {
    title: "Konfirmasi desain, harga, dan proses cetak",
    text: "Admin akan mengonfirmasi desain, harga akhir, dan proses cetak sebelum pesanan dikerjakan.",
  },
];

export function HowToOrder() {
  return (
    <section id="cara-pesan" aria-labelledby="cara-pesan-judul" className="scroll-mt-16 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="cara-pesan-judul"
          eyebrow="Cara Pesan"
          title="Pesan dalam tiga langkah"
          description="Tanpa akun dan tanpa pembayaran online — semua dikonfirmasi langsung melalui WhatsApp."
          align="center"
        />
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-xl border border-line bg-white p-6 shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary font-heading text-lg font-bold text-white" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-ink">
                <span className="sr-only">Langkah {i + 1}: </span>
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ── Tentang ────────────────────────────────────────────────────────────

const aboutHighlights = [
  { title: "Pilihan produk beragam", text: "Banner, display, stiker, poster, kartu nama, nota, undangan, hingga merchandise." },
  { title: "Harga dasar mudah dilihat", text: "Harga dasar dan satuannya tercantum jelas di setiap produk." },
  { title: "Konsultasi spesifikasi", text: "Bahan, ukuran, dan detail cetak bisa didiskusikan sebelum diproses." },
  { title: "Layanan desain grafis", text: "Belum punya desain? Ceritakan kebutuhanmu untuk dibantu desainnya." },
];

export function About() {
  return (
    <section id="tentang" aria-labelledby="tentang-judul" className="scroll-mt-16 border-y border-line bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading id="tentang-judul" eyebrow="Tentang" title="Tentang Belezza Printing" />
          <p className="mt-4 text-lg leading-relaxed text-muted">{businessConfig.shortDescription}</p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {aboutHighlights.map((h, i) => (
            <li key={h.title} className="rounded-xl border border-line bg-canvas p-5">
              <span className="font-heading text-sm font-bold text-primary" aria-hidden="true">
                0{i + 1}
              </span>
              <h3 className="mt-2 text-base font-semibold text-ink">{h.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{h.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── Kontak ─────────────────────────────────────────────────────────────

export function Contact() {
  const { address, operatingHours } = businessConfig;
  return (
    <section id="kontak" aria-labelledby="kontak-judul" className="scroll-mt-16 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-xl bg-ink px-6 py-12 text-center sm:px-12 lg:py-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-300">Kontak</p>
          <h2 id="kontak-judul" className="mx-auto mt-2 max-w-2xl text-3xl font-bold text-white sm:text-4xl">
            Punya kebutuhan cetak atau desain?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Ceritakan produk, ukuran, dan jumlah yang kamu perlukan. Kami bantu konfirmasi spesifikasi dan harganya melalui
            WhatsApp.
          </p>
          <div className="mt-8 flex justify-center">
            <WhatsAppButton message={GENERAL_CONSULTATION_MESSAGE} label="Konsultasi via WhatsApp" size="lg" />
          </div>
          {(address || operatingHours) && (
            <dl className="mx-auto mt-10 flex max-w-2xl flex-col justify-center gap-4 text-left text-sm text-slate-300 sm:flex-row sm:gap-10">
              {address && (
                <div className="flex gap-2">
                  <MapPinIcon className="shrink-0 text-blue-300" />
                  <div>
                    <dt className="sr-only">Alamat</dt>
                    <dd>{address}</dd>
                  </div>
                </div>
              )}
              {operatingHours && (
                <div className="flex gap-2">
                  <ClockIcon className="shrink-0 text-blue-300" />
                  <div>
                    <dt className="sr-only">Jam operasional</dt>
                    <dd>{operatingHours}</dd>
                  </div>
                </div>
              )}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────

const socialLabels: Record<keyof typeof businessConfig.social, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
};

export function Footer() {
  const socials = (Object.keys(businessConfig.social) as (keyof typeof businessConfig.social)[]).filter(
    (k) => businessConfig.social[k],
  );

  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            Percetakan dan jasa desain grafis untuk usaha, acara, dan kebutuhan pribadi.
          </p>
        </div>
        <nav aria-label="Navigasi footer">
          <h2 className="text-sm font-semibold text-ink">Navigasi</h2>
          <ul className="mt-3 space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-muted hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold text-ink">Hubungi kami</h2>
          <div className="mt-3">
            <WhatsAppButton message={GENERAL_CONSULTATION_MESSAGE} size="sm" />
          </div>
          {socials.length > 0 && (
            <ul className="mt-4 flex gap-4">
              {socials.map((k) => (
                <li key={k}>
                  <a href={businessConfig.social[k]} target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-ink">
                    {socialLabels[k]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted sm:px-6">
          © {new Date().getFullYear()} {businessConfig.name}. Harga dapat berubah; harga akhir dikonfirmasi melalui WhatsApp.
        </p>
      </div>
    </footer>
  );
}
