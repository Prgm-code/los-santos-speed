import { Link } from "lakebed/client";
import { className, engineGain, formatPrice, formatSpeed, MAX_MPH, performanceOf, upgradesFor, type Car, type Unit } from "../shared/cars";
import { IMAGES } from "./images";
import { useStore } from "./store";

export const TITLE = "font-black italic uppercase tracking-tight";

export function accentText(car: Car): string {
  return car.special ? "text-cyan-300" : "text-orange-400";
}

export function CarImage({ car }: { car: Car }) {
  return <img alt={car.name} className="h-full w-full object-cover" src={IMAGES[car.id]} />;
}

export function Gauge({ car, unit }: { car: Car; unit: Unit }) {
  const fraction = Math.min(car.topMph / 180, 1);
  const [value, unitLabel] = formatSpeed(car.topMph, unit).split(" ");

  return (
    <div className="relative h-24 w-44 shrink-0">
      <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 120 66">
        <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" pathLength="100" stroke="#ffffff1f" stroke-linecap="round" stroke-width="8" />
        <path
          d="M 10 60 A 50 50 0 0 1 110 60"
          fill="none"
          pathLength="100"
          stroke={car.special ? "#67e8f9" : "#fb923c"}
          stroke-dasharray={fraction * 100 + " 100"}
          stroke-linecap="round"
          stroke-width="8"
          style={{ transition: "stroke-dasharray 700ms cubic-bezier(0.2, 0.8, 0.2, 1), stroke 300ms" }}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center leading-none">
        <span className="text-4xl font-black italic tabular-nums">{value}</span>
        <span className="ml-1 text-xs text-neutral-400">{unitLabel}</span>
      </div>
    </div>
  );
}

export function Tags({ car }: { car: Car }) {
  if (!car.tags) {
    return null;
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {car.tags.map((tag) => (
        <span className="rounded-sm border border-cyan-300/40 bg-cyan-300/10 px-1.5 py-0.5 text-xs font-medium text-cyan-200" key={tag}>{tag}</span>
      ))}
    </div>
  );
}

export function NewCarNote() {
  return <span className="rounded-sm border border-amber-400/50 bg-amber-400/10 px-1.5 py-0.5 text-xs text-amber-200">Julio de 2026: revisa si te aparece</span>;
}

export function FavoriteButton({ car, className: extra = "" }: { car: Car; className?: string }) {
  const { favorites, toggleFavorite } = useStore();
  const favorite = favorites.includes(car.id);

  return (
    <button
      aria-label={(favorite ? "Quitar de mi garage: " : "Agregar a mi garage: ") + car.name}
      aria-pressed={favorite}
      className={"flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-lg backdrop-blur transition-transform duration-150 hover:scale-125 " + (favorite ? "text-rose-500 " : "text-white ") + extra}
      onClick={() => toggleFavorite(car.id)}
      type="button"
    >
      {favorite ? "♥" : "♡"}
    </button>
  );
}

