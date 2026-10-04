import type { MouseEvent } from "react";
import { buildWhatsappUrl, getWhatsappNumber } from "../lib/whatsapp";
import { buttonClass, type ButtonSize } from "./ui/button";
import { WhatsAppIcon } from "./ui/Icons";

interface WhatsAppButtonProps {
  message: string;
  label?: string;
  size?: ButtonSize;
  className?: string;
  /**
   * Dipanggil sebelum WhatsApp dibuka. Kembalikan false untuk membatalkan
   * (mis. saat input belum valid). Pilihan pelanggan tetap tersimpan karena
   * WhatsApp dibuka di tab/aplikasi baru.
   */
  onBeforeOpen?: () => boolean;
}

export function WhatsAppButton({
  message,
  label = "Tanya via WhatsApp",
  size = "md",
  className = "",
  onBeforeOpen,
}: WhatsAppButtonProps) {
  const number = getWhatsappNumber();

  if (!number) {
    // Nomor belum dikonfigurasi → tombol dinonaktifkan dengan aman.
    return (
      <button
        type="button"
        disabled
        title="Nomor WhatsApp belum dikonfigurasi"
        className={buttonClass("whatsapp", size, className)}
      >
        <WhatsAppIcon />
        WhatsApp belum tersedia
      </button>
    );
  }

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onBeforeOpen && !onBeforeOpen()) e.preventDefault();
  };

  return (
    <a
      href={buildWhatsappUrl(number, message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={buttonClass("whatsapp", size, className)}
    >
      <WhatsAppIcon />
      {label}
      <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
    </a>
  );
}
