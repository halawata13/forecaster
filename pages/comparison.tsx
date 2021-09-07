import { useState } from 'react';
import { DateTime } from 'luxon';
import { HistoryService, TempType } from '../services/history.service';
import { ComparisonGraph } from '../components/comparison-graph';
import { Box } from '@chakra-ui/react';
import { Header } from '../components/header';
import { ComparisonForm } from '../components/comparison-form';
import { Section } from '../components/section';
import { Container } from '../components/container';

export default function Comparison() {
  const [ prefCode, setPrefCode ] = useState(23);
  const [ from, setFrom ] = useState(DateTime.now().minus({ months: 1 }).set({ day: 1 }));
  const [ to, setTo ] = useState(DateTime.now().set({ day: 1 }).minus({ days: 1 }));
  const historyService = new HistoryService(prefCode);
  const [ years, setYears ] = useState<number[]>(historyService.getYears().slice(-2));
  const [ type, setType ] = useState(TempType.max);
  const [ data, options ] = historyService.getComparisonChartData(from, to, years, type);
  const typeName = type === TempType.max ? '最高気温' : '最低気温';

  const onSubmit = (prefCode: number, years: number[], fromMonth: number, toMonth: number, type: TempType) => {
    setPrefCode(prefCode);
    setYears(years);
    setFrom(from.set({ month: fromMonth }));
    setTo(to.set({ month: toMonth }));
    setType(type);
  };

  return (
    <>
      <Header path={'/comparison'} />
      <Container>
        <Box as={'main'}>
          <Section>
            <ComparisonForm from={from} to={to} years={years} type={type} prefCode={prefCode} onSubmit={onSubmit} />
          </Section>
          <Section title={`${typeName}比較 ${from.month}月〜${to.month}月`}>
            <ComparisonGraph data={data} options={options} />
          </Section>
        </Box>
      </Container>
    </>
  );
}
