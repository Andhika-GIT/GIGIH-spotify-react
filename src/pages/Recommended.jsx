import { Wrap, WrapItem } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { useDebouncedState } from '@mantine/hooks';

// utils
import { getRecommendation } from '../utils';

// components
import { Card } from '../components';

const Recommended = () => {
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    let result;

    const searchRecommendation = async () => {
      result = await getRecommendation('taylor');
      console.log(result);

      if (result.status === 401) {
        localStorage.removeItem('token');
        history.replace('/signIn');
      } else {
        setRecommended(result);
      }
    };

    searchRecommendation();
  }, []);

  return (
    <>
      <Wrap spacing="20px">
        {recommended.map((track, index) => {
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

export default Recommended;
