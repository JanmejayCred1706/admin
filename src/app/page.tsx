import { BasicLayout } from '@components/Component';
import { getCookies } from '@utils/cookies';

export default function Home() {
  const token = getCookies('token');
  console.log(token, 'token');
  return (
    // <BasicLayout>
    <div>Bill is a cat.</div>
    // </BasicLayout>
  );
}
