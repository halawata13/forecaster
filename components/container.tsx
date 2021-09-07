import { PropsWithChildren, VFC } from 'react';
import { Box, Center } from '@chakra-ui/react';

export const Container: VFC<PropsWithChildren<{}>> = props => {
  return (
    <Box maxW={'1200px'} m={'0 auto'}>{props.children}</Box>
  );
};
