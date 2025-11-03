import * as React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className = "" }: ModalProps) {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      try {
        if (typeof document !== "undefined") {
          document.addEventListener("keydown", handleEscape);
          if (document.body) {
            document.body.style.overflow = "hidden";
          }
        }
      } catch (error) {
        console.warn("Failed to setup modal document listeners:", error);
      }
    }

    return () => {
      try {
        if (typeof document !== "undefined") {
          document.removeEventListener("keydown", handleEscape);
          if (document.body) {
            document.body.style.overflow = "unset";
          }
        }
      } catch (error) {
        console.warn("Failed to cleanup modal document listeners:", error);
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className={`bg-white dark:bg-card rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-wos-gray-900 dark:text-foreground">
              {title}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              data-testid="modal-close"
              className="text-wos-gray-400 hover:text-wos-gray-600 dark:hover:text-wos-gray-300 text-2xl"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
