# Frontend Eksamen Guide - Komplet Oversigt

Denne guide forklarer alle eksamensspørgsmålene og hvor i koden I skal kigge for at forstå koncepterne.

---

## 📋 OVERALL - Vigtige Koncepter (Ikke direkte i spørgsmålene)

### React Architecture Patterns
**Hvor at læse:**
- `src/App.jsx` - Router setup og app struktur
- `src/components/Layout.jsx` - Layout komponent med Outlet
- `src/security/Auth.jsx` - Context API pattern

**Hvad at forstå:**
- **Component-based architecture**: Hver side er en komponent (Home, Recipes, Admin, etc.)
- **Context API**: Auth context deler state globalt (isLoggedIn, user) uden prop drilling
- **Composition**: Layout komponent bruger `<Outlet />` til at rendere child routes
- **Separation of concerns**: API calls i `apiFacade.js`, UI i komponenter, styling i CSS Modules

### Project Structure
**Hvor at læse:**
- `package.json` - Dependencies og scripts
- `src/` mappe struktur
- `vite.config.js` - Build konfiguration

**Hvad at forstå:**
- **Module system**: ES6 imports/exports
- **Build tool**: Vite bruges til at bundle og serve appen
- **CSS Modules**: Scoped styling per komponent

### State Management Flow
**Hvor at læse:**
- `src/security/Auth.jsx` - Global state (authentication)
- `src/pages/Recipes.jsx` - Local state (recipes, loading, error)
- `src/pages/Admin.jsx` - Local state (users, expanded state)

**Hvad at forstå:**
- **Global state**: Auth context for delt authentication state
- **Local state**: useState for komponent-specifik state
- **State lifting**: Når state skal deles, løftes det op til fælles parent eller context

### Error Handling Strategy
**Hvor at læse:**
- `src/apiFacade.js` - `handleHttpErrors()` funktion
- `src/pages/Recipes.jsx` - Error state og display
- `src/utils/toast.js` - Toast notifications for errors

**Hvad at forstå:**
- **Try-catch blocks**: Håndterer async errors
- **Error state**: useState til at holde error messages
- **User feedback**: Toast notifications og error messages i UI
- **Error propagation**: Errors fra API bliver caught og vist til brugeren

---

## 📚 SPØRGSMÅL-FOR-SPØRGSMÅL GUIDE

### Question 1

#### JS: Higher-order functions
**Hvor at læse:**
- `src/apiFacade.js` linje 40-42: `.forEach()` på Object.keys
- `src/pages/Recipes.jsx` linje 61, 88: `.map()` på arrays
- `src/pages/Admin.jsx` linje 164, 194, 227: `.map()` på arrays
- `src/apiFacade.js` linje 62-78: `.then()` og `.catch()` på Promises
- `src/pages/Recipes.jsx` linje 15-36: `useCallback()` hook
- `src/pages/Recipes.jsx` linje 38-40: `useEffect()` hook

**Hvad at forstå:**
- Higher-order functions tager funktioner som argumenter eller returnerer funktioner
- `.map()`, `.filter()`, `.forEach()` er array higher-order functions
- `.then()`, `.catch()` er Promise higher-order functions
- `useCallback()`, `useEffect()` er React higher-order functions (hooks)

**Fordele:**
- Deklarativ kode (hvad, ikke hvordan)
- Genbrugelighed
- Komposition (kæde operationer)
- Abstraktion

#### React: React component koncept
**Hvor at læse:**
- `src/pages/Home.jsx` - Simpel funktionel komponent
- `src/pages/Recipes.jsx` - Komponent med state og hooks
- `src/components/Layout.jsx` - Komponent med props og children
- `src/components/IngredientsList.jsx` - Komponent der modtager props

**Hvad at forstå:**
- Komponenter er genbrugelige UI enheder
- Funktionelle komponenter returnerer JSX
- Komponenter kan have state, props, og side effects
- Komponenter kan komponeres sammen

#### React: Benefits af components vs vanilla JS
**Hvor at læse:**
- `src/pages/Recipes.jsx` - Komponent struktur
- `src/utils/toast.js` - DOM manipulation eksempel (sammenligning)

