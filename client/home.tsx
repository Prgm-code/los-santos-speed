import { Link } from "lakebed/client";
import { useEffect, useState } from "preact/hooks";
import { bestOfClass, CARS, className, CLASSES, formatPrice, formatSpeed, lapSeconds, MAX_PRICE, SPECIAL_CLASS, SPECIALS, TOP_10, TOP_SPECIALS, UPGRADES, type Car } from "../shared/cars";
import { useStore } from "./store";
import { CarCard, CarImage, Gauge, NewCarNote, TITLE, Tags } from "./ui";

const AUTOPLAY_MS = 6000;

function Showroom() {
  const { unit } = useStore();
  const [showSpecials, setShowSpecials] = useState(false);
  const [index, setIndex] = useState(TOP_10.findIndex((car) => car.id === "banshee"));
  const [paused, setPaused] = useState(false);
  const list = showSpecials ? TOP_SPECIALS : TOP_10;
  const car = list[index];

  function changeList(specials: boolean) {
    setShowSpecials(specials);
    setIndex(0);
  }

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const timer = window.setTimeout(() => setIndex((index + 1) % list.length), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, list]);

  return (
    <section
      className="relative isolate overflow-hidden border-b border-white/10"
      onBlurCapture={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 -z-20 scale-110 opacity-25 blur-3xl" key={car.id + "-ambient"} style={{ animation: "fade 700ms ease-out" }}>
        <CarImage car={car} />
      </div>

      <div className="hero-photo relative aspect-video w-full overflow-hidden lg:absolute lg:right-0 lg:top-0 lg:-z-10 lg:w-[62vw]">
        <div className="h-full w-full" key={car.id} style={{ animation: "fade 700ms ease-out" }}>
          <div className="h-full w-full" style={{ animation: "drift 9s ease-out forwards" }}>
            <CarImage car={car} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-6 lg:pt-14">
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.3em] text-orange-400 lg:mt-0">GTA 5 Online · Xbox One</p>
        <h1 className={"mt-3 max-w-2xl text-5xl leading-none sm:text-6xl " + TITLE}>
          Los más rápidos de <span className="block bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text pr-2 text-transparent">Los Santos</span>
        </h1>

        <div className="mt-8 max-w-xl" key={car.id} style={{ animation: "rise 400ms ease-out" }}>
          <p className="text-sm font-semibold uppercase tracking-wide text-neutral-300">#{index + 1} en punta · {className(car.classId)}</p>
          <h2 className={"mt-1 text-3xl sm:text-4xl " + TITLE}>{car.name}</h2>
          <p className="mt-2 font-mono text-sm text-neutral-300">Vuelta {car.lap} · {formatPrice(car.price)}</p>
          <div className="mt-2"><Tags car={car} /></div>
          {car.added2026 ? <div className="mt-2"><NewCarNote /></div> : null}
          <div className="mt-4 flex flex-wrap items-end gap-6">
            <Gauge car={car} unit={unit} />
            <div className="flex gap-2">
              <Link className="rounded-sm bg-gradient-to-r from-orange-400 to-rose-500 px-5 py-2.5 font-black italic uppercase text-black transition-transform duration-150 hover:scale-105" to={"/auto/" + car.id}>Ver ficha</Link>
              <Link className="rounded-sm border border-white/30 bg-black/30 px-5 py-2.5 font-black italic uppercase backdrop-blur transition-colors duration-150 hover:border-white" to={"/duelo?a=" + car.id}>Al duelo</Link>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-2" role="group" aria-label="Lista del top 10">
          <button aria-pressed={!showSpecials} className={"rounded-sm px-4 py-1.5 font-black italic uppercase transition-colors duration-150 " + (showSpecials ? "border border-white/20 text-neutral-300 hover:border-white" : "border border-orange-400 bg-orange-400 text-black")} onClick={() => changeList(false)} type="button">Top 10 carreras</button>
          <button aria-pressed={showSpecials} className={"rounded-sm px-4 py-1.5 font-black italic uppercase transition-colors duration-150 " + (showSpecials ? "border border-cyan-300 bg-cyan-300 text-black" : "border border-cyan-300/40 text-cyan-200 hover:border-cyan-300")} onClick={() => changeList(true)} type="button">Top 10 especiales</button>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-5 sm:overflow-visible lg:grid-cols-10" role="group" aria-label="Top 10 en velocidad punta">
          {list.map((item, itemIndex) => (
            <button
              aria-pressed={itemIndex === index}
              className={"relative flex w-32 shrink-0 flex-col justify-start overflow-hidden rounded-sm border-2 bg-black/40 text-left transition duration-200 sm:w-auto " + (itemIndex === index ? (showSpecials ? "border-cyan-300" : "border-orange-400") : "border-white/10 opacity-70 hover:opacity-100")}
              key={item.id}
              onClick={() => setIndex(itemIndex)}
              type="button"
            >
              <div className="aspect-video w-full overflow-hidden"><CarImage car={item} /></div>
              <div className="px-1.5 py-1">
                <p className="min-h-8 text-xs font-semibold leading-4">{itemIndex + 1}. {item.name}</p>
                <p className="mt-0.5 font-mono text-xs text-neutral-300">{formatSpeed(item.topMph, unit)}</p>
              </div>
              {itemIndex === index && !paused ? <span className={"absolute left-0 top-0 h-0.5 w-full origin-left " + (showSpecials ? "bg-cyan-300" : "bg-orange-400")} style={{ animation: "grow " + AUTOPLAY_MS + "ms linear" }} /> : null}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Categories() {
  const { unit } = useStore();
  const classes = CLASSES.filter((item) => item.id !== SPECIAL_CLASS);

  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <h2 className={"text-4xl " + TITLE}>Lo mejor de cada categoría</h2>
      <p className="mt-1 text-neutral-400">El de mejor tiempo de vuelta en cada una. Toca para ver el resto.</p>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {classes.map((item) => {
          const car = bestOfClass(item.id) as Car;
          return (
            <Link className="group relative block aspect-[4/3] overflow-hidden rounded-lg border border-white/10 transition-colors duration-200 hover:border-orange-400/70" key={item.id} to={"/autos/" + item.id}>
              <div className="h-full w-full transition-transform duration-700 group-hover:scale-110">
                <CarImage car={car} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className={"text-2xl leading-none " + TITLE}>{item.name}</p>
                <p className="mt-1 truncate text-xs text-neutral-300">{car.name} · {formatSpeed(car.topMph, unit)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function SpecialsTeaser() {
  const picks = ["vigilante", "oppressor-mk2", "toreador"].map((id) => SPECIALS.find((car) => car.id === id) as Car);

  return (
    <section className="border-y border-cyan-300/20 bg-cyan-300/[0.04]">
      <div className="mx-auto max-w-7xl px-5 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300">Fuera de reglamento</p>
            <h2 className={"mt-2 text-4xl sm:text-5xl " + TITLE}>Especiales</h2>
            <p className="mt-1 max-w-xl text-neutral-300">Armas, cohetes, alas y hasta modo submarino. Ninguno sirve para carreras estándar, pero sirven para cruzar el mapa o pelear.</p>
          </div>
          <Link className="rounded-sm border border-cyan-300/60 px-5 py-2.5 font-black italic uppercase text-cyan-200 transition-colors duration-150 hover:bg-cyan-300 hover:text-black" to={"/autos/" + SPECIAL_CLASS}>Ver los {SPECIALS.length}</Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {picks.map((car) => <CarCard car={car} key={car.id} />)}
        </div>
      </div>
    </section>
  );
}

const GOALS: { id: string; label: string; hint: string; pick: (cars: Car[]) => Car[] }[] = [
  {
    id: "race",
    label: "Ganar carreras",
    hint: "Mejor tiempo de vuelta entre los que se pueden usar en carreras.",
    pick: (cars) => cars.filter((car) => !car.special).sort((a, b) => lapSeconds(a.lap) - lapSeconds(b.lap))
  },
  {
    id: "straight",
    label: "Reinar en la recta",
    hint: "Mayor velocidad punta entre los que se pueden usar en carreras.",
    pick: (cars) => cars.filter((car) => !car.special).sort((a, b) => b.topMph - a.topMph)
  },
  {
    id: "travel",
    label: "Cruzar el mapa",
    hint: "Primero los que vuelan, después el de mayor velocidad punta.",
    pick: (cars) => cars.filter((car) => car.tags?.some((tag) => tag === "Vuela" || tag === "Cohete")).sort((a, b) => Number(b.tags?.includes("Vuela")) - Number(a.tags?.includes("Vuela")) || b.topMph - a.topMph)
  },
  {
    id: "fight",
    label: "Pelear",
    hint: "Con armas. Primero los blindados, después el de mayor velocidad punta.",
    pick: (cars) => cars.filter((car) => car.tags?.includes("Armas")).sort((a, b) => Number(b.tags?.includes("Blindado")) - Number(a.tags?.includes("Blindado")) || b.topMph - a.topMph)
  }
];

function Advisor() {
  const { unit } = useStore();
  const [goalId, setGoalId] = useState("race");
  const [budget, setBudget] = useState(2000000);
  const goal = GOALS.find((item) => item.id === goalId) ?? GOALS[0];
  const car = goal.pick(CARS.filter((item) => item.price <= budget))[0];

  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <h2 className={"text-4xl " + TITLE}>¿Cuál me compro?</h2>
      <p className="mt-1 text-neutral-400">Dime qué quieres hacer y cuánto tienes. Es un filtro simple sobre los datos de esta página, no una prueba del juego.</p>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <div className="grid grid-cols-2 gap-2" role="group" aria-label="Qué quieres hacer">
            {GOALS.map((item) => (
              <button
                aria-pressed={item.id === goalId}
                className={"rounded-sm border px-3 py-3 text-left font-black italic uppercase transition-colors duration-150 " + (item.id === goalId ? "border-orange-400 bg-orange-400 text-black" : "border-white/20 hover:border-white")}
                key={item.id}
                onClick={() => setGoalId(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-neutral-400">{goal.hint}</p>
          <label className="mt-6 block">
            <span className="flex items-baseline justify-between text-sm text-neutral-300">
              Tengo hasta
              <span className="font-mono text-2xl text-white">{formatPrice(budget)}</span>
            </span>
            <input aria-label="Presupuesto" className="mt-2 w-full accent-orange-400" max={MAX_PRICE} min={100000} onInput={(event) => setBudget(Number(event.currentTarget.value))} step={50000} type="range" value={budget} />
          </label>
        </div>

        {car ? (
          <Link className="group flex overflow-hidden rounded-lg border border-orange-400/50 bg-white/[0.03] transition-colors duration-200 hover:border-orange-400" key={car.id} style={{ animation: "rise 300ms ease-out" }} to={"/auto/" + car.id}>
            <div className="w-2/5 shrink-0 overflow-hidden sm:w-1/2">
              <div className="h-full w-full transition-transform duration-700 group-hover:scale-110"><CarImage car={car} /></div>
            </div>
            <div className="min-w-0 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">Yo me llevaría</p>
              <h3 className={"mt-1 text-2xl leading-tight " + TITLE}>{car.name}</h3>
              <p className="mt-2 font-mono text-sm text-neutral-300">{formatSpeed(car.topMph, unit)} · {car.lap}</p>
              <p className="font-mono text-sm text-neutral-300">{formatPrice(car.price)}</p>
              <div className="mt-2"><Tags car={car} /></div>
              <p className="mt-2 text-sm text-neutral-400">Primera mejora: {car.upgrade}</p>
            </div>
          </Link>
        ) : (
          <div className="flex items-center justify-center rounded-lg border border-dashed border-white/20 p-8 text-center text-neutral-400">Con ese presupuesto no hay nada para esto. Sube el monto o cambia de objetivo.</div>
        )}
      </div>
    </section>
  );
}

function UpgradeGuide() {
  return (
    <section className="border-t border-white/10 bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-5 py-16">
        <h2 className={"text-4xl " + TITLE}>Qué comprar primero</h2>
        <p className="mt-1 max-w-2xl text-neutral-400">Lo que hace cada mejora viene de la guía de Broughy1322. El orden es mi recomendación, y los precios son los más comunes en GTABase: algunos autos cuestan otra cosa.</p>
        <ol className="mt-6 grid gap-x-8 md:grid-cols-2">
          {UPGRADES.map((upgrade, index) => (
            <li className="flex items-baseline gap-4 border-b border-white/10 py-3" key={upgrade.id}>
              <span className="w-6 text-2xl font-black italic text-orange-400">{index + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-baseline justify-between gap-x-3 font-semibold">
                  {upgrade.name}
                  {upgrade.cost ? <span className="font-mono text-sm font-normal text-neutral-300">{formatPrice(upgrade.cost)}</span> : null}
                </p>
                <p className={"text-xs font-semibold uppercase tracking-wide " + (upgrade.effect === "No cambia la punta" ? "text-neutral-500" : "text-orange-400")}>{upgrade.effect}</p>
                <p className="text-sm text-neutral-400">{upgrade.note}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-4 max-w-2xl text-sm text-neutral-400">No compres por velocidad la suspensión ni piezas de carrocería: en general no cambian el rendimiento. Las barras de Los Santos Customs tampoco son fiables, aunque estén llenas todavía puedes ganar con las mejoras. HSW sube mucho la punta, pero solo existe en PS5, Xbox Series X|S y PC Enhanced.</p>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <Showroom />
      <Categories />
      <SpecialsTeaser />
      <Advisor />
      <UpgradeGuide />
    </>
  );
}
