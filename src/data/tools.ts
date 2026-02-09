export interface Tool { name: string; slug: string; description: string; icon: string; category: string; }
export interface Category { id: string; name: string; icon: string; }

export const categories: Category[] = [
  { id: 'body', name: 'Body Metrics', icon: '⚖️' },
  { id: 'nutrition', name: 'Nutrition & Diet', icon: '🥗' },
  { id: 'fitness', name: 'Fitness & Exercise', icon: '💪' },
  { id: 'wellness', name: 'Wellness & Lifestyle', icon: '🧘' },
];

export const tools: Tool[] = [
  { name: 'BMI Calculator', slug: 'bmi-calc', description: 'Calculate your Body Mass Index and see your category.', icon: '⚖️', category: 'body' },
  { name: 'Body Fat Calculator', slug: 'body-fat', description: 'Estimate body fat percentage using the US Navy method.', icon: '📏', category: 'body' },
  { name: 'Ideal Weight', slug: 'ideal-weight', description: 'Calculate ideal body weight using multiple formulas.', icon: '🎯', category: 'body' },
  { name: 'Calorie Calculator', slug: 'calorie-calc', description: 'Calculate daily calorie needs based on activity level.', icon: '🔥', category: 'nutrition' },
  { name: 'Macro Calculator', slug: 'macro-calc', description: 'Calculate protein, carbs, and fat targets.', icon: '🥩', category: 'nutrition' },
  { name: 'Water Intake', slug: 'water-intake', description: 'Calculate how much water you should drink daily.', icon: '💧', category: 'nutrition' },
  { name: 'Heart Rate Zones', slug: 'heart-rate', description: 'Calculate target heart rate zones for exercise.', icon: '❤️', category: 'fitness' },
  { name: 'One Rep Max', slug: 'one-rep-max', description: 'Estimate your one rep max from lighter lifts.', icon: '🏋️', category: 'fitness' },
  { name: 'Pace Calculator', slug: 'pace-calc', description: 'Calculate running pace, time, or distance.', icon: '🏃', category: 'fitness' },
  { name: 'Sleep Calculator', slug: 'sleep-calc', description: 'Find optimal bedtime and wake times by sleep cycles.', icon: '😴', category: 'wellness' },
  { name: 'BAC Calculator', slug: 'bac-calc', description: 'Estimate blood alcohol content based on drinks.', icon: '🍺', category: 'wellness' },
  { name: 'Due Date Calculator', slug: 'due-date', description: 'Estimate pregnancy due date from last period.', icon: '👶', category: 'wellness' },
];

export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter(t => t.category === categoryId);
}
