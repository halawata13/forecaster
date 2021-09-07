import React from 'react';
import { Box, Heading, HStack, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { Container } from './container';

interface Props {
  path: string;
}

export const Header: React.VFC<Props> = props => {
  const bgColor = useColorModeValue('gray.50', 'gray.50');
  const borderColor = useColorModeValue('gray.200', 'gray.200');

  return (
    <Box borderBottom={`solid 1px`} borderColor={borderColor} bgColor={bgColor}>
      <Container>
        <HStack as={'header'} alignItems={'flex-end'} spacing={12} px={4} py={4}>
          <Heading as={'h1'} size={'lg'} fontSize={24} fontFamily={['Nunito', 'sans-serif']} fontWeight={200}>Forecaster</Heading>
          <HStack as={'nav'} spacing={12} flexGrow={1} fontSize={14}>
            <Link href={'/'} passHref><Box as={'a'} fontWeight={props.path === '/history' ? 'bold' : 'normal'}>過去の気温</Box></Link>
            <Link href={'/comparison'} passHref><Box as={'a'} fontWeight={props.path === '/comparison' ? 'bold' : 'normal'}>過去の気温（月別の比較）</Box></Link>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};
