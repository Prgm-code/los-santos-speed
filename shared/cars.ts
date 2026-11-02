import { PERFORMANCE, type Performance } from "./performance";

export type Car = {
  id: string;
  name: string;
  classId: string;
  role: string;
  topMph: number;
  lap: string;
  price: number;
  upgrade: string;
  why: string;
  isBike?: boolean;
  special?: boolean;
  tags?: string[];
  workshop?: string;
  checklist?: { id: string; name: string }[];
  added2026?: boolean;
};

export type Unit = "kmh" | "mph";

export const SPECIAL_CLASS = "especiales";

export const CLASSES = [
  { id: SPECIAL_CLASS, name: "Especiales" },
  { id: "super", name: "Súper" },
  { id: "sports", name: "Deportivos" },
  { id: "classics", name: "Clásicos" },
  { id: "muscle", name: "Muscle" },
  { id: "coupes", name: "Cupés" },
  { id: "sedans", name: "Sedanes" },
  { id: "suvs", name: "SUV" },
  { id: "compacts", name: "Compactos" },
  { id: "offroad", name: "Todoterreno" },
  { id: "bikes", name: "Motos" },
  { id: "openwheel", name: "Monoplazas" }
];

export const SPECIAL_TAGS = ["Cohete", "Armas", "Vuela", "Planea", "Salta", "Submarino", "Blindado"];

const SPEED_UPGRADE = "Motor EMS 4 + turbo";
const SPEED_WHY = "Su fuerte es la recta. Según Broughy1322, el motor y el turbo son las mejoras que suben la aceleración y la punta.";
const LAP_UPGRADE = "Frenos de carrera + turbo";
const LAP_WHY = "Gana tiempo en las curvas. Los frenos dan más fuerza de frenado y el turbo más empuje a la salida.";
const WEAPONS_UPGRADE = "Ametralladora + misiles teledirigidos";
const ARMOR_UPGRADE = "Blindaje completo";
const ARENA_WORKSHOP = "Taller de Arena War";
const MOC_WORKSHOP = "Taller del MOC o del Avenger";
const PROPERTY_WORKSHOP = "Taller de vehículos en una de tus propiedades";

