import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControl, HStack, Select, useColorModeValue, VStack } from '@chakra-ui/react';
import { PrefService } from '../services/pref.service';
import { HistoryService, TempType } from '../services/history.service';
import { DateTime } from 'luxon';

interface Props {
  from: DateTime;
  to: DateTime;
  years: number[];
  type: TempType;
  prefCode: number;
  onSubmit: (prefCode: number, years: number[], fromMonth: number, toMonth: number, type: TempType) => void;
}

export const ComparisonForm: React.VFC<Props> = props => {
  const [ prefCode, setPrefCode ] = useState(props.prefCode);
  const [ type, setType ] = useState(props.type);
  const [ years, setYears ] = useState<number[]>(props.years);
  const [ fromMonth, setFromMonth ] = useState(props.from.month);
  const [ toMonth, setToMonth ] = useState(props.to.month);
  const bgColor = useColorModeValue('gray.50', 'gray.50');
  const borderColor = useColorModeValue('gray.200', 'gray.200');

  const historyService = new HistoryService(prefCode);

  const onYearChanged = (checked: boolean, year: number) => {
    if (checked) {
      setYears(years.concat([year]).sort());
    } else {
      setYears(years.filter(y => y !== year));
    }
  };

  const onSubmit = () => {
    props.onSubmit(prefCode, years, fromMonth, toMonth, type);
  };

  return (
    <HStack as={'fieldset'} alignItems={'center'} p={4} borderRadius={8} border={'solid 1px'} borderColor={borderColor} bgColor={bgColor}>
      <VStack alignItems={'flex-start'} spacing={4}>
        <FormControl display={'flex'} flexWrap={'wrap'} flex={'0 0 auto'}>
          {historyService.getYears().map(year => (
            <Checkbox key={year} defaultChecked={years.includes(year)} w={20} onChange={ev => onYearChanged(ev.target.checked, year)} mr={4}>
              {year}年
            </Checkbox>
          ))}
        </FormControl>
        <HStack>
          <FormControl w={36}>
            <Select onChange={ev => setPrefCode(Number(ev.target.value))} bgColor={'#fff'}>
              {Object.entries(PrefService.getPrefList()).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl w={36}>
            <Select onChange={ev => setType(Number(ev.target.value))} bgColor={'#fff'}>
              <option value={TempType.max}>最高気温</option>
              <option value={TempType.min}>最低気温</option>
            </Select>
          </FormControl>
          <HStack>
            <FormControl>
              <HStack>
                <Select onChange={ev => setFromMonth(Number(ev.target.value))} value={fromMonth} w={20} bgColor={'#fff'}>
                  {Array.from(Array(12)).map((_, i) => (
                    <option key={i} value={i + 1}>{i + 1}</option>
                  ))}
                </Select>
                <Box as={'span'}>月〜</Box>
              </HStack>
            </FormControl>
            <FormControl>
              <HStack>
                <Select onChange={ev => setToMonth(Number(ev.target.value))} value={toMonth} w={20} bgColor={'#fff'}>
                  {Array.from(Array(12)).map((_, i) => (
                    <option key={i} value={i + 1}>{i + 1}</option>
                  ))}
                </Select>
                <Box as={'span'}>月</Box>
              </HStack>
            </FormControl>
          </HStack>
        </HStack>
      </VStack>
      <HStack justifyContent={'flex-end'}>
        <Button colorScheme="blue" onClick={() => onSubmit()} borderRadius={100} w={32}>表示</Button>
      </HStack>
    </HStack>
  );
};
