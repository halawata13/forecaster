import React, { useState } from 'react';
import { HistoryService } from '../services/history.service';
import { Box, Button, HStack, Select, useColorModeValue, VStack } from '@chakra-ui/react';
import { PrefService } from '../services/pref.service';
import { DateTime } from 'luxon';

interface Props {
  from: DateTime;
  to: DateTime;
  prefCode: number;
  onSubmit: (prefCode: number, fromYear: number, fromMonth: number, toYear: number, toMonth: number) => void;
}

export const HistoryForm: React.VFC<Props> = props => {
  const [ prefCode, setPrefCode ] = useState(props.prefCode);
  const [ fromYear, setFromYear ] = useState(props.from.year);
  const [ fromMonth, setFromMonth ] = useState(props.from.month);
  const [ toYear, setToYear ] = useState(props.to.year);
  const [ toMonth, setToMonth ] = useState(props.to.month);
  const historyService = new HistoryService(prefCode);
  const bgColor = useColorModeValue('gray.50', 'gray.50');
  const borderColor = useColorModeValue('gray.200', 'gray.200');

  const onSubmit = () => {
    props.onSubmit(prefCode, fromYear, fromMonth, toYear, toMonth);
  };

  return (
    <HStack as={'fieldset'} alignItems={'center'} p={4} borderRadius={8} border={'solid 1px'} borderColor={borderColor} bgColor={bgColor}>
      <VStack alignItems={'flex-start'}>
        <Select onChange={ev => setPrefCode(Number(ev.target.value))} w={40} bgColor={'#fff'}>
          {Object.entries(PrefService.getPrefList()).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </Select>
        <HStack>
          <Select onChange={ev => setFromYear(Number(ev.target.value))} value={fromYear} w={24} bgColor={'#fff'}>
            {historyService.getYears().map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </Select>
          <Box as={'span'}>年</Box>
          <Select onChange={ev => setFromMonth(Number(ev.target.value))} value={fromMonth} w={24} bgColor={'#fff'}>
            {Array.from(Array(12)).map((_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </Select>
          <Box as={'span'}>月〜</Box>
          <Select onChange={ev => setToYear(Number(ev.target.value))} value={toYear} w={24} bgColor={'#fff'}>
            {historyService.getYears().map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </Select>
          <Box as={'span'}>年</Box>
          <Select onChange={ev => setToMonth(Number(ev.target.value))} value={toMonth} w={24} bgColor={'#fff'}>
            {Array.from(Array(12)).map((_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </Select>
          <Box as={'span'}>月</Box>
        </HStack>
      </VStack>
      <HStack w={'100%'} justifyContent={'flex-end'}>
        <Button colorScheme="blue" onClick={() => onSubmit()} borderRadius={100} w={32}>表示</Button>
      </HStack>
    </HStack>
  );
};
