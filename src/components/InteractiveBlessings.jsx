import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Send, Check } from 'lucide-react';

const DEFAULT_BLESSINGS = [
  {
    name: "Dr. Shabbir Hassan & Family",
    dua: "May Allah Ta'ala shower His immense rahmat, barakat and happiness upon Naqiyah & Abbas on their sacred union. Mubarak!",
    time: "Nagpur"
  },
  {
    name: "Aziz Shamim & Zainab",
    dua: "Wishing our dearest Naqiyah and Abbas a lifetime filled with tranquility, understanding, and eternal joy.",
    time: "Mumbai"
  },
  {
    name: "Sarrah",
    dua: "Heartiest congratulations! Can't wait to celebrate every moment of this blessed weekend together.",
    time: "Nagpur"
  }
];

export default function InteractiveBlessings({ onToast }) {
  const [blessingsCount, setBlessingsCount] = useState(486);
  const [hasBlessed, setHasBlessed] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestDua, setGuestDua] = useState('');
  const [blessingsList, setBlessingsList] = useState(DEFAULT_BLESSINGS);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('naqiyah_abbas_blessings');
    if (saved) {
      try {
        setBlessingsList([...JSON.parse(saved), ...DEFAULT_BLESSINGS]);
      } catch (e) {}
    }
    const count = localStorage.getItem('naqiyah_abbas_blessing_count');
    if (count) setBlessingsCount(parseInt(count, 10));
  }, []);

  const handleQuickBless = () => {
    if (hasBlessed) return;
    const newCount = blessingsCount + 1;
    setBlessingsCount(newCount);
    setHasBlessed(true);
    localStorage.setItem('naqiyah_abbas_blessing_count', newCount.toString());
    if (onToast) onToast('Thank you for your warm dua & blessings! ✦');
  };

  const handleSubmitDua = (e) => {
    e.preventDefault();
    if (!guestName.trim() || !guestDua.trim()) return;

    const newEntry = {
      name: guestName.trim(),
      dua: guestDua.trim(),
      time: "Just now"
    };

    const updated = [newEntry, ...blessingsList];
    setBlessingsList(updated);
    localStorage.setItem('naqiyah_abbas_blessings', JSON.stringify([newEntry]));
    setSubmitted(true);
    setGuestName('');
    setGuestDua('');
    if (onToast) onToast('Your blessing has been lovingly recorded!');
    setTimeout(() => {
      setSubmitted(false);
      setIsFormOpen(false);
    }, 2000);
  };

  return (
    <section 
      id="blessings" 
      className="py-14 px-4 sm:px-6 max-w-xl mx-auto text-center"
      aria-label="Guest Blessings and Duas"
    >
      <div className="p-7 sm:p-9 rounded-3xl bg-ivory-soft/90 border border-gold-hairline/40 shadow-soft-float space-y-6">
        
        {/* Title */}
        <div>
          <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-terracotta-dark font-semibold block mb-1">
            Warm Wishes
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-ink-plum">
            Shower Your Blessings
          </h3>
          <p className="font-sans text-xs text-ink-plum/70 mt-1 max-w-sm mx-auto">
            Join families and friends in sending warm prayers and congratulations to the couple.
          </p>
        </div>

        {/* Counter & Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleQuickBless}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer ${
              hasBlessed
                ? 'bg-emerald-700 text-white shadow-emerald-700/20'
                : 'bg-ink-plum text-gold-bright hover:bg-ink-light'
            }`}
          >
            <Heart className={`w-4 h-4 ${hasBlessed ? 'fill-current text-white' : 'text-gold-bright'}`} />
            <span>{hasBlessed ? 'Blessing Sent' : 'Send a Blessing'}</span>
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-[11px] font-mono">
              {blessingsCount}
            </span>
          </button>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="px-5 py-3 rounded-full border border-gold-hairline/50 text-ink-plum text-xs font-medium hover:bg-gold-hairline/10 active:scale-95 transition-all cursor-pointer"
          >
            {isFormOpen ? 'Close Guestbook' : 'Write a Personal Dua'}
          </button>
        </div>

        {/* Form to submit personal dua */}
        {isFormOpen && (
          <form onSubmit={handleSubmitDua} className="pt-4 border-t border-gold-hairline/20 text-left space-y-3 animate-fade-in">
            <div>
              <label className="text-[11px] font-sans font-medium text-ink-plum block mb-1">
                Your Name / Family Name
              </label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Dr. Farheen & Shabbir"
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-gold-hairline/40 text-xs text-ink-plum focus:outline-none focus:ring-2 focus:ring-gold-hairline/50"
              />
            </div>

            <div>
              <label className="text-[11px] font-sans font-medium text-ink-plum block mb-1">
                Your Message / Dua for Naqiyah &amp; Abbas
              </label>
              <textarea
                required
                rows="3"
                value={guestDua}
                onChange={(e) => setGuestDua(e.target.value)}
                placeholder="May Allah Ta'ala bless your union with eternal happiness..."
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-gold-hairline/40 text-xs text-ink-plum focus:outline-none focus:ring-2 focus:ring-gold-hairline/50 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-ink-plum text-gold-bright text-xs font-medium tracking-wide shadow hover:bg-ink-light active:scale-95 transition-all cursor-pointer"
            >
              {submitted ? <Check className="w-4 h-4 text-emerald-400" /> : <Send className="w-4 h-4 text-gold-hairline" />}
              <span>{submitted ? 'Recorded with Love!' : 'Post Your Dua to the Card'}</span>
            </button>
          </form>
        )}

        {/* Recent Wishes Carousel / List */}
        <div className="pt-4 border-t border-gold-hairline/20 text-left space-y-3">
          <p className="text-[10px] font-sans tracking-widest uppercase text-terracotta-dark font-medium text-center">
            ✦ Words of Love from Family &amp; Friends ✦
          </p>

          <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
            {blessingsList.slice(0, 4).map((b, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-white/60 border border-gold-hairline/20 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-serif font-semibold text-ink-plum">
                    {b.name}
                  </span>
                  <span className="text-[10px] text-ink-plum/50 font-sans">
                    {b.time}
                  </span>
                </div>
                <p className="font-serif italic text-ink-plum/80 text-[13px] leading-relaxed">
                  &ldquo;{b.dua}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
