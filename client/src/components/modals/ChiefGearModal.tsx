import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

interface ChiefGearModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChiefGearModal({ isOpen, onClose }: ChiefGearModalProps) {
  const [uncommonExpanded, setUncommonExpanded] = useState(false);
  const [rareExpanded, setRareExpanded] = useState(false);
  const [epicExpanded, setEpicExpanded] = useState(false);
  const [mythicExpanded, setMythicExpanded] = useState(false);
  const [legendaryExpanded, setLegendaryExpanded] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Chief Gear Multipliers"
      className="max-w-2xl"
    >
      <div className="space-y-2">
        {/* Uncommon */}
        <div className="border border-green-200 dark:border-green-700 rounded-lg">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setUncommonExpanded(!uncommonExpanded)}
            className="w-full p-3 bg-green-50 dark:bg-green-900/20 text-left flex items-center justify-between hover:bg-green-100 dark:hover:bg-green-800/30 rounded-lg"
          >
            <span className="text-green-600 dark:text-green-300 font-medium">Uncommon</span>
            {uncommonExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          {uncommonExpanded && (
            <div className="p-2 space-y-2">
              <div className="flex justify-between items-center p-2 bg-green-25 dark:bg-green-900/10 rounded">
                <span className="text-sm">Uncommon</span>
                <span className="font-mono font-semibold">1,125</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-25 dark:bg-green-900/10 rounded">
                <span className="text-sm">Uncommon (1-Star)</span>
                <span className="font-mono font-semibold">1,875</span>
              </div>
            </div>
          )}
        </div>

        {/* Rare */}
        <div className="border border-blue-200 dark:border-blue-700 rounded-lg">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setRareExpanded(!rareExpanded)}
            className="w-full p-3 bg-blue-50 dark:bg-blue-900/20 text-left flex items-center justify-between hover:bg-blue-100 dark:hover:bg-blue-800/30 rounded-lg"
          >
            <span className="text-blue-600 dark:text-blue-300 font-medium">Rare</span>
            {rareExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          {rareExpanded && (
            <div className="p-2 space-y-2">
              <div className="flex justify-between items-center p-2 bg-blue-25 dark:bg-blue-900/10 rounded">
                <span className="text-sm">Rare</span>
                <span className="font-mono font-semibold">3,000</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-blue-25 dark:bg-blue-900/10 rounded">
                <span className="text-sm">Rare (1-Star)</span>
                <span className="font-mono font-semibold">4,500</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-blue-25 dark:bg-blue-900/10 rounded">
                <span className="text-sm">Rare (2-Star)</span>
                <span className="font-mono font-semibold">5,100</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-blue-25 dark:bg-blue-900/10 rounded">
                <span className="text-sm">Rare (3-Star)</span>
                <span className="font-mono font-semibold">5,440</span>
              </div>
            </div>
          )}
        </div>

        {/* Epic */}
        <div className="border border-purple-200 dark:border-purple-700 rounded-lg">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setEpicExpanded(!epicExpanded)}
            className="w-full p-3 bg-purple-50 dark:bg-purple-900/20 text-left flex items-center justify-between hover:bg-purple-100 dark:hover:bg-purple-800/30 rounded-lg"
          >
            <span className="text-purple-600 dark:text-purple-300 font-medium">Epic</span>
            {epicExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          {epicExpanded && (
            <div className="p-2 space-y-2">
              <div className="flex justify-between items-center p-2 bg-purple-25 dark:bg-purple-900/10 rounded">
                <span className="text-sm">Epic</span>
                <span className="font-mono font-semibold">3,230</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-purple-25 dark:bg-purple-900/10 rounded">
                <span className="text-sm">Epic (1-Star)</span>
                <span className="font-mono font-semibold">3,230</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-purple-25 dark:bg-purple-900/10 rounded">
                <span className="text-sm">Epic (2-Star)</span>
                <span className="font-mono font-semibold">3,225</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-purple-25 dark:bg-purple-900/10 rounded">
                <span className="text-sm">Epic (3-Star)</span>
                <span className="font-mono font-semibold">3,225</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-purple-25 dark:bg-purple-900/10 rounded">
                <span className="text-sm">Epic T1</span>
                <span className="font-mono font-semibold">3,440</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-purple-25 dark:bg-purple-900/10 rounded">
                <span className="text-sm">Epic T1 (1-Star)</span>
                <span className="font-mono font-semibold">3,440</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-purple-25 dark:bg-purple-900/10 rounded">
                <span className="text-sm">Epic T1 (2-Star)</span>
                <span className="font-mono font-semibold">4,085</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-purple-25 dark:bg-purple-900/10 rounded">
                <span className="text-sm">Epic T1 (3-Star)</span>
                <span className="font-mono font-semibold">4,085</span>
              </div>
            </div>
          )}
        </div>

        {/* Mythic */}
        <div className="border border-orange-200 dark:border-orange-700 rounded-lg">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setMythicExpanded(!mythicExpanded)}
            className="w-full p-3 bg-orange-50 dark:bg-orange-900/20 text-left flex items-center justify-between hover:bg-orange-100 dark:hover:bg-orange-800/30 rounded-lg"
          >
            <span className="text-orange-600 dark:text-orange-300 font-medium">Mythic</span>
            {mythicExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          {mythicExpanded && (
            <div className="p-2 space-y-2">
              <div className="flex justify-between items-center p-2 bg-orange-25 dark:bg-orange-900/10 rounded">
                <span className="text-sm">Mythic</span>
                <span className="font-mono font-semibold">6,250</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-orange-25 dark:bg-orange-900/10 rounded">
                <span className="text-sm">Mythic T2 (3-Star Status: 1-3)</span>
                <span className="font-mono font-semibold">2,320</span>
              </div>
            </div>
          )}
        </div>

        {/* Legendary */}
        <div className="border border-red-200 dark:border-red-700 rounded-lg">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setLegendaryExpanded(!legendaryExpanded)}
            className="w-full p-3 bg-red-50 dark:bg-red-900/20 text-left flex items-center justify-between hover:bg-red-100 dark:hover:bg-red-800/30 rounded-lg"
          >
            <span className="text-red-600 dark:text-red-300 font-medium">Legendary</span>
            {legendaryExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          {legendaryExpanded && (
            <div className="p-2 space-y-2">
              <div className="flex justify-between items-center p-2 bg-red-25 dark:bg-red-900/10 rounded">
                <span className="text-sm">Legendary</span>
                <span className="font-mono font-semibold">2,600</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-red-25 dark:bg-red-900/10 rounded">
                <span className="text-sm">Legendary (Status: 1-3)</span>
                <span className="font-mono font-semibold">2,320</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-red-25 dark:bg-red-900/10 rounded">
                <span className="text-sm">Legendary (1-Star)</span>
                <span className="font-mono font-semibold">2,600</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-red-25 dark:bg-red-900/10 rounded">
                <span className="text-sm">Legendary (1-Star Status: 1-3)</span>
                <span className="font-mono font-semibold">2,310</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-red-25 dark:bg-red-900/10 rounded">
                <span className="text-sm">Legendary (2-Star)</span>
                <span className="font-mono font-semibold">2,630</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-red-25 dark:bg-red-900/10 rounded">
                <span className="text-sm">Legendary (2-Star Status: 1-3)</span>
                <span className="font-mono font-semibold">2,330</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-red-25 dark:bg-red-900/10 rounded">
                <span className="text-sm">Legendary (3-Star)</span>
                <span className="font-mono font-semibold">2,570</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-red-25 dark:bg-red-900/10 rounded">
                <span className="text-sm">Legendary (3-Star Status: 1-3)</span>
                <span className="font-mono font-semibold">2,300</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-red-25 dark:bg-red-900/10 rounded">
                <span className="text-sm">Legendary T1</span>
                <span className="font-mono font-semibold">2,660</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-red-25 dark:bg-red-900/10 rounded">
                <span className="text-sm">Legendary T1 (Status: 1-3)</span>
                <span className="font-mono font-semibold">2,300</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-red-25 dark:bg-red-900/10 rounded">
                <span className="text-sm">Legendary T1 (1-Star)</span>
                <span className="font-mono font-semibold">2,660</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-red-25 dark:bg-red-900/10 rounded">
                <span className="text-sm">Legendary T1 (1-Star Status: 1-3)</span>
                <span className="font-mono font-semibold">2,320</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}