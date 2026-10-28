"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import StorefrontIcon from "@mui/icons-material/Storefront";

const PHONE = "+919894742567";
const WA = "919894742567"; // no + sign for wa.me

const actions = [
  {
    label: "Call Franchise Desk",
    href: `tel:${PHONE}`,
    icon: PhoneIcon,
    cls: "bg-white text-ink",
  },
  {
    label: "Become a Partner",
    href: "/contact#franchise",
    icon: StorefrontIcon,
    cls: "bg-brand-yellow text-ink",
  },
  {
    label: "WhatsApp Us",
    href: `https://wa.me/${WA}?text=Hi%20The%20Hot%20Chick%2C%20I%27m%20interested%20in%20a%20franchise`,
    icon: WhatsAppIcon,
    cls: "bg-[#3fa35c] text-white",
  },
];

const popBtn =
  "border-[3px] border-ink shadow-[4px_4px_0_var(--ink)] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--ink)]";

export default function StickyCTA() {
  const [fabOpen, setFabOpen] = useState(false);
  const [barVisible, setBarVisible] = useState(false);
  const [barDismissed, setBarDismissed] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  // show the bar after the visitor scrolls a bit
  useEffect(() => {
    try {
      if (sessionStorage.getItem("bar-dismissed")) setBarDismissed(true);
    } catch {}
    const onScroll = () => setBarVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showBar = barVisible && !barDismissed;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* ---------- Floating quick actions ---------- */}
      <div
        className={`fixed right-4 z-[60] flex flex-col items-end gap-3 transition-all md:right-6 ${
          showBar ? "bottom-4 md:bottom-28" : "bottom-4 md:bottom-6"
        }`}
      >
        <AnimatePresence>
          {fabOpen &&
            actions.map((a, i) => (
              <motion.a
                key={a.label}
                href={a.href}
                target={a.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ delay: (actions.length - 1 - i) * 0.05 }}
                className={`flex items-center gap-3 rounded-full px-6 py-3 text-sm font-black uppercase tracking-wider ${popBtn} ${a.cls}`}
              >
                <a.icon fontSize="small" />
                {a.label}
              </motion.a>
            ))}
        </AnimatePresence>

        <button
          aria-label={fabOpen ? "Close quick actions" : "Open quick actions"}
          onClick={() => setFabOpen((v) => !v)}
          className={`grid h-14 w-14 place-items-center rounded-full bg-brand-yellow text-ink ${popBtn}`}
        >
          {fabOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* ---------- Sticky enquiry bar (desktop) ---------- */}
      <AnimatePresence>
        {showBar && (
          <motion.div
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            exit={{ y: 120 }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed inset-x-0 bottom-0 z-50 hidden border-t-[4px] border-ink bg-brand-red md:block"
          >
            <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
              <div className="shrink-0">
                <p className="text-xl font-black uppercase leading-tight text-white [text-shadow:2px_2px_0_var(--ink)]">
                  Own a <span className="text-brand-yellow">Hot Chick</span>{" "}
                  franchise
                </p>
                <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.15em] text-white/90">
                  From ₹3.75L* · 0% royalty · 60+ outlets
                </p>
              </div>

              {status === "done" ? (
                <p className="flex-1 text-center font-black uppercase tracking-wide text-brand-yellow [text-shadow:2px_2px_0_var(--ink)]">
                  Thank you! Our team will call you shortly.
                </p>
              ) : (
                <form
                  onSubmit={submit}
                  className="flex flex-1 items-center gap-3"
                >
                  <input
                    name="name"
                    required
                    placeholder="Your Name"
                    className="field border-[3px] border-ink font-semibold"
                  />
                  <input
                    name="phone"
                    required
                    type="tel"
                    pattern="[0-9+\s]{10,14}"
                    placeholder="Phone Number"
                    className="field border-[3px] border-ink font-semibold"
                  />
                  <input
                    name="city"
                    required
                    placeholder="Your City"
                    className="field border-[3px] border-ink font-semibold"
                  />
                  <button
                    disabled={status === "sending"}
                    className={`shrink-0 bg-brand-yellow px-7 py-3 text-sm font-black uppercase tracking-wider text-ink disabled:opacity-60 ${popBtn}`}
                  >
                    {status === "sending"
                      ? "Sending…"
                      : "Get Franchise Details →"}
                  </button>
                </form>
              )}
              {status === "error" && (
                <span className="rounded-full bg-ink px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-brand-yellow">
                  Try again
                </span>
              )}

              <button
                aria-label="Dismiss"
                onClick={() => {
                  setBarDismissed(true);
                  try {
                    sessionStorage.setItem("bar-dismissed", "1");
                  } catch {}
                }}
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-ink ${popBtn}`}
              >
                <CloseIcon fontSize="small" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
