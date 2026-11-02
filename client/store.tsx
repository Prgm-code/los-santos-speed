import { createContext, type ComponentChildren } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import type { Unit } from "../shared/cars";

const STORAGE_KEY = "gta5-garage-v1";

type Saved = { favorites: string[]; upgrades: string[] };

type Store = Saved & {
  unit: Unit;
  setUnit: (unit: Unit) => void;
  toggleFavorite: (id: string) => void;
  toggleUpgrade: (key: string) => void;
};

const StoreContext = createContext<Store>(null as unknown as Store);

function loadSaved(): Saved {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    return { favorites: saved.favorites ?? [], upgrades: saved.upgrades ?? [] };
  } catch {
    return { favorites: [], upgrades: [] };
  }
}

function toggled(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function StoreProvider({ children }: { children: ComponentChildren }) {
  const [unit, setUnit] = useState<Unit>("kmh");
  const [saved, setSaved] = useState<Saved>(loadSaved);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    } catch {
      // Sin almacenamiento, los cambios duran hasta recargar.
    }
  }, [saved]);

  const store: Store = {
    ...saved,
    unit,
    setUnit,
    toggleFavorite: (id) => setSaved((current) => ({ ...current, favorites: toggled(current.favorites, id) })),
    toggleUpgrade: (key) => setSaved((current) => ({ ...current, upgrades: toggled(current.upgrades, key) }))
  };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore(): Store {
  return useContext(StoreContext);
}
