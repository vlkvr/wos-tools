import { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export interface StageConfig {
  key: string;
  label: string | ReactNode;
}

interface StageTabsProps {
  stages: StageConfig[];
  activeStage: string;
  onStageChange: (stageKey: string) => void;
  children: (stageKey: string) => ReactNode;
  dataTestIdPrefix?: string;
}

export function StageTabs({ 
  stages, 
  activeStage, 
  onStageChange, 
  children,
  dataTestIdPrefix = "tab"
}: StageTabsProps) {
  return (
    <Tabs value={activeStage} onValueChange={onStageChange}>
      <TabsList className="mb-[-2px] relative z-20 bg-border rounded-b-none p-1">
        {stages.map((stage) => (
          <TabsTrigger
            key={stage.key}
            value={stage.key}
            className="data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-none px-4 py-2 data-[state=active]:border-2 data-[state=active]:border-b-0 data-[state=active]:border-border data-[state=active]:rounded-b-none data-[state=inactive]:border-b-2 data-[state=inactive]:border-b-border"
            data-testid={`${dataTestIdPrefix}-${stage.key}`}
          >
            {stage.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {stages.map((stage) => (
        <TabsContent key={stage.key} value={stage.key} className="m-0 p-0 relative z-10">
          <Card className="border-2 border-t-2 rounded-t-none bg-border p-0">
            <div className="bg-card rounded-b-lg m-0">
              <CardContent className="p-6">
                {children(stage.key)}
              </CardContent>
            </div>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
