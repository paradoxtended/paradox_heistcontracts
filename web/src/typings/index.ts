import type { User } from "./user";

export type TabsProps = 'main' | 'heists' | 'settings';

export interface Initialization {
    locale: string;
}

export interface MainProps {
    user: User;
}