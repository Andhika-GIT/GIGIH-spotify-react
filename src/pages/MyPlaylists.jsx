import React, { useEffect, useState } from 'react';
import { Input, InputLeftElement, InputGroup, Wrap, WrapItem } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import { useDebouncedState } from '@mantine/hooks';

// utils
import { getMyPlaylists } from '../utils';

// components
import { Card, Loading } from '../components';

// react-router
import { useHistory } from 'react-router-dom';

const MyPlaylists = () => {
  const [playlists, setplaylists] = useState([]);
  const [search, setSearch] = useDebouncedState('', 500);

  const history = useHistory();

  useEffect(() => {
    let result;

    const searchTracks = async () => {
      result = await getMyPlaylists();

      if (result.status === 401) {
        localStorage.removeItem('token');
        history.replace('/signIn');
      } else {
        filteredPlaylists = result;
        setplaylists(result);
        console.log(filteredPlaylists);
      }
    };

    searchTracks();
  }, []);

  let filteredPlaylists = playlists.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });

  const cardClicked = (playlistId) => {
    history.push(`/my-playlists/${playlistId}`);
  };

  if (!playlists) return <Loading />;
  return (
    <>
      <InputGroup>
        <InputLeftElement>
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input variant="flushed" placeholder="Search playlist" onChange={(e) => setSearch(e.target.value)} />
      </InputGroup>
      <Wrap spacing="20px">
        {filteredPlaylists.map((playlist, index) => {
          return (
            <WrapItem key={playlist.id}>
              <Card data={playlist} type="playlists" onClick={cardClicked} />
            </WrapItem>
          );
        })}
      </Wrap>
    </>
  );
};

export default MyPlaylists;
