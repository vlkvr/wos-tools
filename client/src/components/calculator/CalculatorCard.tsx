import { useState } from "react";
import { BarChart3, Calculator } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface CalculatorCardProps {
  title: string;
  description: string;
  totalPoints: number;
  goalMet: boolean;
  includePlannedSpending?: boolean;
  onIncludePlannedSpendingChange?: (value: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export function CalculatorCard({
  title,
  description,
  totalPoints,
  goalMet,
  includePlannedSpending = false,
  onIncludePlannedSpendingChange,
  children,
  className = ""
}: CalculatorCardProps) {
  return (
    <div className={`max-w-6xl mx-auto p-6 space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-3xl font-bold text-foreground">
          <Calculator className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          {title}
        </div>
        <p className="text-muted-foreground text-lg">{description}</p>
      </div>

      {/* Settings */}
      {onIncludePlannedSpendingChange && (
        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="planned-spending" className="text-base font-medium">
                  Include Planned Spending
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Highlight activities you're planning to do
                </p>
              </div>
              <Switch
                id="planned-spending"
                checked={includePlannedSpending}
                onCheckedChange={onIncludePlannedSpendingChange}
                data-testid="switch-planned-spending"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Calculator content */}
      {children}

      {/* Total Expected Section */}
      <Card className="border-2 border-green-500 dark:border-green-600">
        <CardContent className="mt-4 px-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
              <h3 className="text-xl font-bold text-foreground">Total Expected</h3>
            </div>
            {goalMet && (
              <div className="text-green-600 dark:text-green-400 font-bold text-lg">
                🎯 Goals Achieved!
              </div>
            )}
          </div>
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-2" data-testid="text-total-points">
                {totalPoints.toLocaleString()}
              </div>
              <div className="text-muted-foreground">Total Points</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}