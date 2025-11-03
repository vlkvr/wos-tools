import { ArmamentData } from "./types";

export const armamentData: ArmamentData = {
  stage1: [
    { id: "chief-gear-1", label: "🧥 Chief Gear", type: "chief", multiplier: 3, helpModal: "chief-gear" },
    { id: "refined-fire-crystals-1", label: "🔥 Refined Fire Crystals, buildings", multiplier: 1500 },
    { id: "fire-building", label: "🔥 Fire Crystals, buildings", multiplier: 100 },
    { id: "fire-research", label: "🔥 Fire Crystal Shards, research", multiplier: 50 },
    { id: "hero-shards-rare", label: "🧩 Hero Shards, Rare", multiplier: 15 },
    { id: "hero-shards-epic", label: "🧩 Hero Shards, Epic", multiplier: 50 },
    { id: "hero-shards-mythic", label: "🧩 Hero Shards, Mythic", multiplier: 125 },
    { id: "expert-sigil", label: "🎓 Expert Sigil", multiplier: 200 },
    { id: "book-of-knowledge", label: "📖 Book of Knowledge", multiplier: 2 },
    { id: "speedups-1", label: "⏩ Speedups", type: "speedup", multiplier: 1, helpModal: "speedups" },
  ],
  stage2: [
    { id: "chief-gear-2", label: "🧥 Chief Gear", type: "chief", multiplier: 3, helpModal: "chief-gear" },
    { id: "refined-fire-crystals-2", label: "🔥 Refined Fire Crystals, buildings", multiplier: 1500 },
    { id: "fire-building-2", label: "🔥 Fire Crystals, buildings", multiplier: 100 },
    { id: "fire-research-2", label: "🔥 Fire Crystal Shards, research", multiplier: 50 },
    { id: "hero-essence-stone", label: "🀄 Essence Stone", multiplier: 800 },
    { id: "hero-widgets", label: "🔫 Widgets", multiplier: 1600 },
    { id: "hero-mithril", label: "🧿 Mithril", multiplier: 28800 },
    { id: "speedups-2", label: "⏩ Speedups", type: "speedup", multiplier: 1, helpModal: "speedups" },
  ],
};