import React, { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/tablet/Header';
import { debugData } from './utils/debugData';
import type { MainProps, Initialization, TabsProps } from './typings';
import useNuiEvent from './utils/useNuiEvent';
import type { User } from './typings/user';
import { loadLocales } from './utils/locale';
import Fade from './components/utils/transitions/Fade';
import { fetchNui } from './utils/fetchNui';
import Loader from './components/tablet/Loader';
import './components/tablet/Loader.css';
import Settings from './components/tablet/Settings';

debugData<Initialization>([
  {
    action: 'init',
    data: {
      locale: 'en'
    }
  }
]);

debugData<MainProps>([
  {
    action: 'open_tablet',
    data: {
      user: {
        nickname: 'PPaull.',
        image: 'https://i.postimg.cc/BnFQFgrd/PRP.png',
        isAdmin: true,
        firstLogged: '3/9/2025',
        stats: {
          coins: 103507,
          xp: 61550,
          completedContracts: 11
        }
      }
    }
  }
], 1500)

const App: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [user, setUser] = useState<User | undefined>();
  const [currentTab, setCurrentTab] = useState<TabsProps>('main');

  useNuiEvent<Initialization>('init', async (data) => {
    await loadLocales(data.locale);
  });

  useNuiEvent<MainProps>('open_tablet', (data) => {
    setUser(data.user);
    setVisible(true);
  });

  const closeTablet = () => {
    setVisible(false);
    fetchNui('close_tablet');
  };

  // Close tablet on ESC
  useEffect(() => {
    if (!visible) return;

    const keyHandler = (e: KeyboardEvent) => {
      if (['Escape'].includes(e.code)) closeTablet();
    };

    window.addEventListener('keydown', keyHandler);

    return () => window.removeEventListener('keydown', keyHandler);
  }, [visible]);

  // Function which is changing animation when tab is changed
  const changeTab = (tab: TabsProps) => {
    if (currentTab === tab) return;

    setLoading(true);

    setTimeout(() => {
      setCurrentTab(tab);
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <Fade in={visible && user !== undefined}>
        <div className='main-wrapper'>
          <div className='main-screen'>
            <Header 
              user={user as User} 
              exit={() => closeTablet()}
              changeTab={changeTab}
              currentTab={currentTab} 
            />
            
            {/* Every fade component must have div in it so it will fade the component correctly :weirdo: */}
            <Fade in={loading}><div><Loader /></div></Fade>

            <Fade in={!loading && currentTab === 'settings'}><div>
              <Settings 
                user={user as User}
                setUser={setUser}
              />  
            </div></Fade>
          </div>
        </div>
      </Fade>
    </>
  )
};

export default App;