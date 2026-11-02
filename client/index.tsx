import { Link, Route, Router, Routes, useLocation } from "lakebed/client";
import { useEffect } from "preact/hooks";
import { SOURCES, SPECIAL_CLASS, type Unit } from "../shared/cars";
import { CatalogPage } from "./catalog";
import { DetailPage } from "./detail";
import { DuelPage } from "./duel";
import { GaragePage } from "./garage";
import { HomePage } from "./home";
import { StoreProvider, useStore } from "./store";
import { TITLE } from "./ui";

const ANIMATIONS = `
@keyframes rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@keyframes fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes drift { from { transform: scale(1); } to { transform: scale(1.06); } }
@keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.hero-photo { -webkit-mask-image: linear-gradient(to top, transparent, black 25%); mask-image: linear-gradient(to top, transparent, black 25%); }
@media (min-width: 1024px) {
  .hero-photo {
    -webkit-mask-image: linear-gradient(to right, transparent, black 35%), linear-gradient(to top, transparent, black 25%);
    -webkit-mask-composite: source-in;
    mask-image: linear-gradient(to right, transparent, black 35%), linear-gradient(to top, transparent, black 25%);
    mask-composite: intersect;
  }
}
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
`;

const NAV = [
  { to: "/", label: "Inicio", match: (path: string) => path === "/" },
  { to: "/autos", label: "Catálogo", match: (path: string) => path.startsWith("/autos") && !path.endsWith(SPECIAL_CLASS) },
  { to: "/autos/" + SPECIAL_CLASS, label: "Especiales", match: (path: string) => path.endsWith(SPECIAL_CLASS), special: true },
  { to: "/duelo", label: "Duelo", match: (path: string) => path.startsWith("/duelo") },
  { to: "/garage", label: "Garage", match: (path: string) => path.startsWith("/garage") }
];

function UnitToggle() {
  const { unit, setUnit } = useStore();

  return (
    <div className="flex overflow-hidden rounded-sm border border-white/20" role="group" aria-label="Unidad de velocidad">
      {(["kmh", "mph"] as Unit[]).map((option) => (
        <button aria-pressed={unit === option} className={"px-2.5 py-1 text-xs font-semibold " + (unit === option ? "bg-white text-black" : "text-neutral-300")} key={option} onClick={() => setUnit(option)} type="button">
          {option === "kmh" ? "km/h" : "mph"}
        </button>
      ))}
    </div>
  );
}

function Shell() {
  const { pathname } = useLocation();
  const { favorites } = useStore();

  useEffect(() => window.scrollTo(0, 0), [pathname]);

  const itemClass = (item: (typeof NAV)[number]) => {
    const active = item.match(pathname);
    if (item.special) {
      return active ? "text-cyan-300" : "text-cyan-300/70 hover:text-cyan-300";
    }
    return active ? "text-orange-400" : "text-neutral-300 hover:text-white";
  };

  return (
    <main className="min-h-screen bg-[#0b0a10] pb-16 text-white md:pb-0">
      <style>{ANIMATIONS}</style>

      <nav aria-label="Principal" className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0a10]/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5">
          <Link className={"text-lg " + TITLE} to="/">Los Santos <span className="text-orange-400">Speed</span></Link>
          <div className="flex items-center gap-5">
            <div className="hidden items-center gap-5 text-sm font-semibold md:flex">
              {NAV.map((item) => (
                <Link aria-current={item.match(pathname) ? "page" : undefined} className={itemClass(item)} key={item.to} to={item.to}>
                  {item.label}{item.to === "/garage" && favorites.length > 0 ? " (" + favorites.length + ")" : ""}
                </Link>
              ))}
            </div>
            <UnitToggle />
          </div>
        </div>
      </nav>

      <div key={pathname.split("/")[1]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/autos" element={<CatalogPage />} />
          <Route path="/autos/:category" element={<CatalogPage />} />
          <Route path="/auto/:id" element={<DetailPage />} />
          <Route path="/duelo" element={<DuelPage />} />
          <Route path="/garage" element={<GaragePage />} />
          <Route
            path="*"
            element={
              <div className="mx-auto max-w-7xl px-5 py-20">
                <h1 className={"text-4xl " + TITLE}>Esta página no existe</h1>
                <Link className="mt-4 inline-block underline" to="/">Volver al inicio</Link>
              </div>
            }
          />
        </Routes>
      </div>

      <footer className="border-t border-white/10 text-sm text-neutral-400">
        <div className="mx-auto max-w-7xl px-5 py-10">
          <h2 className="mb-3 text-lg font-bold text-white">Sobre los datos</h2>
          <p className="max-w-2xl">Los tiempos son del circuito de prueba de Broughy1322. Las fuentes no separan resultados de Xbox One, así que uso las cifras estándar sin HSW. Los precios pueden variar con descuentos. GTA es de Rockstar Games; esta página no tiene relación con ellos.</p>
          <ul className="mt-4 space-y-1">
            {SOURCES.map((source) => (
              <li key={source.url}><a className="underline hover:text-white" href={source.url} rel="noreferrer" target="_blank">{source.label}</a></li>
            ))}
          </ul>
        </div>
      </footer>

      <nav aria-label="Principal móvil" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-white/10 bg-[#0b0a10]/95 backdrop-blur md:hidden">
        {NAV.map((item) => (
          <Link aria-current={item.match(pathname) ? "page" : undefined} className={"py-3.5 text-center text-xs font-semibold " + itemClass(item)} key={item.to} to={item.to}>{item.label}</Link>
        ))}
      </nav>
    </main>
  );
}

export function App() {
  return (
    <Router>
      <StoreProvider>
        <Shell />
      </StoreProvider>
    </Router>
  );
}
