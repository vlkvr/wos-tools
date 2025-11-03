import { OfficerProjectData } from "./types";

export const officerProjectData: OfficerProjectData = {
  stage1: [
    { id: "chief-charm-1", label: "✨ Chief Charm", type: "chief", multiplier: 70, helpModal: "chief-charm" },
    { id: "essence-stone-1", label: "🀄️ Essence Stone", multiplier: 6000 },
    { id: "widgets-1", label: "🔫 Widgets", multiplier: 12000 },
    { id: "mithril-1", label: "🧿 Mithril", multiplier: 216000 },
    {
      id: "train-troops-1",
      label: "🪖 Train Troops",
      type: "troops",
      multiplier: 30,
      troopLevels: [
        { level: "Lv 5", multiplier: 6, color: "text-rarity-rare font-medium" },
        { level: "Lv 6", multiplier: 9, color: "text-rarity-rare font-medium" },
        { level: "Lv 7", multiplier: 12, color: "text-rarity-epic font-medium" },
        { level: "Lv 8", multiplier: 17, color: "text-rarity-epic font-medium" },
        { level: "Lv 9", multiplier: 22, color: "text-rarity-mythic font-medium" },
        { level: "Lv 10", multiplier: 30, color: "text-rarity-mythic font-medium" },
        { level: "Lv 11", multiplier: 37, color: "text-rarity-legendary font-medium" },
      ],
    },
  ],
  stage2: [
    { id: "chief-gear-op-2", label: "🧥 Chief Gear", type: "chief", multiplier: 70, helpModal: "chief-gear" },
    { id: "hero-shards-rare-op-2", label: "🧩 Hero Shards, Rare", multiplier: 350 },
    { id: "hero-shards-epic-op-2", label: "🧩 Hero Shards, Epic", multiplier: 1220 },
    { id: "hero-shards-mythic-op-2", label: "🧩 Hero Shards, Mythic", multiplier: 3040 },
    { id: "essence-stone-op-2", label: "🀄️ Essence Stone", multiplier: 6000 },
    { id: "widgets-op-2", label: "🔫 Widgets", multiplier: 12000 },
    { id: "mithril-op-2", label: "🧿 Mithril", multiplier: 216000 },
  ],
};