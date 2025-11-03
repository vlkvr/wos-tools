import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

interface ChiefCharmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChiefCharmModal({ isOpen, onClose }: ChiefCharmModalProps) {
  const [level1_2Expanded, setLevel1_2Expanded] = useState(false);
  const [level3_4Expanded, setLevel3_4Expanded] = useState(false);
  const [level5_7Expanded, setLevel5_7Expanded] = useState(false);
  const [level8_11Expanded, setLevel8_11Expanded] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Chief Charm Multipliers"
      className="max-w-md"
    >
      <div className="space-y-2">
        {/* Levels 1-2 */}
        <div className="border border-green-200 dark:border-green-700 rounded-lg">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setLevel1_2Expanded(!level1_2Expanded)}
            className="w-full p-3 bg-green-50 dark:bg-green-900/20 text-left flex items-center justify-between hover:bg-green-100 dark:hover:bg-green-800/30 rounded-lg"
          >
            <span className="text-green-600 dark:text-green-300 font-medium">
              Levels 1-2
            </span>
            {level1_2Expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          {level1_2Expanded && (
            <div className="p-2 space-y-2">
              <div className="flex justify-between items-center p-2 bg-green-25 dark:bg-green-900/10 rounded">
                <span className="text-sm">Level 1</span>
                <span className="font-mono font-semibold">625</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-25 dark:bg-green-900/10 rounded">
                <span className="text-sm">Level 2</span>
                <span className="font-mono font-semibold">1,250</span>
              </div>
            </div>
          )}
        </div>

        {/* Levels 3-4 */}
        <div className="border border-blue-200 dark:border-blue-700 rounded-lg">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setLevel3_4Expanded(!level3_4Expanded)}
            className="w-full p-3 bg-blue-50 dark:bg-blue-900/20 text-left flex items-center justify-between hover:bg-blue-100 dark:hover:bg-blue-800/30 rounded-lg"
          >
            <span className="text-blue-600 dark:text-blue-300 font-medium">
              Levels 3-4
            </span>
            {level3_4Expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          {level3_4Expanded && (
            <div className="p-2 space-y-2">
              <div className="flex justify-between items-center p-2 bg-blue-25 dark:bg-blue-900/10 rounded">
                <span className="text-sm">Level 3</span>
                <span className="font-mono font-semibold">3,125</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-blue-25 dark:bg-blue-900/10 rounded">
                <span className="text-sm">Level 4</span>
                <span className="font-mono font-semibold">8,750</span>
              </div>
            </div>
          )}
        </div>

        {/* Levels 5-7 */}
        <div className="border border-purple-200 dark:border-purple-700 rounded-lg">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setLevel5_7Expanded(!level5_7Expanded)}
            className="w-full p-3 bg-purple-50 dark:bg-purple-900/20 text-left flex items-center justify-between hover:bg-purple-100 dark:hover:bg-purple-800/30 rounded-lg"
          >
            <span className="text-purple-600 dark:text-purple-300 font-medium">
              Levels 5-7
            </span>
            {level5_7Expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          {level5_7Expanded && (
            <div className="p-2 space-y-2">
              <div className="flex justify-between items-center p-2 bg-purple-25 dark:bg-purple-900/10 rounded">
                <span className="text-sm">Level 5</span>
                <span className="font-mono font-semibold">11,250</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-purple-25 dark:bg-purple-900/10 rounded">
                <span className="text-sm">Level 6</span>
                <span className="font-mono font-semibold">12,500</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-purple-25 dark:bg-purple-900/10 rounded">
                <span className="text-sm">Level 7</span>
                <span className="font-mono font-semibold">12,500</span>
              </div>
            </div>
          )}
        </div>

        {/* Levels 8-11 */}
        <div className="border border-orange-200 dark:border-orange-700 rounded-lg">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setLevel8_11Expanded(!level8_11Expanded)}
            className="w-full p-3 bg-orange-50 dark:bg-orange-900/20 text-left flex items-center justify-between hover:bg-orange-100 dark:hover:bg-orange-800/30 rounded-lg"
          >
            <span className="text-orange-600 dark:text-orange-300 font-medium">
              Levels 8-11
            </span>
            {level8_11Expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          {level8_11Expanded && (
            <div className="p-2 space-y-2">
              <div className="flex justify-between items-center p-2 bg-orange-25 dark:bg-orange-900/10 rounded">
                <span className="text-sm">Level 8</span>
                <span className="font-mono font-semibold">13,000</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-orange-25 dark:bg-orange-900/10 rounded">
                <span className="text-sm">Level 9</span>
                <span className="font-mono font-semibold">14,000</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-orange-25 dark:bg-orange-900/10 rounded">
                <span className="text-sm">Level 10</span>
                <span className="font-mono font-semibold">15,000</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-orange-25 dark:bg-orange-900/10 rounded">
                <span className="text-sm">Level 11</span>
                <span className="font-mono font-semibold">16,000</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
