import type { TabsProps } from '../../typings';
import type { User } from '../../typings/user';
import { locale } from '../../utils/locale';
import './Header.scss';

const Header: React.FC<{
    user: User;
    exit: () => void;
    changeTab: (tab: TabsProps) => any;
    currentTab: TabsProps;
}> = ({ user, exit, changeTab, currentTab }) => {
    return (
        <div className='header-wrapper'>
            <div className='flex items-center gap-4'>
                <div className="header-image" onClick={() => changeTab('settings')}>
                    <img src={user.image} alt="user-profile" />
                    <i className='fa-solid fa-pen'></i>
                </div>

                <div className='block'>
                    <p className='text-white font-medium'>{locale('logged_as', user.nickname)}</p>

                    <div className='flex items-center gap-2'>
                        <div className='flex items-center gap-2 text-white'>
                            <p className='border border-white rounded-full w-5 h-5 flex items-center justify-center font-medium text-sm'>C</p>
                            <p>{Number(user.stats.coins.toFixed(3)).toLocaleString('en-US')}</p>
                        </div>

                        <p className='text-white'>|</p>

                        <div className='flex items-center gap-2 text-white'>
                            <p className='border border-white rounded-full w-5 h-5 flex items-center justify-center font-medium text-[10px]'>XP</p>
                            <p>{Number(user.stats.coins.toFixed(3)).toLocaleString('en-US')}</p>
                        </div>
                    </div>
                </div>

                {user.isAdmin && (
                    <button className='main-button'>
                        <i className="fa-solid fa-shield-halved"></i>
                        {locale('admin_menu')}
                    </button>
                )}
            </div>
            
            {currentTab === 'main' ? <i className="fa-solid fa-xmark text-white text-2xl mr-2.5 cursor-pointer" onClick={exit}></i>
            : <button className='bg-[#2E2F41] text-white font-medium px-5 py-1 text-lg rounded-sm mr-2.5' onClick={() => changeTab('main')}>{locale('back')}</button>}
        </div>
    )
};

export default Header;