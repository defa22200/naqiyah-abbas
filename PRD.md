# PRD — "The Royal Invitation"
## Naqiyah & Abbas · Wedding Experience v2.0 · Cinematic Scrollytelling Redesign

| | |
|---|---|
| **Project** | `naqiyah-abbas-invitation` (Vite 6 + React 19 + Tailwind 3.4 + Framer Motion 13 + three.js 0.185) |
| **Event** | Nikah 18 Dec 2026 (Hakimi Masjid) · Celebration of Love 19 Dec 2026 12 PM (Dhawan Celebrations, Poolside) · Reception 19 Dec 2026 8 PM (Dhawan Celebrations), Nagpur |
| **North Star** | A digital invitation so beautiful guests remember it a lifetime — motionsites.ai-tier motion craft, phone-first, silky at 60 fps |
| **Asset engine** | **Gemini is the workhorse**: every image, background, calligraphy plate, petal sprite, seal plate and share card is Gemini-generated per §7. Code ships graceful procedural/CSS fallbacks so nothing blocks on a missing file |

---

## 1. Vision

A guest taps the link (usually WhatsApp, on a phone). The screen is deep plum silk. A royal envelope rests center-stage, sealed with a crimson wax medallion bearing the N✦A monogram. They tap the seal — it **cracks**, wax flecks and gold dust burst outward, the flap **hinges open in 3D**, the invitation card **rises out of the envelope** toward them, light floods in, music swells — and the Bismillah assembles out of golden haze. From there, one continuous, butter-smooth scroll carries them through **"A Day, in Light"**: dawn → nikah blush → midday garden → royal midnight → a closing golden blessing. Sections enter via scrubbed reveals, petals react to scroll velocity, and gold wedding rings drift in true 3D behind the content (à la motionsites.ai hero landings such as **Digital Epoch** / **Aetheris Voyage** / **NOVA Space Systems**).

**Feel targets:** cinematic, sacred, weightless, expensive. **Never:** janky, flickery, template-like, cartoonish.

## 2. Client constraints (from `references from client/`, non-negotiable)

1. Full-screen experience from the first tap; music on entry (gesture-safe).
2. Monogram = client's interlocked **N✦A** (no "2026" anywhere), perfectly centered in the seal.
3. Couple names in calligraphy matching the aesthetic (Allura/Alex Brush — already loaded).
4. Flower-petal rainfall effect.
5. Minimal, elegant floral backgrounds in **pastel shades**.
6. No black body text — theme-matched ink plum / espresso tones (already in tokens).
7. **No human figures, cartoons, or template stock imagery** — florals, calligraphy, ornament, texture only. Applies to every Gemini prompt in §7.
8. Venue links for Google & Apple Maps (exists — keep).
9. Phone-first; desktop must still feel designed, not stretched.

## 3. Current-state audit (what we keep / what hurts)

**Keep:** content & IA (all 7 sections + modals), fonts, color tokens, three.js scene, petal/dust canvases, calendar/QR/maps utilities, audio player, fullscreen util.

**Bugs / flaws found in audit (must fix):**

| # | Issue | Location | Fix |
|---|---|---|---|
| B1 | Entry is a static card that fades — no seal crack, no envelope opening, forgettable | `RoyalEnvelopeIntro.jsx` | Full rebuild → §5 Act 0 |
| B2 | Bismillah sits ~24 px from viewport top after opening, colliding with fixed audio controls | `InvocationSection.jsx` (`pt-6 sm:pt-10`); `App.jsx <main>` has no top padding | `pt-20 sm:pt-28` + main top padding; generated calligraphy plate |
| B3 | `duration-1800` is **not a valid Tailwind class** → ambient gradients snap in 150 ms = visible flash | `AmbientLightCanvas.jsx` (5 divs) | Extend `transitionDuration`; use `duration-[1800ms]` |
| B4 | Stage flapping: page order reception→venues→verse→closing maps midnight→**dawn**→midnight→**dawn**; scrolling the last third swaps full-screen images 4× | `App.jsx:47–58` | Monotonic stage arc, §6.2 |
| B5 | `AnimatePresence mode="popLayout"` remounts the wallpaper `<img>` every stage change (re-decode flicker) | `MinimalFloralBackground.jsx` | All layers permanently mounted; opacity crossfade only |
| B6 | Observer flapping: nested `section#events` + `article#nikah…` both observed, 50 % rootMargin band fires out of order | `App.jsx:33–68` | `useScrollStage` hook — scroll-position based, hysteresis |
| B7 | `KeepsakeModal` unreachable — `onOpenKeepsake` never wired (monogram `cursor-pointer`, no `onClick`) | `HeroSection.jsx`, `App.jsx` | Wire monogram tap → keepsake (countdown) |
| B8 | Dead code: `AudioAmbience.jsx`, `utils/audioSynth.js`; dead assets: `na_monogram.png`, `na_monogram_gold.png`, `floral_*`, `sufi_oud_meditative.*`, `wedding_strings.*` | repo | Delete or repurpose (see §9) |
| B9 | No smooth-scroll / no scroll-linked choreography — sections only `whileInView` | global | Lenis + GSAP ScrollTrigger, §6 |
| B10 | Petal canvas (`z-20`) renders **above** text (`z-10`) | `App.jsx` | Keep above (depth) but gate density/opacity near text; sprites per §7 |

