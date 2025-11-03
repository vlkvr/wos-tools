export interface CalculatorItem {
  id: string;
  label: string;
  type?: "chief" | "speedup" | "troops" | "beast";
  multiplier: number;
  helpModal?: string;
  troopLevels?: { level: string; multiplier: number; color?: string }[];
  beastLevels?: { level: string; multiplier: number; color?: string }[];
}

export interface ArmamentData {
  stage1: CalculatorItem[];
  stage2: CalculatorItem[];
}

export interface OfficerProjectData {
  stage1: CalculatorItem[];
  stage2: CalculatorItem[];
}

export interface AllianceShowdownData {
  stage1: CalculatorItem[];
  stage2: CalculatorItem[];
  stage3: CalculatorItem[];
  stage4: CalculatorItem[];
  stage5: CalculatorItem[];
  stage6: CalculatorItem[];
}