import type { ItemData } from '../typings/item';
import { isEnvBrowser } from '../utils/misc';

export const Items: {
  [key: string]: ItemData | undefined;
} = {
  ...(isEnvBrowser() && {
    weapon_pistol: {
        label: 'Pistol',
        description: 'A reliable handgun for self-defense and tactical operations.',
        count: 5,
        image: 'https://i.postimg.cc/3wNPTpx1/weapon-pistol.png',
        price: { coins: 500, money: 12500 }
    },
    lockpick: {
      label: 'Lockpick',
      description: 'A small and reliable tool. Can get through every doors.',
      count: 10,
      image: 'https://i.postimg.cc/661DcJD8/lockpick.png',
      price: 150
    },
    safe_cracker: {
      label: 'Safe cracker',
      image: 'https://i.postimg.cc/5t6P662p/safecracker.png',
      description: 'Break every safe with this amazing device.',
      price: { coins: 5 }
    },
    hacking_laptop: {
      label: 'Laptop',
      image: 'https://i.postimg.cc/vBXLhyTD/laptop4.png',
      description: 'Must have item. Hack every electric doors and alarms.',
      price: { money: 35000, coins: 1000 },
      count: 0
    }
  })
};