export const CARS: Car[] = [
  { id: "vigilante", name: "Grotti Vigilante", classId: SPECIAL_CLASS, role: "El más rápido en cuatro ruedas", topMph: 146.75, lap: "0:55.872", price: 3750000, upgrade: "Motor EMS 4 + turbo", why: "Ya trae cohete y armas. El motor y el turbo lo dejan salir antes de cada curva cuando no quieres gastar cohete.", special: true, tags: ["Cohete", "Armas"], workshop: MOC_WORKSHOP },
  { id: "deathbike", name: "Western Deathbike (Arena)", classId: SPECIAL_CLASS, role: "El más rápido de esta lista", topMph: 150, lap: "0:59.017", price: 1269000, upgrade: ARMOR_UPGRADE, why: "Con blindaje completo aguanta 3 misiles teledirigidos. En moto, eso es mucho.", isBike: true, special: true, tags: ["Cohete", "Armas", "Blindado"], workshop: ARENA_WORKSHOP },
  { id: "zr380", name: "Annis ZR380 (Arena)", classId: SPECIAL_CLASS, role: "Punta y blindaje", topMph: 142, lap: "1:02.112", price: 2138640, upgrade: ARMOR_UPGRADE, why: "Con blindaje completo aguanta 4 misiles teledirigidos.", special: true, tags: ["Cohete", "Armas", "Blindado"], workshop: ARENA_WORKSHOP },
  { id: "oppressor", name: "Pegassi Oppressor", classId: SPECIAL_CLASS, role: "Mejor vuelta de la lista", topMph: 140, lap: "0:51.953", price: 2750000, upgrade: WEAPONS_UPGRADE, why: "Las alas le dejan planear después de un salto o del cohete. Las armas se las montas en el taller.", isBike: true, special: true, tags: ["Cohete", "Planea", "Armas"], workshop: MOC_WORKSHOP },
  { id: "toreador", name: "Pegassi Toreador", classId: SPECIAL_CLASS, role: "Va por tierra y por agua", topMph: 135.25, lap: "0:56.624", price: 4250000, upgrade: ARMOR_UPGRADE, why: "Trae misiles infinitos y con blindaje completo aguanta 6 teledirigidos.", special: true, tags: ["Cohete", "Armas", "Submarino", "Blindado"], workshop: PROPERTY_WORKSHOP },
  { id: "dominator-arena", name: "Vapid Dominator (Arena)", classId: SPECIAL_CLASS, role: "El más barato de la lista", topMph: 134, lap: "1:04.882", price: 1132000, upgrade: ARMOR_UPGRADE, why: "Es la entrada más barata a Arena War. Con blindaje completo aguanta 4 misiles teledirigidos.", special: true, tags: ["Cohete", "Armas", "Blindado"], workshop: ARENA_WORKSHOP },
  { id: "scramjet", name: "Declasse Scramjet", classId: SPECIAL_CLASS, role: "Salta y lleva cohete", topMph: 130.75, lap: "0:57.775", price: 4000000, upgrade: "Motor EMS 4 + turbo", why: "El salto y el cohete ya vienen de fábrica. Solo se mejora en el MOC o el Avenger.", special: true, tags: ["Cohete", "Salta", "Armas"], workshop: MOC_WORKSHOP },
  { id: "oppressor-mk2", name: "Pegassi Oppressor Mk II", classId: SPECIAL_CLASS, role: "La moto voladora", topMph: 127.75, lap: "0:53.387", price: 8000000, upgrade: "Misiles teledirigidos + contramedidas", why: "Vuela sin ruedas. El precio baja después de completar 5 Trabajos de Cliente en el Terrorbyte.", isBike: true, special: true, tags: ["Cohete", "Vuela", "Armas"], workshop: "Taller especializado del Terrorbyte", checklist: [{ id: "missiles", name: "Misiles teledirigidos" }, { id: "counter", name: "Contramedidas" }, { id: "engine", name: "Motor" }] },
  { id: "deluxo", name: "Imponte Deluxo", classId: SPECIAL_CLASS, role: "El auto que vuela", topMph: 127.25, lap: "1:06.500", price: 5750000, upgrade: WEAPONS_UPGRADE, why: "Pasa de auto a modo vuelo cuando quieras. Las armas solo se montan en el MOC o el Avenger.", special: true, tags: ["Vuela", "Armas"], workshop: MOC_WORKSHOP },
  { id: "rocket-voltic", name: "Coil Rocket Voltic", classId: SPECIAL_CLASS, role: "Cohete sin armas", topMph: 124.75, lap: "0:59.209", price: 3830400, upgrade: "Motor EMS 4", why: "Solo admite mejoras de motor y frenos. Su gracia es el cohete recargable y no dispara, así que sirve más para escapar que para pelear.", special: true, tags: ["Cohete"], workshop: PROPERTY_WORKSHOP },
  { id: "ruiner", name: "Imponte Ruiner 2000", classId: SPECIAL_CLASS, role: "Salta con paracaídas", topMph: 119, lap: "1:11.371", price: 3750000, upgrade: "Motor EMS 4 + turbo", why: "Salta, tiene paracaídas y dispara ametralladoras y cohetes. Es de los más lentos de esta lista.", special: true, tags: ["Salta", "Armas"], workshop: PROPERTY_WORKSHOP },
  { id: "stromberg", name: "Ocelot Stromberg", classId: SPECIAL_CLASS, role: "Submarino blindado", topMph: 112.75, lap: "1:07.351", price: 2500000, upgrade: ARMOR_UPGRADE, why: "Se convierte en submarino. Con blindaje completo aguanta 6 misiles teledirigidos.", special: true, tags: ["Submarino", "Armas", "Blindado"], workshop: "Los Santos Customs; las armas, en el MOC o el Avenger" },

  { id: "emerus", name: "Progen Emerus", classId: "super", role: "Mejor vuelta", topMph: 126.75, lap: "0:57.624", price: 2750000, upgrade: LAP_UPGRADE, why: LAP_WHY },
  { id: "veleno", name: "Grotti Veleno GT", classId: "super", role: "Más punta", topMph: 138.75, lap: "0:58.776", price: 3090000, upgrade: SPEED_UPGRADE, why: SPEED_WHY, added2026: true },
  { id: "fmj", name: "Vapid FMJ MK V", classId: "super", role: "Vuelta y punta", topMph: 133.5, lap: "0:57.774", price: 2965000, upgrade: LAP_UPGRADE, why: "Queda a 0.15 segundos del Emerus y corre casi 7 mph más." },
  { id: "luiva", name: "Progen Luiva", classId: "super", role: "Top 10 en punta", topMph: 136.25, lap: "1:01.094", price: 2697500, upgrade: SPEED_UPGRADE, why: SPEED_WHY },

  { id: "itali-gto", name: "Grotti Itali GTO", classId: "sports", role: "Mejor vuelta", topMph: 128, lap: "0:59.359", price: 1965000, upgrade: LAP_UPGRADE, why: LAP_WHY },
  { id: "cartuccia", name: "Grotti Cartuccia GT", classId: "sports", role: "Más punta", topMph: 139, lap: "1:00.777", price: 2395000, upgrade: SPEED_UPGRADE, why: SPEED_WHY, added2026: true },
  { id: "banshee", name: "Bravado Banshee GTS", classId: "sports", role: "Mi favorito", topMph: 138, lap: "1:00.621", price: 1989500, upgrade: SPEED_UPGRADE, why: "Tiene casi la punta del Cartuccia, mejor vuelta y cuesta $405,500 menos." },
  { id: "pariah", name: "Ocelot Pariah", classId: "sports", role: "Mejor precio", topMph: 136, lap: "1:00.644", price: 1420000, upgrade: SPEED_UPGRADE, why: "Cuesta $1,420,000 y pelea con autos que valen mucho más." },
  { id: "itali-rsx", name: "Grotti Itali RSX", classId: "sports", role: "Top 10 en punta", topMph: 134.5, lap: "1:00.844", price: 3465000, upgrade: SPEED_UPGRADE, why: SPEED_WHY },
  { id: "rapid-gt-x", name: "Dewbauchee Rapid GT X", classId: "sports", role: "Top 10 en punta", topMph: 132.25, lap: "1:01.395", price: 2705500, upgrade: SPEED_UPGRADE, why: SPEED_WHY },
  { id: "sentinel-gts", name: "Sentinel GTS", classId: "sports", role: "Top 10 en punta", topMph: 132.25, lap: "1:02.045", price: 2172000, upgrade: SPEED_UPGRADE, why: SPEED_WHY },

  { id: "uranus", name: "Vapid Uranus LozSpeed", classId: "classics", role: "Mejor vuelta", topMph: 118.25, lap: "1:03.230", price: 1140000, upgrade: LAP_UPGRADE, why: LAP_WHY },
  { id: "astrale", name: "Pfister Astrale", classId: "classics", role: "Más punta del top 5", topMph: 126, lap: "1:03.697", price: 1475500, upgrade: SPEED_UPGRADE, why: SPEED_WHY },

  { id: "dominator-gt", name: "Vapid Dominator GT", classId: "muscle", role: "Mejor vuelta", topMph: 123, lap: "1:02.880", price: 2195000, upgrade: LAP_UPGRADE, why: LAP_WHY },
  { id: "weevil", name: "BF Weevil Custom", classId: "muscle", role: "Más punta", topMph: 137.5, lap: "1:05.365", price: 980000, upgrade: SPEED_UPGRADE, why: SPEED_WHY },

  { id: "fr36", name: "Fathom FR36", classId: "coupes", role: "Mejor vuelta", topMph: 121.5, lap: "1:04.214", price: 1610000, upgrade: LAP_UPGRADE, why: LAP_WHY },

  { id: "merula", name: "Albany Merula", classId: "sedans", role: "Mejor vuelta", topMph: 124, lap: "1:04.214", price: 1394000, upgrade: LAP_UPGRADE, why: LAP_WHY, added2026: true },
  { id: "schafter", name: "Benefactor Schafter V12", classId: "sedans", role: "Mejor precio", topMph: 126, lap: "1:04.598", price: 116000, upgrade: SPEED_UPGRADE, why: "Cuesta $116,000 y queda a menos de medio segundo del Merula." },

  { id: "everon", name: "Karin Everon RS", classId: "suvs", role: "Mejor vuelta", topMph: 125.75, lap: "1:04.147", price: 1665000, upgrade: LAP_UPGRADE, why: LAP_WHY },
  { id: "toros", name: "Pegassi Toros", classId: "suvs", role: "Más punta", topMph: 128.25, lap: "1:04.765", price: 498000, upgrade: SPEED_UPGRADE, why: SPEED_WHY },

  { id: "club", name: "BF Club", classId: "compacts", role: "Mejor vuelta", topMph: 112.5, lap: "1:06.600", price: 1280000, upgrade: LAP_UPGRADE, why: LAP_WHY },

  { id: "draugur", name: "Declasse Draugur", classId: "offroad", role: "Mejor vuelta", topMph: 111.75, lap: "1:02.095", price: 1870000, upgrade: LAP_UPGRADE, why: LAP_WHY },
  { id: "bf400", name: "Nagasaki BF400", classId: "offroad", role: "Mejor precio", topMph: 135.75, lap: "1:02.296", price: 95000, upgrade: SPEED_UPGRADE, why: "Es una moto de $95,000 y queda a 0.2 segundos del Draugur, que cuesta $1,870,000.", isBike: true },

  { id: "powersurge", name: "Western Powersurge", classId: "bikes", role: "Mejor vuelta", topMph: 130, lap: "0:55.371", price: 1605000, upgrade: "Frenos de carrera + motor EMS 4", why: "Solo admite mejoras de motor y frenos, así que no lleva turbo ni transmisión.", isBike: true },
  { id: "reever", name: "Western Reever", classId: "bikes", role: "Más punta", topMph: 163, lap: "0:59.459", price: 1900000, upgrade: SPEED_UPGRADE, why: SPEED_WHY, isBike: true },

  { id: "br8", name: "Benefactor BR8", classId: "openwheel", role: "Mejor vuelta en carreras", topMph: 121, lap: "0:54.555", price: 3400000, upgrade: "Carga aerodinámica media", why: "Broughy1322 lo prueba con carga media. Más carga lo hace mejor en curvas, menos carga le da más punta." }
];

