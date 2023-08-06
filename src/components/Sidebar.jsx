import React from "react";
("use client");

import {
  Box,
  CloseButton,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsHeart } from "react-icons/bs";
import { FiHome, FiSettings } from "react-icons/fi";
import { MdOutlineThumbUpOffAlt } from "react-icons/md";
import { RiPlayList2Fill } from "react-icons/ri";

// react-router
import { Link } from "react-router-dom";

const LinkItems = [
  { name: "Home", icon: FiHome, route: "/" },
  // { name: "Top 10", icon: BsHeart, route: "/top-10" },
  { name: "My Playlist", icon: RiPlayList2Fill, route: "/my-playlists" },
  { name: "Recommended", icon: MdOutlineThumbUpOffAlt, route: "/recommended" },
];

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const Sidebar = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold" color="#1DB954">
          SpotSenja
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <Link key={link.route} to={link.route}>
          <NavItem key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        </Link>
      ))}
    </Box>
  );
};

export default Sidebar;
