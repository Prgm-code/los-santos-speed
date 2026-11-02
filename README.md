# Los Santos Speed

Los vehículos más rápidos de GTA 5 Online para Xbox One, por categoría, con la mejora que conviene comprar primero en cada uno.

**Sitio:** https://los-santos-speed.lakebed.app

Incluye 38 vehículos, 12 de ellos especiales (con armas, cohete, vuelo o modo submarino). También tiene:

- Un top 10 de carreras y otro de especiales.
- Un catálogo con filtros por categoría, precio y habilidad.
- Una ficha por vehículo con su velocidad probada y su lista de mejoras.
- Un duelo con tabla comparativa.
- Un recomendador según tu objetivo y presupuesto.
- Un garage personal, guardado en el navegador.

## Cómo correrlo

Requiere Node.js 22.18 o superior.

```sh
npx lakebed dev
```

Para publicar los cambios:

```sh
npx lakebed deploy
```

`lakebed.json` conecta esta carpeta con el despliegue del autor. Si haces un fork, bórralo antes de publicar para crear tu propio despliegue.

## Estructura

| Ruta | Contenido |
|---|---|
| `shared/cars.ts` | Vehículos, mejoras recomendadas y fuentes |
| `shared/performance.ts` | Valor base, potencia del motor, mejoras disponibles y HSW por vehículo |
| `client/` | Interfaz en Preact y Tailwind, una página por archivo |
| `client/images.ts` | Fotos en base64, archivo generado |
| `imagenes/` | Fotos sin recomprimir para la página |
| `tools/generar-imagenes.py` | Regenera `client/images.ts`; requiere ImageMagick |

Las fotos van dentro del paquete porque Lakebed no sirve archivos estáticos, salvo el favicon. Para cambiar su tamaño o calidad:

```sh
python3 tools/generar-imagenes.py 640 55
```

## Cómo leer los datos

- **Velocidad y vuelta:** son pruebas de Broughy1322 con el vehículo al máximo.
- **Xbox One:** las fuentes no publican resultados separados para esta consola. La página usa las cifras estándar, sin HSW, porque Hao's Special Works no existe en Xbox One.
- **Valor base:** viene de los archivos del juego y es teórico. No es una prueba de velocidad de fábrica, y la diferencia con la velocidad probada no equivale a lo que ganas con las mejoras.
- **Recomendaciones:** el orden de compra y la mejora clave de cada vehículo son criterio del autor, a partir de las fuentes de abajo. No son mediciones.
- **Disponibilidad:** no se comprobó vehículo por vehículo que todos estén en Xbox One. Los de julio de 2026 llevan un aviso en la página.
- **Armas:** las del Scramjet y las de los vehículos de Arena no se comprobaron en sus fichas.
- **Duelo:** la animación solo usa la velocidad punta. No representa una carrera real.

## Referencias

### Rendimiento y precios

- [GTABase: ranking de vehículos por categoría](https://www.gtabase.com/grand-theft-auto-v/vehicles/comparison/the-best-fastest-vehicles-in-gta-online-gta-v-ranked-by-class): velocidad probada, vueltas, precios, HSW y vehículos no aptos para carreras.
- [GTABase: base de datos de vehículos](https://www.gtabase.com/grand-theft-auto-v/vehicles/): valor base, habilidades, blindaje, talleres y precios de las mejoras.
- [GTABase: notas de la actualización 1.73](https://www.gtabase.com/articles/grand-theft-auto-v/title-updates/gta-online-summer-2026-dlc-update-1-73-patch-notes-features): vehículos de julio de 2026 y plataformas.
- [SixCentral: tabla de rendimiento](https://sixcentral.co.uk/guides/vehicle-performance-table): velocidades y vueltas por categoría, y ausencia de HSW en Xbox One.
- [GTA Boss: velocidades probadas](https://www.gtaboss.gg/gta-5-online/fastest-vehicles): velocidades y vueltas sin HSW.
- [GTACars.net](https://gtacars.net/gta5): potencia del motor de fábrica y al máximo, y mejoras disponibles por vehículo.

### Mejoras

- [Broughy1322: mejoras de rendimiento](https://gtacars.net/gta5/upgrades): qué hace cada mejora.
- [Broughy1322: método de prueba de velocidad](https://gtacars.net/gta5/topspeed).
- [Broughy1322: método de prueba de vuelta](https://gtacars.net/gta5/laptime).
- [RacingGames.gg: mejores mejoras](https://racinggames.gg/article/gta-online-best-upgrades-win-more-races-tips-tricks-turbo-brakes-transmission-engine-bulletproof-tyres-ps4-xbox-one-pc): prioridad de compra.
- [GTA Intel: mejoras de Los Santos Customs](https://gtaintel.com/news/gta-5-los-santos-customs-upgrades-guide): prioridad de compra.

### Imágenes

- [GTA Wiki (Fandom)](https://gta.fandom.com/): las 33 fotos no listadas abajo.
- [GTABase](https://www.gtabase.com/grand-theft-auto-v/vehicles/): capturas del Cartuccia GT, Merula, Itali GTO, Vigilante y Stromberg.

### Herramientas

- [Lakebed](https://lakebed.dev): entorno de ejecución y alojamiento ([documentación](https://docs.lakebed.dev/llms.txt)).

## Derechos

Grand Theft Auto, sus vehículos e imágenes son propiedad de Rockstar Games y Take-Two Interactive. Este es un proyecto de aficionado sin relación con ellos. Las fotos conservan los derechos de sus titulares y fuentes, y no se ofrecen bajo ninguna licencia de este repositorio.

El repositorio no incluye una licencia de código, así que el autor conserva todos los derechos sobre él.
