export interface UserProfile {
  id: string;
  name: string;
  age: number;
  height: number; // cm
  weight: number; // kg
  sex: "M" | "F";
  goal: "Ipertrofia" | "Forza" | "Definizione" | "Mantenimento";
  createdAt: string;
}

export interface WeightHistory {
  date: string;
  weight: number;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number; // kg
  lastSessionWeight?: number;
  lastSessionReps?: number;
  estimatedMax?: number;
}

export interface Workout {
  id: string;
  name: string; // es. "Lunedì - Petto/Tricipiti"
  exercises: Exercise[];
  dayOfWeek: number; // 0-6
}

export interface WorkoutSession {
  id: string;
  workoutId: string;
  date: string;
  exercises: {
    exerciseId: string;
    completedSets: {
      weight: number;
      reps: number;
      completed: boolean;
    }[];
  }[];
  totalVolume: number; // kg
  duration: number; // minuti
}

export interface Supplement {
  id: string;
  name: string;
  dosage: number;
  unit: "g" | "capsule" | "ml";
  frequency: "giornaliero" | "pre-workout" | "post-workout" | "personalizzato";
  time?: string; // HH:mm
  completed?: boolean;
  completedDate?: string;
}

export interface NutritionTarget {
  calories: number;
  protein: number; // g
  carbs: number; // g
  fat: number; // g
}

export interface MealEntry {
  id: string;
  name: string;
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  isFavorite?: boolean;
}
