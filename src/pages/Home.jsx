import React, { useEffect, useState } from 'react';
import { Input, InputLeftElement, InputGroup, Wrap, WrapItem } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import { useDebouncedState } from '@mantine/hooks';

// utils
import { getTracks } from '../utils';

// components
import { Card, Loading } from '../components';

// react-router
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Home = () => {
  const [albums, setAlbums] = useState([]);
  const [search, setSearch] = useDebouncedState('taylor swift', 500);

  const history = useHistory();

  useEffect(() => {
    let result;

    const searchTracks = async () => {
      result = await getTracks(search);
      console.log(result);

      if (result.status === 401) {
        localStorage.removeItem('token');
        history.replace('/signIn');
      } else {
        setAlbums(result);
      }
    };

    searchTracks();
  }, [search]);

  if (!albums) return <Loading />;
  return (
    <>
      <InputGroup>
        <InputLeftElement>
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input variant="flushed" placeholder="Search songs" onChange={(e) => setSearch(e.target.value)} />
      </InputGroup>
      <Wrap spacing="15px" align="center" justify="center">
        {albums.map((album, index) => {
          return (
            <WrapItem key={album.href}>
              <Card data={album} />
            </WrapItem>
          );
        })}
      </Wrap>
    </>
  );
};

export default Home;
