import { Wrap, WrapItem, Heading, Text, Center } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

// utils
import { getRecommendation } from '../utils';

// components
import { Card } from '../components';

const Home = () => {
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
      <Center mb="30px">
        <Heading fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }} lineHeight={'110%'}>
          Recommended For{' '}
          <Text as={'span'} color={'green.400'}>
            You
          </Text>
        </Heading>
      </Center>

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

export default Home;
