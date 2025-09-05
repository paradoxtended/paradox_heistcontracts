import type { User } from "../typings/user";

const Settings: React.FC<{
    user: User;
}> = ({ user }) => {
    return (
        <div>
            BOSS {user.nickname}
        </div>
    )
};

export default Settings;