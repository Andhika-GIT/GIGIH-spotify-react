import React, { useEffect, useState } from "react";
("use client");

import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";

import ContentWrapper from "./ContentWrapper";

// components
import { Navigation, Sidebar, Loading } from "../components";

// utils
import { getUserInfo } from "../utils";

// react-router
import { useHistory } from "react-router-dom";

const Layout = ({ token, children }) => {
  const history = useHistory();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    if (!token) {
      history.replace("/signIn");
    }

    let result;

    const getToken = async () => {
      result = await getUserInfo(token);
      console.log(result);

      if (result.status === 401) {
        history.replace("/signIn");
      } else {
        setUser(result);
      }
    };

    getToken();
  }, []);

  if (!user) return <Loading />;
  return <ContentWrapper content={children} user={user} />;
};

export default Layout;