**Hvad at forstå:**
- **Genbrugelighed**: Samme komponent kan bruges flere steder
- **Isolation**: Hver komponent har sin egen state og styling
- **Maintainability**: Lettere at vedligeholde og teste
- **Declarative**: Beskriver hvad UI skal være, ikke hvordan man manipulerer DOM

#### Security/Routing/Styling: React-Router
**Hvor at læse:**
- `src/App.jsx` linje 16-33: Router setup med `createBrowserRouter`
- `src/components/Layout.jsx` linje 28-46: `NavLink` komponenter
- `src/components/Layout.jsx` linje 82: `<Outlet />` for nested routes
- `src/security/RequireAuth.jsx`: `Navigate` komponent
- `src/pages/Login.jsx` linje 14: `useNavigate` hook

**Hvad at forstå:**
- React Router giver client-side routing (SPA - Single Page Application)
- Løser problemet med at lave multi-page apps uden page reloads
- `NavLink` giver active state styling
- `Outlet` renderer child routes
- `Navigate` redirecter programmatisk

---

### Question 2

#### JS: Higher order functions med callbacks
**Hvor at læse:**
- `src/pages/Recipes.jsx` linje 61: `.map((category) => ...)` - callback funktion
- `src/pages/Admin.jsx` linje 164: `.map((user) => ...)` - callback funktion
- `src/apiFacade.js` linje 62-78: `.catch((error) => ...)` - callback funktion
- `src/pages/Recipes.jsx` linje 38-40: `useEffect(() => {...}, [loadRecipes])` - callback

**Hvad at forstå:**
- Callbacks er funktioner sendt som argumenter til higher-order functions
- Arrow functions `() => {}` bruges ofte som callbacks
- Callbacks giver fleksibilitet - samme funktion kan bruges med forskellige callbacks

**Fordele:**
- Separation of concerns
- Genbrugelighed
- Asynkron håndtering

#### React: JSX
**Hvor at læse:**
- Alle `.jsx` filer - alle bruger JSX
- `src/pages/Recipes.jsx` linje 55-114: JSX eksempel
- `src/components/Layout.jsx` linje 19-85: JSX med conditional rendering

**Hvad at forstå:**
- JSX er syntaks der ligner HTML men er JavaScript
- Kompileres til `React.createElement()` calls
- Tillader at skrive HTML-lignende kode i JavaScript
- Kan embedde JavaScript expressions med `{}`

**Vanilla JS sammenligning:**
- I vanilla JS ville man bruge `document.createElement()`, `appendChild()`, etc.
- Se `src/utils/toast.js` for DOM manipulation eksempel

#### Security/Routing/Styling: Flexbox og Grid
**Hvor at læse:**
- `src/components/Layout.module.css` linje 3-4: `display: grid`
- `src/components/Layout.module.css` linje 38-41: `display: flex`
- `src/pages/Recipes.module.css` linje 99-103: `display: grid`
- `src/components/RecipeModal.module.css` linje 180-184: `display: grid`

**Hvad at forstå:**
- **Flexbox**: 1D layout (row eller column), god til navigation, buttons
- **Grid**: 2D layout (rows og columns), god til komplekse layouts
- **Flexbox eksempler**: Navigation bars, centrering, spacing
- **Grid eksempler**: Card layouts, komplekse side strukturer

---

### Question 3

#### JS: package.json
**Hvor at læse:**
- `package.json` - Hele filen

**Hvad at forstå:**
- **Purpose**: Definerer projektet, dependencies, scripts
- **dependencies**: Runtime dependencies (react, react-router)
- **devDependencies**: Development tools (vite, eslint)
- **scripts**: Kommandoer man kan køre (`npm run dev`, `npm run build`)

#### React: Props inkl. children
**Hvor at læse:**
- `src/security/Auth.jsx` linje 6: `{ children }` prop
- `src/components/IngredientsList.jsx` linje 4: Props (ingredients, expandedIngredients, onToggleIngredient)
- `src/components/Layout.jsx` linje 82: `<Outlet />` (children fra router)