export const RACE_CARS = CARS.filter((car) => !car.special);
export const SPECIALS = CARS.filter((car) => car.special);

export const TOP_10 = RACE_CARS.filter((car) => !car.isBike)
  .sort((a, b) => b.topMph - a.topMph)
  .slice(0, 10);

export const TOP_SPECIALS = [...SPECIALS].sort((a, b) => b.topMph - a.topMph).slice(0, 10);

export const MAX_PRICE = Math.max(...CARS.map((car) => car.price));
export const MAX_MPH = Math.max(...CARS.map((car) => car.topMph));

export const UPGRADES = [
  { id: "engine", name: "Motor EMS 4", effect: "Sube la punta", note: "Más potencia: mejor aceleración y mayor velocidad punta.", cost: 33500 },
  { id: "turbo", name: "Turbo", effect: "Sube la punta", note: "También suma potencia, con el mismo efecto que el motor.", cost: 50000 },
  { id: "transmission", name: "Transmisión de carrera", effect: "Mejora la aceleración", note: "Agrega una marcha y acorta la pausa entre cambios.", cost: 40000 },
  { id: "brakes", name: "Frenos de carrera", effect: "No cambia la punta", note: "Frena con más fuerza, y eso se nota en cada vuelta.", cost: 35000 },
  { id: "spoiler", name: "Alerón", effect: "No cambia la punta", note: "Cualquiera que no sea el de fábrica da el mismo agarre extra, así que compra el que te guste." },
  { id: "armor", name: "Blindaje 100%", effect: "No cambia la punta", note: "Protege de los choques, y un auto dañado va más lento.", cost: 50000 },
  { id: "tires", name: "Neumáticos antibalas", effect: "No cambia la punta", note: "Déjalos para el final. Solo te sirven si te disparan a las ruedas.", cost: 25000 }
];

