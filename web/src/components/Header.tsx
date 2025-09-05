import { useEffect, useState } from "react";
import type { User } from "../typings/user";
import type { TabsProps } from "../typings";

const Header: React.FC<{
    user: User;
    changeTab: (tab: TabsProps) => void;
}> = ({ user, changeTab }) => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            
            let hours = now.getHours();
            let minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';

            hours = hours % 12;
            hours = hours ? hours : 12;
            const minutesStr = minutes < 10 ? '0' + minutes : minutes;

            setTime(`${hours}:${minutesStr} ${ampm}`);
        }

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval)
    }, []);

    return (
        <div className="header">
            <div>
                <p>{time}</p>
                <i className="fa-solid fa-house" onClick={() => changeTab('main')}></i>
                {user.isAdmin && <i className="fa-solid fa-shield-halved"></i>}
            </div>

            <div>
                <i className="hgi hgi-stroke hgi-coins-02"></i>
                <i className="pointer-events-none">{Number(user.stats.coins.toFixed(0)).toLocaleString('en-US')}</i>

                <i className="hgi hgi-stroke hgi-test-tube-01"></i>
                <i className="pointer-events-none">{Number(user.stats.xp.toFixed(0)).toLocaleString('en-US')}</i>

                <i className="fa-solid fa-gear" onClick={() => changeTab('settings')}></i>
            </div>
        </div>
    )
};

export default Header;