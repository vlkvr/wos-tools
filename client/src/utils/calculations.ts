export interface HealingInput {
  wounded: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  helpers: number;
  allyHelpTime: number;
  totalWounded?: number;
}

export interface HealingResult {
  woundedPerBatch: number;
  requiredCycles?: number;
  totalTime?: string;
}

export function calculateHealing(input: HealingInput): HealingResult {
  const {
    wounded,
    days,
    hours,
    minutes,
    seconds,
    helpers,
    allyHelpTime,
    totalWounded,
  } = input;

  // Validation
  if (!wounded || wounded < 1 || wounded > 999999) {
    throw new Error(
      "Please enter a valid number of wounded troops (1-999,999).",
    );
  }

  if (helpers < 1 || helpers > 45) {
    throw new Error("Please enter a valid number of helpers (1-45).");
  }

  if (allyHelpTime < 1 || allyHelpTime > 257) {
    throw new Error("Please enter a valid ally help time (1-257 seconds).");
  }

  if (
    days < 0 ||
    days > 31 ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59 ||
    seconds < 0 ||
    seconds > 59
  ) {
    throw new Error("Please enter valid time values.");
  }

  if (
    totalWounded !== undefined &&
    (totalWounded < 1 || totalWounded > 999999)
  ) {
    throw new Error("Please enter a valid total wounded amount (1-999,999).");
  }

  // Calculate
  const inputSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;

  if (inputSeconds <= 0) {
    throw new Error("Please enter a valid healing time greater than 0.");
  }

  const targetSeconds = helpers * allyHelpTime; // Game formula with configurable ally help time
  const woundedPerBatch = Math.round((wounded * targetSeconds) / inputSeconds);

  const result: HealingResult = {
    woundedPerBatch,
  };

  if (totalWounded !== undefined) {
    const requiredCycles = Math.ceil(totalWounded / woundedPerBatch);
    const totalTimeSec = requiredCycles * 3;
    const timeMin = Math.floor(totalTimeSec / 60);
    const timeSec = totalTimeSec % 60;

    result.requiredCycles = requiredCycles;
    result.totalTime = `${timeMin}m ${timeSec}s`;
  }

  return result;
}

export function safeEval(expr: string): number {
  if (!expr || typeof expr !== "string") {
    return 0;
  }

  try {
    // Only allow numbers, spaces, and basic math operators
    if (/^[\d\s+\-*/().]+$/.test(expr)) {
      return Function('"use strict"; return (' + expr + ")")();
    }
  } catch {
    // If evaluation fails, return 0
  }

  return 0;
}

export function formatMinutes(mins: number): string {
  const m = mins % 60;
  const h = Math.floor(mins / 60) % 24;
  const d = Math.floor(mins / 1440);
  
  // Если только минуты (без дней и часов), не показываем скобки
  if (d === 0 && h === 0) {
    return `${mins} min`;
  }
  
  // Формируем компоненты для скобок
  let timeComponents = [];
  if (d > 0) timeComponents.push(`${d}d`);
  if (h > 0) timeComponents.push(`${h}h`);
  if (m > 0) timeComponents.push(`${m}m`);
  
  return `${mins} min (${timeComponents.join(' ')})`;
}

// Conditional formatting for calculator tables
export function getConditionalBackgroundStyle(
  earned: number,
  maxEarned: number,
) {
  if (maxEarned === 0) return {};
  const intensity = earned / maxEarned;
  const alpha = Math.round(intensity * 25); // Max 25% opacity for subtle effect
  return {
    backgroundColor: `rgba(30, 180, 90, ${alpha / 100})`, // Green color with variable opacity
  };
}
