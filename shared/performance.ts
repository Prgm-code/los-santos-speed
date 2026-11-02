// gameMph: GTABase, "Top Speed (Game Files)". hswMph: GTABase. El resto: páginas de cada vehículo en GTACars.net.
export type Performance = {
  gameMph: number;
  engineStock: number;
  engineMax: number;
  upgrades: string[];
  hasSpoiler: boolean;
  hswMph?: number;
};

export const PERFORMANCE: Record<string, Performance> = {
  "vigilante": { gameMph: 99.43, engineStock: 0.375, engineMax: 0.45, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: false },
  "oppressor": { gameMph: 91.96, engineStock: 0.4, engineMax: 0.48, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true },
  "oppressor-mk2": { gameMph: 91.96, engineStock: 0.38, engineMax: 0.456, upgrades: ["engine"], hasSpoiler: false },
  "scramjet": { gameMph: 99.42, engineStock: 0.4, engineMax: 0.48, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: false },
  "toreador": { gameMph: 93.21, engineStock: 0.3, engineMax: 0.342, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true },
  "rocket-voltic": { gameMph: 90.1, engineStock: 0.18, engineMax: 0.216, upgrades: ["brakes", "engine"], hasSpoiler: false },
  "ruiner": { gameMph: 94.45, engineStock: 0.33, engineMax: 0.396, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: false },
  "deluxo": { gameMph: 86.99, engineStock: 0.2275, engineMax: 0.4095, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true },
  "deathbike": { gameMph: 91.34, engineStock: 0.3125, engineMax: 0.40625, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: false },
  "zr380": { gameMph: 98.18, engineStock: 0.35, engineMax: 0.455, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true },
  "dominator-arena": { gameMph: 93.21, engineStock: 0.375, engineMax: 0.48, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true },
  "stromberg": { gameMph: 93.21, engineStock: 0.29, engineMax: 0.348, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: false },
  "emerus": { gameMph: 100.23, engineStock: 0.378, engineMax: 0.49896, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true },
  "veleno": { gameMph: 114.46, engineStock: 0.388, engineMax: 0.48112, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true, hswMph: 164 },
  "fmj": { gameMph: 109.67, engineStock: 0.3875, engineMax: 0.4805, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true, hswMph: 155.75 },
  "luiva": { gameMph: 111.85, engineStock: 0.38, engineMax: 0.456, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true },
  "itali-gto": { gameMph: 100.17, engineStock: 0.4, engineMax: 0.48, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true },
  "cartuccia": { gameMph: 110.89, engineStock: 0.369, engineMax: 0.5166, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true },
  "banshee": { gameMph: 113.52, engineStock: 0.3878, engineMax: 0.46536, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true, hswMph: 172.5 },
  "pariah": { gameMph: 96.37, engineStock: 0.321, engineMax: 0.5778, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true },
  "itali-rsx": { gameMph: 101.38, engineStock: 0.40125, engineMax: 0.4815, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true },
  "rapid-gt-x": { gameMph: 103.77, engineStock: 0.35, engineMax: 0.49, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true },
  "sentinel-gts": { gameMph: 103.58, engineStock: 0.33, engineMax: 0.462, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true },
  "uranus": { gameMph: 96.31, engineStock: 0.3245, engineMax: 0.39459, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true },
  "astrale": { gameMph: 103.46, engineStock: 0.32, engineMax: 0.384, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true, hswMph: 148.5 },
  "dominator-gt": { gameMph: 100.66, engineStock: 0.3448, engineMax: 0.41376, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true },
  "weevil": { gameMph: 99.33, engineStock: 0.3375, engineMax: 0.6075, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true },
  "fr36": { gameMph: 95.07, engineStock: 0.301, engineMax: 0.4214, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true },
  "merula": { gameMph: 105.63, engineStock: 0.33, engineMax: 0.396, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true },
  "schafter": { gameMph: 93.21, engineStock: 0.3, engineMax: 0.42, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true },
  "everon": { gameMph: 96.0, engineStock: 0.3375, engineMax: 0.43875, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true },
  "toros": { gameMph: 96.31, engineStock: 0.32, engineMax: 0.384, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true },
  "club": { gameMph: 86.99, engineStock: 0.2375, engineMax: 0.323, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true },
  "draugur": { gameMph: 91.47, engineStock: 0.3425, engineMax: 0.411, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true },
  "bf400": { gameMph: 90.1, engineStock: 0.29, engineMax: 0.348, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: false },
  "powersurge": { gameMph: 79.66, engineStock: 0.82, engineMax: 0.9512, upgrades: ["brakes", "engine"], hasSpoiler: true },
  "reever": { gameMph: 93.95, engineStock: 0.4085, engineMax: 0.47386, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true },
  "br8": { gameMph: 100.97, engineStock: 0.76, engineMax: 0.9272, upgrades: ["brakes", "engine", "transmission", "turbo"], hasSpoiler: true }
};
