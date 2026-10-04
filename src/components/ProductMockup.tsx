import type { ReactNode } from "react";
import type { MockupKind } from "../types/product";

/**
 * Ilustrasi mockup produk (SVG) — dipakai sebagai placeholder sampai foto
 * produk asli tersedia. Semua desain di dalamnya fiktif. Rasio 4:3.
 */

const C = {
  ink: "#0F172A",
  slate: "#475569",
  soft: "#CBD5E1",
  line: "#E2E8F0",
  blue: "#2563EB",
  blueSoft: "#DBEAFE",
  amber: "#F59E0B",
  rose: "#F43F5E",
  teal: "#14B8A6",
  white: "#FFFFFF",
};
const HEAD = "Space Grotesk, Inter, sans-serif";

function Frame({ bg, floor, children }: { bg: string; floor?: string; children: ReactNode }) {
  return (
    <>
      <rect width="400" height="300" fill={bg} />
      {floor && <rect y="248" width="400" height="52" fill={floor} />}
      {children}
    </>
  );
}

/** Bayangan lembut di bawah objek */
const Shadow = ({ cx, cy, rx, ry = 8 }: { cx: number; cy: number; rx: number; ry?: number }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={C.ink} opacity="0.1" />
);

const Bars = ({ x, y, widths, gap = 10, h = 5, fill = C.line }: { x: number; y: number; widths: number[]; gap?: number; h?: number; fill?: string }) => (
  <>
    {widths.map((w, i) => (
      <rect key={i} x={x} y={y + i * gap} width={w} height={h} rx={h / 2} fill={fill} />
    ))}
  </>
);

