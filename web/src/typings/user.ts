export interface User {
    nickname: string;
    image: string;
    isAdmin: boolean;
    firstLogged: string;
    time: string;
    stats: {
        coins: number;
        xp: number;
        completedContracts: number
    }
}