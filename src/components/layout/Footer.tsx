import Link from "next/link";
import Image from "next/image";
import assets from "@/assets";
import PopBackground from "@/components/ui/PopBackground";

const CONFIG = {
  about:
    "A bold, modern QSR brand centered around crave-worthy fried chicken, high-stack burgers, glazed wings, and contemporary fast-food favorites. Established presence of 50+ to 60+ Outlets Across India.",
  address:
    "411, Pudur Mariyamman Kovil Street, Peelamedu Pudur, Coimbatore – 641004",
  email: "360eventss2023@gmail.com",
  phone: "+91 98947 42567",
  disclaimer:
    "*Based on the official Shop Proposal. Interior execution/working charges and site-specific expenses are additional.",
};

const COLUMNS = [
  {
    title: "Franchise Models",
    links: [
      { label: "Models Overview", href: "/franchise-models", active: true },
      { label: "Express Kiosk (₹4 Lakhs)", href: "/franchise-models#kiosk" },
      { label: "Shop / Full Outlet (₹3.75L*)", href: "/franchise-models#shop" },
      { label: "Spot Pushcart (₹4 Lakhs)", href: "/franchise-models#pushcart" },
      { label: "Investment & Setup", href: "/investment" },
    ],
  },
  {
    title: "Company & Support",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Signature Menu", href: "/menu" },
      { label: "Our Presence", href: "/our-presence" },
      { label: "Franchise FAQ", href: "/faq" },
      { label: "Contact Desk", href: "/contact" },
    ],
  },
];

const NETWORK = [
  { country: "India", note: "Current Brand Presence (50+ to 60+ Outlets)" },
  { country: "Sri Lanka", note: "Expansion in Progress (On Process)" },
  { country: "Dubai", note: "Expansion in Progress (On Process)" },
];

const heading =
  "mb-5 inline-block bg-brand-yellow px-3 py-1 text-sm font-black uppercase tracking-[0.2em] text-ink shadow-[3px_3px_0_var(--ink)]";

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const PinIcon = ({ className = "" }: { className?: string }) => (
  <svg {...iconProps} className={className}>
    <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const MailIcon = ({ className = "" }: { className?: string }) => (
  <svg {...iconProps} className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const PhoneIcon = ({ className = "" }: { className?: string }) => (
  <svg {...iconProps} className={className}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </svg>
);

const ShieldIcon = ({ className = "" }: { className?: string }) => (
  <svg {...iconProps} className={className}>
    <path d="M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6l-7-3z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="border-t-[6px] border-ink">
      <PopBackground variant="red" blobs={false} className="text-white">
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 py-16 md:px-10 lg:grid-cols-[1.7fr_1fr_1fr_1.1fr]">
          {/* BRAND */}
          <div>
            <Link href="/" className="inline-block" aria-label="The Hot Chick">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-[4px] border-ink bg-white shadow-[6px_6px_0_var(--ink)]">
                <Image
                  src={assets.images.logo}
                  alt="The Hot Chick"
                  fill
                  sizes="96px"
                  className="object-contain p-1"
                />
              </div>
            </Link>

            <p className="mt-6 max-w-md text-base font-semibold leading-relaxed text-white">
              {CONFIG.about}
            </p>

            <ul className="mt-6 space-y-3 text-sm font-semibold text-white">
              <li className="flex items-start gap-3">
                <PinIcon className="mt-0.5 shrink-0 text-brand-yellow" />
                <span>{CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="shrink-0 text-brand-yellow" />
                <a
                  href={`mailto:${CONFIG.email}`}
                  className="transition hover:text-brand-yellow"
                >
                  {CONFIG.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="shrink-0 text-brand-yellow" />
                <a
                  href={`tel:${CONFIG.phone.replace(/\s/g, "")}`}
                  className="font-black tracking-tight transition hover:text-brand-yellow"
                >
                  {CONFIG.phone}
                </a>
              </li>
            </ul>

            <span className="mt-6 inline-flex items-center gap-2 border-[3px] border-ink bg-white px-4 py-2 text-sm font-extrabold uppercase tracking-wider text-ink shadow-[4px_4px_0_var(--ink)]">
              <ShieldIcon className="text-brand-red" />
              Official Franchise Portal
            </span>
          </div>

          {/* LINK COLUMNS */}
          {COLUMNS.map((col, idx) => (
            <div key={col.title}>
              <h3 className={heading}>{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className={`font-semibold transition hover:text-brand-yellow ${
                        "active" in l && l.active
                          ? "font-black text-brand-yellow"
                          : "text-white/90"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Apply CTA under Company & Support */}
              {idx === 1 && (
                <Link
                  href="/apply"
                  className="mt-6 inline-block border-[3px] border-ink bg-brand-yellow px-6 py-3 font-black uppercase tracking-wider text-ink shadow-[5px_5px_0_var(--ink)] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_var(--ink)]"
                >
                  Apply now →
                </Link>
              )}
            </div>
          ))}

          {/* BRAND NETWORK */}
          <div>
            <h3 className={heading}>Brand Network</h3>
            <ul className="space-y-5">
              {NETWORK.map((n) => (
                <li key={n.country}>
                  <div className="flex items-center gap-2 text-lg font-black uppercase tracking-wide text-white">
                    <PinIcon className="shrink-0 text-brand-yellow" />
                    {n.country}
                  </div>
                  <p className="mt-1 max-w-[260px] text-sm font-semibold leading-snug text-white/85">
                    {n.note}
                  </p>
                </li>
              ))}
            </ul>

            <span className="mt-6 inline-block -rotate-2 rounded-full bg-ink px-5 py-1.5 text-xs font-extrabold uppercase tracking-[0.25em] text-brand-yellow">
              Too hot to handle
            </span>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="relative z-10 border-t-[4px] border-ink bg-ink">
          <div className="mx-auto max-w-7xl px-6 py-5 md:px-10">
            <div className="flex flex-col justify-between gap-3 text-xs font-bold uppercase tracking-[0.12em] text-brand-yellow md:flex-row md:items-center">
              <p>
                © {new Date().getFullYear()} The Hot Chick. All rights reserved.
                Head Office: Coimbatore, Tamil Nadu.
              </p>
              <p className="max-w-xl normal-case italic tracking-normal text-white/60 md:text-right">
                {CONFIG.disclaimer}
              </p>
            </div>

            <p className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-white/60">
              <span>Designed by</span>

              <a
                href="https://www.instagram.com/nk_freaky/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-yellow transition hover:opacity-80"
              >
                <Image
                  src={assets.images.instagram}
                  alt="Instagram"
                  width={18}
                  height={18}
                  className="h-[18px] w-[18px] object-contain brightness-0 invert"
                />
                <span>nk_freaky</span>
              </a>
            </p>
          </div>
        </div>
      </PopBackground>
    </footer>
  );
}
