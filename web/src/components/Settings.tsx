import { useState } from "react";
import type { User } from "../typings/user";
import { locale } from "../utils/locale";
import SlideUp from "./utils/transitions/SlideUp";

type SettingsProps = 'name' | 'image'
const SettingsTypes: SettingsProps[] = ['name', 'image'];

const Settings: React.FC<{
    user: User;
}> = ({ user }) => {
    const [settingBox, setSettingBox] = useState(false);

    const editProfile = async (settingType: SettingsProps) => {
        const query = document.getElementById('settings-' + settingType) as HTMLInputElement;
        const value = query.value;

        if (value === null || value === user.data[settingType] || value === '')
            return;

        //@todo fetchNui and change name or image :eyes:
    };

    return (
        <div className="p-7">
            <p className="heading">{locale('settings_header')}</p>

            <div className="mt-7 flex flex-col justify-center gap-5">
                <div className="settings-box">
                    <div className="flex items-center gap-3">
                        <img src={user.data.image} className="w-[100px] h-[100px] rounded-full border border-[#2c2c2c]" />

                        <div>
                            <p className="font-medium text-xl">{locale('user', user.data.name)}</p>
                            <p className="text-gray-400">{locale('first_logged', user.stats.firstLogged)}</p>
                            <p className="text-gray-400">{locale('completed_contracts', user.stats.completedContracts)}</p>
                        </div>
                    </div>

                    <button className="main-button" onClick={() => setSettingBox(prev => !prev)}>
                        <div className="flex items-center gap-[10px]">
                            <i className="hgi hgi-stroke hgi-edit-user-02"></i>
                            {locale('edit_profile')}
                        </div>
                    </button>
                </div>

                <SlideUp in={settingBox}>
                    <div className="flex items-center gap-5">
                        {SettingsTypes.map((setting, i) => (
                            <div className="settings-box" key={`setting-box-${i}`}>
                                <div className="flex flex-col gap-1 w-full">
                                    <p>{locale(setting)}</p>
                                    <input type="text" defaultValue={user.data[setting]} id={`settings-${setting}`} />
                                    <p className="text-gray-400 text-sm">{locale(setting + '_description')}</p>
                                    <button className="main-button mt-3" onClick={() => editProfile(setting)}>{locale('change_' + setting)}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </SlideUp>
            </div>
        </div>
    )
};

export default Settings;