**Hvad at forstå:**
- **Props**: Data sendt fra parent til child komponent
- **children**: Speciel prop der indeholder indhold mellem åbnings- og lukningstag
- Props er read-only (immutable)
- Props gør komponenter genbrugelige

#### React: State i React component
**Hvor at læse:**
- `src/pages/Recipes.jsx` linje 9-13: `useState` hooks
- `src/pages/Admin.jsx` linje 8-13: `useState` hooks
- `src/pages/Login.jsx` linje 10-12: `useState` hooks

**Hvad at forstå:**
- **State**: Data der kan ændres og trigger re-render
- `useState` returnerer [value, setter]
- State er lokal til komponenten
- State opdateringer er asynkrone

#### Security/Routing/Styling: Deployment til Caddy
**Hvor at læse:**
- ❌ Ingen kode - kun konceptuelt

**Hvad at forstå (konceptuelt):**
- CI/CD pipeline: GitHub Actions → Build → Deploy
- Caddy server: Reverse proxy, serving static files, HTTPS
- Build process: `npm run build` → `dist/` folder
- Deployment: Upload `dist/` til server

---

### Question 4

#### JS: fetch function
**Hvor at læse:**
- `src/apiFacade.js` linje 62-78: `fetch()` med error handling
- `src/apiFacade.js` linje 129-134: `fetch()` i login
- `src/apiFacade.js` linje 136-146: `fetch()` i register

**Hvad at forstå:**
- `fetch()` er browser API til HTTP requests
- Returnerer Promise
- Første argument: URL
- Andet argument: Options (method, headers, body)
- `.then()` håndterer success
- `.catch()` håndterer errors

#### React: Error handling
**Hvor at læse:**
- `src/pages/Recipes.jsx` linje 15-36: Try-catch i async funktion
- `src/pages/Recipes.jsx` linje 12, 24-32: Error state
- `src/pages/Recipes.jsx` linje 77: Error display i UI
- `src/utils/toast.js`: Toast notifications
- `src/pages/Recipes.jsx` linje 37: `showErrorToast()` - user notification

**Hvad at forstå:**
- **Try-catch**: Håndterer errors i async kode
- **Error state**: `useState` til at holde error messages
- **User notification**: Toast notifications og error messages
- **Error display**: Conditional rendering baseret på error state

#### Security/Routing/Styling: Caddy purpose
**Hvor at læse:**
- ❌ Ingen kode - kun konceptuelt

**Hvad at forstå (konceptuelt):**
- **Reverse proxy**: Ruter requests til backend API
- **Static files**: Serverer React build (`dist/` folder)
- **HTTPS**: Automatisk Let's Encrypt certificates
- **Deployment pipeline**: CI/CD → Build → Deploy til Caddy

---

### Question 5

#### JS: async/await vs sync
**Hvor at læse:**
- `src/pages/Recipes.jsx` linje 15-36: `async` funktion med `await`
- `src/apiFacade.js` linje 5-18: `async function handleHttpErrors()`
- `src/pages/Admin.jsx` linje 15-36: `async` funktion

**Hvad at forstå:**
- **Synchronous**: Kode kører linje for linje, blokerer
- **Asynchronous**: Kode kan køre i baggrunden, ikke blokerer
- `async`/`await`: Syntaktisk sukker for Promises
- `await` venter på Promise resolve
- Async kode er non-blocking

#### React: Conditional rendering
**Hvor at læse:**
- `src/pages/Recipes.jsx` linje 75-78: `{loading && ...}` - Logical AND
- `src/pages/Recipes.jsx` linje 77: `{error && ...}` - Logical AND
- `src/pages/Recipes.jsx` linje 79-83: Ternary operator
- `src/components/Layout.jsx` linje 48-76: Ternary operator med JSX
- `src/components/RecipeModal.jsx` linje 48: Early return
- `src/components/IngredientsList.jsx` linje 5: Early return

**Hvad at forstå:**
- **Ternary**: `condition ? trueValue : falseValue`
- **Logical AND**: `condition && <Component />`
- **Early return**: `if (!condition) return null;`
- Brug conditional rendering til at vise/skjule UI baseret på state

