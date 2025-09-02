import React, { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/tablet/Header';
import { debugData } from './utils/debugData';
import type { Initialization } from './typings';
import useNuiEvent from './utils/useNuiEvent';
import type { User } from './typings/user';
import { loadLocales } from './utils/locale';
import Fade from './components/utils/transitions/Fade';
import { fetchNui } from './utils/fetchNui';

debugData<Initialization>([
  {
    action: 'init',
    data: {
      locale: 'en',
      user: {
        nickname: 'PPaull.',
        image: 'https://i.postimg.cc/BnFQFgrd/PRP.png',
        isAdmin: true,
        stats: {
          coins: 103507,
          xp: 61550
        }
      }
    }
  }
]);

debugData([
  {
    action: 'open_tablet',
    data: {}
  }
])

const App: React.FC = () => {
  const [user, setUser] = useState<User | undefined>();
  const [visible, setVisible] = useState<boolean>(false);

  useNuiEvent<Initialization>('init', async (data) => {
    await loadLocales(data.locale);
    setUser(data.user);
  });

  useNuiEvent('open_tablet', () => {
    setVisible(true);
  });

  const closeTablet = () => {
    setVisible(false);
    fetchNui('close_tablet');
  };

  useEffect(() => {
    if (!visible) return;

    const keyHandler = (e: KeyboardEvent) => {
      if (['Escape'].includes(e.code)) closeTablet();
    };

    window.addEventListener('keydown', keyHandler);

    return () => window.removeEventListener('keydown', keyHandler);
  }, [visible]);

  return (
    <>
      <Fade in={visible && user !== undefined}>
        <div className='main-wrapper'>
          <div className='main-screen'>
            <Header user={user as User} exit={() => closeTablet()} />
          </div>
        </div>
      </Fade>
    </>
  )
};

export default App;