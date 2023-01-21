type ProgressbarProps = {
  progress: number;
};

export function ProgressBar({ progress }: ProgressbarProps) {
  return (
    <div className="relative h-3 rounded-xl bg-zinc-700 w-full mt-4 overflow-hidden">
      <div
        role="progressbar"
        aria-valuenow={50}
        aria-label="Progresso de hábitos completados neste dia"
        className="transition-all h-3 rounded-xl bg-violet-600 max-w-full"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}
