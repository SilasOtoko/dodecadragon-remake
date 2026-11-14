// Resource names and their pixel icons (from the original's img folder).
export interface ResourceInfo { name: string; icon: string; field: string; rate?: string; unlock: number }

export const RESOURCES: Record<string, ResourceInfo> = {
  gold: { name: 'gold', icon: 'img/iconGoldCoins.png', field: 'gold', rate: 'goldPerSecond', unlock: 0 },
  fire: { name: 'fire', icon: 'img/iconFire.png', field: 'fire', rate: 'firePerSecond', unlock: 1 },
  platinum: { name: 'platinum', icon: 'img/iconPlatinumCoins.png', field: 'platinum', unlock: 3 },
  magic: { name: 'magic', icon: 'img/iconMagic.png', field: 'magic', unlock: 4 },
  magifolds: { name: 'magifolds', icon: 'img/iconMagifold.png', field: 'magifolds', unlock: 5 },
  uranium: { name: 'uranium', icon: 'img/iconUraniumCoins.png', field: 'uranium', unlock: 7 },
};