#### Security/Routing/Styling: JWT flow
**Hvor at læse:**
- `src/pages/Login.jsx` linje 17-32: Login flow
- `src/security/Auth.jsx` linje 17-24: Login funktion
- `src/apiFacade.js` linje 124-134: Login API call
- `src/apiFacade.js` linje 95-105: Token storage
- `src/apiFacade.js` linje 153-167: Token decoding
- `src/apiFacade.js` linje 29: Authorization header

**Hvad at forstå:**
1. User indtaster credentials
2. Frontend sender POST til `/api/auth/login`
3. Backend returnerer JWT token
4. Token gemmes i localStorage/sessionStorage
5. Token sendes i Authorization header på alle requests
6. Backend verificerer token og returnerer data

---

### Question 6

#### JS: localStorage vs sessionStorage
**Hvor at læse:**
- `src/apiFacade.js` linje 95-105: `setToken()` - bruger begge
- `src/apiFacade.js` linje 107-113: `getToken()` - tjekker begge
- `src/apiFacade.js` linje 82-93: `isAdmin()` - tjekker om admin

**Hvad at forstå:**
- **localStorage**: Persisterer efter browser lukkes, deles mellem tabs
- **sessionStorage**: Slettes når tab lukkes, isoleret per tab
- **I vores kode**: Admin tokens i sessionStorage, normale i localStorage
- **Security**: Admin tokens forsvinder når browser lukkes

#### JS: Storage i browser dev tools
**Hvor at læse:**
- ❌ Ingen kode - visuelt i browser

**Hvad at forstå:**
- Åbn DevTools → Application tab → Storage
- Se localStorage og sessionStorage
- Se JWT tokens gemt under "jwtToken" key

#### React: useEffect hook
**Hvor at læse:**
- `src/pages/Recipes.jsx` linje 38-40: `useEffect(() => {...}, [loadRecipes])`
- `src/pages/Admin.jsx` linje 38-40: `useEffect(() => {...}, [loadUsers])`
- `src/components/RecipeModal.jsx` linje 30-34: `useEffect(() => {...}, [recipeId, loadRecipeDetails])`

**Hvad at forstå:**
- **Purpose**: Side effects (API calls, subscriptions, DOM manipulation)
- **Callback**: Funktion der kører efter render
- **Dependency array**: `[]` = kør kun én gang, `[value]` = kør når value ændres
- **Cleanup**: Return funktion for cleanup (fx unsubscribe)

#### Security/Routing/Styling: JWT token parts
**Hvor at læse:**
- `src/apiFacade.js` linje 153-167: `getUserNameAndRoles()` - dekoder JWT
- `src/apiFacade.js` linje 157-158: Token splitting og decoding

**Hvad at forstå:**
- JWT har 3 dele: `header.payload.signature`
- **Header**: Algorithm og type
- **Payload**: Data (username, roles, expiration)
- **Signature**: Verificerer token ikke er ændret
- Base64 encoded, dekodes med `window.atob()`

#### Security/Routing/Styling: JWT usage i React
**Hvor at læse:**
- `src/apiFacade.js` linje 29: Authorization header
- `src/apiFacade.js` linje 95-105: Token storage
- `src/apiFacade.js` linje 107-113: Token retrieval
- `src/security/Auth.jsx` linje 17-24: Login flow
- `src/components/Layout.jsx` linje 62: Role checking

**Hvad at forstå:**
- Token gemmes efter login
- Token sendes i `Authorization: Bearer {token}` header
- Token dekodes for at få user info
- Token bruges til authorization checks

---

### Question 7

#### JS: DOM manipulation
**Hvor at læse:**
- `src/utils/toast.js` - Hele filen er DOM manipulation eksempel
- `src/utils/toast.js` linje 20-30: `createElement()`, `appendChild()`
- `src/utils/toast.js` linje 32-40: `setAttribute()`, `classList`
- `src/utils/toast.js` linje 50-54: `removeChild()`
- `src/main.jsx` linje 6: `document.getElementById()`