const scenes: Record<MockupKind, ReactNode> = {
  banner: (
    <Frame bg="#E8EEF7" floor="#DCE3EE">
      <path d="M78 22 L70 68 M322 22 L330 68" stroke={C.slate} strokeWidth="1.5" />
      <rect x="52" y="74" width="300" height="134" rx="3" fill={C.ink} opacity="0.08" />
      <rect x="48" y="68" width="304" height="134" rx="3" fill={C.white} />
      <rect x="48" y="68" width="112" height="134" rx="3" fill={C.blue} />
      <rect x="150" y="68" width="10" height="134" fill={C.blue} />
      <text x="104" y="132" textAnchor="middle" fontFamily={HEAD} fontWeight="700" fontSize="27" fill={C.white}>PROMO</text>
      <text x="104" y="152" textAnchor="middle" fontFamily={HEAD} fontWeight="500" fontSize="11" letterSpacing="3" fill={C.blueSoft}>SPESIAL</text>
      <text x="178" y="110" fontFamily={HEAD} fontWeight="700" fontSize="21" fill={C.ink}>Toko Sejahtera</text>
      <Bars x={178} y={124} widths={[150, 118, 132]} gap={11} h={5} />
      <rect x="178" y="164" width="88" height="22" rx="11" fill={C.amber} />
      <text x="222" y="179" textAnchor="middle" fontFamily={HEAD} fontWeight="600" fontSize="10" fill={C.ink}>Grand Opening</text>
      {[[56, 76], [344, 76], [56, 194], [344, 194]].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
      ))}
    </Frame>
  ),

  xbanner: (
    <Frame bg="#EEF2F7" floor="#E2E8F0">
      <Shadow cx={200} cy={276} rx={70} />
      <path d="M140 34 L262 272 M260 34 L138 272" stroke={C.slate} strokeWidth="4" strokeLinecap="round" />
      <rect x="150" y="36" width="100" height="214" fill={C.white} />
      <rect x="150" y="36" width="100" height="92" fill={C.teal} />
      <circle cx="200" cy="86" r="26" fill={C.white} opacity="0.25" />
      <path d="M186 78 h28 v14 a14 14 0 0 1 -28 0 z" fill={C.white} />
      <path d="M214 82 a6 6 0 0 1 0 12" stroke={C.white} strokeWidth="3" fill="none" />
      <text x="200" y="152" textAnchor="middle" fontFamily={HEAD} fontWeight="700" fontSize="16" fill={C.ink}>Menu Baru</text>
      <Bars x={166} y={164} widths={[68, 56, 62]} gap={10} h={4} />
      <rect x="166" y="206" width="68" height="20" rx="10" fill={C.ink} />
      <text x="200" y="220" textAnchor="middle" fontFamily={HEAD} fontWeight="600" fontSize="9" fill={C.white}>Coba Sekarang</text>
    </Frame>
  ),

  rollup: (
    <Frame bg="#F1F5F9" floor="#E2E8F0">
      <Shadow cx={200} cy={270} rx={80} />
      <rect x="144" y="26" width="112" height="3" rx="1.5" fill={C.slate} />
      <rect x="146" y="28" width="108" height="230" fill={C.white} />
      <rect x="146" y="28" width="108" height="100" fill={C.ink} />
      <circle cx="232" cy="52" r="34" fill={C.blue} opacity="0.9" />
      <circle cx="166" cy="110" r="16" fill={C.amber} />
      <text x="160" y="80" fontFamily={HEAD} fontWeight="700" fontSize="17" fill={C.white}>SEMINAR</text>
      <text x="160" y="96" fontFamily={HEAD} fontWeight="500" fontSize="9" letterSpacing="1.5" fill={C.soft}>KEWIRAUSAHAAN</text>
      <Bars x={160} y={146} widths={[80, 64, 72, 50]} gap={12} h={5} />
      <rect x="160" y="204" width="80" height="34" rx="6" fill={C.blueSoft} />
      <rect x="136" y="256" width="128" height="14" rx="4" fill="#94A3B8" />
      <rect x="136" y="256" width="128" height="4" rx="2" fill="#B6C2D2" />
    </Frame>
  ),

  stiker: (
    <Frame bg="#FBF1E6">
      <rect x="99" y="40" width="210" height="222" rx="6" fill={C.ink} opacity="0.08" />
      <rect x="95" y="34" width="210" height="222" rx="6" fill={C.white} />
      {[
        [143, 82, C.blue],
        [200, 82, C.amber],
        [257, 82, C.rose],
        [143, 145, C.teal],
        [200, 145, C.ink],
        [257, 145, C.blue],
        [143, 208, C.amber],
        [200, 208, C.rose],
      ].map(([cx, cy, fill]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx as number} cy={cy as number} r="25" fill="none" stroke={C.line} strokeDasharray="3 3" />
          <circle cx={cx as number} cy={cy as number} r="22" fill={fill as string} />
          <circle cx={cx as number} cy={cy as number} r="12" fill="none" stroke={C.white} strokeWidth="3" opacity="0.85" />
        </g>
      ))}
      <circle cx="257" cy="208" r="25" fill="none" stroke={C.line} strokeDasharray="3 3" />
      <g transform="rotate(-18 300 238)">
        <ellipse cx="302" cy="246" rx="26" ry="6" fill={C.ink} opacity="0.12" />
        <circle cx="300" cy="232" r="25" fill={C.white} />
        <circle cx="300" cy="232" r="21" fill={C.teal} />
        <text x="300" y="237" textAnchor="middle" fontFamily={HEAD} fontWeight="700" fontSize="13" fill={C.white}>HALAL</text>
      </g>
    </Frame>
  ),

  poster: (
    <Frame bg="#E9EEF5">
      <rect x="124" y="32" width="160" height="230" fill={C.ink} opacity="0.08" />
      <rect x="120" y="26" width="160" height="230" fill={C.white} />
      <rect x="120" y="26" width="160" height="128" fill={C.amber} />
      <circle cx="200" cy="96" r="44" fill={C.white} opacity="0.3" />
      <circle cx="200" cy="96" r="24" fill={C.rose} />
      <text x="200" y="180" textAnchor="middle" fontFamily={HEAD} fontWeight="700" fontSize="20" fill={C.ink}>FESTIVAL</text>
      <text x="200" y="195" textAnchor="middle" fontFamily={HEAD} fontWeight="500" fontSize="8.5" letterSpacing="2" fill={C.slate}>MUSIK &amp; KULINER</text>
      <Bars x={146} y={210} widths={[108, 86]} gap={10} h={4} />
      <rect x="146" y="232" width="50" height="12" rx="6" fill={C.blue} />
      <rect x="182" y="18" width="36" height="14" fill="#F8FAFC" opacity="0.8" transform="rotate(-4 200 25)" />
    </Frame>
  ),

  "kartu-nama": (
    <Frame bg="#EDF1F6">
      <g transform="rotate(-10 170 140)">
        <rect x="88" y="96" width="176" height="102" rx="6" fill={C.ink} opacity="0.12" transform="translate(4 6)" />
        <rect x="88" y="96" width="176" height="102" rx="6" fill={C.ink} />
        <circle cx="176" cy="138" r="16" fill={C.blue} />
        <text x="176" y="178" textAnchor="middle" fontFamily={HEAD} fontWeight="600" fontSize="10" letterSpacing="2" fill={C.soft}>STUDIO KOPI</text>
      </g>
      <g transform="rotate(7 236 168)">
        <rect x="146" y="118" width="180" height="104" rx="6" fill={C.ink} opacity="0.12" transform="translate(4 6)" />
        <rect x="146" y="118" width="180" height="104" rx="6" fill={C.white} />
        <rect x="146" y="118" width="8" height="104" rx="3" fill={C.blue} />
        <text x="170" y="152" fontFamily={HEAD} fontWeight="700" fontSize="15" fill={C.ink}>Andi Pratama</text>
        <text x="170" y="166" fontFamily={HEAD} fontWeight="500" fontSize="9" fill={C.slate}>Pemilik Usaha</text>
        <Bars x={170} y={184} widths={[96, 80, 88]} gap={9} h={4} />
        <circle cx="300" cy="146" r="10" fill={C.blue} />
      </g>
    </Frame>
  ),

  nota: (
    <Frame bg="#F1F3F6">
      <Shadow cx={204} cy={266} rx={100} ry={7} />
      <rect x="122" y="52" width="180" height="210" rx="4" fill="#FBCFE8" />
      <rect x="116" y="46" width="180" height="210" rx="4" fill="#FDE68A" />
      <rect x="110" y="40" width="180" height="210" rx="4" fill={C.white} stroke={C.line} />
      <rect x="110" y="40" width="180" height="14" rx="4" fill={C.ink} />
      <text x="126" y="80" fontFamily={HEAD} fontWeight="700" fontSize="18" fill={C.ink}>NOTA</text>
      <text x="274" y="80" textAnchor="end" fontFamily={HEAD} fontWeight="500" fontSize="9" fill={C.rose}>No. 0128</text>
      <Bars x={126} y={90} widths={[90]} h={4} />
      <rect x="126" y="106" width="148" height="18" fill={C.blueSoft} />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="126" x2="274" y1={142 + i * 18} y2={142 + i * 18} stroke={C.line} />
      ))}
      <line x1="160" x2="160" y1="106" y2="214" stroke={C.line} />
      <line x1="236" x2="236" y1="106" y2="214" stroke={C.line} />
      <text x="236" y="234" fontFamily={HEAD} fontWeight="600" fontSize="9" fill={C.slate} textAnchor="end">Jumlah</text>
      <rect x="242" y="226" width="32" height="10" rx="2" fill={C.line} />
    </Frame>
  ),

  undangan: (
    <Frame bg="#F7F1EC">
      <g transform="rotate(-9 170 160)">
        <rect x="80" y="104" width="190" height="128" rx="4" fill="#E9D8C8" />
        <path d="M80 104 L175 170 L270 104" fill="#DFC9B5" />
      </g>
      <rect x="164" y="48" width="140" height="200" rx="3" fill={C.ink} opacity="0.1" transform="translate(4 6)" />
      <rect x="164" y="48" width="140" height="200" rx="3" fill={C.white} />
      <rect x="172" y="56" width="124" height="184" rx="2" fill="none" stroke="#C8A464" strokeWidth="1.2" />
      <g fill="#9DB89A">
        <ellipse cx="214" cy="82" rx="10" ry="4" transform="rotate(-30 214 82)" />
        <ellipse cx="254" cy="82" rx="10" ry="4" transform="rotate(30 254 82)" />
      </g>
      <circle cx="234" cy="80" r="7" fill="#E7A9A3" />
      <text x="234" y="120" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="11" fill={C.slate}>Undangan Pernikahan</text>
      <text x="234" y="156" textAnchor="middle" fontFamily="Georgia, serif" fontSize="26" fill="#A07F3F">A &amp; R</text>
      <line x1="208" x2="260" y1="172" y2="172" stroke="#C8A464" />
      <Bars x={200} y={186} widths={[68, 54]} gap={10} h={4} />
      <text x="234" y="226" textAnchor="middle" fontFamily={HEAD} fontSize="8" letterSpacing="2" fill={C.slate}>SABTU</text>
    </Frame>
  ),

  ganci: (
    <Frame bg="#EAF5F2">
      <Shadow cx={204} cy={268} rx={64} ry={7} />
      <circle cx="200" cy="52" r="22" fill="none" stroke="#94A3B8" strokeWidth="5" />
      <circle cx="200" cy="52" r="22" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
      <ellipse cx="200" cy="83" rx="5" ry="8" fill="none" stroke="#94A3B8" strokeWidth="3" />
      <ellipse cx="200" cy="97" rx="5" ry="8" fill="none" stroke="#94A3B8" strokeWidth="3" />
      <circle cx="200" cy="110" r="4" fill="none" stroke="#94A3B8" strokeWidth="2.5" />
      <circle cx="200" cy="182" r="72" fill={C.white} stroke="#D7E2EA" strokeWidth="2" />
      <clipPath id="ganci-clip">
        <circle cx="200" cy="182" r="62" />
      </clipPath>
      <g clipPath="url(#ganci-clip)">
        <rect x="130" y="110" width="140" height="140" fill="#BFDBFE" />
        <circle cx="226" cy="160" r="15" fill={C.amber} />
        <path d="M130 230 L178 176 L208 206 L232 186 L280 236 V260 H130 Z" fill={C.blue} />
        <path d="M130 250 L190 214 L280 250 V260 H130 Z" fill={C.teal} />
      </g>
      <circle cx="200" cy="122" r="5" fill={C.white} stroke="#94A3B8" strokeWidth="2" />
      <path d="M160 146 a58 58 0 0 1 30 -22" stroke={C.white} strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.8" />
    </Frame>
  ),

  mug: (
    <Frame bg="#EEF2FF">
      <Shadow cx={208} cy={250} rx={90} ry={9} />
      <path d="M258 120 h18 a30 30 0 0 1 0 60 h-18" fill="none" stroke="#D5DCE6" strokeWidth="16" />
      <path d="M258 120 h18 a30 30 0 0 1 0 60 h-18" fill="none" stroke={C.white} strokeWidth="11" />
      <path d="M128 86 h132 v140 a16 16 0 0 1 -16 16 h-100 a16 16 0 0 1 -16 -16 z" fill={C.white} />
      <ellipse cx="194" cy="86" rx="66" ry="10" fill="#E5EAF2" />
      <ellipse cx="194" cy="86" rx="58" ry="7" fill="#7C5A43" />
      <rect x="144" y="122" width="100" height="78" rx="8" fill={C.blue} />
      <circle cx="170" cy="150" r="12" fill={C.amber} />
      <text x="194" y="186" textAnchor="middle" fontFamily={HEAD} fontWeight="700" fontSize="14" fill={C.white}>Kopi Pagi</text>
      <rect x="138" y="96" width="8" height="128" rx="4" fill={C.ink} opacity="0.04" />
    </Frame>
  ),

  desain: (
    <Frame bg="#F1F5F9">
      <g transform="rotate(-6 170 150)">
        <rect x="74" y="56" width="170" height="200" rx="4" fill={C.ink} opacity="0.08" transform="translate(4 6)" />
        <rect x="74" y="56" width="170" height="200" rx="4" fill={C.white} />
        <rect x="90" y="72" width="138" height="70" rx="3" fill={C.blueSoft} />
        <circle cx="122" cy="107" r="18" fill={C.blue} />
        <Bars x={150} y={96} widths={[64, 50, 58]} gap={10} h={5} fill="#93C5FD" />
        <Bars x={90} y={158} widths={[138, 112, 124]} gap={11} h={5} />
        <rect x="90" y="200" width="64" height="40" rx="3" fill="#FEF3C7" />
        <rect x="164" y="200" width="64" height="40" rx="3" fill="#FFE4E6" />
        {[[90, 72], [228, 72], [90, 142], [228, 142]].map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x - 3} y={y - 3} width="6" height="6" fill={C.white} stroke={C.blue} strokeWidth="1.5" />
        ))}
      </g>
      {[
        [C.ink, -28],
        [C.teal, -14],
        [C.rose, 0],
        [C.amber, 14],
        [C.blue, 28],
      ].map(([fill, angle]) => (
        <g key={angle as number} transform={`rotate(${angle} 300 250)`}>
          <rect x="284" y="110" width="32" height="140" rx="5" fill={C.white} stroke={C.line} />
          <rect x="288" y="114" width="24" height="84" rx="3" fill={fill as string} />
        </g>
      ))}
      <circle cx="300" cy="238" r="4" fill={C.slate} />
    </Frame>
  ),
};

const labels: Record<MockupKind, string> = {
  banner: "Ilustrasi banner promosi terpasang di dinding",
  xbanner: "Ilustrasi X banner berdiri",
  rollup: "Ilustrasi roll up banner",
  stiker: "Ilustrasi lembar stiker bulat",
  poster: "Ilustrasi poster acara di dinding",
  "kartu-nama": "Ilustrasi kartu nama depan dan belakang",
  nota: "Ilustrasi buku nota rangkap",
  undangan: "Ilustrasi kartu undangan dan amplop",
  ganci: "Ilustrasi gantungan kunci akrilik",
  mug: "Ilustrasi mug dengan cetakan custom",
  desain: "Ilustrasi desain grafis dan contoh warna",
};

export function ProductMockup({ kind, className }: { kind: MockupKind; className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={labels[kind]}
      className={className}
    >
      {scenes[kind]}
    </svg>
  );
}
