# EcoResolve AI

Environmental incident reporting and resolution platform.

## Repository layout

```
client/       React + Vite frontend (plain JavaScript)
server/       Node + Express + Mongoose API (scaffold)
ai-service/   Python 3.11 + FastAPI agent pipeline (scaffold)
tests/        e2e-playwright (TypeScript), api-restassured (Java/Maven/TestNG)
docs/         diagrams, report chapter drafts, learning-log.md
```

## Local setup

### Client

```bash
cd client
cp .env.example .env   # set VITE_API_URL
npm install
npm run dev            # dev server
npm run build          # production build to client/dist
npm run lint           # oxlint
```

### Server

```bash
cd server
cp .env.example .env   # MONGODB_URI, JWT_SECRET, CLOUDINARY_*, AI_SERVICE_URL, CLIENT_URL
```

> You can also run `npm run dev`, `npm run build` or `npm run lint` from the repository root — the root `package.json` forwards them to `client/`.
