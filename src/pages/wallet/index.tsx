import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useLocalStorageNew } from '@/hooks/useLocalStorageNew';
import axios from 'axios';
import { TopupBalance } from '@/components/TopupBalance';
import Header from '@/components/Header';

export default function Wallet() {
  const router = useRouter();

  async function fetcher(url: string) {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return response.data;
  }

  const { data, error, isLoading } = useSWR(
    'https://apikgems.cobainweb.site/api/users/me',
    fetcher,
  );

  //const [balance, setBalance] = useLocalStorageNew('balance', 0);

  //const router = useRouter();
  // const [amount, setAmount] = useState(0);

  if (error) {
    return <div>Error fetching data</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log('yoy');

  return (
    <>
      <Header />
      <TopupBalance userId={data.id} />
      {/* <h1> Your Balance: $1000</h1>
      <div>
        <h1>Top Up!</h1>
        <button
          className="border-2"
          onClick={() => {
            setBalance(balance + 15);
          }}
        >
          $15
        </button>
        <button className="border-2">$50</button>
        <button className="border-2">$100</button>
        <button className="border-2">$200</button>
        <button className="border-2">$500</button>
        <button className="border-2">$1000</button>
      </div> */}
    </>
  );
}
