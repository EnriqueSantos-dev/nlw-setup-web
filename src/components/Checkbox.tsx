import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';

export function Checkbox() {
  return (
    <CheckboxPrimitive.Root
      className="group flex items-center gap-3"
    >
      <div
        className="h-8 w-8 rounded-lg flex items-center justify-center border-2 bg-zinc-900 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors"
      >

        <CheckboxPrimitive.Indicator>
          <Check
            size={20}
            weight="bold"
            className="text-white"
          />
        </CheckboxPrimitive.Indicator>
      </div>

      <span className="group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400 text-xl font-semibold text-white leading-tight transition-all">Beber dois litros de água</span>
    </CheckboxPrimitive.Root>
  );
}
