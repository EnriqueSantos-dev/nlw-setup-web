import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { api } from '../lib/axios';

interface IHabitsInfo {
  completedHabits: string[],
  possibleHabits: {
    id: string,
    title: string
    createdAt: string,
  }[],
}

type HabitListProps = {
  date: Date;
  onCompletedHabit: (completed: number) => void;

};

export function HabitsList({ date, onCompletedHabit }: HabitListProps) {
  const [habitsInfo, setHabitsInfo] = useState<IHabitsInfo>({} as IHabitsInfo);

  const isDateInPast = dayjs(date)
    .endOf('day')
    .isBefore(new Date());

  async function toggleHabitCompleted(habitId: string) {
    await api.patch(`habits/${habitId}/toggle`);

    const habitAlreadyCompleted = habitsInfo?.completedHabits.includes(habitId);

    let completedHabits: string[] = [];

    if (habitAlreadyCompleted) {
      completedHabits = habitsInfo.completedHabits.filter((habit) => habit !== habitId);
    } else {
      completedHabits = [...habitsInfo.completedHabits, habitId];
    }

    setHabitsInfo((prev) => ({
      ...prev,
      completedHabits,
    }));

    onCompletedHabit(completedHabits.length);
  }

  useEffect(() => {
    api.get('/day', {
      params: {
        date: date.toISOString(),
      },
    })
      .then((res) => setHabitsInfo(res.data));
  }, []);

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits?.map((habit) => (

        <CheckboxPrimitive.Root
          key={habit.id}
          checked={habitsInfo.completedHabits.includes(habit.id)}
          disabled={isDateInPast}
          onCheckedChange={() => toggleHabitCompleted(habit.id)}
          className="group flex items-center gap-3 focus:outline-none disabled:cursor-not-allowed"
        >
          <div
            className="h-8 w-8 rounded-lg flex items-center justify-center border-2 bg-zinc-900 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900"
          >

            <CheckboxPrimitive.Indicator>
              <Check
                size={20}
                weight="bold"
                className="text-white"
              />
            </CheckboxPrimitive.Indicator>
          </div>

          <span
            className="group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400 text-xl font-semibold text-white leading-tight transition-all first-letter:capitalize"
          >
            {habit.title}

          </span>
        </CheckboxPrimitive.Root>
      ))}
    </div>
  );
}
