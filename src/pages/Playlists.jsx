import React, { useEffect, useState } from 'react';
import { Input, InputLeftElement, InputGroup, Wrap, WrapItem } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import { useDebouncedState } from '@mantine/hooks';

// utils
import { getPlaylists } from '../utils';

// components
import { Card, Loading } from '../components';

// react-router
import { useHistory } from 'react-router-dom';

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [search, setSearch] = useDebouncedState('taylor swift', 500);

  const history = useHistory();

  useEffect(() => {
    let result;

    const searchPlaylists = async () => {
      result = await getPlaylists(search ? search : 'taylor swift');
      console.log(result);

      if (result.status === 401) {
        localStorage.removeItem('token');
        history.replace('/signIn');
      } else {
        setPlaylists(result);
      }
    };

    searchPlaylists();
  }, [search]);

  if (!playlists) return <Loading />;
  return <div>Playlists</div>;
};

export default Playlists;
