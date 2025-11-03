import { ChevronDown, ChevronUp, Target, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StageAccordionProps {
  stageNumber: number;
  title: string;
  goal: string;
  current: string;
  remaining: number;
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  onGoalChange: (goal: string) => void;
  onCurrentChange: (current: string) => void;
  children?: React.ReactNode;
  className?: string;
}

export function StageAccordion({
  stageNumber,
  title,
  goal,
  current,
  remaining,
  expanded,
  onExpandedChange,
  onGoalChange,
  onCurrentChange,
  children,
  className = ""
}: StageAccordionProps) {
  const isGoalMet = remaining <= 0;
  
  return (
    <Card className={`border-2 ${className}`}>
      <CardContent className="p-0">
        {/* Upper clickable header block */}
        <div
          className="p-6 border-b cursor-pointer hover:bg-muted/50 transition-colors duration-200"
          onClick={() => onExpandedChange(!expanded)}
          data-testid={`accordion-header-stage-${stageNumber}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white
                ${isGoalMet 
                  ? 'bg-green-500 dark:bg-green-600' 
                  : 'bg-blue-600 dark:bg-blue-500'
                }
              `}>
                {isGoalMet ? <CheckCircle className="h-5 w-5" /> : stageNumber}
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">
                  Goal: {goal} | Remaining: {remaining.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isGoalMet && (
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                  <Target className="h-4 w-4" />
                  <span className="text-sm">Goal Met!</span>
                </div>
              )}
              {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
          </div>
        </div>

        {/* Lower non-clickable input block */}
        <div className="px-6 pb-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`goal-${stageNumber}`} className="block mb-2">Goal</Label>
              <Input
                id={`goal-${stageNumber}`}
                type="number"
                value={goal}
                onChange={(e) => onGoalChange(e.target.value)}
                placeholder="Enter goal"
                data-testid={`input-goal-stage-${stageNumber}`}
              />
            </div>
            <div>
              <Label htmlFor={`current-${stageNumber}`} className="block mb-2">Current</Label>
              <Input
                id={`current-${stageNumber}`}
                type="number"
                value={current}
                onChange={(e) => onCurrentChange(e.target.value)}
                placeholder="Enter current progress"
                data-testid={`input-current-stage-${stageNumber}`}
              />
            </div>
          </div>
        </div>

        {/* Expanded content */}
        {expanded && children && (
          <div className="border-t">
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  );
}