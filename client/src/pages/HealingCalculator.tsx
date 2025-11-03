import { useState } from "react";
import { HelpCircle, Users, Clock, HandHeart, Hospital, Calculator, TrendingUp, RotateCcw, TriangleAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { calculateHealing, safeEval } from "@/utils/calculations";
import { loadCalculatorData, useAutoSave } from "@/utils/storage";

interface HealingResults {
  woundedPerBatch: number;
  requiredCycles?: number;
  totalTime?: string;
}

export default function HealingCalculator() {
  // Load saved data or use defaults
  const loadInitialData = () => {
    const savedData = loadCalculatorData('HEALING');
    return savedData || {
      wounded: "",
      days: "0",
      hours: "0",
      minutes: "0",
      seconds: "0",
      helpers: "1",
      allyHelpTime: "257",
      totalWounded: "",
    };
  };

  const initialData = loadInitialData();
  const [wounded, setWounded] = useState<string>(initialData.wounded);
  const [days, setDays] = useState<string>(initialData.days);
  const [hours, setHours] = useState<string>(initialData.hours);
  const [minutes, setMinutes] = useState<string>(initialData.minutes);
  const [seconds, setSeconds] = useState<string>(initialData.seconds);
  const [helpers, setHelpers] = useState<string>(initialData.helpers);
  const [allyHelpTime, setAllyHelpTime] = useState<string>(initialData.allyHelpTime);
  const [totalWounded, setTotalWounded] = useState<string>(initialData.totalWounded);
  const [results, setResults] = useState<HealingResults | null>(null);
  const [error, setError] = useState<string>("");
  const [woundedHelpOpen, setWoundedHelpOpen] = useState(false);

  // Auto-save data when state changes
  const saveData = {
    wounded,
    days,
    hours,
    minutes,
    seconds,
    helpers,
    allyHelpTime,
    totalWounded,
  };
  useAutoSave('HEALING', saveData, 500);
  const [timeHelpOpen, setTimeHelpOpen] = useState(false);
  const [helpersHelpOpen, setHelpersHelpOpen] = useState(false);
  const [allyTimeHelpOpen, setAllyTimeHelpOpen] = useState(false);
  const [totalHelpOpen, setTotalHelpOpen] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResults(null);

    try {
      const result = calculateHealing({
        wounded: parseInt(wounded) || 0,
        days: parseInt(days) || 0,
        hours: parseInt(hours) || 0,
        minutes: parseInt(minutes) || 0,
        seconds: parseInt(seconds) || 0,
        helpers: parseInt(helpers) || 1,
        allyHelpTime: safeEval(allyHelpTime) || 257,
        totalWounded: totalWounded ? parseInt(totalWounded) : undefined,
      });
      setResults(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };


  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-wos-gray-900 dark:text-foreground mb-2 flex items-center justify-center">
          <span className="mr-3">❤️‍🩹</span>
          Healing Calculator
        </h1>
      </div>

      <Card>
        <CardContent className="p-6">

          <form onSubmit={handleCalculate} className="space-y-6">
            {/* Wounded Input */}
            <div className="space-y-2">
              <Label htmlFor="wounded" className="flex items-center text-sm font-medium">
                <Users className="mr-2 h-4 w-4 text-red-500" />
                Wounded (1-999,999) <span className="text-red-500 ml-1">*</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setWoundedHelpOpen(true)}
                  data-testid="button-help-wounded"
                  className="ml-2 p-1 h-auto text-wos-blue hover:text-wos-blue-dark"
                >
                  <HelpCircle className="h-3 w-3" />
                </Button>
              </Label>
              <Input
                type="number"
                id="wounded"
                value={wounded}
                onChange={(e) => setWounded(e.target.value)}
                min="1"
                max="999999"
                placeholder="e.g. 1000"
                data-testid="input-wounded"
                required
              />
            </div>

            {/* Healing Time Section */}
            <div className="bg-wos-gray-50 dark:bg-accent rounded-lg p-4 space-y-4">
              <h3 className="text-sm font-medium flex items-center">
                <Clock className="mr-2 h-4 w-4 text-blue-500" />
                Healing Time <span className="text-red-500 ml-1">*</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setTimeHelpOpen(true)}
                  data-testid="button-help-time"
                  className="ml-2 p-1 h-auto text-wos-blue hover:text-wos-blue-dark"
                >
                  <HelpCircle className="h-3 w-3" />
                </Button>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="days" className="text-xs text-wos-gray-600 dark:text-muted-foreground">
                    Days (0-31)
                  </Label>
                  <Input
                    type="number"
                    id="days"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    min="0"
                    max="31"
                    data-testid="input-days"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="hours" className="text-xs text-wos-gray-600 dark:text-muted-foreground">
                    Hours (0-23)
                  </Label>
                  <Input
                    type="number"
                    id="hours"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    min="0"
                    max="23"
                    data-testid="input-hours"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="minutes" className="text-xs text-wos-gray-600 dark:text-muted-foreground">
                    Minutes (0-59)
                  </Label>
                  <Input
                    type="number"
                    id="minutes"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    min="0"
                    max="59"
                    data-testid="input-minutes"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="seconds" className="text-xs text-wos-gray-600 dark:text-muted-foreground">
                    Seconds (0-59)
                  </Label>
                  <Input
                    type="number"
                    id="seconds"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    min="0"
                    max="59"
                    data-testid="input-seconds"
                    className="text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Helpers Input */}
            <div className="space-y-2">
              <Label htmlFor="helpers" className="flex items-center text-sm font-medium">
                <HandHeart className="mr-2 h-4 w-4 text-green-500" />
                Number of helpers (1-45) <span className="text-red-500 ml-1">*</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setHelpersHelpOpen(true)}
                  data-testid="button-help-helpers"
                  className="ml-2 p-1 h-auto text-wos-blue hover:text-wos-blue-dark"
                >
                  <HelpCircle className="h-3 w-3" />
                </Button>
              </Label>
              <Input
                type="number"
                id="helpers"
                value={helpers}
                onChange={(e) => setHelpers(e.target.value)}
                min="1"
                max="45"
                data-testid="input-helpers"
                required
              />
            </div>

            {/* Ally Help Time Input */}
            <div className="space-y-2">
              <Label htmlFor="allyHelpTime" className="flex items-center text-sm font-medium">
                <Clock className="mr-2 h-4 w-4 text-blue-500" />
                Ally Help Time (seconds) <span className="text-red-500 ml-1">*</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setAllyTimeHelpOpen(true)}
                  data-testid="button-help-ally-time"
                  className="ml-2 p-1 h-auto text-wos-blue hover:text-wos-blue-dark"
                >
                  <HelpCircle className="h-3 w-3" />
                </Button>
              </Label>
              <Input
                type="text"
                id="allyHelpTime"
                value={allyHelpTime}
                onChange={(e) => setAllyHelpTime(e.target.value)}
                placeholder="257 or 97+150"
                data-testid="input-ally-help-time"
                required
              />
              <p className="text-xs text-wos-gray-500 dark:text-muted-foreground">
                Default: 257 seconds. You can use expressions like 97+150
              </p>
            </div>

            {/* Total Wounded (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="totalWounded" className="flex items-center text-sm font-medium">
                <Hospital className="mr-2 h-4 w-4 text-wos-gray-500" />
                Total wounded in hospital (optional)
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setTotalHelpOpen(true)}
                  data-testid="button-help-total"
                  className="ml-2 p-1 h-auto text-wos-blue hover:text-wos-blue-dark"
                >
                  <HelpCircle className="h-3 w-3" />
                </Button>
              </Label>
              <Input
                type="number"
                id="totalWounded"
                value={totalWounded}
                onChange={(e) => setTotalWounded(e.target.value)}
                min="1"
                max="999999"
                placeholder="Leave empty if unknown"
                data-testid="input-total-wounded"
              />
            </div>

            {/* Calculate Button */}
            <Button
              type="submit"
              className="w-full bg-wos-blue hover:bg-wos-blue-dark text-white font-medium py-3"
              data-testid="button-calculate"
            >
              <Calculator className="mr-2 h-4 w-4" />
              Calculate
            </Button>
          </form>

          {/* Results */}
          {results && (
            <div className="mt-6">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-3 flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Calculation Results
                </h3>
                <div className="space-y-2 text-green-700 dark:text-green-200">
                  <div className="flex items-center" data-testid="result-wounded-per-batch">
                    <Users className="mr-2 h-4 w-4" />
                    <span className="font-semibold">Wounded per batch:</span>
                    <span className="ml-2 font-mono text-lg">
                      {results.woundedPerBatch.toLocaleString()}
                    </span>
                  </div>
                  {results.requiredCycles && (
                    <div className="flex items-center" data-testid="result-required-cycles">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      <span className="font-semibold">Required healing cycles:</span>
                      <span className="ml-2 font-mono text-lg">
                        {results.requiredCycles.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {results.totalTime && (
                    <div className="flex items-center" data-testid="result-total-time">
                      <Clock className="mr-2 h-4 w-4" />
                      <span className="font-semibold">Estimated total time:</span>
                      <span className="ml-2 font-mono text-lg">{results.totalTime}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mt-6">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
                <p className="text-red-700 dark:text-red-300 flex items-center" data-testid="error-message">
                  <TriangleAlert className="mr-2 h-4 w-4" />
                  {error}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Help Modals */}
      <Modal
        isOpen={woundedHelpOpen}
        onClose={() => setWoundedHelpOpen(false)}
        title="Wounded Field Help"
      >
        <div className="space-y-3">
          <p className="text-sm text-wos-gray-600 dark:text-muted-foreground">
            Enter the exact number of wounded troops shown in your infirmary interface.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
            <p className="text-sm text-blue-700 dark:text-blue-200">
              <strong>Tip:</strong> This should match the number displayed in the "Heal Injured" section of your game.
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={timeHelpOpen}
        onClose={() => setTimeHelpOpen(false)}
        title="Healing Time Help"
      >
        <div className="space-y-3">
          <p className="text-sm text-wos-gray-600 dark:text-muted-foreground">
            Enter the healing time displayed in the game without any speedups applied.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
            <p className="text-sm text-blue-700 dark:text-blue-200">
              <strong>Important:</strong> Use the original healing time shown in the interface, not the time after applying speedups or alliance help.
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={helpersHelpOpen}
        onClose={() => setHelpersHelpOpen(false)}
        title="Number of Helpers Help"
      >
        <div className="space-y-3">
          <p className="text-sm text-wos-gray-600 dark:text-muted-foreground">
            This depends on your alliance technology and Embassy building level:
          </p>
          <div className="space-y-2">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-3">
              <h4 className="font-semibold text-green-800 dark:text-green-300 text-sm mb-1">Alliance Technology (Growth branch):</h4>
              <ul className="text-sm text-green-700 dark:text-green-200 space-y-1">
                <li>• Treaties I: +5 helpers (max)</li>
                <li>• Treaties II: +10 helpers (max)</li>
              </ul>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-3">
              <h4 className="font-semibold text-purple-800 dark:text-purple-300 text-sm mb-1">Embassy Building:</h4>
              <p className="text-sm text-purple-700 dark:text-purple-200">Up to +30 helpers (depending on level)</p>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
            <p className="text-sm text-blue-700 dark:text-blue-200">
              <strong>Maximum total:</strong> 45 helpers (5 + 10 + 30)
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={allyTimeHelpOpen}
        onClose={() => setAllyTimeHelpOpen(false)}
        title="Ally Help Time Help"
      >
        <div className="space-y-3">
          <p className="text-sm text-wos-gray-600 dark:text-muted-foreground">
            The time reduction each alliance member provides depends on your alliance technology and Embassy level:
          </p>
          <div className="space-y-2">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-3">
              <h4 className="font-semibold text-green-800 dark:text-green-300 text-sm mb-1">Alliance Technology:</h4>
              <p className="text-sm text-green-700 dark:text-green-200">
                Growth → Cooperative Protocols I: up to 150 seconds per helper
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-3">
              <h4 className="font-semibold text-purple-800 dark:text-purple-300 text-sm mb-1">Embassy Building:</h4>
              <p className="text-sm text-purple-700 dark:text-purple-200">
                Up to 97 seconds per helper (depending on level)
              </p>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
            <p className="text-sm text-blue-700 dark:text-blue-200">
              <strong>Example:</strong> 97 + 150 = 247 seconds, or use the default 257 seconds
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={totalHelpOpen}
        onClose={() => setTotalHelpOpen(false)}
        title="Total Wounded Help"
      >
        <div className="space-y-3">
          <p className="text-sm text-wos-gray-600 dark:text-muted-foreground">
            Optional field for planning multiple healing cycles.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
            <p className="text-sm text-blue-700 dark:text-blue-200">
              <strong>Use case:</strong> If you have more wounded troops than can fit in one healing batch, enter the total here to see how many cycles you'll need.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
