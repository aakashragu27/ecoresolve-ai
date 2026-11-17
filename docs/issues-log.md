# Issues log: problems met during the build

One entry per real problem: what I saw, why it happened, how I fixed it, and what I learned.
Newest entries go at the bottom. This feeds report chapter 5 (Implementation) and the viva.

| # | Date | Step | Issue | Status |
|---|------|------|-------|--------|
| 1 | 14 Nov 2026 | Quick Start | Practice app built inside the project repo | Fixed |
| 2 | 17 Nov 2026 | AI stub · tests | `pytest.exe` blocked by Windows App Control | Fixed |
| 3 | 17 Nov 2026 | AI stub · Node client | `fetch failed` / `ECONNREFUSED` on port 8000 | Fixed |
| 4 | 17 Nov 2026 | AI stub · tests | Starlette warning about `httpx` | Open (harmless) |

---

## 1. Practice app built inside the project repo

- **Symptom:** the react.dev Quick Start app was in `client/` (its package name was `quickstart-ecoresolve`). It was committed in the same commit as the Express health API.
- **Cause:** the Vite setup command was run inside `ecoresolve-ai/` instead of `~/practice/`. That breaks the isolation rule QS-NFR-07.
- **Fix:** copied the app to `~/practice/quickstart-ecoresolve`. `client/` is rebuilt as the real Vite + MUI app, so the practice code leaves the repo.
- **Lesson:** keep practice code outside the project, and make one commit per concern (`feat:` API work separate from front-end work). Then the history stays useful as evidence of progress.

## 2. `pytest.exe` blocked by Windows App Control

- **Symptom:** `pytest -v` failed with *"An Application Control policy has blocked this file"*.
- **Cause:** pip creates small, unsigned launcher files such as `.venv\Scripts\pytest.exe` and `uvicorn.exe`. Windows 11 Smart App Control blocks unsigned executables. `python.exe` is signed, so it is allowed.
- **Fix:** run tools through Python: `python -m pytest -v` and `python -m uvicorn app.main:app --reload --port 8000`. All 4 tests passed. Smart App Control was left on, because once it is turned off it cannot be turned back on without reinstalling Windows.
- **Lesson:** `python -m <tool>` always uses the active venv's interpreter, so it is the safer habit on any machine.

## 3. `fetch failed` / `ECONNREFUSED` from the Node API

- **Symptom:** the `aiHealth()` check in `server/src/services/aiClient.js` failed with `ECONNREFUSED` on `::1:8000` and `127.0.0.1:8000`.
- **Cause:** the FastAPI service was not running, so nothing was listening on port 8000. The code and `AI_SERVICE_URL` were correct. (`localhost` resolves to both the IPv6 and the IPv4 address, which is why there were two errors.)
- **Fix:** run the AI service in its own terminal and keep it open (`python -m uvicorn …`), then run the Node check in a second terminal. It returned `{ ok: true, modelsLoaded: false, mode: 'stub' }`.
- **Lesson:** this is exactly the failure FR-19 plans for. The AI service can be down, so `POST /api/incidents` catches the error, saves the incident anyway and sets `ai.status = "failed"`. A citizen's report is never lost.

## 4. Starlette deprecation warning (open)

- **Symptom:** the tests pass with one warning: *"Using `httpx` with `starlette.testclient` is deprecated; install `httpx2` instead."*
- **Cause:** a newer Starlette release changed the HTTP library its test client prefers.
- **Decision:** leave it for now. It is a notice, not a failure. Review it in week 3, when the AI service gets its real libraries (CLIP, sentence-transformers, ChromaDB).

---

## Template for new entries

```
## N. <short title>

- **Symptom:** what I saw (the exact error message)
- **Cause:** why it happened
- **Fix:** what I changed, and how I confirmed it works
- **Lesson:** what I would do differently, or how it links to a requirement
```
