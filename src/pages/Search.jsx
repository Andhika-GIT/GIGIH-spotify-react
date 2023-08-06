import React, { useEffect, useState } from 'react';
import { Input, InputLeftElement, InputGroup, Wrap, WrapItem } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import { useDebouncedState } from '@mantine/hooks';

// utils
import { getTracks } from '../utils';

// components
import { Card, Loading } from '../components';

// react-router
import { useHistory } from 'react-router-dom';

const Search = () => {
  const [tracks, setTracks] = useState([]);
  const [search, setSearch] = useDebouncedState('taylor swift', 500);

  const history = useHistory();

  useEffect(() => {
    let result;

    const searchTracks = async () => {
      result = await getTracks(search ? search : 'taylor swift');
      console.log(result);

      if (result.status === 401) {
        localStorage.removeItem('token');
        history.replace('/signIn');
      } else {
        setTracks(result);
      }
    };

    searchTracks();
  }, [search]);

  if (!tracks) return <Loading />;
  return (
    <>
      <InputGroup>
        <InputLeftElement>
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input variant="flushed" placeholder="Search songs" onChange={(e) => setSearch(e.target.value)} />
      </InputGroup>
      <Wrap spacing="20px">
        {tracks.map((track, index) => {
          return (
            <WrapItem key={track.href}>
              <Card data={track} type="tracks" />
            </WrapItem>
          );
        })}
      </Wrap>
    </>
  );
};

export default Search;