**Hvad at forstå:**
- `document.createElement()` - Opretter nye elementer
- `appendChild()` - Tilføjer elementer til DOM
- `removeChild()` - Fjerner elementer fra DOM
- `setAttribute()` / `classList` - Manipulerer attributter
- `querySelector()` / `getElementById()` - Finder elementer

#### React: Event handling
**Hvor at læse:**
- `src/pages/Login.jsx` linje 51: `onSubmit={performLogin}`
- `src/pages/Login.jsx` linje 61, 75: `onChange={onChange}`
- `src/pages/Recipes.jsx` linje 63: `onClick={() => setSelectedCategory(category)}`
- `src/pages/Admin.jsx` linje 174: `onClick={() => toggleUser(user.username)}`
- `src/components/RecipeModal.jsx` linje 52: `onClick={(e) => e.stopPropagation()}`

**Hvad at forstå:**
- **onClick**: Mouse click events
- **onChange**: Input change events
- **onSubmit**: Form submit events
- **Event handlers**: Funktioner der kaldes ved events
- **Synthetic events**: React wrapper omkring native events

#### React: Form submit events
**Hvor at læse:**
- `src/pages/Login.jsx` linje 17-32: `performLogin` funktion
- `src/pages/Login.jsx` linje 16: `evt.preventDefault()`
- `src/pages/Login.jsx` linje 51: `onSubmit={performLogin}`

**Hvad at forstå:**
- `onSubmit` handler på `<form>` element
- `evt.preventDefault()` forhindrer default form submit (page reload)
- Form data hentes fra state (controlled components)
- Async handling med try-catch

#### Security/Routing/Styling: Login process med JWT
**Hvor at læse:**
- `src/pages/Login.jsx` linje 17-32: Komplet login flow
- `src/security/Auth.jsx` linje 17-24: Login funktion
- `src/apiFacade.js` linje 124-134: API call
- `src/apiFacade.js` linje 95-105: Token storage

**Hvad at forstå:**
1. User indtaster username/password
2. Form submit → `performLogin()`
3. `evt.preventDefault()` - forhindrer page reload
4. API call til `/api/auth/login`
5. Backend verificerer credentials
6. Backend returnerer JWT token
7. Token gemmes i storage
8. User state opdateres
9. Redirect baseret på role

---

### Question 8

#### JS: Event bubbling
**Hvor at læse:**
- `src/components/RecipeModal.jsx` linje 51-52: `onClick` handlers
- `src/components/RecipeModal.jsx` linje 52: `e.stopPropagation()`

**Hvad at forstå:**
- **Event bubbling**: Events "bobler op" fra child til parent elementer
- `stopPropagation()`: Stopper event fra at boble op
- I modal: Click på overlay lukker modal, click på modal indhold stopper propagation

#### React: map function og key attribute
**Hvor at læse:**
- `src/pages/Recipes.jsx` linje 61, 88: `.map()` med `key` prop
- `src/pages/Admin.jsx` linje 164, 194, 227: `.map()` med `key` prop
- `src/components/IngredientsList.jsx` linje 11: `.map()` med `key` prop

**Hvad at forstå:**
- `.map()` transformerer array til JSX elementer
- **key prop**: Unik identifier for hvert element
- **Purpose**: Hjælper React med at identificere hvilke elementer der er ændret
- **Performance**: Uden key skal React re-rendere hele listen
- **Best practice**: Brug unik ID, ikke index (hvis muligt)

#### Security/Routing/Styling: HTTPS på deployed websites
**Hvor at læse:**
- ❌ Ingen kode - kun konceptuelt

**Hvad at forstå (konceptuelt):**
- HTTPS krypterer data mellem browser og server
- Caddy håndterer Let's Encrypt certificates automatisk
- Certificates fornyes automatisk
- HTTPS er påkrævet for production apps

---

### Question 9

#### JS: Variable scope
**Hvor at læse:**
- `src/utils/logger.js` linje 1-50: Kommentarer om scope
- `src/utils/toast.js` linje 1-60: Kommentarer om scope
- `src/apiFacade.js` linje 1, 56: Global vs local scope
- `src/pages/Recipes.jsx` linje 8, 9-13: Global vs local scope

