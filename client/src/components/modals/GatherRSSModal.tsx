import { Modal } from "@/components/ui/modal";

interface GatherRSSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GatherRSSModal({ isOpen, onClose }: GatherRSSModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Gather RSS"
      className="max-w-md"
    >
      <div className="space-y-4">
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <p className="text-sm text-green-700 dark:text-green-300">
            <strong>Gather RSS</strong> gives you points for each resource unit you gather from tiles on the map.
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold">Calculation Examples:</p>
          <div className="text-sm space-y-1 text-muted-foreground">
            <p>• Gathering 500,000 RSS = 500,000 × 2 = 1,000,000 points</p>
            <p>• Gathering 1,000,000 RSS = 1,000,000 × 2 = 2,000,000 points</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold">Tips:</p>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Higher level tiles give more resources per hour</li>
            <li>• Use gathering speed-ups to collect faster</li>
            <li>• Focus on tiles that match your current needs</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
}