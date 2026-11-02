import { useLocation, useNavigate } from "lakebed/client";
import { useEffect, useRef, useState } from "preact/hooks";
import { CARS, engineGain, findCar, formatPrice, formatSpeed, lapSeconds, performanceOf, type Car } from "../shared/cars";
import { useStore } from "./store";
import { CarImage, TITLE } from "./ui";

const RACE_MS = 3500;

function Lane({ car, position, winner }: { car: Car; position: number; winner: boolean }) {
  return (
    <div className="relative h-20 overflow-hidden rounded-sm border border-white/10 bg-gradient-to-r from-white/[0.03] to-white/[0.08] sm:h-28">
      <div className="absolute inset-y-0 right-12 w-2 bg-[repeating-linear-gradient(0deg,#fff_0_8px,#000_8px_16px)] opacity-70" />
      <div className="absolute left-0 top-1/2 h-1 -translate-y-1/2 bg-gradient-to-r from-transparent to-orange-400" style={{ width: "calc(" + position + " * (100% - 9rem))" }} />
      <div className="absolute inset-y-1 w-28 sm:w-36" style={{ left: "calc(" + position + " * (100% - 9rem))" }}>
        <div className={"h-full overflow-hidden rounded-sm border-2 " + (winner ? "border-orange-400" : "border-white/30")}>
          <CarImage car={car} />
        </div>
      </div>
    </div>
  );
}

