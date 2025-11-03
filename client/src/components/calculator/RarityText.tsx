interface RarityTextProps {
  label: string;
}

// Universal component for colorizing text by rarity
export function RarityText({ label }: RarityTextProps) {
  const colorizeByRarity = (text: string, rarity: string, color: string) => {
    if (!text.includes(rarity)) return text;
    
    return (
      <span>
        {text.split(rarity).map((part, index) => (
          index === 0 ? part : (
            <span key={index}>
              <span className={`${color} font-medium`}>{rarity}</span>
              {part}
            </span>
          )
        ))}
      </span>
    );
  };

  let result: string | JSX.Element = label;
  
  // Process in order of priority (most rare first)
  if (label.includes('Legendary')) {
    result = colorizeByRarity(label, 'Legendary', 'text-orange-500 dark:text-orange-400');
  } else if (label.includes('Mythic')) {
    result = colorizeByRarity(label, 'Mythic', 'text-red-600 dark:text-red-400');
  } else if (label.includes('Epic')) {
    result = colorizeByRarity(label, 'Epic', 'text-purple-600 dark:text-purple-400');
  } else if (label.includes('Rare')) {
    result = colorizeByRarity(label, 'Rare', 'text-blue-600 dark:text-blue-400');
  }
  
  return <span>{result}</span>;
}