const SPECIAL_UPGRADES = [
  { id: "weapons", name: "Armas", needs: "Armas" },
  { id: "armor", name: "Blindaje completo", needs: "Blindado" },
  { id: "engine", name: "Motor EMS 4" },
  { id: "turbo", name: "Turbo" },
  { id: "transmission", name: "Transmisión de carrera" },
  { id: "brakes", name: "Frenos de carrera" }
];

const PERFORMANCE_PART: Record<string, string> = { engine: "engine", turbo: "turbo", transmission: "transmission", brakes: "brakes" };

export const SOURCES = [
  { label: "GTABase, ranking por categoría y fichas (octubre de 2026)", url: "https://www.gtabase.com/grand-theft-auto-v/vehicles/comparison/the-best-fastest-vehicles-in-gta-online-gta-v-ranked-by-class" },
  { label: "SixCentral, tabla de rendimiento (septiembre de 2026)", url: "https://sixcentral.co.uk/guides/vehicle-performance-table" },
  { label: "GTA Boss, velocidades probadas (2026)", url: "https://www.gtaboss.gg/gta-5-online/fastest-vehicles" },
  { label: "RacingGames.gg, orden de mejoras (2022)", url: "https://racinggames.gg/article/gta-online-best-upgrades-win-more-races-tips-tricks-turbo-brakes-transmission-engine-bulletproof-tyres-ps4-xbox-one-pc" },
  { label: "GTA Intel, mejoras de Los Santos Customs", url: "https://gtaintel.com/news/gta-5-los-santos-customs-upgrades-guide" },
  { label: "GTABase, notas de la actualización 1.73", url: "https://www.gtabase.com/articles/grand-theft-auto-v/title-updates/gta-online-summer-2026-dlc-update-1-73-patch-notes-features" },
  { label: "GTACars.net, potencia del motor por vehículo", url: "https://gtacars.net/gta5" },
  { label: "Broughy1322, qué hace cada mejora", url: "https://gtacars.net/gta5/upgrades" },
  { label: "Fotos: GTA Wiki (Fandom)", url: "https://gta.fandom.com/" },
  { label: "Fotos del Cartuccia GT, Merula, Itali GTO, Vigilante y Stromberg: capturas de GTABase", url: "https://www.gtabase.com/grand-theft-auto-v/vehicles/" }
];

