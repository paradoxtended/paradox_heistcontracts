import React, { useEffect, useState } from 'react';
import './App.scss';
import { debugData } from './utils/debugData';
import type { MainProps, Initialization, TabsProps } from './typings';
import useNuiEvent from './utils/useNuiEvent';
import type { User } from './typings/user';
import { loadLocales } from './utils/locale';
import Fade from './components/utils/transitions/Fade';
import { fetchNui } from './utils/fetchNui';
import Header from './components/Header';
import Main from './components/Main';
import Settings from './components/Settings';
import Loading from './components/Loading';

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
        isAdmin: true,
        data: {
          name: 'PPaull.',
          image: 'https://i.postimg.cc/BnFQFgrd/PRP.png',
          description: 'Dangerous mobster 🎩'
        },
        stats: {
          coins: 103507,
          xp: 61550,
          completedContracts: 11,
          firstLogged: '3/9/2025',
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
          <Header user={user as User} changeTab={changeTab} />

          {loading && <Loading />}

          <Fade in={!loading && currentTab === 'main'}><div>
            <Main user={user as User} changeTab={changeTab} />
          </div></Fade>

          <Fade in={!loading && currentTab === 'settings'}><div>
            <Settings user={user as User} />  
          </div></Fade>
        </div>
      </Fade>
    </>
  )
};

export default App;