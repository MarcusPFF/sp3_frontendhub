## Cook & Recipe – Frontend

En lille, simpel React‑app til at vise et “Cook & Recipe” univers med sider for opskrifter, ingredienser, about og login.  
Bygget med Vite, React, React Router og CSS Modules (flexbox + grid).

### Tech stack

- **Build tooling**: Vite + npm
- **UI**: React (JSX), CSS Modules
- **Routing**: `react-router`
- **Styling**: Flexbox, CSS Grid, simpel design‑system via CSS‑variabler

### Struktur

- **`src/main.jsx`**: Bootstrapper React‑appen
- **`src/App.jsx`**: Router-opsætning (`RouterProvider`, routes)
- **`src/components/Layout.jsx` + `Layout.module.css`**:
  - Globalt layout: header med logo og navigation, main‑område
- **`src/pages`**:
  - `Home.jsx` – intro + logo
  - `Recipes.jsx` – placeholder for opskrifter
  - `Ingredients.jsx` – placeholder for ingredienser
  - `About.jsx` – kort tekst om siden
  - `Login.jsx` – moderne login‑layout med logo og formular
- **`src/index.css`**: Globale resets + farvepalette via CSS‑variabler

### Kør projektet

```bash
npm install
npm run dev
```

Åbn derefter URL’en som Vite skriver i terminalen (typisk `http://localhost:5173`).

### Designprincipper

- **Simpelt layout**: klar header, rolig baggrund, fokus på kort/indhold
- **Genbrug**: hver side har sin egen JSX‑komponent + CSS Module
- **Læsbarhed**: ingen unødvendige kommentarer, korte filer, tydelige classnavne

### Mulige forbedringer

- Tilføje rigtige data til Recipes/Ingredients (fx via JSON eller API)
- Validere loginformular og vise feedback
- Gøre layoutet 100 % responsivt på helt små mobilskærme
