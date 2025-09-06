import type { Items } from "../store/items";
import type { User } from "./user";

export type TabsProps = 'main' | 'heists' | 'settings' | 'blackmarket' | 'leaderboard' | 'admin';

export interface Initialization {
    locale: string;
    blackmarket: typeof Items;
}

export interface MainProps {
    user: User;
}