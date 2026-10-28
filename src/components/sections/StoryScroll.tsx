"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import cone from "@/assets/Images/waffle.png";
import { chapters } from "@/data/story";
import PopBackground from "@/components/ui/PopBackground";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEP = 3;

export default function StoryScroll() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const total = chapters.length * STEP;
      const last = chapters.length - 1;

      gsap.set(".chapter", { autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: `+=${chapters.length * 1400}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      chapters.forEach((_, i) => {
        const t = i * STEP;
        const sel = `.chapter-${i}`;

        tl.to(sel, { autoAlpha: 1, duration: 0.4 }, t).fromTo(
          `${sel} .reveal`,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.8 },
          t,
        );

        if (el.querySelector(`${sel} .photo`)) {
          tl.fromTo(
            `${sel} .photo`,
            { clipPath: "inset(0 100% 0 0)", scale: 1.15 },
            { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1.2 },
            t,
          ).fromTo(
            `${sel} .sticker-wrap`,
            { scale: 0, rotate: -90 },
            { scale: 1, rotate: 0, duration: 0.9, ease: "back.out(2)" },
            t + 0.5,
          );
        }

        if (el.querySelector(`${sel} .bignum`)) {
          tl.fromTo(
            `${sel} .bignum`,
            { xPercent: -15, opacity: 0 },
            { xPercent: 0, opacity: 1, duration: 1 },
            t,
          );
        }

        if (i < last) {
          tl.to(
            sel,
            { autoAlpha: 0, y: -40, duration: 0.5, ease: "power2.in" },
            t + STEP - 0.6,
          );
        }
      });

      el.querySelectorAll<HTMLElement>(".stat").forEach((s) => {
        const o = { v: 0 };
        tl.to(
          o,
          {
            v: Number(s.dataset.value),
            duration: 1.4,
            ease: "power1.out",
            snap: { v: 1 },
            onUpdate: () => {
              s.textContent = String(o.v);
            },
          },
          last * STEP + 0.3,
        );
      });

      tl.fromTo(
        ".track-fill",
        { scaleX: 0 },
        { scaleX: 1, ease: "none", duration: total },
        0,
      );
      tl.fromTo(
        ".cone",
        { left: "0%" },
        { left: "100%", ease: "none", duration: total },
        0,
      );
      tl.to(".cone", { rotate: 360, ease: "none", duration: total }, 0);
    },
    { scope: root },
  );

  return (
    <PopBackground ref={root} variant="yellow" className="h-screen">
      {chapters.map((c, i) => {
        const flip = i % 2 === 1;
        const tall = c.aspect === "tall";

        return (
          <div
            key={i}
            className={`chapter chapter-${i} absolute inset-0 grid items-center gap-10 px-8 pb-28 pt-36 md:grid-cols-2 md:px-20`}
          >
            <span
              className="bignum pointer-events-none absolute top-24 select-none font-black leading-none text-transparent"
              style={{
                fontFamily: "var(--font-bodoni), serif",
                fontSize: "18rem",
                WebkitTextStroke: "3px rgba(26,10,8,0.14)",
                [flip ? "right" : "left"]: "2rem",
              }}
            >
              0{i + 1}
            </span>

            {/* TEXT */}
            <div className={`relative z-10 ${flip ? "md:order-2" : ""}`}>
              <p className="reveal mb-4 inline-block -rotate-2 rounded-full bg-ink px-5 py-1.5 text-xs font-extrabold uppercase tracking-[0.25em] text-brand-yellow">
                {c.tag}
              </p>

              <h2 className="reveal text-4xl font-black uppercase leading-[1.02] text-ink md:text-6xl">
                {c.title}
              </h2>

              <svg
                className="reveal my-5 w-40 text-brand-red"
                viewBox="0 0 160 12"
                fill="none"
              >
                <path
                  d="M2 6 Q 22 -2 42 6 T 82 6 T 122 6 T 158 6"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>

              <p className="reveal max-w-md text-lg font-semibold text-ink/80">
                {c.text}
              </p>

              {c.stats && (
                <div className="reveal mt-10 flex flex-wrap gap-5">
                  {c.stats.map((s, k) => (
                    <div
                      key={s.label}
                      className={`border-[3px] border-ink bg-white px-5 py-3 shadow-[6px_6px_0_var(--ink)] ${
                        k % 2 ? "rotate-2" : "-rotate-2"
                      }`}
                    >
                      <p className="text-4xl font-black text-brand-red md:text-5xl">
                        <span className="stat" data-value={s.value}>
                          0
                        </span>
                        {s.suffix}
                      </p>
                      <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.2em] text-ink/70">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* PHOTO */}
            {c.image && (
              <div
                className={`relative z-10 mx-auto w-full ${
                  tall ? "max-w-md" : "max-w-2xl"
                } ${flip ? "md:order-1 rotate-2" : "-rotate-2"}`}
              >
                <div
                  className={`photo relative overflow-hidden border-[5px] border-ink bg-white shadow-[14px_14px_0_var(--brand-red)] ${
                    tall ? "aspect-[4/5]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes={
                      tall
                        ? "(min-width:768px) 28rem, 90vw"
                        : "(min-width:768px) 42rem, 90vw"
                    }
                    className={`object-cover ${
                      tall ? "object-center" : "object-top"
                    }`}
                  />
                </div>

                <div
                  className={`sticker-wrap absolute -top-6 ${
                    flip ? "-left-6" : "-right-6"
                  }`}
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-ink bg-brand-red text-2xl font-black text-brand-yellow shadow-[4px_4px_0_var(--ink)] md:h-24 md:w-24 md:text-3xl">
                    0{i + 1}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* PROGRESS TRACK */}
      <div className="absolute inset-x-8 bottom-10 md:inset-x-20">
        <div className="relative h-3 border-[3px] border-ink bg-white">
          <div className="track-fill h-full origin-left bg-brand-red" />

          {chapters.map((_, i) => (
            <span
              key={i}
              className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-ink bg-brand-yellow"
              style={{
                left: `${(i / Math.max(chapters.length - 1, 1)) * 100}%`,
              }}
            />
          ))}

          <div className="cone absolute top-1/2 w-12 -translate-x-1/2 -translate-y-1/2 md:w-14">
            <Image
              src={cone}
              alt=""
              sizes="56px"
              className="h-auto w-full drop-shadow-[0_4px_0_rgba(26,10,8,0.6)]"
            />
          </div>
        </div>
      </div>
    </PopBackground>
  );
}