export function CarCard({ car }: { car: Car }) {
  const { unit, upgrades } = useStore();
  const list = upgradesFor(car);
  const done = list.filter((upgrade) => upgrades.includes(car.id + ":" + upgrade.id)).length;

  return (
    <article className={"group relative flex flex-col overflow-hidden rounded-lg border bg-white/[0.03] transition duration-300 hover:-translate-y-1 " + (car.special ? "border-cyan-300/20 hover:border-cyan-300/70" : "border-white/10 hover:border-orange-400/70")} style={{ animation: "rise 350ms ease-out" }}>
      <Link className="flex flex-1 flex-col" to={"/auto/" + car.id}>
        <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
          <div className="h-full w-full transition-transform duration-700 group-hover:scale-110">
            <CarImage car={car} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a10] via-transparent to-transparent" />
          <span className="absolute left-2.5 top-2.5 rounded-sm bg-black/70 px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-neutral-200">{className(car.classId)}</span>
          <span className={"absolute bottom-1 right-3 text-2xl font-black italic tabular-nums " + accentText(car)}>{formatSpeed(car.topMph, unit)}</span>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-3.5">
          <p className={"text-xs font-semibold uppercase tracking-wide " + accentText(car)}>{car.role}</p>
          <h3 className={"text-lg leading-tight " + TITLE}>{car.name}</h3>
          <Tags car={car} />
          <p className="text-xs text-neutral-400">Valor base {formatSpeed(performanceOf(car).gameMph, unit)} → <span className="font-semibold text-white">{formatSpeed(car.topMph, unit)} probado</span></p>
          <div className="mt-auto flex items-center justify-between gap-2 border-t border-white/10 pt-2.5 font-mono text-xs text-neutral-400">
            <span>{car.lap}</span>
            <span>{formatPrice(car.price)}</span>
          </div>
          {car.added2026 ? <div><NewCarNote /></div> : null}
          {done > 0 ? (
            <div className="h-1 overflow-hidden rounded-full bg-white/10">
              <div className={"h-full " + (car.special ? "bg-cyan-300" : "bg-orange-400")} style={{ width: (done / list.length) * 100 + "%" }} />
            </div>
          ) : null}
        </div>
      </Link>
      <FavoriteButton car={car} className="absolute right-2.5 top-2.5" />
    </article>
  );
}

export function SpeedBar({ car }: { car: Car }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
      <div className={"h-full rounded-full " + (car.special ? "bg-cyan-300" : "bg-gradient-to-r from-orange-400 to-rose-500")} style={{ width: (car.topMph / MAX_MPH) * 100 + "%" }} />
    </div>
  );
}

function SpeedRow({ label, mph, unit, fill, extra }: { label: string; mph: number; unit: Unit; fill: string; extra?: string }) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 text-sm">
        <span className="text-neutral-300">{label}</span>
        <span className="font-mono font-bold">{formatSpeed(mph, unit)}{extra ? <span className="ml-2 font-normal text-neutral-400">{extra}</span> : null}</span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
        <div className={"h-full rounded-full " + fill} style={{ width: (mph / 180) * 100 + "%" }} />
      </div>
    </div>
  );
}

function speedDifference(faster: number, slower: number, unit: Unit): string {
  return "+" + (unit === "kmh" ? Math.round(faster * 1.609344) - Math.round(slower * 1.609344) + " km/h" : faster - slower + " mph");
}

export function SpeedBreakdown({ car }: { car: Car }) {
  const { unit } = useStore();
  const performance = performanceOf(car);
  const { gameMph, engineStock, engineMax, hswMph } = performance;

  return (
    <section aria-label="Valor base contra modificado" className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
      <h2 className={"text-2xl " + TITLE}>Valor base contra modificado</h2>
      <div className="mt-4 space-y-3">
        <SpeedRow fill="bg-neutral-500" label="Valor base en los archivos del juego" mph={gameMph} unit={unit} />
        <SpeedRow extra={speedDifference(car.topMph, gameMph, unit)} fill={car.special ? "bg-cyan-300" : "bg-orange-400"} label="Probado con todas las mejoras" mph={car.topMph} unit={unit} />
        {hswMph ? <SpeedRow extra={speedDifference(hswMph, car.topMph, unit)} fill="bg-rose-500/70" label="Con HSW, no disponible en Xbox One" mph={hswMph} unit={unit} /> : null}
      </div>
      <p className="mt-4 text-sm text-neutral-300">Las mejoras llevan la potencia del motor de <span className="font-mono">{engineStock}</span> a <span className="font-mono">{engineMax}</span> (<span className="font-semibold text-white">+{engineGain(car)}%</span>).</p>
      <p className="mt-2 text-xs text-neutral-400">El valor base es teórico: no es una prueba de velocidad de fábrica, y no encontré esas pruebas publicadas. Por eso la primera diferencia no es lo que ganas al comprar mejoras.</p>
    </section>
  );
}
