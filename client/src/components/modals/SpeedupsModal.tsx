import { Modal } from "@/components/ui/modal";

interface SpeedupsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SpeedupsModal({ isOpen, onClose }: SpeedupsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Speedups Types">
      <div className="space-y-4">
        <p className="text-wos-gray-600 dark:text-muted-foreground">
          The following speedup types count towards the Speedups category:
        </p>
        
        <div className="bg-wos-gray-50 dark:bg-accent/20 rounded-lg p-4">
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-wos-blue rounded-full mr-3"></span>
              <span className="text-wos-gray-800 dark:text-foreground">Training</span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-wos-blue rounded-full mr-3"></span>
              <span className="text-wos-gray-800 dark:text-foreground">Construction</span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-wos-blue rounded-full mr-3"></span>
              <span className="text-wos-gray-800 dark:text-foreground">Research</span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-wos-blue rounded-full mr-3"></span>
              <span className="text-wos-gray-800 dark:text-foreground">Expert</span>
            </li>
          </ul>
        </div>

        <p className="text-sm text-wos-gray-500 dark:text-muted-foreground">
          All these speedup types have the same point value and can be combined to reach your goal.
        </p>
      </div>
    </Modal>
  );
}