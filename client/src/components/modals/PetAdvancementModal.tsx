import { Modal } from "@/components/ui/modal";

interface PetAdvancementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PetAdvancementModal({ isOpen, onClose }: PetAdvancementModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Pet Advancement Score"
      className="max-w-md"
    >
      <div className="space-y-4">
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <p className="text-sm text-purple-700 dark:text-purple-300">
            <strong>Pet Advancement Score</strong> gives you points based on your total pet advancement activities and improvements.
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold">Tips:</p>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Each advancement point gives 30 competition points</li>
            <li>• Focus on upgrading pet skills and levels</li>
            <li>• Use Wild Marks to boost advancement progress</li>
            <li>• Prioritize pets that match your playstyle</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
}