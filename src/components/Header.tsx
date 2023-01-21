import { Plus, X } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import Logo from '../assets/logo.svg';
import { NewHabitForm } from './NewHabitForm';

export function Header() {
  return (
    <header className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={Logo} alt="logo" />

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button
            type="button"
            className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
          >
            <Plus className="w-4 h-4 text-violet-500" />
            Novo habito
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80" />
          <Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Dialog.Close className="absolute right-6 top-6 text-zinc-400 hover:text-zinc-200 focus:outline-none focus:ring-violet-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 rounded-lg">
              <X size={24} aria-label="fechar modal" />
            </Dialog.Close>
            <Dialog.Title className="text-3xl text-white leading-tight font-extrabold">
              Criar hábito
            </Dialog.Title>

            <NewHabitForm />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </header>
  );
}
