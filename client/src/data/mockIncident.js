// Mock of the STORED incident document (GET /api/incidents/:id shape), not the raw /analyze reply.
// Core (Session A) uses image, description, status and ai.confidence.
// Session B adds the full AiResultCard on top of the same object.
export const mockIncident = {
  _id: 'demo-001',
  description: 'Plastic dumped near the school gate, call [PHONE]',
  image: { url: 'https://placehold.co/640x400?text=Incident+photo', width: 640, height: 400 },
  location: { type: 'Point', coordinates: [80.2707, 13.0827] }, // [lng, lat]
  sensitiveLocations: ['school'],
  affectedArea: 'medium',
  status: 'submitted',
  createdAt: '2026-11-23T10:15:00Z',
  ai: {
    status: 'done', // 'pending' | 'done' | 'failed'
    category: 'plastic_waste',
    confidence: 0.71, // try 0.30 to see the "Needs review" chip
    needsReview: false, // the API sets it; the UI re-derives it
    scores: { plastic_waste: 0.71, mixed_waste: 0.18, sewage: 0.04 },
    duplicate: { isDuplicate: false, matchId: null, imageSimilarity: 0.62, textSimilarity: 0.41, distanceM: 42 },
    priority: {
      score: 0.74,
      band: 'High',
      factors: [
        { name: 'issueSeverity', value: 0.5, weight: 0.3, contribution: 0.15 },
        { name: 'sensitiveLocation', value: 1.0, weight: 0.25, contribution: 0.25 },
        { name: 'affectedArea', value: 0.6, weight: 0.15, contribution: 0.09 },
        { name: 'reportFrequency', value: 0.8, weight: 0.15, contribution: 0.12 },
        { name: 'modelConfidence', value: 0.71, weight: 0.15, contribution: 0.13 },
      ],
    },
    recommendation: {
      department: 'Solid Waste Management',
      precautions: ['Keep children away from the dump site'],
      actionSteps: ['Log with the ward office', 'Schedule collection'],
      sources: [{ title: 'Source title', url: '#' }],
    },
  },
};
