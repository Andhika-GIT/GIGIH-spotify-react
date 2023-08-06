import { useEffect, useState } from 'react';

import { Box, Center, Flex, Heading, Image, Stack, Text, VStack, useColorModeValue, Wrap, WrapItem } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

// utils
import { getPlaylistsDetail } from '../utils';

import { Card, Loading } from '../components';

const IMAGE = 'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';

const PlaylistDetail = () => {
  const { playlistId } = useParams();

  const [playlist, setplaylist] = useState();

  useEffect(() => {
    let result;

    const getPlaylist = async () => {
      result = await getPlaylistsDetail(playlistId);
      console.log(result);

      if (result.status === 401) {
        localStorage.removeItem('token');
        history.replace('/signIn');
      } else {
        setplaylist(result);
      }
    };

    getPlaylist();
  }, []);
  if (!playlist) return <Loading />;
  return (
    <Center py={12}>
      <Box role={'group'} p={6} w={'full'} h={'full'} bg={useColorModeValue('white', 'gray.800')} boxShadow={'2xl'} rounded={'lg'} pos={'relative'} zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'500px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${playlist.images[0].url})`,
            filter: 'blur(20px)',
            opacity: '35%',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}
        >
          <Flex gap="20px" alignItems={{ base: 'start', lg: 'center' }} direction={{ base: 'column', lg: 'row' }}>
            <Image rounded={'lg'} height={400} width={400} objectFit={'cover'} src={playlist.images[0].url} alt="#" />
            <VStack align="start">
              <Heading fontWeight={600} fontSize={{ base: 'xl', md: '2xl', lg: '4xl', xl: '8xl' }} lineHeight={'110%'}>
                Playlist Title
              </Heading>
              <Text fontSize="lg">Description</Text>
              <Flex alignItems={'start'} gap={'20px'}>
                <Text>User Picture</Text>
                <Text>User Picture</Text>
              </Flex>
            </VStack>
          </Flex>
        </Box>
        <Stack pt={20}>
          <Text fontSize="xl" align={'center'}>
            Tracks on this playlist
          </Text>
          <Wrap spacing="20px">
            {playlist.tracks.items.map((item, index) => {
              return (
                <WrapItem key={item.track.id}>
                  <Card data={item.track} type="tracks" />
                </WrapItem>
              );
            })}
          </Wrap>
        </Stack>
      </Box>
    </Center>
  );
};

export default PlaylistDetail;
