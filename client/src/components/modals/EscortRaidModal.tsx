import { Modal } from "@/components/ui/modal";

interface EscortRaidModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EscortRaidModal({ isOpen, onClose }: EscortRaidModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Escort/Raid Trucks"
      className="max-w-md"
    >
      <div className="space-y-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <strong>Escort/Raid Trucks</strong> gives you points for each successful escort or raid mission completed.
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold">Tips:</p>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Each escort or raid mission gives 10,000 points</li>
            <li>• Focus on completing as many missions as possible</li>
            <li>• Use speed-ups to complete missions faster</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
}