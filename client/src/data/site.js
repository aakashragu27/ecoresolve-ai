// Row 4 · Displaying data — all page text lives here, components read it via props.
export const site = {
  title: 'EcoResolve AI',
  tagline:
    'Spot an environmental problem in your area? Snap a photo, report it in a minute, and let AI route it to the right department.',
  year: 2026,
  services: [
    {
      id: 'report',
      icon: '📸',
      title: 'Report an Issue',
      points: ['Upload a photo of the problem', 'Pin the location on a map', 'Add a short description'],
      linkText: 'Start a report',
    },
    {
      id: 'my-reports',
      icon: '📋',
      title: 'My Reports',
      points: ['See every report you filed', 'Follow each status change', 'Get notified when resolved'],
      linkText: 'View my reports',
    },
    {
      id: 'ai-analysis',
      icon: '🤖',
      title: 'AI Analysis',
      points: ['Automatic category detection', 'Duplicate check nearby', 'Priority score with reasons'],
      linkText: 'How the AI works',
    },
    {
      id: 'contact',
      icon: '✉️',
      title: 'Contact',
      points: ['Questions about a report', 'Feedback on the service'],
      linkText: 'Get in touch',
    },
  ],
};
