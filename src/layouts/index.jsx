import { useEffect, useState } from 'react';
('use client');

import ContentWrapper from './ContentWrapper';

// components
import { Loading } from '../components';

// utils
import { getUserInfo } from '../utils';

// react-router
import { useHistory } from 'react-router-dom';

const Layout = ({ children }) => {
  const history = useHistory();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    let result;

    const getToken = async () => {
      result = await getUserInfo();
      console.log(result);

      if (result.status === 401) {
        localStorage.removeItem('token');
        history.replace('/signIn');
      } else {
        setUser(result);
      }
    };

    getToken();
  }, []);

  if (!user) return <Loading />;
  return <ContentWrapper content={children} user={user} />;
};

export default Layout;
