import React, { useState } from 'react';
import { Input, InputLeftElement, InputGroup } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const Home = () => {
  const search
  return (
    <>
      <InputGroup>
        <InputLeftElement>
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input variant="flushed" placeholder="Search songs" />
      </InputGroup>
    </>
  );
};

export default Home;
