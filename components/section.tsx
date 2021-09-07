import React, { PropsWithChildren } from 'react';
import { Box, Center, Heading, useColorModeValue } from '@chakra-ui/react';

interface Props {
  title?: string;
}

export const Section: React.VFC<PropsWithChildren<Props>> = props => {
  return (
    <Box px={4} py={6}>
      <Heading as={'h2'} fontSize={18} mb={4}><Center>{props.title}</Center></Heading>
      <Box>{props.children}</Box>
    </Box>
  );
};