## 4. Design system

**Palette (existing tokens, keep):** ivory `#FBF6EF`, rose-dust `#E8C4C0`, terracotta `#C98A73`, sage `#A8B79A`, gold `#C9A66B/#DFC085/#B88B4A`, ink-plum `#3A2C33/#271D22`, warm espresso `#433226`. Add `blessing-warm` (finale) `#F7E9D0`.

**Type:** Allura/Alex Brush (names + calligraphy moments), Cormorant Garamond (display/serif body), Amiri (Arabic), Plus Jakarta Sans (caps/numbers). No new families.

**Motion language (house style):**
- Easings: reveal `cubic-bezier(0.16,1,0.3,1)` (expo-out) · stage `cubic-bezier(0.22,1,0.36,1)` · micro springs `stiffness 120, damping 18`.
- Durations: micro 300–500 ms · reveals 900–1200 ms · stage transitions 1600–2000 ms · entry cinematic ~3.2 s.
- Signature moves: blur-assemble (reuse `blurAssemble`) · **scrubbed** reveals (not one-shot) · 3-speed parallax · scroll-velocity petals · cursor-tracked specular (three.js rig) · one-shot **shimmer sweep** on names (motionsites `animate-shimmer` grammar).
- GPU-only (`transform`/`opacity`) — nothing animates layout.

## 5. The Experience — act by act

### Act 0 — The Opening (`EnvelopeCeremony.jsx`, replaces `RoyalEnvelopeIntro.jsx`)
Cinematic 5-phase state machine: `sealed → cracking → opening → rising → revealing → done`. Framer Motion variants + a tiny gold-burst 2D canvas. One tap (full-screen + gesture-safe audio start, as today):

1. **Sealed:** deep-plum silk backdrop; envelope in CSS 3D (`preserve-3d` body + flap) center stage; wax seal (`seal_wax.png`, Gemini; fallback = current CSS medallion) breathing `gentlePulse`; gold dust; "Tap the seal" — body scroll locked.
2. **Cracking (~600 ms):** seal punch-scale 1→1.12, crack overlay flash, 12–18 wax shards + gold-dust burst (canvas: gravity + fade + rotation), `navigator.vibrate?.(15)`.
3. **Opening (~900 ms):** flap `rotateX(0→-175°)` with backface shading + interior rim-light.
4. **Rising (~1100 ms):** miniature invitation card rises out (translateY + rotateX settle).
5. **Revealing (~800 ms):** card floats toward camera (scale→1.6, blur, opacity→0) as warm-gold light floods in; `<main>` Bismillah blur-assembles; three.js fades 0→1; EnvelopeCeremony unmounts; Lenis engages.
6. **Fallbacks:** reduced-motion → single 600 ms fade; no-JS → instant reveal behind a static seal card.

### Act 1 — Invocation (`InvocationSection.jsx`)
**Fixes B2.** `pt-20 sm:pt-28`; `<main>` gains `pt-6 sm:pt-12` top padding so Bismillah sits clear of the fixed audio controls. Gemini gold Bismillah plate (`bismillah_gold.png`, fallback = Amiri text) blur-assembles in with a soft radial glow; mihrab hairline draws itself via SVG `stroke-dashoffset`. Invocation text unchanged (verbatim).

### Act 2 — Hero (`HeroSection.jsx`)
Names: staged reveal (bride → ampersand → groom) + one-shot **gold shimmer sweep** (CSS masked gradient) after Act 0. Monogram tilt-on-hover (kept) → **`onClick` opens `KeepsakeModal`** (fixes B7). Date block staggered rise. Scroll hint becomes an animated gold line + chevron, both scrubbed (scrolls when visible).

