export const api = {
  getTemplates: async () => [
    { id: 1, name: 'Invoice Template', category: 'Finance' },
    { id: 2, name: 'Project Brief', category: 'Operations' },
    { id: 3, name: 'Client Summary', category: 'Sales' },
  ],

  getDocuments: async () => [
    { id: 1, title: 'Quarterly Report', status: 'Ready' },
    { id: 2, title: 'Team Onboarding', status: 'Draft' },
    { id: 3, title: 'Marketing Plan', status: 'Review' },
  ],
}
