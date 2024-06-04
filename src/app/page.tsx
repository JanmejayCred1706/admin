import { Button } from 'antd';
import Index from '../components/Index';

export default function Home() {
  return (
    <div className="App">
      <Button type="primary" className="ml-10">
        Button
        <Index />
      </Button>
    </div>
  );
}
