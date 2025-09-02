export interface User {
    nickname: string;
    image: string;
    isAdmin: boolean;
    stats: {
        coins: number;
        xp: number;
    }
}