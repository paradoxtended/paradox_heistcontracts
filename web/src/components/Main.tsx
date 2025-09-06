import { useState } from "react";
import type { User } from "../typings/user";
import { locale } from "../utils/locale";
import type { TabsProps } from "../typings";

type Card = { title: string; description: string; image: string };

const Main: React.FC<{
    user: User;
    changeTab: (tab: TabsProps) => void;
}> = ({ user, changeTab }) => {
    const CARDS = [
        { title: locale('blackmarket'), description: locale('blackmarket_description'), image: './images/pistol.png' },
        { title: locale('heist_contracts'), description: locale('heist_contracts_description'), image: './images/hat.png' },
        { title: locale('leaderboard'), description: locale('leaderboard_description'), image: './images/trophy.png' },
        user.isAdmin && { title: locale('admin_menu'), description: locale('admin_menu_description'), image: './images/shield.png' }
    ].filter((card): card is Card => Boolean(card));

    const [index, setIndex] = useState(0);

    const handleCardMove = (move: 'next' | 'previous') => {
        setIndex(prev => move === 'next' ? (prev + 1) % CARDS.length : (prev - 1 + CARDS.length) % CARDS.length
        )
    };

    const visibleCards = [
        CARDS[index],
        CARDS[(index + 1) % CARDS.length],
        CARDS[(index + 2) % CARDS.length]
    ]

    return (
        <main>
            <div className="p-10 flex items-center justify-between">
                <div className="text-4xl">
                    <p>{locale('welcome')},</p>
                    <p className="font-medium text-5xl">{user.data.name}</p>
                </div>

                <div className="image-outline">
                    <img src={user.data.image} />
                </div>
            </div>

            <div className="main-container">
                <i className="fa-solid fa-chevron-left" onClick={() => handleCardMove('previous')}></i>

                <div className="cards-wrapper">
                    {visibleCards.map((card, i) => (
                        <div className="card" key={i}>
                            <img src={card.image} />

                            <div>
                                <p className="text-[22px] font-semibold">{card.title}</p>
                                <p className="text-sm text-neutral-400">{card.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <i className="fa-solid fa-chevron-right" onClick={() => handleCardMove('next')}></i>
            </div>
        </main>
    )
};

export default Main;