import React from "react";
import { useRouterContext, useRouterType, useLink } from "@refinedev/core";
import { Link as ChakraLink, HStack, Heading } from "@chakra-ui/react";
import { RefineLayoutThemedTitleProps } from "@refinedev/chakra-ui";

export const Ifeloluwa: React.FC<RefineLayoutThemedTitleProps> = ({ collapsed, wrapperStyles }) => {
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  return (
    <ChakraLink
      as={ActiveLink}
      to="/"
      fontSize="inherit"
      textDecoration="none"
      _hover={{
        textDecoration: "none",
      }}
    >
      <HStack
        spacing="8px"
        justifyContent="center"
        alignItems="center"
        fontSize="inherit"
        style={{
          ...wrapperStyles,
        }}
      >
        <img style={{ height: "24px", width: "24px" }} src="/images/Footprint.png" alt="logo" />

        {!collapsed && (
          <Heading as="h6" fontWeight={700} fontSize="lg" color="green.500">
            Ife Footwears
          </Heading>
        )}
      </HStack>
    </ChakraLink>
  );
};