**Hvad at forstå:**
- **Global scope**: Variabler defineret udenfor funktioner, tilgængelige overalt
- **Local scope**: Variabler defineret i funktioner, kun tilgængelige i funktionen
- **Block scope**: `let` og `const` er block-scoped (if, for, etc.)
- **Function scope**: `var` er function-scoped
- **Module scope**: `const`/`let` i top-level er module-scoped (ikke global)

#### React: Controlled vs uncontrolled components
**Hvor at læse:**
- `src/pages/Login.jsx` linje 56-77: Controlled components
- `src/pages/Login.jsx` linje 62, 76: `value` og `onChange` props

**Hvad at forstå:**
- **Controlled**: React kontrollerer input value via state
- **Uncontrolled**: DOM kontrollerer input value (refs)
- **Controlled eksempel**: `value={credentials.username}` + `onChange={onChange}`
- **Fordele**: Single source of truth, lettere validation, lettere testing

#### Security/Routing/Styling: Sub-routing
**Hvor at læse:**
- `src/App.jsx` linje 19-31: Nested routes under Layout
- `src/components/Layout.jsx` linje 82: `<Outlet />` renderer child routes
- `src/App.jsx` linje 27-29: Admin route med RequireAdmin wrapper

**Hvad at forstå:**
- **Nested routes**: Routes inden i andre routes
- **Outlet**: Renderer child route komponenter
- **Layout pattern**: Fælles layout (header, nav) med skiftende indhold
- **Protected routes**: Wrapper komponenter (RequireAuth, RequireAdmin)

---

### Question 10

#### JS: Spread operator vs rest operator
**Hvor at læse:**
- `src/pages/Login.jsx` linje 53: Spread operator `...credentials`
- `src/pages/Admin.jsx` linje 48, 69, 221: Spread operator `...prev`, `...newRoleForUser`
- `src/utils/logger.js` linje 18: Rest operator `...args`

**Hvad at forstå:**
- **Spread operator** (`...`): Ekspanderer arrays/objects
  - Eksempel: `{...prev, newKey: value}` - kopierer object og tilføjer property
- **Rest operator** (`...`): Samler argumenter i array
  - Eksempel: `function log(level, message, ...args)` - args er array med ekstra argumenter
- **Forskellen**: Spread ekspanderer, rest samler

#### React: React Hooks
**Hvor at læse:**
- `src/pages/Recipes.jsx` linje 1, 9-13: `useState` hooks
- `src/pages/Recipes.jsx` linje 15, 38: `useCallback`, `useEffect`
- `src/security/Auth.jsx` linje 1, 7, 38: `useState`, `useContext`
- `src/pages/Login.jsx` linje 14: `useNavigate` hook

**Hvad at forstå:**
- **Hooks**: Funktioner der giver React features til funktionelle komponenter
- **useState**: State management
- **useEffect**: Side effects
- **useCallback**: Memoize funktioner
- **useContext**: Access context
- **Rules**: Kun kald hooks i top-level, ikke i loops/conditions

#### React: Error handling
**Hvor at læse:**
- `src/pages/Recipes.jsx` linje 15-36: Try-catch i async funktion
- `src/pages/Recipes.jsx` linje 12, 24-32: Error state
- `src/pages/Recipes.jsx` linje 77: Error display
- `src/utils/toast.js`: Toast notifications
- `src/pages/Recipes.jsx` linje 37: `showErrorToast()`

**Hvad at forstå:**
- **Try-catch**: Håndterer errors i async kode
- **Error state**: `useState` til at holde error messages
- **User notification**: Toast notifications og error messages i UI
- **Error boundaries**: (Avanceret) Catcher errors i child komponenter

#### Security/Routing/Styling: SOP og CORS
**Hvor at læse:**
- `src/apiFacade.js` linje 1-20: Omfattende CORS/SOP kommentarer
- `src/apiFacade.js` linje 65-68: CORS error message

