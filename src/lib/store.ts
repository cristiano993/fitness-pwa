export type Goal = 'Hypertrophy' | 'Strength' | 'Definition' | 'Maintenance';

export interface UserData {
  profile: {
    height: number;
    weight: number;
    age: number;
    gender: 'M' | 'F';
    goal: Goal;
    weightHistory: { date: string; weight: number }[];
  };
  routines: {
    id: string;
    name: string;
    exercises: {
      id: string;
      name: string;
      lastSet: { weight: number; reps: number };
    }[];
  }[];
  workoutLogs: any[];
  supplements: {
    id: string;
    name: string;
    dose: string;
    time: string;
    completed: boolean;
  }[];
  nutrition: {
    targets: { cal: number; p: number; c: number; f: number };
    dailyLogs: { [date: string]: { cal: number; p: number; c: number; f: number } };
    favorites: { name: string; p: number; c: number; f: number; cal: number }[];
  };
}
