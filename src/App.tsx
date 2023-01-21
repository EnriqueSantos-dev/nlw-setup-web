import { Header } from './components/Header';
import { SummaryTable } from './components/SummaryTable';

export default function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="container w-full flex-col flex gap-16">
        <Header />

        <SummaryTable />
      </div>
    </div>
  );
}
