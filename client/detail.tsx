import { Link, navigate, useParams } from "lakebed/client";
import { useEffect } from "preact/hooks";
import { CARS, className, findCar, formatPrice, upgradesFor } from "../shared/cars";
import { useStore } from "./store";
import { accentText, CarImage, FavoriteButton, Gauge, NewCarNote, SpeedBreakdown, Tags, TITLE } from "./ui";

export function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const { unit, upgrades, toggleUpgrade } = useStore();
  const car = findCar(id);

  const index = CARS.findIndex((item) => item.id === id);
  const previous = CARS[(index - 1 + CARS.length) % CARS.length];
  const next = CARS[(index + 1) % CARS.length];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "SELECT") return;
      if (event.key === "ArrowRight") navigate("/auto/" + next.id);
      if (event.key === "ArrowLeft") navigate("/auto/" + previous.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [id]);

  if (!car) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-20">
        <h1 className={"text-4xl " + TITLE}>Ese auto no está aquí</h1>
        <Link className="mt-4 inline-block underline" to="/autos">Volver al catálogo</Link>
      </div>
    );
  }

  const list = upgradesFor(car);
  const done = list.filter((upgrade) => upgrades.includes(car.id + ":" + upgrade.id)).length;
  const accentBox = car.special ? "border-cyan-300/40 bg-cyan-300/10" : "border-orange-400/40 bg-orange-400/10";
  const accentFill = car.special ? "bg-cyan-300" : "bg-orange-400";
  const arrow = "flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-xl backdrop-blur transition-colors duration-150 hover:bg-white hover:text-black";

  return (
    <div key={car.id} style={{ animation: "fade 250ms ease-out" }}>
      <div className="relative isolate overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-10 scale-110 opacity-30 blur-2xl"><CarImage car={car} /></div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0b0a10] to-transparent" />
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 lg:grid-cols-[3fr_2fr] lg:items-end">
          <div className="relative aspect-video overflow-hidden rounded-lg border border-white/10 shadow-2xl">
            <CarImage car={car} />
            <Link aria-label={"Anterior: " + previous.name} className={"absolute left-3 top-1/2 -translate-y-1/2 " + arrow} to={"/auto/" + previous.id}>←</Link>
            <Link aria-label={"Siguiente: " + next.name} className={"absolute right-3 top-1/2 -translate-y-1/2 " + arrow} to={"/auto/" + next.id}>→</Link>
            <FavoriteButton car={car} className="absolute right-3 top-3" />
          </div>
          <div>
            <Link className={"text-sm font-semibold uppercase tracking-wide hover:underline " + accentText(car)} to={"/autos/" + car.classId}>← {className(car.classId)}</Link>
            <h1 className={"mt-2 text-4xl leading-none sm:text-5xl " + TITLE}>{car.name}</h1>
            <p className={"mt-3 font-semibold " + accentText(car)}>{car.role}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Tags car={car} />
              {car.added2026 ? <NewCarNote /> : null}
              {car.special ? <span className="rounded-sm border border-rose-400/50 bg-rose-400/10 px-1.5 py-0.5 text-xs text-rose-200">No apto para carreras estándar</span> : null}
            </div>
            <div className="mt-5 flex flex-wrap items-end gap-8">
              <Gauge car={car} unit={unit} />
              <dl className="grid grid-cols-2 gap-6">
                <div><dt className="text-xs text-neutral-400">Vuelta de prueba</dt><dd className="font-mono text-xl">{car.lap}</dd></div>
                <div><dt className="text-xs text-neutral-400">Precio</dt><dd className="font-mono text-xl">{formatPrice(car.price)}</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-2">
        <div>
          <div className={"rounded-lg border p-5 " + accentBox}>
            <p className={"text-xs font-semibold uppercase tracking-wide " + accentText(car)}>Mejora clave</p>
            <p className={"mt-1 text-3xl leading-tight " + TITLE}>{car.upgrade}</p>
            <p className="mt-2 text-neutral-300">{car.why}</p>
            {car.workshop ? <p className="mt-3 text-sm text-neutral-300"><span className="text-neutral-400">Dónde se mejora:</span> {car.workshop}</p> : null}
          </div>
          <Link className="mt-4 inline-block rounded-sm border border-white/30 px-5 py-2.5 font-black italic uppercase transition-colors duration-150 hover:border-white" to={"/duelo?a=" + car.id}>Llevar al duelo</Link>
          <div className="mt-6"><SpeedBreakdown car={car} /></div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h2 className={"text-2xl " + TITLE}>Mi preparación</h2>
            <span className={"font-mono " + accentText(car)}>{done}/{list.length}</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
            <div className={"h-full rounded-full transition-all duration-300 " + accentFill} style={{ width: (done / list.length) * 100 + "%" }} />
          </div>
          <ul className="mt-3 divide-y divide-white/10">
            {list.map((upgrade) => (
              <li key={upgrade.id}>
                <label className="flex cursor-pointer items-center gap-3 px-1 py-2.5 hover:bg-white/5">
                  <input checked={upgrades.includes(car.id + ":" + upgrade.id)} className={"h-4 w-4 " + (car.special ? "accent-cyan-300" : "accent-orange-400")} onChange={() => toggleUpgrade(car.id + ":" + upgrade.id)} type="checkbox" />
                  {upgrade.name}
                </label>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-neutral-500">Se guarda en este navegador. Las cifras de arriba son con el vehículo al máximo.</p>
        </div>
      </div>
    </div>
  );
}
