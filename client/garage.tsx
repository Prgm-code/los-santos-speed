import { Link } from "lakebed/client";
import { CARS, formatPrice, upgradesFor } from "../shared/cars";
import { useStore } from "./store";
import { CarCard, TITLE } from "./ui";

export function GaragePage() {
  const { favorites, upgrades } = useStore();
  const cars = CARS.filter((car) => favorites.includes(car.id));
  const value = cars.reduce((total, car) => total + car.price, 0);
  const pending = cars
    .map((car) => ({ car, next: upgradesFor(car).find((upgrade) => !upgrades.includes(car.id + ":" + upgrade.id)) }))
    .filter((item) => item.next);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <h1 className={"text-5xl " + TITLE}>Mi garage</h1>

      {cars.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-white/20 p-12 text-center">
          <p className="text-lg text-neutral-300">Todavía está vacío. Toca el corazón de un auto y aparece aquí.</p>
          <Link className="mt-4 inline-block rounded-sm bg-gradient-to-r from-orange-400 to-rose-500 px-5 py-2.5 font-black italic uppercase text-black" to="/autos">Ir al catálogo</Link>
        </div>
      ) : (
        <>
          <dl className="mt-6 grid max-w-xl grid-cols-2 gap-4">
            <div className="border-l-2 border-orange-400 pl-3"><dt className="text-xs text-neutral-400">Vehículos</dt><dd className="text-3xl font-black italic">{cars.length}</dd></div>
            <div className="border-l-2 border-orange-400 pl-3"><dt className="text-xs text-neutral-400">Precio de compra total</dt><dd className="text-3xl font-black italic">{formatPrice(value)}</dd></div>
          </dl>

          {pending.length > 0 ? (
            <section className="mt-8">
              <h2 className={"text-2xl " + TITLE}>Lo próximo que le compraría</h2>
              <ul className="mt-2 divide-y divide-white/10">
                {pending.map(({ car, next }) => (
                  <li key={car.id}>
                    <Link className="flex flex-wrap items-baseline justify-between gap-2 py-2.5 hover:bg-white/5" to={"/auto/" + car.id}>
                      <span className="font-semibold">{car.name}</span>
                      <span className="text-sm text-neutral-400">{next?.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cars.map((car) => <CarCard car={car} key={car.id} />)}
          </div>
        </>
      )}
    </div>
  );
}
