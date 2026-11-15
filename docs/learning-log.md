# Learning log — react.dev Quick Start (Session A · Fri 13 Nov 2026)

1. **Creating and nesting components** — a component is a function returning markup; its name must start with a capital letter, and `App` nests `TopBar`, `Hero`, `ServiceCards`, `CategoryList`, `IncidentPreview` and `Footer` like HTML tags.
2. **Writing markup with JSX** — JSX is stricter than HTML: `className` not `class`, every tag closed (`<img />`), one root per component, using `<>…</>` when I need no wrapper div.
3. **Adding styles** — styles go in plain CSS and attach through `className`; putting EPA tokens in `:root` CSS variables means changing `--color-primary` recolours every button at once.
4. **Displaying data** — curly braces `{ }` escape back into JavaScript inside JSX, so `{title}` and `src={incident.image.url}` read values from `site.js` and the mock.
5. **Conditional rendering** — use `cond ? <A/> : <B/>` for either/or (Login vs "Hi, name" + Logout) and `cond && <A/>` for show/hide ("Needs review" when confidence < 0.45).
6. **Rendering lists** — `array.map()` turns data into elements; each needs a stable, unique `key` (`c.id`) so React can match items between renders — never the array index for data that can change.
7. **Responding to events** — pass the handler, don't call it: `onClick={handleReport}` runs on click, while `onClick={handleReport()}` would run during render.
8. **State, Hooks and sharing data** — `useState` gives a component memory; two `ReportCounter`s with their own state count separately, so I lifted `count` into `IncidentPreview` and passed `count` + `onClick` down as props so both move together.
9. **Express health API** — `index.js` loads `.env` with dotenv, connects to Atlas with `mongoose.connect` before `app.listen`, and `GET /api/health` returns `{ ok: true }`, which Render uses to wake the sleeping free-tier service.
