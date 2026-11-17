import { useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 border-b border-forest/10 bg-ivory/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <Link to="/" className="font-display text-lg font-semibold text-forest">Montessori Dynamic</Link>
          <nav className="flex gap-4 text-sm">
            <NavLink to="/" end className={({ isActive }) => isActive ? "font-semibold text-forest" : "text-ink/70"}>Home</NavLink>
            <NavLink to="/tour" className={({ isActive }) => isActive ? "font-semibold text-forest" : "text-ink/70"}>Tour</NavLink>
            <NavLink to="/proposal" className={({ isActive }) => isActive ? "font-semibold text-forest" : "text-ink/70"}>Proposal</NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto flex-1 w-full max-w-5xl px-5 py-12">{children}</main>
      <footer className="border-t border-forest/10 py-6 text-center text-sm text-ink/50">Dynamic prototype · React Router + interactive flows</footer>
    </div>
  );
}

function Home() {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-widest text-sage">Dynamic prototype</p>
      <h1 className="mt-3 font-display text-4xl text-forest">Interactive tours, booking & proposals</h1>
      <p className="mt-4 max-w-xl text-lg text-ink/75">This build demonstrates client-side routing, a live tour booking flow, and a simple proposal summary — the dynamic layer on top of the school site.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/tour" className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-ivory">Start virtual tour</Link>
        <Link to="/proposal" className="rounded-full border border-forest/25 px-6 py-3 text-sm font-semibold text-forest">View proposal</Link>
      </div>
    </div>
  );
}

function Tour() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);
  const rooms = ["Entrance & cloakroom", "Practical life", "Sensorial & language", "Outdoor garden"];
  if (done) {
    return (
      <div className="rounded-2xl border border-forest/10 bg-white p-8 shadow-sm">
        <h1 className="font-display text-2xl text-forest">Tour confirmed</h1>
        <p className="mt-3 text-ink/70">Thanks{name ? `, ${name}` : ""}. We’ll email a calendar invite and campus map shortly.</p>
        <Link to="/" className="mt-6 inline-block text-sm font-semibold text-terra">← Back home</Link>
      </div>
    );
  }
  return (
    <div>
      <h1 className="font-display text-3xl text-forest">Virtual tour</h1>
      <p className="mt-2 text-ink/70">Step {step + 1} of {rooms.length + 1}</p>
      {step < rooms.length ? (
        <div className="mt-8 rounded-2xl border border-forest/10 bg-white p-8">
          <h2 className="font-display text-xl text-forest">{rooms[step]}</h2>
          <p className="mt-3 text-sm text-ink/70">Explore this area of the prepared environment. Guides observe; children choose meaningful work.</p>
          <button type="button" onClick={() => setStep(step + 1)} className="mt-6 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-ivory">Next →</button>
        </div>
      ) : (
        <form className="mt-8 max-w-md space-y-3 rounded-2xl border border-forest/10 bg-white p-8" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
          <h2 className="font-display text-xl text-forest">Book an in-person visit</h2>
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full rounded-xl border border-forest/15 px-4 py-2.5 text-sm" />
          <input required type="email" placeholder="Email" className="w-full rounded-xl border border-forest/15 px-4 py-2.5 text-sm" />
          <button type="submit" className="w-full rounded-full bg-terra py-3 text-sm font-semibold text-white">Confirm tour request</button>
        </form>
      )}
    </div>
  );
}

function Proposal() {
  const items = [
    { label: "Toddler community", fee: "$12,400 / year" },
    { label: "Primary", fee: "$14,200 / year" },
    { label: "Elementary", fee: "$15,800 / year" },
  ];
  return (
    <div>
      <h1 className="font-display text-3xl text-forest">Family proposal</h1>
      <p className="mt-2 text-ink/70">Indicative fees and next steps — shared after your tour.</p>
      <ul className="mt-8 space-y-3">
        {items.map((it) => (
          <li key={it.label} className="flex items-center justify-between rounded-xl border border-forest/10 bg-white px-5 py-4">
            <span className="font-medium text-forest">{it.label}</span>
            <span className="text-sm text-ink/70">{it.fee}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-ink/60">A full PDF proposal can be generated after the tour confirmation step in the full prototype.</p>
      <Link to="/tour" className="mt-6 inline-block rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-ivory">Book a tour first</Link>
    </div>
  );
}

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="/proposal" element={<Proposal />} />
      </Routes>
    </Shell>
  );
}