**Hvad at forstå:**
- **SOP (Same Origin Policy)**: Browser sikkerhed - blokerer cross-origin requests
- **CORS (Cross-Origin Resource Sharing)**: Måde at tillade cross-origin requests
- **Same origin**: Samme protokol, domæne, port
- **CORS headers**: Backend skal sende `Access-Control-Allow-Origin` etc.
- **Preflight**: Browser sender OPTIONS request først

---

### Question 11

#### JS: async/await vs sync
**Hvor at læse:**
- `src/pages/Recipes.jsx` linje 15-36: `async` funktion
- `src/apiFacade.js` linje 5-18: `async function handleHttpErrors()`
- `src/pages/Admin.jsx` linje 15-36: `async` funktion

**Hvad at forstå:**
- **Synchronous**: Kode kører sekventielt, blokerer
- **Asynchronous**: Kode kan køre i baggrunden, ikke blokerer
- `async`/`await`: Syntaktisk sukker for Promises
- `await` venter på Promise resolve
- Async kode er non-blocking

#### React: Lifting state up
**Hvor at læse:**
- `src/security/Auth.jsx`: Context API - delt state
- `src/components/Layout.jsx` linje 8: `useAuth()` - bruger delt state
- `src/pages/Login.jsx` linje 12: `useAuth()` - bruger delt state

**Hvad at forstå:**
- **Lifting state up**: Flytter state til fælles parent
- **Context API**: Alternativ til prop drilling
- **Problem det løser**: Undgår at sende props gennem mange komponenter
- **I vores kode**: Auth state deles via Context, ikke props

#### Security/Routing/Styling: Flexbox i CSS Modules
**Hvor at læse:**
- `src/components/Layout.module.css` linje 16-19, 38-41: Flexbox
- `src/pages/Recipes.module.css` linje 27-30: Flexbox
- `src/components/RecipeModal.module.css` linje 107-110, 120-125: Flexbox

**Hvad at forstå:**
- **CSS Modules**: Scoped CSS per komponent
- **Flexbox**: `display: flex` med `justify-content`, `align-items`, etc.
- **Brug**: Navigation bars, centrering, spacing
- **Fordele**: Scoped styling, ingen class name collisions

---

### Question 12

#### JS: fetch med error handling (GET og POST)
**Hvor at læse:**
- `src/apiFacade.js` linje 56-80: `apiCall()` - generisk fetch wrapper
- `src/apiFacade.js` linje 62-78: Error handling med `.catch()`
- `src/apiFacade.js` linje 175-178: GET request eksempel
- `src/apiFacade.js` linje 184-186: POST request eksempel
- `src/apiFacade.js` linje 124-134: POST login eksempel

**Hvad at forstå:**
- **GET**: Henter data, ingen body
- **POST**: Sender data, body med data
- **Error handling**: `.catch()` for network errors, `.then(handleHttpErrors)` for HTTP errors
- **Options**: Method, headers, body

#### React: Conditional rendering
**Hvor at læse:**
- `src/pages/Recipes.jsx` linje 75-78: `{loading && ...}`
- `src/pages/Recipes.jsx` linje 77: `{error && ...}`
- `src/pages/Recipes.jsx` linje 79-83: Ternary operator
- `src/components/Layout.jsx` linje 48-76: Ternary operator

**Hvad at forstå:**
- **Ternary**: `condition ? trueValue : falseValue`
- **Logical AND**: `condition && <Component />`
- **Early return**: `if (!condition) return null;`

#### Security/Routing/Styling: Flexbox og Grid
**Hvor at læse:**
- `src/components/Layout.module.css`: Grid og Flexbox eksempler
- `src/pages/Recipes.module.css`: Grid layout
- `src/components/RecipeModal.module.css`: Grid layout

**Hvad at forstå:**
- **Flexbox**: 1D layout, god til navigation, buttons
- **Grid**: 2D layout, god til komplekse layouts
- **Eksempler**: Se CSS filer for konkrete implementeringer

---

### Question 13