export function DuelPage() {
  const { unit } = useStore();
  const location = useLocation();
  const go = useNavigate();
  const params = new URLSearchParams(location.search);
  const left = findCar(params.get("a") ?? undefined) ?? (findCar("banshee") as Car);
  const right = findCar(params.get("b") ?? undefined) ?? (findCar(left.id === "pariah" ? "banshee" : "pariah") as Car);

  const [lights, setLights] = useState(0);
  const [running, setRunning] = useState(false);
  const [positions, setPositions] = useState([0, 0]);
  const [finished, setFinished] = useState(false);
  const cancel = useRef<() => void>(() => {});

  useEffect(() => () => cancel.current(), []);

  function reset() {
    cancel.current();
    setRunning(false);
    setFinished(false);
    setLights(0);
    setPositions([0, 0]);
  }

  function pick(a: string, b: string) {
    reset();
    go("/duelo?a=" + a + "&b=" + b, { replace: true });
  }

  function start() {
    reset();
    setRunning(true);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPositions([1, 1]);
      setFinished(true);
      setRunning(false);
      return;
    }

    let frame = 0;
    const timers: number[] = [];
    cancel.current = () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.cancelAnimationFrame(frame);
      cancel.current = () => {};
    };

    [1, 2, 3].forEach((step) => timers.push(window.setTimeout(() => setLights(step), step * 600)));
    timers.push(
      window.setTimeout(() => {
        setLights(4);
        const slowest = Math.min(left.topMph, right.topMph);
        const durations = [left, right].map((car) => RACE_MS * (slowest / car.topMph));
        const startedAt = performance.now();

        const tick = (now: number) => {
          const progress = durations.map((duration) => Math.min((now - startedAt) / duration, 1));
          setPositions(progress.map((value) => value * value));
          if (progress.every((value) => value === 1)) {
            setFinished(true);
            setRunning(false);
            return;
          }
          frame = window.requestAnimationFrame(tick);
        };
        frame = window.requestAnimationFrame(tick);
      }, 2400)
    );
  }

  const tie = left.topMph === right.topMph;
  const winner = left.topMph > right.topMph ? left : right;
  const gap = Math.abs(left.topMph - right.topMph);

  const picker = (label: string, car: Car, onChange: (id: string) => void) => (
    <label className="block text-sm text-neutral-400">
      {label}
      <select className="mt-1 w-full rounded-sm border border-white/20 bg-[#0b0a10] px-3 py-2.5 text-base font-semibold text-white outline-none focus:border-orange-400 disabled:opacity-50" disabled={running} onChange={(event) => onChange(event.currentTarget.value)} value={car.id}>
        {CARS.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
      </select>
    </label>
  );

  const rows: { label: string; a: string; b: string; better: number }[] = [
    { label: "Punta probada", a: formatSpeed(left.topMph, unit), b: formatSpeed(right.topMph, unit), better: left.topMph - right.topMph },
    { label: "Valor base", a: formatSpeed(performanceOf(left).gameMph, unit), b: formatSpeed(performanceOf(right).gameMph, unit), better: performanceOf(left).gameMph - performanceOf(right).gameMph },
    { label: "Con HSW", a: performanceOf(left).hswMph ? formatSpeed(performanceOf(left).hswMph as number, unit) : "No tiene", b: performanceOf(right).hswMph ? formatSpeed(performanceOf(right).hswMph as number, unit) : "No tiene", better: 0 },
    { label: "Potencia ganada", a: "+" + engineGain(left) + "%", b: "+" + engineGain(right) + "%", better: engineGain(left) - engineGain(right) },
    { label: "Vuelta", a: left.lap, b: right.lap, better: lapSeconds(right.lap) - lapSeconds(left.lap) },
    { label: "Precio", a: formatPrice(left.price), b: formatPrice(right.price), better: right.price - left.price }
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <h1 className={"text-5xl " + TITLE}>Duelo</h1>
      <p className="mt-2 max-w-2xl text-neutral-400">Elige dos y dales la largada. La animación solo usa la velocidad punta: no mide aceleración ni es una prueba real del juego.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        {picker("Carril 1", left, (id) => pick(id, right.id))}
        <div className="flex items-center justify-center gap-2 pb-2" aria-hidden="true">
          {[1, 2, 3].map((light) => (
            <span className={"h-5 w-5 rounded-full border border-white/20 transition-colors duration-100 " + (lights === 4 ? "bg-lime-400" : lights >= light ? "bg-red-500" : "bg-neutral-800")} key={light} />
          ))}
        </div>
        {picker("Carril 2", right, (id) => pick(left.id, id))}
      </div>

      <div className="mt-6 space-y-2">
        <Lane car={left} position={positions[0]} winner={finished && !tie && winner.id === left.id} />
        <Lane car={right} position={positions[1]} winner={finished && !tie && winner.id === right.id} />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button className="rounded-sm bg-gradient-to-r from-orange-400 to-rose-500 px-8 py-3 font-black italic uppercase text-black transition-transform duration-150 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100" disabled={running} onClick={start} type="button">
          {finished ? "Otra vez" : running ? "Preparados..." : "Largar"}
        </button>
        <button className="rounded-sm border border-white/30 px-5 py-3 font-black italic uppercase transition-colors duration-150 hover:border-white disabled:opacity-50" disabled={running} onClick={() => pick(right.id, left.id)} type="button">Cambiar carriles</button>
        <p aria-live="polite" className="text-lg sm:ml-3">
          {finished ? (tie ? "Empate: los dos llegan a " + formatSpeed(left.topMph, unit) + "." : winner.name + " gana por " + formatSpeed(gap, unit) + " de punta.") : ""}
        </p>
      </div>

      <table className="mt-10 w-full max-w-3xl border-collapse text-left">
        <caption className="sr-only">Comparación de los dos vehículos</caption>
        <thead>
          <tr className="border-b border-white/20 text-sm">
            <th className="py-2 font-medium text-neutral-400" scope="col"><span className="sr-only">Dato</span></th>
            <th className="py-2 pr-3 font-semibold" scope="col">{left.name}</th>
            <th className="py-2 font-semibold" scope="col">{right.name}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr className="border-b border-white/10" key={row.label}>
              <th className="py-2.5 pr-3 text-sm font-medium text-neutral-400" scope="row">{row.label}</th>
              <td className={"py-2.5 pr-3 font-mono " + (row.better > 0 ? "font-bold text-orange-400" : "")}>{row.a}</td>
              <td className={"py-2.5 font-mono " + (row.better < 0 ? "font-bold text-orange-400" : "")}>{row.b}</td>
            </tr>
          ))}
          <tr>
            <th className="py-2.5 pr-3 text-sm font-medium text-neutral-400" scope="row">Carreras</th>
            <td className="py-2.5 pr-3">{left.special ? "No apto" : "Sí"}</td>
            <td className="py-2.5">{right.special ? "No apto" : "Sí"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
