import { Link, useParams } from "lakebed/client";
import { useEffect, useState } from "preact/hooks";
import { CARS, CLASSES, formatPrice, lapSeconds, MAX_PRICE, SPECIAL_CLASS, SPECIAL_TAGS, type Car } from "../shared/cars";
import { CarCard, TITLE } from "./ui";

const SORTS: { id: string; label: string; compare: (a: Car, b: Car) => number }[] = [
  { id: "speed", label: "Más punta", compare: (a, b) => b.topMph - a.topMph },
  { id: "lap", label: "Mejor vuelta", compare: (a, b) => lapSeconds(a.lap) - lapSeconds(b.lap) },
  { id: "cheap", label: "Más barato", compare: (a, b) => a.price - b.price }
];

const FIELD = "w-full rounded-sm border border-white/20 bg-[#0b0a10] px-3 py-2 text-sm outline-none focus:border-orange-400";

function count(classId: string): number {
  return CARS.filter((car) => car.classId === classId).length;
}

export function CatalogPage() {
  const { category = "all" } = useParams<{ category?: string }>();
  const [sort, setSort] = useState("speed");
  const [search, setSearch] = useState("");
  const [budget, setBudget] = useState(MAX_PRICE);
  const [tag, setTag] = useState<string | null>(null);

  const isSpecial = category === SPECIAL_CLASS;
  useEffect(() => setTag(null), [category]);

  const term = search.trim().toLowerCase();
  const compare = SORTS.find((item) => item.id === sort)?.compare ?? SORTS[0].compare;
  const visible = CARS.filter((car) => (category === "all" ? true : car.classId === category))
    .filter((car) => !term || car.name.toLowerCase().includes(term))
    .filter((car) => car.price <= budget)
    .filter((car) => !tag || car.tags?.includes(tag))
    .sort(compare);

  const link = (id: string, label: string, total: number, special = false) => {
    const active = category === id;
    return (
      <Link
        aria-current={active ? "page" : undefined}
        className={"flex shrink-0 items-center justify-between gap-3 rounded-sm px-3 py-1.5 text-sm font-medium transition-colors duration-150 " + (active ? (special ? "bg-cyan-300 text-black" : "bg-orange-400 text-black") : special ? "text-cyan-300 hover:bg-cyan-300/10" : "text-neutral-300 hover:bg-white/10")}
        key={id}
        to={id === "all" ? "/autos" : "/autos/" + id}
      >
        {label}
        <span className="font-mono text-xs opacity-70">{total}</span>
      </Link>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <h1 className={"text-5xl " + TITLE + (isSpecial ? " text-cyan-300" : "")}>{isSpecial ? "Especiales" : category === "all" ? "Catálogo" : CLASSES.find((item) => item.id === category)?.name ?? "Catálogo"}</h1>
      {isSpecial ? <p className="mt-2 max-w-2xl text-neutral-300">Ninguno sirve para carreras estándar. Aquí importa lo que hacen: volar, disparar o aguantar misiles.</p> : null}

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <aside className="min-w-0 lg:sticky lg:top-20 lg:self-start">
          <nav aria-label="Categorías" className="-mx-5 flex gap-1 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
            {link("all", "Todas", CARS.length)}
            {CLASSES.map((item) => link(item.id, item.name, count(item.id), item.id === SPECIAL_CLASS))}
          </nav>
          <div className="mt-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <input aria-label="Buscar" className={FIELD} onInput={(event) => setSearch(event.currentTarget.value)} placeholder="Buscar" type="search" value={search} />
            <label className="text-xs text-neutral-400">
              Ordenar
              <select className={FIELD + " mt-1 text-white"} onChange={(event) => setSort(event.currentTarget.value)} value={sort}>
                {SORTS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
              </select>
            </label>
            <label className="text-xs text-neutral-400">
              <span className="flex justify-between">Hasta <span className="font-mono text-white">{formatPrice(budget)}</span></span>
              <input aria-label="Precio máximo" className="mt-2 w-full accent-orange-400" max={MAX_PRICE} min={100000} onInput={(event) => setBudget(Number(event.currentTarget.value))} step={50000} type="range" value={budget} />
            </label>
          </div>
        </aside>

        <div className="min-w-0">
          {isSpecial ? (
            <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filtrar por habilidad">
              {SPECIAL_TAGS.map((item) => (
                <button
                  aria-pressed={tag === item}
                  className={"rounded-sm border px-3 py-1 text-sm font-medium transition-colors duration-150 " + (tag === item ? "border-cyan-300 bg-cyan-300 text-black" : "border-cyan-300/30 text-cyan-200 hover:border-cyan-300")}
                  key={item}
                  onClick={() => setTag(tag === item ? null : item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          ) : null}
          <p aria-live="polite" className="mb-3 text-sm text-neutral-400">{visible.length} {visible.length === 1 ? "vehículo" : "vehículos"}</p>
          {visible.length === 0 ? (
            <p className="rounded-lg border border-dashed border-white/20 p-10 text-center text-neutral-400">Ningún vehículo cumple esos filtros.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((car) => <CarCard car={car} key={car.id} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
