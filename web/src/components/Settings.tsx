import type { User } from "../typings/user";
import { locale } from "../utils/locale";

const Settings: React.FC<{
    user: User;
}> = ({ user }) => {
    const inputs = [
        { label: locale('name'), inputType: 'text', inputPlaceholder: locale('name_input'), description: locale('name_description'), value: (user: User) => user.data.name },
        { label: locale('image'), inputType: 'text', inputPlaceholder: locale('image_input'), description: locale('image_description'), value: (user: User) => user.data.image },
        { label: locale('bio'), inputType: 'textarea', inputPlaceholder: locale('bio_input'), description: locale('bio_description'), value: (user: User) => user.data.description }
    ]

    return (
        <div className="p-7">
            <p className="settings-header">{locale('settings_header')}</p>

            <div className="mt-7 flex flex-col gap-4">
                {inputs.map((data, i) => (
                    <div className="setting-input" key={`setting-input-${i}`}>
                        <p className="setting-label">{data.label}</p>
                        {
                            data.inputType !== 'textarea' ? 
                                <input type={data.inputType} className="setting-input" placeholder={data.inputPlaceholder} defaultValue={data.value(user)} />
                            :
                                <textarea placeholder={data.inputPlaceholder}>{data.value(user)}</textarea>
                        }
                        <p className="setting-desc">{data.description}</p>
                    </div>
                ))}
            </div>

            <button className="main-button mt-5">{locale('save_settings')}</button>
        </div>
    )
};

export default Settings;