interface State {
  id: string | number;
  name: string;
  code: string;
  category: string;
}

export const states: State[] = [
  { id: 'all', name: 'All State', code: 'allState', category: 'all' },
  { id: 12, name: 'Gujarat', code: 'GJ', category: 'gj' },
  { id: 14, name: 'Himachal Pradesh', code: 'HP', category: 'hp' },
  { id: 33, name: 'Uttar Pradesh', code: 'UP', category: 'up' },
  { id: 29, name: 'Rajasthan', code: 'RJ', category: 'rj' },
  { id: 20, name: 'Madhya Pradesh', code: 'MP', category: 'mp' },
];