#### JS: Higher-order functions
**Hvor at læse:**
- `src/apiFacade.js` linje 40-42: `.forEach()`
- `src/pages/Recipes.jsx` linje 61, 88: `.map()`
- `src/apiFacade.js` linje 62-78: `.then()`, `.catch()`
- `src/pages/Recipes.jsx` linje 15, 38: `useCallback()`, `useEffect()`

**Hvad at forstå:**
- Higher-order functions tager funktioner som argumenter eller returnerer funktioner
- Array methods: `.map()`, `.filter()`, `.forEach()`
- Promise methods: `.then()`, `.catch()`
- React hooks: `useCallback()`, `useEffect()`

#### React: Props inkl. children
**Hvor at læse:**
- `src/security/Auth.jsx` linje 6: `{ children }` prop
- `src/components/IngredientsList.jsx` linje 4: Props
- `src/components/Layout.jsx` linje 82: `<Outlet />` (children)

**Hvad at forstå:**
- Props: Data sendt fra parent til child
- children: Speciel prop med indhold mellem tags
- Props er read-only

#### React: State i React component
**Hvor at læse:**
- `src/pages/Recipes.jsx` linje 9-13: `useState` hooks
- `src/pages/Admin.jsx` linje 8-13: `useState` hooks

**Hvad at forstå:**
- State: Data der kan ændres og trigger re-render
- `useState` returnerer [value, setter]
- State er lokal til komponenten

#### Security/Routing/Styling: Login process med JWT
**Hvor at læse:**
- `src/pages/Login.jsx` linje 17-32: Login flow
- `src/security/Auth.jsx` linje 17-24: Login funktion
- `src/apiFacade.js` linje 124-134: API call
- `src/apiFacade.js` linje 95-105: Token storage

**Hvad at forstå:**
1. User indtaster credentials
2. API call til backend
3. Backend returnerer JWT token
4. Token gemmes
5. User state opdateres
6. Redirect baseret på role

---

## 🎯 QUICK REFERENCE - Hvor finder jeg...?

### Authentication & Security
- **Login flow**: `src/pages/Login.jsx` + `src/security/Auth.jsx`
- **JWT token handling**: `src/apiFacade.js` linje 82-167
- **Protected routes**: `src/security/RequireAuth.jsx`, `src/security/RequireAdmin.jsx`

### API Calls
- **All API calls**: `src/apiFacade.js`
- **Error handling**: `src/apiFacade.js` linje 5-18, 62-78
- **CORS/SOP**: `src/apiFacade.js` linje 1-20 (kommentarer)

### React Patterns
- **Components**: Alle filer i `src/pages/` og `src/components/`
- **State management**: `useState` i alle komponenter
- **Context API**: `src/security/Auth.jsx`
- **Routing**: `src/App.jsx` + `src/components/Layout.jsx`

### JavaScript Concepts
- **Higher-order functions**: `src/apiFacade.js`, `src/pages/Recipes.jsx`
- **Async/await**: `src/pages/Recipes.jsx`, `src/pages/Admin.jsx`
- **DOM manipulation**: `src/utils/toast.js`
- **Rest operator**: `src/utils/logger.js`
- **Spread operator**: `src/pages/Login.jsx`, `src/pages/Admin.jsx`
- **Variable scope**: Kommentarer i `src/utils/logger.js`, `src/utils/toast.js`

### Styling
- **Flexbox**: `src/components/Layout.module.css`, `src/pages/Recipes.module.css`
- **Grid**: `src/components/Layout.module.css`, `src/pages/Recipes.module.css`
- **CSS Modules**: Alle `.module.css` filer

---

## 📝 EKSAMEN TIPS

1. **Vælg 2-3 konkrete eksempler per koncept** - ikke for mange, ikke for få
2. **Forklar flowet** - ikke bare "her er koden", men "her er hvad der sker"
3. **Nævn fordele** - hvorfor bruger vi dette pattern/koncept?
4. **Vis alternativer** - hvad ville vi gøre uden dette? (fx vanilla JS vs React)
5. **Forklar sammenhængen** - hvordan arbejder dele sammen? (fx Auth context + protected routes)

---

**God eksamen! 🚀**

