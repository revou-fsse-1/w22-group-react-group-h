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

  if (error) {
    return <div>Error fetching data</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <TopupBalance userId={data.id} username={data.username} />
    </>
  );
}
