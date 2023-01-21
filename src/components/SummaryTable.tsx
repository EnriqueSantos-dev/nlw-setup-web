import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning';
import HabitDay from './HabitDay';
import { api } from '../lib/axios';

/* eslint-disable react/no-array-index-key */
const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const summaryDates = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 7; // 18 weeks
const amountOfDatesToFill = minimumSummaryDatesSize - summaryDates.length;

interface Summary {
  id: string;
  date: string;
  completed: number;
  amount: number;
}

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary[]>([]);
  const [error, setError] = useState<unknown>(null);

  async function getSummary({ signal }: { signal: AbortSignal }) {
    try {
      const { data } = await api.get('/summary', { signal });
      setSummary(data);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    getSummary({ signal });

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className="flex w-full">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((day, index) => (
          <div key={`${weekDays}-${index}`} className="text-zinc-400 text-xl h-10 w-10 flex 1items-center justify-center font-bold">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-flow-col grid-rows-7 gap-3">
        {summary.length > 0 && summaryDates.map((date) => {
          const dayInSummary = summary.find((day) => dayjs(date).isSame(dayjs(day.date), 'day'));

          return (
            <HabitDay
              key={date.toString()}
              date={date}
              amount={dayInSummary?.amount}
              defaultCompleted={dayInSummary?.completed}
            />
          );
        })}

        {amountOfDatesToFill > 0 && Array.from({ length: amountOfDatesToFill }).map((_, index) => (
          <div
            key={index}
            className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
          />
        ))}
      </div>
    </div>
  );
}
