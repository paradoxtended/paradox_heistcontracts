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
    }
  })
};