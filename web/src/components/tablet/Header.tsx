import type { User } from '../../typings/user';
import { locale } from '../../utils/locale';
import './Header.scss';

const Header: React.FC<{
    user: User;
    exit: () => void;
}> = ({ user, exit }) => {
    return (
        <div className='header-wrapper'>
            <div className='flex items-center gap-4'>
                <div className="header-image">
                    <img src={user.image} alt="user-profile" />
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
            
            <i className="fa-solid fa-xmark text-white text-xl cursor-pointer" onClick={exit}></i>
        </div>
    )
};

export default Header;