# UMBRALES
### Cartografía honesta del conocimiento humano

---

## Requisitos

- **Node.js 18+** — descargá desde https://nodejs.org (elegí la versión LTS)
- Un navegador moderno (Chrome, Firefox, Edge)

Verificá tu versión abriendo una terminal y corriendo:
```
node --version
```
Si ves algo como `v18.x.x` o mayor, estás listo.

---

## Instalación y arranque

Abrí una terminal en la carpeta del proyecto y ejecutá estos dos comandos, **en orden**:

```bash
npm install
```
*(instala todas las dependencias — puede tardar 1-2 minutos la primera vez)*

```bash
npm run dev
```
*(arranca el servidor local)*

Después de correr `npm run dev`, vas a ver algo así:

```
  VITE v5.x.x  ready in 300 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

Abrí http://localhost:5173 en tu navegador. **Eso es todo.**

---

## Cómo usar UMBRALES

**Navegar el grafo**
- Arrastrá para moverse por el mapa
- Hacé scroll (rueda del mouse) para hacer zoom
- Los botones abajo a la derecha también sirven para zoom

**Explorar un nodo**
- Hacé clic en cualquier nodo para ver su panel de detalle
- El panel muestra descripción, nivel de certeza, última verificación, fuentes y nodos relacionados
- Clic en cualquier lugar del fondo para cerrar el panel

**Filtrar**
- La barra de abajo permite filtrar por **nivel de certeza** (1–5) y **estado** del nodo
- Los números de certeza significan:
  - **5** 🟢 Ley establecida (ej. LTP existe)
  - **4** 🔵 Consenso sólido (ej. el sueño consolida la memoria)
  - **3** 🟡 Consenso frágil (ej. capacidad de la memoria de trabajo)
  - **2** 🟠 Especulación informada (ej. memorias flashbulb)
  - **1** 🔴 Mito / Refutado (ej. "usamos el 10% del cerebro")

**Leer las conexiones**
- 🟢 Verde → apoya / evidencia
- 🔴 Rojo (animado) → contradice / refuta
- 🟣 Índigo → depende de
- 🟡 Amarillo → emergió de

---

## Estructura del proyecto

```
UMBRALES/
├── src/
│   ├── App.tsx              ← componente principal
│   ├── main.tsx             ← entrada de React
│   ├── index.css            ← estilos globales
│   ├── components/
│   │   ├── Header.tsx       ← barra superior con leyenda
│   │   ├── KnowledgeNode.tsx← nodo custom del grafo
│   │   ├── NodePanel.tsx    ← panel de detalle al hacer clic
│   │   └── FilterBar.tsx    ← barra de filtros inferior
│   ├── data/
│   │   └── knowledge.ts     ← los 50 nodos y 54 aristas
│   ├── types/
│   │   └── index.ts         ← tipos TypeScript
│   └── utils/
│       ├── colors.ts        ← colores y etiquetas por certeza/estado
│       └── transform.ts     ← conversión al formato de React Flow
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── index.html
```

---

## Para detener el servidor

En la terminal donde corre el proyecto, presioná `Ctrl + C`.

---

## Próximos pasos del proyecto

- [ ] Agregar más dominios (física, nutrición, economía conductual)
- [ ] Dimensión temporal: ver cómo cambió el conocimiento en 1950/1980/hoy
- [ ] Buscador de nodos
- [ ] Modo para proponer nuevos nodos y conexiones
- [ ] Deploy en Vercel para acceso público

---

*Iniciado por Leonardo y Claude · Junio 2026*
