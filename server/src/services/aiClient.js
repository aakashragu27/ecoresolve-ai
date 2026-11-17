// Talks to the Python AI service. Used by POST /api/incidents from Wed 18.
const AI_TIMEOUT_MS = 60_000; // the 60-second timeout from "Order of work"

export async function analyze(payload) {
  const res = await fetch(`${process.env.AI_SERVICE_URL}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(AI_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`AI service returned ${res.status}`);
  return res.json();
}

export async function aiHealth() {
  const res = await fetch(`${process.env.AI_SERVICE_URL}/health`, {
    signal: AbortSignal.timeout(10_000),
  });
  return res.json();
}