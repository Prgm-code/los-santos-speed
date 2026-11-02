#!/usr/bin/env python3
"""Regenera client/images.ts desde imagenes/. Uso: tools/generar-imagenes.py [ancho] [calidad]"""
import base64
import json
import pathlib
import subprocess
import sys
import tempfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
WIDTH = int(sys.argv[1]) if len(sys.argv) > 1 else 640
QUALITY = int(sys.argv[2]) if len(sys.argv) > 2 else 55
HEIGHT = WIDTH * 9 // 16

images = {}
with tempfile.TemporaryDirectory() as tmp:
    for source in sorted((ROOT / "imagenes").glob("*.webp")):
        target = pathlib.Path(tmp) / source.name
        subprocess.run(
            ["magick", str(source), "-resize", f"{WIDTH}x{HEIGHT}^", "-gravity", "center", "-extent", f"{WIDTH}x{HEIGHT}", "-strip", "-quality", str(QUALITY), str(target)],
            check=True,
        )
        images[source.stem] = "data:image/webp;base64," + base64.b64encode(target.read_bytes()).decode()

lines = ",\n".join(f"  {json.dumps(key)}: {json.dumps(value)}" for key, value in images.items())
output = "// Generado por tools/generar-imagenes.py. Van dentro del bundle porque Lakebed no sirve archivos estáticos.\n"
output += "export const IMAGES: Record<string, string> = {\n" + lines + "\n};\n"
(ROOT / "client" / "images.ts").write_text(output)
print(f"{len(images)} imágenes, {sum(map(len, images.values()))} bytes en base64")
