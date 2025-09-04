import { useState } from "react";
import type { User } from "../../typings/user";
import { locale } from "../../utils/locale";
import Fade from "../utils/transitions/Fade";
import { fetchNui } from "../../utils/fetchNui";

type SettingType = 'nickname' | 'image';

/**
 * This tab (page) has been written in tailwind.
 * If you want, you can rewrite this to CSS but I think it will be waste of time...
 */

const Settings: React.FC<{
    user: User;
    setUser: (user: User) => void;
}> = ({ user, setUser }) => {
    const [settingType, setSettingType] = useState<SettingType>();
    const [query, setQuery] = useState('');

    // @todo fetchNui to change nickname or image (profile picture)
    const handleChange = async () => {
        const icon = document.getElementById('settings-confirm');
        
        if (icon === null || icon.className === 'icon-loader')
            return;

        icon.className = 'icon-loader';

        const response = await fetchNui('edit_profile', {
            settingType: settingType,
            value: query
        })

        if (response && settingType) {
            setUser({
                ...user,
                [settingType]: query
            });
        }

        icon.className = 'fa-solid fa-check';
    }

    return (
        <div className="p-4 flex flex-col gap-4">
            <div className="bg-[#1C1E29] w-full px-8 py-5 rounded-md shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <img src={user.image} alt="user-profile" className="rounded-full w-[90px] h-[90px]" />

                    <div>
                        <p className="text-white font-semibold text-2xl">{locale('settings_user', user.nickname)}</p>
                        <p className="text-[#A6A6AF] font-medium">{locale('settings_first_logged', user.firstLogged)}</p>
                        <p className="text-[#A6A6AF] font-medium">{locale('settings_completed_heists', user.stats.completedContracts)}</p>
                    </div>
                </div>

                <div className="flex items-center justify-center flex-col gap-2">
                    <button className="main-button w-full" onClick={() => setSettingType('nickname')}>
                        <i className="fa-solid fa-pen"></i>
                        {locale('settings_edit_username')}
                    </button>

                    <button className="main-button w-full" onClick={() => setSettingType('image')}>
                        <i className="fa-solid fa-camera"></i>
                        {locale('settings_edit_profile_picture')}
                    </button>
                </div>
            </div>

            <Fade in={settingType !== undefined}>
                <div className="bg-[#1C1E29] w-full px-8 py-5 rounded-md shadow-lg flex items-center justify-between">
                    <div>
                        <p className="text-white font-semibold text-2xl">{locale(`settings_change_${settingType}`)}</p>
                        <p className="text-[#A6A6AF] font-medium">{locale(`settings_change_${settingType}_description1`)}</p>
                        <p className="text-[#A6A6AF] font-medium">{locale(`settings_change_${settingType}_description2`)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="text" placeholder={locale(`settings_change_${settingType}_input`)} defaultValue={user[settingType as SettingType]} key={settingType}
                            onChange={(e) => setQuery(e.target.value)}/>
                        <button className="main-button" style={{ padding: '11px 15px' }} onClick={() => handleChange()}><i className="fa-solid fa-check px-[2px]" id="settings-confirm"></i></button>
                    </div>
                </div>
            </Fade>
        </div>
    )
};

export default Settings;