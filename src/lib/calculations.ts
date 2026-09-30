// Calcolo del massimale stimato (Epley formula)
export function calculateEstimatedMax(weight: number, reps: number): number {
  if (reps === 1) return weight;
  return Math.round(weight * (1 + reps / 30));
}

// Calcolo del TDEE base (Harris-Benedict)
export function calculateTDEE(
  age: number,
  height: number,
  weight: number,
  sex: "M" | "F"
): number {
  let bmr: number;

  if (sex === "M") {
    bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  } else {
    bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  }

  const activityFactor = 1.375; // Allenamento moderato
  return Math.round(bmr * activityFactor);
}

// Target macro per obiettivo
export function getMacroTargets(
  tdee: number,
  goal: string,
  weight: number
): { calories: number; protein: number; carbs: number; fat: number } {
  let proteinPerKg = 1.6;
  let carbPercentage = 0.45;
  let fatPercentage = 0.25;

  if (goal === "Ipertrofia") {
    proteinPerKg = 1.8;
    carbPercentage = 0.45;
    fatPercentage = 0.25;
  } else if (goal === "Forza") {
    proteinPerKg = 1.8;
    carbPercentage = 0.5;
    fatPercentage = 0.2;
  } else if (goal === "Definizione") {
    proteinPerKg = 2.0;
    carbPercentage = 0.35;
    fatPercentage = 0.25;
  }

  const protein = Math.round(weight * proteinPerKg);
  const calories = Math.round(tdee);
  const carbs = Math.round((calories * carbPercentage) / 4);
  const fat = Math.round((calories * fatPercentage) / 9);

  return { calories, protein, carbs, fat };
}

// Generazione suggerimenti dinamici
export function getDailyTips(goal: string): string[] {
  const tipsByGoal: Record<string, string[]> = {
    Ipertrofia: [
      "🔥 Bevi almeno 3-4 litri d'acqua: l'idratazione favorisce l'ipertrofia.",
      "🥛 Consuma 20-30g di proteine entro 30 min dopo l'allenamento.",
      "⏰ Dormi 7-9 ore: il riposo è quando i muscoli crescono.",
      "📈 Aumenta di 2.5-5kg il peso quando completi 3 serie da 10-12 reps.",
    ],
    Forza: [
      "💪 Priorità ai 5-6 reps con carichi alti: il focus è la forza maxima.",
      "⚡ Riposi 3-5 minuti tra le serie di esercizi pesanti.",
      "🍗 Proteine 1.8g per kg corporeo: essenziale per il recupero della forza.",
      "🧠 Concentrati sulla tecnica perfetta prima di aumentare il carico.",
    ],
    Definizione: [
      "🔥 Mantieni un deficit calorico di 300-500 kcal per la perdita di grasso.",
      "🚴 Cardio 3-4 volte a settimana per 20-30 minuti.",
      "🥚 Aumenta le proteine a 2g per kg di peso corporeo.",
      "📊 Traccia il peso settimanale: cali veloci = perdita muscolare.",
    ],
    Mantenimento: [
      "⚖️ Mantieni le calorie intorno al tuo TDEE calcolato.",
      "🏋️ Allena ogni gruppo muscolare 2 volte a settimana.",
      "🥗 Varia gli esercizi ogni 4-6 settimane per evitare il plateau.",
      "😌 Concediti un giorno di riposo completo a settimana.",
    ],
  };

  const tips = tipsByGoal[goal] || tipsByGoal["Mantenimento"];
  return tips.sort(() => Math.random() - 0.5).slice(0, 2);
}
