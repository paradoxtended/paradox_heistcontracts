export interface User {
    isAdmin: boolean;
    data: {
        name: string;
        image: string;
    },
    stats: {
        coins: number;
        xp: number;
        completedContracts: number;
        firstLogged: string;
    }
}