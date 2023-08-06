import React, { useEffect, useState } from "react";
import {
  Input,
  InputLeftElement,
  InputGroup,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import { useDebouncedState } from "@mantine/hooks";

// utils
import { getRecommendation } from "../utils";

// components
import { Card, Loading } from "../components";

// react-router
import { useHistory } from "react-router-dom";

const Recommended = () => {
  const [recommended, setRecommended] = useState([]);
  const [search, setSearch] = useDebouncedState("taylor swift", 500);

  useEffect(() => {
    let result;

    const searchRecommendation = async () => {
      result = await getRecommendation(search);
      console.log(result);

      if (result.status === 401) {
        localStorage.removeItem("token");
        history.replace("/signIn");
      } else {
        setRecommended(result);
      }
    };

    searchRecommendation();
  }, [search]);

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