### Acts 3–6 — Lineage, Events, Venues, Verse
**motionsites.scrollytelling:** content unchanged, motion upgraded:
- Each section header reveals via **scrubbed** `clip-path`/stagger (parallax at 1×), not just entry-on-view.
- `EventCard`s: scrubbed 3-speed parallax (±24 px) + hover shimmer + `aspect-[4/3]` aspect-ratio frame (motionsites card discipline).
- `InteractiveTimeline`: progress scrubbed by Lenis scroll.
- `VenueCard`s: kepied maps/QR kept.
- Verse: dark card + gold particles + slow `background-position` drift (motionsites "mesh drift" micro-technique).

### Act 7 — Closing + Keepsake (`ClosingSection.jsx`, `KeepsakeModal.jsx`)
**Final "blessing" stage** — the day-in-light arc resolves into warm gold. Compact inline countdown badge here (surfaces the existing keepsake logic); share button (exists).

## 6. Motion architecture

### 6.1 Stack & data flow
`npm i gsap lenis`. GSAP + ScrollTrigger drive scrubbed choreography; Lenis provides inertial smooth scroll and feeds GSAP (`lenis.on('scroll', ScrollTrigger.update)`; set `gsap.ticker` to sync); Framer Motion for UI/modal variants; three.js for the spatial ring scene. `lenis.scrollTo` replaces all `scrollIntoView`. Entry choreography (Act 0) uses a Framer Motion timeline.

### 6.2 Stage machine — `src/hooks/useScrollStage.js` (fixes B4, B6)
- **Monotonic light arc**: `dawn → blush(nikah) → midday(garden) → midnight(reception+venues) → verse → blessing(closing)`. No midnight→dawn→midnight whipsaw — venues stays midnight (dark continuity), only the final closing resolves to a warm blessing.
- **Scroll-position based** (section `offsetTop` ranges), **hysteresis**: stage flips after the boundary is crossed ±120 px **and** 500 ms dwell → zero boundary flapping.
- Consumed by the background engine, petal tint/speed, three.js light rig, and the scrubbed gradients.

### 6.3 `PhaseBackgroundEngine.jsx` (replaces `MinimalFloralBackground` + `AmbientLightCanvas`; fixes B3, B5)
- All phase wallpapers **permanently mounted** in a stacked `<div>` set; opacity **scrubbed continuously** by ScrollTrigger between neighbouring stages (not discrete swaps) — the motionsites "seamless crossfade" — so there is **never** a 150 ms snap, even at one transition.
- One gold-dust canvas (ported from AmbientLightCanvas); per-stage gradient tint scrubbed the same way.
- Wallpapers preloaded during Act 0 (envelope covers the load).
- `transitionDuration` extended in tailwind config so any CSS transitions used are valid.

### 6.4 `Spatial3DMotionCanvas.jsx` upgrades
- **Lazy-init** after Act 0 (cuts first-paint cost).
- **Stage color-grading**: three.js light tint scrubbed per stage (dawn warm → midnight cool plum → blessing gold) via ScrollTrigger; lights never remount.
- **Petal sprites**: Gemini `petal_01..04` textured on the 36 meshes.
- DPR ≤ 2 cap + `visibilitychange`/tab-scrub pause + reduced-motion → static composition.

### 6.5 `FlowerRainfall.jsx` upgrades (B10)
- Sprite petals (4 Gemini variants, per-stage tint). **Velocity-reactive**: Lenis `velocity` modulates fall speed + lateral sway + a burst on direction change.
- Density auto-gated down over text-heavy sections (opacity ceiling 0.45).
- Reduced-motion → static petals.

### 6.6 Card / text micro-patterns (motionsites grammar)
- `aspect-[4/3]` cards (EventCard/VenueCard) for layout stability.
- `animate-shimmer` hover on interactive cards (motionsites placeholder → hover shimmer).
- `animate-gradient-shift` gold-ivory gradient sweep on Hero names + countdown numbers.
- Neumorphic **inset-glow** buttons for the Open Invitation pill, map links, and scroll hint (`shadow-[inset_…]` token in tailwind).

### 6.7 Layer stack (final)
`-z-30 PhaseBackgroundEngine` → `-z-20 wallpaper tints` → `-z-10 paper/jali textures` → `z-0 three.js` → `z-10 content` → `z-20 petals (gated)` → `z-40 HeaderNav` → `z-50 AudioPlayer/modals` → `z-[60] EnvelopeCeremony`.

## 7. Gemini asset-generation manifest

2× output for retina; JPG (opaque) / PNG (alpha). Drop into `public/images/` and `public/og/`. **Each prompt pins: no people / no figures / no cartoons / no text artifacts / pastel luxury wedding stationery style.** Every asset has a CSS/procedural fallback in code so nothing blocks on a file.

