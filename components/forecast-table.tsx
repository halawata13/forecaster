import React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { DateTime } from 'luxon';

interface Props {
  dateLabels: string[];
  maxTemps: (number | null)[];
  minTemps: (number | null)[];
}

export const ForecastTable: React.VFC<Props> = props => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th />
          {props.dateLabels.map((label, index) => (
            <Th key={index}>{label}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Th>最高気温</Th>
          {props.maxTemps.map((temp, index) => (
            <Td key={index}>{temp}</Td>
          ))}
        </Tr>
        <Tr>
          <Th>最低気温</Th>
          {props.minTemps.map((temp, index) => (
            <Td key={index}>{temp}</Td>
          ))}
        </Tr>
      </Tbody>
    </Table>
  );
};
