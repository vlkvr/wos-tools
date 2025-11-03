import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";
import { Info, RotateCcw } from "lucide-react";
import { RarityText } from "./RarityText";
import { type CalculatorItem } from "@/data/types";
import { safeEval } from "@/utils/calculations";

interface StageTableProps {
  data: CalculatorItem[];
  inputs: { [key: string]: string };
  troopLevels?: { [key: string]: number };
  onInputChange: (itemId: string, value: string) => void;
  onTroopLevelChange?: (itemId: string, multiplier: number) => void;
  onResetInputs: () => void;
  includePlannedSpending?: boolean;
}

export function StageTable({
  data,
  inputs,
  troopLevels = {},
  onInputChange,
  onTroopLevelChange,
  onResetInputs,
  includePlannedSpending = false
}: StageTableProps) {
  const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null);

  const handleInfoClick = (item: CalculatorItem) => {
    if (item.helpModal) {
      setModalContent({ title: item.label, content: `Help info for ${item.label}` });
    }
  };

  const calculateItemPoints = (item: CalculatorItem) => {
    const inputValue = safeEval(inputs[item.id]) || 0;
    const multiplier = item.type === "troops" ? (troopLevels?.[item.id] || item.multiplier) : item.multiplier;
    return inputValue * multiplier;
  };

  return (
    <>
      <div className="mt-4 px-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-foreground">Activities</h4>
          <Button
            onClick={onResetInputs}
            variant="outline"
            size="sm"
            data-testid="button-reset-inputs"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-wos-gray-50">
              <tr className="border-b-2 border-border">
                <th className="text-left p-2 font-semibold text-foreground border-r border-border">Activity</th>
                <th className="text-center p-2 font-semibold text-foreground w-32 border-r border-border">Quantity</th>
                {onTroopLevelChange && (
                  <th className="text-center p-2 font-semibold text-foreground w-24 border-r border-border">Level</th>
                )}
                <th className="text-center p-2 font-semibold text-foreground w-24 border-r border-border">Points Each</th>
                <th className="text-center p-2 font-semibold text-foreground w-24 border-r border-border">Total Points</th>
                <th className="text-center p-2 font-semibold text-foreground w-16">Info</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                const inputValue = Number(safeEval(inputs[item.id])) || 0;
                const multiplier = item.type === "troops" ? (troopLevels?.[item.id] || item.multiplier) : item.multiplier;
                const totalPoints = inputValue * multiplier;

                return (
                  <tr
                    key={item.id}
                    className={`border-b border-border hover:bg-wos-gray-50 transition-colors`}
                  >
                    <td className="p-2">
                      <RarityText label={item.label} />
                    </td>
                    <td className="p-2 text-center">
                      <Input
                        type="number"
                        value={inputs[item.id] || ''}
                        onChange={(e) => onInputChange(item.id, e.target.value)}
                        className="w-full text-center"
                        placeholder="0"
                        data-testid={`input-${item.id}`}
                      />
                    </td>
                    {onTroopLevelChange && (
                      <td className="p-2 text-center">
                        {item.type === 'troops' && item.troopLevels ? (
                          <Select
                            value={(troopLevels?.[item.id] || item.multiplier).toString()}
                            onValueChange={(value) => onTroopLevelChange(item.id, parseInt(value))}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Level" />
                            </SelectTrigger>
                            <SelectContent>
                              {item.troopLevels.map((tl) => (
                                <SelectItem key={tl.level} value={tl.multiplier.toString()}>
                                  T{tl.level}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <span className="text-muted-foreground text-sm">N/A</span>
                        )}
                      </td>
                    )}
                    <td className="p-2 text-center text-muted-foreground">
                      {multiplier.toLocaleString()}
                    </td>
                    <td className="p-2 text-center font-medium">
                      {totalPoints.toLocaleString()}
                    </td>
                    <td className="p-2 text-center">
                      {item.helpModal && (
                        <Button
                          onClick={() => handleInfoClick(item)}
                          variant="ghost"
                          size="sm"
                          data-testid={`button-info-${item.id}`}
                        >
                          <Info className="h-4 w-4" />
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={!!modalContent}
        onClose={() => setModalContent(null)}
        title={modalContent?.title || ''}
      >
        <div className="whitespace-pre-line">
          {modalContent?.content}
        </div>
      </Modal>
    </>
  );
}