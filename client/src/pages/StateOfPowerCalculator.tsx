import { useState, useEffect } from "react";
import { Target, CheckCircle, BarChart3, Calculator, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChiefGearModal } from "@/components/modals/ChiefGearModal";
import { ChiefCharmModal } from "@/components/modals/ChiefCharmModal";
import { GatherRSSModal } from "@/components/modals/GatherRSSModal";
import { PetAdvancementModal } from "@/components/modals/PetAdvancementModal";
import { SpeedupsModal } from "@/components/modals/SpeedupsModal";
import { stateOfPowerData } from "@/data/stateOfPowerData";
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
  beastLevels?: { [key: string]: number };
  includePlanned: boolean;
}

export default function StateOfPowerCalculator() {
  const [activeTab, setActiveTab] = useState("stage1");
  const [chiefCharmModalOpen, setChiefCharmModalOpen] = useState(false);
  const [chiefGearModalOpen, setChiefGearModalOpen] = useState(false);
  const [gatherRSSModalOpen, setGatherRSSModalOpen] = useState(false);
  const [petAdvancementModalOpen, setPetAdvancementModalOpen] = useState(false);
  const [speedupsModalOpen, setSpeedupsModalOpen] = useState(false);

  // Helper function to colorize rare/epic/mythic/legendary words in labels
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
    return label;
  };

  // Load saved data or use defaults
  const loadInitialData = () => {
    const savedData = loadCalculatorData('STATE_OF_POWER');
    return savedData || {
      stages: {
        stage1: {
          goal: "200000",
          current: "",
          remaining: 200000,
          totalEarned: 0,
          inputs: {},
          includePlanned: true,
        },
        stage2: {
          goal: "270000",
          current: "",
          remaining: 270000,
          totalEarned: 0,
          inputs: {},
          includePlanned: true,
        },
        stage3: {
          goal: "300000",
          current: "",
          remaining: 300000,
          totalEarned: 0,
          inputs: {},
          beastLevels: {},
          includePlanned: true,
        },
        stage4: {
          goal: "300000",
          current: "",
          remaining: 300000,
          totalEarned: 0,
          inputs: {},
          troopLevels: {},
          includePlanned: true,
        },
        stage5: {
          goal: "250000",
          current: "",
          remaining: 250000,
          totalEarned: 0,
          inputs: {},
          includePlanned: true,
        },
      },
      activeTab: "stage1",
    };
  };

  const initialData = loadInitialData();
  const [stages, setStages] = useState<{ [key: string]: StageState }>(initialData.stages);

  useEffect(() => {
    setActiveTab(initialData.activeTab || "stage1");
  }, []);

  // Auto-save data when state changes
  const saveData = {
    stages,
    activeTab,
  };
  useAutoSave('STATE_OF_POWER', saveData, 500);

  const updateStage = (stageKey: string, updates: Partial<StageState>) => {
    setStages(prev => ({
      ...prev,
      [stageKey]: { ...prev[stageKey], ...updates }
    }));
  };

  const updateTroopLevel = (stageKey: string, itemId: string, multiplier: number) => {
    const stage = stages[stageKey];
    updateStage(stageKey, {
      troopLevels: { ...stage.troopLevels, [itemId]: multiplier }
    });
  };

  const updateBeastLevel = (stageKey: string, itemId: string, multiplier: number) => {
    const stage = stages[stageKey];
    updateStage(stageKey, {
      beastLevels: { ...stage.beastLevels, [itemId]: multiplier }
    });
  };

  const recalculateStage = (stageKey: string) => {
    const stage = stages[stageKey];
    const data = stateOfPowerData[stageKey];
    
    const goal = safeEval(stage.goal) || 0;
    const current = safeEval(stage.current) || 0;
    
    // Calculate total earned from planned spending
    let totalEarned = 0;
    data.forEach((item: CalculatorItem) => {
      const inputValue = safeEval(stage.inputs[item.id]) || 0;
      let multiplier = item.multiplier;
      
      if (item.type === "troops" && stage.troopLevels) {
        multiplier = stage.troopLevels[item.id] || item.multiplier;
      } else if (item.type === "beast" && stage.beastLevels) {
        multiplier = stage.beastLevels[item.id] || item.multiplier;
      }
      
      const earned = inputValue * multiplier;
      totalEarned += earned;
    });
    
    // Add total earned to current if includePlanned is enabled
    const effectiveCurrent = stage.includePlanned ? current + totalEarned : current;
    const remaining = Math.max(goal - effectiveCurrent, 0);

    updateStage(stageKey, {
      remaining,
      totalEarned,
    });
  };

  const resetStage = (stageKey: string) => {
    const defaultGoals: { [key: string]: string } = {
      stage1: "200000",
      stage2: "270000",
      stage3: "300000",
      stage4: "300000",
      stage5: "250000",
    };
    
    updateStage(stageKey, { 
      goal: defaultGoals[stageKey],
      current: "",
      inputs: {},
      troopLevels: {},
      beastLevels: {},
      remaining: parseInt(defaultGoals[stageKey]),
      totalEarned: 0,
    });
  };

  const toggleIncludePlanned = (stageKey: string) => {
    const stage = stages[stageKey];
    updateStage(stageKey, {
      includePlanned: !stage.includePlanned
    });
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

  const updateStageInput = (stageKey: string, field: keyof StageState, value: string) => {
    const cleanValue = value.replace(/,/g, '');
    updateStage(stageKey, { [field]: cleanValue });
  };

  const updateItemInput = (stageKey: string, itemId: string, value: string) => {
    const cleanValue = value.replace(/,/g, '');
    const stage = stages[stageKey];
    updateStage(stageKey, {
      inputs: { ...stage.inputs, [itemId]: cleanValue }
    });
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, stageKey: string, itemId: string) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const cleanValue = pastedText.replace(/,/g, '');
    updateItemInput(stageKey, itemId, cleanValue);
  };

  // Recalculate when stage data changes
  useEffect(() => {
    if (stages && Object.keys(stages).length > 0) {
      Object.keys(stages).forEach(stageKey => {
        recalculateStage(stageKey);
      });
    }
  }, [
    stages.stage1?.goal, stages.stage1?.current, stages.stage1?.inputs, stages.stage1?.includePlanned,
    stages.stage2?.goal, stages.stage2?.current, stages.stage2?.inputs, stages.stage2?.includePlanned,
    stages.stage3?.goal, stages.stage3?.current, stages.stage3?.inputs, stages.stage3?.beastLevels, stages.stage3?.includePlanned,
    stages.stage4?.goal, stages.stage4?.current, stages.stage4?.inputs, stages.stage4?.troopLevels, stages.stage4?.includePlanned,
    stages.stage5?.goal, stages.stage5?.current, stages.stage5?.inputs, stages.stage5?.includePlanned,
  ]);

  const renderStageTable = (stageKey: string) => {
    const data = stateOfPowerData[stageKey];
    const stage = stages[stageKey];

    // Calculate max earned for conditional formatting
    const earnedValues = data.map((item: CalculatorItem) => {
      const inputValue = safeEval(stage.inputs[item.id]) || 0;
      let multiplier = item.multiplier;
      
      if (item.type === "troops" && stage.troopLevels) {
        multiplier = stage.troopLevels[item.id] || item.multiplier;
      } else if (item.type === "beast" && stage.beastLevels) {
        multiplier = stage.beastLevels[item.id] || item.multiplier;
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
              
              if (item.type === "troops" && stage.troopLevels) {
                multiplier = stage.troopLevels[item.id] || item.multiplier;
              } else if (item.type === "beast" && stage.beastLevels) {
                multiplier = stage.beastLevels[item.id] || item.multiplier;
              }
              
              const earned = inputValue * multiplier;
              const required = stage.remaining > 0 && multiplier > 0 
                ? Math.ceil(stage.remaining / multiplier) 
                : 0;

              return (
                <tr key={item.id} className="hover:bg-wos-gray-50">
                  <td className="border border-wos-gray-200 dark:border-border px-4 py-2">
                    <div className="flex items-center">
                      {colorizeLabel(item.label)}
                      {item.helpModal && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (item.helpModal === "chief-charm") {
                              setChiefCharmModalOpen(true);
                            } else if (item.helpModal === "chief-gear") {
                              setChiefGearModalOpen(true);
                            } else if (item.helpModal === "gather-rss") {
                              setGatherRSSModalOpen(true);
                            } else if (item.helpModal === "pet-advancement") {
                              setPetAdvancementModalOpen(true);
                            } else if (item.helpModal === "speedups") {
                              setSpeedupsModalOpen(true);
                            }
                          }}
                          data-testid={`button-help-${item.id}`}
                          className="ml-2 text-wos-blue hover:text-wos-blue-dark text-xs p-1"
                        >
                          <Info className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </td>
                  <td className="border border-wos-gray-200 dark:border-border px-4 py-2 font-mono">
                    {item.type === "troops" && item.troopLevels ? (
                      <Select
                        value={stage.troopLevels?.[item.id]?.toString() || item.multiplier.toString()}
                        onValueChange={(value) => updateTroopLevel(stageKey, item.id, parseInt(value))}
                      >
                        <SelectTrigger className="w-full h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {item.troopLevels?.map((troop) => (
                            <SelectItem key={troop.multiplier} value={troop.multiplier.toString()}>
                              <span className={troop.color}>{troop.level}:</span> {troop.multiplier} pts
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : item.type === "beast" && item.beastLevels ? (
                      <Select
                        value={stage.beastLevels?.[item.id]?.toString() || item.multiplier.toString()}
                        onValueChange={(value) => updateBeastLevel(stageKey, item.id, parseInt(value))}
                      >
                        <SelectTrigger className="w-full h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {item.beastLevels?.map((beast) => (
                            <SelectItem key={beast.multiplier} value={beast.multiplier.toString()}>
                              <span className={beast.color}>{beast.level}:</span> {beast.multiplier} pts
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      multiplier.toLocaleString()
                    )}
                  </td>
                  <td className="border border-wos-gray-200 dark:border-border px-4 py-2">
                    <Input
                      type="text"
                      value={stage.inputs[item.id] || ""}
                      onChange={(e) => updateItemInput(stageKey, item.id, e.target.value)}
                      onPaste={(e) => handlePaste(e, stageKey, item.id)}
                      data-testid={`input-${item.id}`}
                      className="w-full text-sm"
                      placeholder="e.g. 10 or 5*2+3"
                    />
                  </td>
                  <td 
                    className="border border-wos-gray-200 dark:border-border px-4 py-2 font-mono transition-colors duration-200" 
                    data-testid={`earned-${item.id}`}
                    style={getConditionalBackgroundStyle(earned, maxEarned)}
                  >
                    {earned ? earned.toLocaleString() : "0"}
                  </td>
                  <td className="border border-wos-gray-200 dark:border-border px-4 py-2 font-mono" data-testid={`required-${item.id}`}>
                    {required > 0 ? (
                      item.type === "speedup" ? formatMinutes(required) : required.toLocaleString()
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
    stage1: "Stage I",
    stage2: "Stage II",
    stage3: "Stage III",
    stage4: "Stage IV",
    stage5: "Stage V",
  };

  const romanNumerals = ['I', 'II', 'III', 'IV', 'V'];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-wos-gray-900 dark:text-foreground mb-2 flex items-center justify-center">
          <span className="mr-3">🤼</span>
          State of Power Calculator
        </h1>
      </div>

      {/* Stage Tabs */}
      <div className="relative">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-transparent rounded-none p-0 h-auto gap-2 px-2 mb-0">
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
                    {stageNames[stageKey]}
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
              Combined points from all 5 stages
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Chief Charm Modal */}
      <ChiefCharmModal
        isOpen={chiefCharmModalOpen}
        onClose={() => setChiefCharmModalOpen(false)}
      />

      {/* Chief Gear Modal */}
      <ChiefGearModal
        isOpen={chiefGearModalOpen}
        onClose={() => setChiefGearModalOpen(false)}
      />

      {/* Gather RSS Modal */}
      <GatherRSSModal
        isOpen={gatherRSSModalOpen}
        onClose={() => setGatherRSSModalOpen(false)}
      />

      {/* Pet Advancement Modal */}
      <PetAdvancementModal
        isOpen={petAdvancementModalOpen}
        onClose={() => setPetAdvancementModalOpen(false)}
      />

      {/* Speedups Modal */}
      <SpeedupsModal
        isOpen={speedupsModalOpen}
        onClose={() => setSpeedupsModalOpen(false)}
      />
    </div>
  );
}
