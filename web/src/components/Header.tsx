import type { User } from "../typings/user";

const Header: React.FC<{
    user: User;
}> = ({ user }) => {
    return (
        <div className="header">
            <div>
                <p>{user.time}</p>
                <i className="fa-solid fa-house"></i>
                {user.isAdmin && <i className="fa-solid fa-shield-halved"></i>}
            </div>

            <div>
                <i className="hgi hgi-stroke hgi-coins-02"></i>
                <i className="pointer-events-none">{Number(user.stats.coins.toFixed(0)).toLocaleString('en-US')}</i>

                <i className="hgi hgi-stroke hgi-test-tube-01"></i>
                <i className="pointer-events-none">{Number(user.stats.xp.toFixed(0)).toLocaleString('en-US')}</i>

                <i className="fa-solid fa-gear"></i>
            </div>
        </div>
    )
};

export default Header;