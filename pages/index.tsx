import { useState } from 'react';
import { DateTime } from 'luxon';
import { HistoryService } from '../services/history.service';
import { HistoryGraph } from '../components/history-graph';
import { Box, Heading } from '@chakra-ui/react';
import { Header } from '../components/header';
import { HistoryForm } from '../components/history-form';
import { Section } from '../components/section';
import { Container } from '../components/container';

export default function Index() {
  const [ prefCode, setPrefCode ] = useState(23);
  const [ from, setFrom ] = useState(DateTime.now().minus({ years: 1 }).set({ month: 12, day: 1 }));
  const [ to, setTo ] = useState(DateTime.now().minus({ years: 1 }).set({ month: 12, day: 31 }));
  const historyService = new HistoryService(prefCode);
  const [ data, options ] = historyService.getHistoryChartData(from, to);

  const onSubmit = (prefCode: number, fromYear: number, fromMonth: number, toYear: number, toMonth: number) => {
    setPrefCode(prefCode);
    setFrom(from.set({ year: fromYear, month: fromMonth }));
    setTo(to.set({ year: toYear, month: toMonth }));
  };

  return (
    <>
      <Header path={'/history'} />
      <Container>
        <Box as={'main'}>
          <Section>
            <HistoryForm from={from} to={to} prefCode={prefCode} onSubmit={onSubmit} />
          </Section>
          <Section title={`日別最高/最低気温 ${from.year}年${from.month}月〜${to.year}年${to.month}月`}>
            <HistoryGraph data={data} options={options} />
          </Section>
        </Box>
      </Container>
    </>
  );
}
