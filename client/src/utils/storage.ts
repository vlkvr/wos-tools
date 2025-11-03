// Utility functions for saving and loading calculator data from localStorage

const STORAGE_KEYS = {
  ARMAMENT: 'wos-armament-calculator',
  OFFICER: 'wos-officer-calculator', 
  ALLIANCE: 'wos-alliance-calculator',
  HEALING: 'wos-healing-calculator',
  KING_OF_ICEFIELD: 'wos-king-of-icefield-calculator',
  STATE_OF_POWER: 'wos-state-of-power-calculator'
} as const;

type StorageKey = keyof typeof STORAGE_KEYS;

// Generic save function
export const saveCalculatorData = (calculatorType: StorageKey, data: any): void => {
  try {
    const key = STORAGE_KEYS[calculatorType];
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn(`Failed to save ${calculatorType} data:`, error);
  }
};

// Generic load function
export const loadCalculatorData = (calculatorType: StorageKey): any | null => {
  try {
    const key = STORAGE_KEYS[calculatorType];
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.warn(`Failed to load ${calculatorType} data:`, error);
    return null;
  }
};

// Clear specific calculator data
export const clearCalculatorData = (calculatorType: StorageKey): void => {
  try {
    const key = STORAGE_KEYS[calculatorType];
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Failed to clear ${calculatorType} data:`, error);
  }
};

// Clear all calculator data
export const clearAllCalculatorData = (): void => {
  Object.values(STORAGE_KEYS).forEach(key => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Failed to clear data for key ${key}:`, error);
    }
  });
};

import { useEffect, useRef } from 'react';

// Hook for automatic data persistence

export const useAutoSave = (calculatorType: StorageKey, data: any, delay: number = 500) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  useEffect(() => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set new timeout for delayed save
    timeoutRef.current = setTimeout(() => {
      saveCalculatorData(calculatorType, data);
    }, delay);
    
    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [calculatorType, data, delay]);
};