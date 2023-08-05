import React, { useEffect, useState } from "react";
("use client");

import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";

// components
import { Navigation, Sidebar } from "../components";

// utils
import { getUserInfo } from "../utils";

// react-router
import { useHistory } from "react-router-dom";

const ContentWrapper = ({ content, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <Sidebar
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <Navigation onOpen={onOpen} user={user} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {content}
      </Box>
    </Box>
  );
};

export default ContentWrapper;