export function findCar(id: string | undefined): Car | undefined {
  return CARS.find((car) => car.id === id);
}

export function className(classId: string): string {
  return CLASSES.find((item) => item.id === classId)?.name ?? "";
}

export function bestOfClass(classId: string): Car | undefined {
  return CARS.filter((car) => car.classId === classId).sort((a, b) => lapSeconds(a.lap) - lapSeconds(b.lap))[0];
}

export function formatSpeed(mph: number, unit: Unit): string {
  return unit === "kmh" ? Math.round(mph * 1.609344) + " km/h" : mph + " mph";
}

export function formatPrice(price: number): string {
  return "$" + price.toLocaleString("en-US");
}

export function lapSeconds(lap: string): number {
  const [minutes, seconds] = lap.split(":");
  return Number(minutes) * 60 + Number(seconds);
}

export function performanceOf(car: Car): Performance {
  return PERFORMANCE[car.id];
}

export function engineGain(car: Car): number {
  const { engineStock, engineMax } = performanceOf(car);
  return Math.round((engineMax / engineStock - 1) * 100);
}

export function upgradesFor(car: Car): { id: string; name: string }[] {
  if (car.checklist) {
    return car.checklist;
  }
  const { upgrades, hasSpoiler } = performanceOf(car);
  const available = (id: string) => (id === "spoiler" ? hasSpoiler : !PERFORMANCE_PART[id] || upgrades.includes(PERFORMANCE_PART[id]));
  if (car.special) {
    return SPECIAL_UPGRADES.filter((upgrade) => available(upgrade.id) && (!upgrade.needs || car.tags?.includes(upgrade.needs)));
  }
  return UPGRADES.filter((upgrade) => available(upgrade.id));
}
