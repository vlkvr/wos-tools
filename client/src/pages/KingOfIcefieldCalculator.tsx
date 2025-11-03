import { useState, useEffect } from "react";
import { Target, CheckCircle, BarChart3, Calculator, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Modal } from "@/components/ui/modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChiefGearModal } from "@/components/modals/ChiefGearModal";
import { ChiefCharmModal } from "@/components/modals/ChiefCharmModal";
import { GatherRSSModal } from "@/components/modals/GatherRSSModal";
import { PetAdvancementModal } from "@/components/modals/PetAdvancementModal";
import { SpeedupsModal } from "@/components/modals/SpeedupsModal";
import { kingOfIcefieldData } from "@/data/kingOfIcefieldData";
import { type CalculatorItem } from "@/data/types";
import { safeEval, formatMinutes, getConditionalBackgroundStyle } from "@/utils/calculations";
import { loadCalculatorData, useAutoSave } from "@/utils/storage";

interface StageState {
  goal: string;
  current: string;
  remaining: number;
  totalEarned: number;
  inputs: { [key: string]: string };
  troopLevels?: { [key: string]: number };
  includePlanned: boolean;
}

export default function KingOfIcefieldCalculator() {
  const [activeTab, setActiveTab] = useState("stage1");
  const [chiefCharmModalOpen, setChiefCharmModalOpen] = useState(false);
  const [speedupsModalOpen, setSpeedupsModalOpen] = useState(false);

  // Color helper function for item rarities
  const colorizeLabel = (label: string) => {
    if (label.includes('Rare')) {
      return (
        <span>
          {label.split('Rare').map((part, index) => (
            index === 0 ? part : (
              <span key={index}>
                <span className="text-blue-600 dark:text-blue-400 font-medium">Rare</span>
                {part}
              </span>
            )
          ))}
        </span>
      );
    } else if (label.includes('Epic')) {
      return (
        <span>
          {label.split('Epic').map((part, index) => (
            index === 0 ? part : (
              <span key={index}>
                <span className="text-purple-600 dark:text-purple-400 font-medium">Epic</span>
                {part}
              </span>
            )
          ))}
        </span>
      );
    } else if (label.includes('Mythic')) {
      return (
        <span>
          {label.split('Mythic').map((part, index) => (
            index === 0 ? part : (
              <span key={index}>
                <span className="text-orange-600 dark:text-orange-400 font-medium">Mythic</span>
                {part}
              </span>
            )
          ))}
        </span>
      );
    } else if (label.includes('Legendary')) {
      return (
        <span>
          {label.split('Legendary').map((part, index) => (
            index === 0 ? part : (
              <span key={index}>
                <span className="text-red-600 dark:text-red-400 font-medium">Legendary</span>
                {part}
              </span>
            )
          ))}
        </span>
      );
    }
    return <span>{label}</span>;
  };

  const [gatherRSSModalOpen, setGatherRSSModalOpen] = useState(false);
  const [petAdvancementModalOpen, setPetAdvancementModalOpen] = useState(false);
  const [chiefGearModalOpen, setChiefGearModalOpen] = useState(false);

  // Load saved data or use defaults
  const loadInitialData = () => {
    const savedData = loadCalculatorData('KING_OF_ICEFIELD');
    return savedData || {
      stages: {
        stage1: {
          goal: "333000",
          current: "",
          remaining: 333000,
          totalEarned: 0,
          inputs: {},
          includePlanned: true,
        },
        stage2: {
          goal: "312000",
          current: "",
          remaining: 312000,
          totalEarned: 0,
          inputs: {},
          includePlanned: true,
        },
        stage3: {
          goal: "362000", 
          current: "",
          remaining: 362000,
          totalEarned: 0,
          inputs: {},
          includePlanned: true,
        },
        stage4: {
          goal: "250000",
          current: "",
          remaining: 250000,
          totalEarned: 0,
          inputs: {},
          troopLevels: {},
          includePlanned: true,
        },
        stage5: {
          goal: "289000",
          current: "",
          remaining: 289000,
          totalEarned: 0,
          inputs: {},
          includePlanned: true,
        },
        stage6: {
          goal: "380000",
          current: "",
          remaining: 380000,
          totalEarned: 0,
          inputs: {},
          troopLevels: {},
          includePlanned: true,
        },
        stage7: {
          goal: "345000",
          current: "",
          remaining: 345000,
          totalEarned: 0,
          inputs: {},
          includePlanned: true,
        },
      },
    };
  };

  const initialData = loadInitialData();
  const [stages, setStages] = useState<{ [key: string]: StageState }>(initialData.stages);

  // Auto-save data when state changes
  const saveData = {
    stages,
  };
  useAutoSave('KING_OF_ICEFIELD', saveData, 500);

  const updateStage = (stageNum: string, updates: Partial<StageState>) => {
    setStages(prev => ({
      ...prev,
      [stageNum]: { ...prev[stageNum], ...updates }
    }));
  };

  const updateTroopLevel = (stageNum: string, itemId: string, multiplier: number) => {
    const stage = stages[stageNum];
    updateStage(stageNum, {
      troopLevels: { ...stage.troopLevels, [itemId]: multiplier }
    });
  };

  const recalculateStage = (stageNum: string) => {
    const stage = stages[stageNum];
    const data = kingOfIcefieldData[stageNum as keyof typeof kingOfIcefieldData];
    
    const goal = safeEval(stage.goal) || 0;
    const current = safeEval(stage.current) || 0;
    
    // Calculate total earned from planned spending
    let totalEarned = 0;
    data.forEach((item: CalculatorItem) => {
      const inputValue = safeEval(stage.inputs[item.id]) || 0;
      let multiplier = item.multiplier;
      
      // Use custom troop level multiplier if available
      if (item.type === 'troops' && stage.troopLevels && stage.troopLevels[item.id]) {
        multiplier = stage.troopLevels[item.id];
      }
      
      const earned = inputValue * multiplier;
      totalEarned += earned;
    });
    
    // Add total earned to current if toggle is enabled for this stage
    const effectiveCurrent = stage.includePlanned ? current + totalEarned : current;
    const remaining = Math.max(goal - effectiveCurrent, 0);

    updateStage(stageNum, {
      remaining,
      totalEarned,
    });
  };

  const defaultGoals: { [key: string]: string } = {
    stage1: "333000",
    stage2: "312000", 
    stage3: "362000",
    stage4: "250000",
    stage5: "289000",
    stage6: "380000",
    stage7: "345000"
  };

  const resetStage = (stageNum: string) => {
    updateStage(stageNum, { 
      goal: defaultGoals[stageNum],
      current: "",
      inputs: {},
      troopLevels: {},
    });
  };

  const toggleIncludePlanned = (stageNum: string) => {
    const stage = stages[stageNum];
    updateStage(stageNum, { includePlanned: !stage.includePlanned });
  };

  // Check if goal is achieved for color styling
  const isGoalAchieved = (stageKey: string) => {
    const stage = stages[stageKey];
    const goal = safeEval(stage.goal) || 0;
    const current = safeEval(stage.current) || 0;
    
    if (stage.includePlanned) {
      return current + stage.totalEarned >= goal;
    } else {
      return current >= goal;
    }
  };

  const updateStageInput = (stageNum: string, field: keyof StageState, value: string) => {
    // Remove commas from input for number parsing
    const cleanValue = value.replace(/,/g, '');
    updateStage(stageNum, { [field]: cleanValue });
  };

  const updateItemInput = (stageNum: string, itemId: string, value: string) => {
    // Remove commas from input for number parsing
    const cleanValue = value.replace(/,/g, '');
    const stage = stages[stageNum];
    updateStage(stageNum, {
      inputs: { ...stage.inputs, [itemId]: cleanValue }
    });
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, stageNum: string, itemId: string) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    // Remove commas and update the field
    const cleanValue = pastedText.replace(/,/g, '');
    updateItemInput(stageNum, itemId, cleanValue);
  };

  const handleCurrentPaste = (e: React.ClipboardEvent<HTMLInputElement>, stageNum: string) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    // Remove commas and update the current field
    const cleanValue = pastedText.replace(/,/g, '');
    updateStageInput(stageNum, "current", cleanValue);
  };

  // Recalculate when stage data changes
  useEffect(() => {
    Object.keys(stages).forEach(stageNum => {
      recalculateStage(stageNum);
    });
  }, [stages.stage1?.goal, stages.stage1?.current, stages.stage1?.inputs, stages.stage1?.includePlanned, stages.stage2?.goal, stages.stage2?.current, stages.stage2?.inputs, stages.stage2?.includePlanned, stages.stage3?.goal, stages.stage3?.current, stages.stage3?.inputs, stages.stage3?.includePlanned, stages.stage4?.goal, stages.stage4?.current, stages.stage4?.inputs, stages.stage4?.troopLevels, stages.stage4?.includePlanned, stages.stage5?.goal, stages.stage5?.current, stages.stage5?.inputs, stages.stage5?.includePlanned, stages.stage6?.goal, stages.stage6?.current, stages.stage6?.inputs, stages.stage6?.troopLevels, stages.stage6?.includePlanned, stages.stage7?.goal, stages.stage7?.current, stages.stage7?.inputs, stages.stage7?.includePlanned]);

  const renderStageTable = (stageNum: string) => {
    const data = kingOfIcefieldData[stageNum as keyof typeof kingOfIcefieldData];
    const stage = stages[stageNum];

    // Calculate max earned for conditional formatting
    const earnedValues = data.map((item: CalculatorItem) => {
      const inputValue = safeEval(stage.inputs[item.id]) || 0;
      let multiplier = item.multiplier;
      
      // Use custom troop level multiplier if available
      if (item.type === 'troops' && stage.troopLevels && stage.troopLevels[item.id]) {
        multiplier = stage.troopLevels[item.id];
      }
      
      return inputValue * multiplier;
    });
    const maxEarned = Math.max(...earnedValues);

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-wos-gray-50">
              <th className="border border-wos-gray-200 dark:border-border px-4 py-2 text-left text-sm font-medium">
                Action
              </th>
              <th className="border border-wos-gray-200 dark:border-border px-4 py-2 text-left text-sm font-medium w-32">
                Points
              </th>
              <th className="border border-wos-gray-200 dark:border-border px-4 py-2 text-left text-sm font-medium">
                I will spend
              </th>
              <th className="border border-wos-gray-200 dark:border-border px-4 py-2 text-left text-sm font-medium w-32">
                Points expected
              </th>
              <th className="border border-wos-gray-200 dark:border-border px-4 py-2 text-left text-sm font-medium w-36">
                Required to reach goal
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: CalculatorItem) => {
              const inputValue = safeEval(stage.inputs[item.id]) || 0;
              let multiplier = item.multiplier;
              
              // Use custom troop level multiplier if available
              if (item.type === 'troops' && stage.troopLevels && stage.troopLevels[item.id]) {
                multiplier = stage.troopLevels[item.id];
              }
              
              const earned = inputValue * multiplier;
              const neededItems = stage.remaining > 0 && multiplier > 0 
                ? Math.ceil(stage.remaining / multiplier) 
                : 0;

              return (
                <tr key={item.id} className="hover:bg-wos-gray-50 dark:hover:bg-accent/50">
                  <td className="border border-wos-gray-200 dark:border-border px-4 py-2">
                    <div className="flex items-center">
                      <span className="mr-2">{colorizeLabel(item.label)}</span>
                      {item.helpModal && (
                        <Button
                          variant="ghost"
                          onClick={() => {
                            if (item.helpModal === "gather-rss") setGatherRSSModalOpen(true);
                            if (item.helpModal === "pet-advancement") setPetAdvancementModalOpen(true);
                            if (item.helpModal === "chief-charm") setChiefCharmModalOpen(true);
                            if (item.helpModal === "chief-gear") setChiefGearModalOpen(true);
                            if (item.helpModal === "speedups") setSpeedupsModalOpen(true);
                          }}
                          className="ml-2 text-wos-blue hover:text-wos-blue-dark text-xs p-1"
                        >
                          <Info className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </td>
                  <td className="border border-wos-gray-200 dark:border-border px-4 py-2 font-mono">
                    {item.type === 'troops' && item.troopLevels ? (
                      <Select
                        value={(stage.troopLevels && stage.troopLevels[item.id] ? stage.troopLevels[item.id] : item.multiplier).toString()}
                        onValueChange={(value) => updateTroopLevel(stageNum, item.id, parseInt(value))}
                      >
                        <SelectTrigger className="w-full h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {item.troopLevels.map((level) => (
                            <SelectItem key={level.multiplier} value={level.multiplier.toString()}>
                              <span className={`${level.color} font-medium`}>{level.level}:</span> {level.multiplier} pts
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      item.multiplier
                    )}
                  </td>
                  <td className="border border-wos-gray-200 dark:border-border px-4 py-2">
                    <Input
                      type="text"
                      value={stage.inputs[item.id] || ""}
                      onChange={(e) => updateItemInput(stageNum, item.id, e.target.value)}
                      onPaste={(e) => handlePaste(e, stageNum, item.id)}
                      placeholder="e.g. 10 or 5*2+3"
                      className="w-full text-sm"
                      data-testid={`input-${item.id}`}
                    />
                  </td>
                  <td 
                    className="border border-wos-gray-200 dark:border-border px-4 py-2 font-mono transition-colors duration-200" 
                    style={getConditionalBackgroundStyle(earned, maxEarned)}
                    data-testid={`earned-${item.id}`}
                  >
                    {earned ? earned.toLocaleString() : "0"}
                  </td>
                  <td className="border border-wos-gray-200 dark:border-border px-4 py-2 font-mono">
                    {neededItems > 0 ? (
                      item.type === "speedup" ? formatMinutes(neededItems) : neededItems.toLocaleString()
                    ) : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const stageNames: { [key: string]: string } = {
    stage1: "City Construction",
    stage2: "Hero Development", 
    stage3: "Basic Skills Up",
    stage4: "Combat Training",
    stage5: "Basic Skills Up",
    stage6: "Combat Training",
    stage7: "Hero Development"
  };

  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-wos-gray-900 dark:text-foreground mb-2 flex items-center justify-center">
          <span className="mr-3">🏆</span>
          King of Icefield Calculator
        </h1>
      </div>

      {/* Stage Tabs */}
      <div className="relative">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 bg-transparent rounded-none p-0 h-auto gap-2 px-2 mb-0">
            {Object.keys(stages).map((stageKey, index) => (
              <TabsTrigger 
                key={stageKey} 
                value={stageKey}
                className="text-lg font-bold rounded-t-lg rounded-b-none border-2 border-b-0 data-[state=active]:bg-border data-[state=active]:border-border data-[state=active]:shadow-none data-[state=inactive]:border-muted data-[state=inactive]:bg-muted/30 data-[state=inactive]:hover:bg-muted/50 transition-all relative data-[state=inactive]:z-0 data-[state=active]:z-20 data-[state=active]:mb-[-2px]"
                data-testid={`tab-${stageKey}`}
              >
                {romanNumerals[index]}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.keys(stages).map((stageKey) => (
            <TabsContent key={stageKey} value={stageKey} className="m-0 p-0 relative z-10">
              <Card className="border-2 border-t-2 rounded-t-none bg-border p-0">
                <div className="bg-card rounded-b-lg m-0">
                <CardContent className="p-6">
                {/* Stage Title and Reset Button */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    Stage {romanNumerals[parseInt(stageKey.slice(-1)) - 1]}: {stageNames[stageKey]}
                  </h2>
                  <Button
                    onClick={() => resetStage(stageKey)}
                    variant="outline"
                    size="sm"
                    data-testid={`button-reset-${stageKey}`}
                  >
                    Reset
                  </Button>
                </div>

                {/* Input Fields Panel */}
                <div className="grid grid-cols-9 gap-4 mb-6 items-end">
                  <div className="col-span-2">
                    <Label htmlFor={`goal-${stageKey}`} className="flex items-center mb-2">
                      <Target className={`mr-1 h-4 w-4 ${isGoalAchieved(stageKey) ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`} />
                      Goal
                    </Label>
                    <Input
                      id={`goal-${stageKey}`}
                      type="number"
                      value={stages[stageKey].goal}
                      onChange={(e) => updateStageInput(stageKey, "goal", e.target.value)}
                      data-testid={`input-goal-${stageKey}`}
                      className="font-mono"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor={`current-${stageKey}`} className="flex items-center mb-2">
                      <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                      My points
                    </Label>
                    <Input
                      id={`current-${stageKey}`}
                      type="text"
                      value={stages[stageKey].current}
                      onChange={(e) => updateStageInput(stageKey, "current", e.target.value)}
                      data-testid={`input-current-${stageKey}`}
                      className="font-mono"
                      placeholder="0"
                    />
                  </div>
                  <div className="col-span-1 flex items-center justify-center">
                    <Button
                      onClick={() => toggleIncludePlanned(stageKey)}
                      variant={stages[stageKey].includePlanned ? "default" : "outline"}
                      size="icon"
                      data-testid={`button-toggle-planned-${stageKey}`}
                      className="h-10 w-10 mt-8"
                    >
                      +
                    </Button>
                  </div>
                  <div className="col-span-2">
                    <Label className="flex items-center mb-2">
                      <Calculator className="mr-1 h-4 w-4 text-wos-blue" />
                      Expected
                    </Label>
                    <div className="font-mono text-total-expected bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded border border-input h-10 flex items-center">
                      {(stages[stageKey].includePlanned 
                        ? (safeEval(stages[stageKey].current) || 0) + stages[stageKey].totalEarned 
                        : stages[stageKey].totalEarned
                      ).toLocaleString()}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Label className="flex items-center mb-2">
                      <BarChart3 className="mr-1 h-4 w-4 text-blue-500" />
                      Remaining
                    </Label>
                    <div className="font-mono bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded border border-input h-10 flex items-center" data-testid={`remaining-${stageKey}`}>
                      {stages[stageKey].remaining.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Stage Table */}
                {renderStageTable(stageKey)}

                <div className="mt-4 text-right">
                  <p className="text-lg font-semibold flex items-center justify-end">
                    <Calculator className="mr-2 h-5 w-5 text-wos-blue" />
                    Total expected: <span className="font-mono text-total-expected ml-2" data-testid={`total-${stageKey}`}>
                      {stages[stageKey].totalEarned.toLocaleString()}
                    </span> pts
                  </p>
                </div>
              </CardContent>
              </div>
            </Card>
          </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Overall Total */}
      <Card className="mb-8 border-0 bg-transparent shadow-none">
        <CardContent className="p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-wos-gray-900 dark:text-foreground mb-2">
              Overall Total Expected
            </h2>
            <p className="text-3xl font-mono text-total-expected">
              {Object.values(stages).reduce((total, stage) => total + stage.totalEarned, 0).toLocaleString()} pts
            </p>
            <p className="text-sm text-wos-gray-600 dark:text-muted-foreground mt-2">
              Combined points from all 7 stages
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <GatherRSSModal
        isOpen={gatherRSSModalOpen}
        onClose={() => setGatherRSSModalOpen(false)}
      />

      <PetAdvancementModal
        isOpen={petAdvancementModalOpen}
        onClose={() => setPetAdvancementModalOpen(false)}
      />

      {/* Chief Charm Modal */}
      <ChiefCharmModal
        isOpen={chiefCharmModalOpen}
        onClose={() => setChiefCharmModalOpen(false)}
      />

      {/* Chief Gear Modal - reuse from Officer Project */}
      <ChiefGearModal
        isOpen={chiefGearModalOpen}
        onClose={() => setChiefGearModalOpen(false)}
      />

      {/* Speedups Modal */}
      <SpeedupsModal
        isOpen={speedupsModalOpen}
        onClose={() => setSpeedupsModalOpen(false)}
      />
    </div>
  );
}