| File | Size | Purpose | Prompt seed (abridged) |
|---|---|---|---|
| `bg_phase_dawn.jpg` | 1440×2560 | dawn (ivory/blush) | ivory-blush watercolor wash, delicate gold-line florals top & bottom edges, large empty center, soft morning light |
| `bg_phase_blush.jpg` *(new)* | 1440×2560 | nikah twilight | rose-dust pastel wash, faint rose sprigs, dreamy dusk |
| `bg_phase_garden.jpg` | 1440×2560 | midday garden | sage/eucalyptus watercolor, sunlit poolside airiness, minimal |
| `bg_phase_midnight.jpg` | 1440×2560 | reception/venues | deep ink-plum night, gold dust, faint starfield, dark floral silhouettes at edges |
| `bg_phase_verse.jpg` *(new)* | 1440×2560 | sacred verse | near-black plum, single soft gold glow center, sacred stillness |
| `bg_phase_blessing.jpg` *(new)* | 1440×2560 | closing finale | warm golden-hour ivory, gentle sun rays, returning light, hopeful |
| `seal_wax.png` | 800×800 ⍺ | envelope wax seal | top-down crimson sealing-wax stamp, embossed interlocked serif "N✦A", irregular wax edge, studio lighting |
| `seal_crack.png` | 800×800 ⍺ | crack overlay | same seal with fine fracture lines, transparent |
| `monogram_na_gold.png` | 1000×1000 ⍺ | hero/kitsch monogram | client's N✦A interlock redrawn in sculpted gold, transparent bg |
| `bismillah_gold.png` | 1600×600 ⍺ | invocation plate | بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ in flowing gold thuluth, transparent (verify letterforms → fallback Amiri text) |
| `petal_01..04.png` | 256×256 ⍺ ×4 | rainfall sprites | rose petals in blush/ivory/gold/sage, soft drop shadow |
| `floral_corner.png` | 1200×1200 ⍺ | corners/decoration | pastel floral spray (roses + eucalyptus), transparent |
| `divider_flourish.png` | 1200×200 ⍺ | dividers | fine gold ornamental divider flourish |
| `venue_masjid.png` / `venue_dhawan.png` | 1200×800 | venue art | elegant gold line-art building on ivory (optional; SVG map cards fallback) |
| `og/og_image.jpg` | 1200×630 | WhatsApp share | monogram + names + dates + floral border on ivory |

## 8. Content source of truth
Verbatim from `references for client/` (already transcribed into `src/utils/calendar.js` and the section components): names, tagline, dates (10–11 Shehre Rajabul Asab 1448 / 18–19 Dec 2026), three events w/ times & venues, invocation text, Surah Ar-Rum 30:21. **No content edits** — this PRD is presentation & motion only.

## 9. Implementation plan (file-by-file)

**Phase 0 — Foundation & bug fixes**
1. `npm i gsap lenis`.
2. `tailwind.config.js`: `transitionDuration:{1600:'1600ms',1800:'1800ms',2000:'2000ms'}`; add `blessing-warm` + `inset-glow`/`shimmer` utilities; remove references to undefined `animate-fade-in`/`animate-spin-slow`/`text-shadow-sm` or define them.
3. New `src/hooks/useScrollStage.js` → rewire `App.jsx`, delete old observer (B4, B6).
4. New `src/components/PhaseBackgroundEngine.jsx` (absorbs dust canvas) → delete `MinimalFloralBackground.jsx` + `AmbientLightCanvas.jsx` (B3, B5).
5. `InvocationSection.jsx`: spacing fix + calligraphy plate (B2).
6. `HeroSection.jsx`: monogram `onClick` (B7).
7. Delete dead code (`AudioAmbience.jsx`, `utils/audioSynth.js`) + unused assets (B8).

**Phase 1 — The Opening (B1)**
8. New `EnvelopeCeremony.jsx` + `GoldBurstCanvas.jsx` (seal-crack burst); rewire `App.jsx` overlay slot to `z-[60]`.

**Phase 2 — Scrollytelling & polish**
9. `src/lib/smoothScroll.js`: Lenis singleton + GSAP bridge.
10. New `Reveal.jsx` (scrubbed blur-assemble/parallax wrapper); apply across Lineage/Events/Closing.
11. `Spatial3DMotionCanvas.jsx`: stage lights + sprites + lazy init.
12. `FlowerRainfall.jsx`: sprites + velocity reactivity + gating (B10).
13. `HeaderNav.jsx` + `HeroSection.jsx`: Lenis-scroll everywhere.

**Phase 3 — Ship**
14. `index.html`: OG/Twitter meta + `og_image.jpg`, preload critical assets, first-paint `theme-color`.
15. Inline countdown in `ClosingSection`; perf pass; save this PRD to repo root as `PRD.md`.
