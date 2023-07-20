import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useProfile } from '@/hooks/useProfile';
import { GameCardsProps } from '@/components/GameCards';
import { useLocalStorageNew } from '@/hooks/useLocalStorageNew';
import Header from '@/components/Header';

export default function GameDetail({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log('gem', data);
  const router = useRouter();

  const [loggedUserId, setloggedUserId] = useLocalStorageNew(
    'loggedUserId',
    '',
  );

  const [balance, setBalance] = useLocalStorageNew(
    `${loggedUserId}|ballance`,
    0,
  );

  async function purchaseButton() {
    if (data.price > parseInt(balance)) {
      alert('Insufficient balance!');
    } else {
      setBalance(parseInt(balance) - data.price);

      try {
        await axios.post(
          `https://apikgems.cobainweb.site/api/users/me/games`,
          {
            gameId: data.id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );

        alert('Payment success!');
        router.push('/profile/me');
      } catch (error: any) {
        alert(`Updating failed: ${error.message}`);
        console.error('Error updating data:', error.message);
      }
    }
  }

  const { profile, isLoading, isError } = useProfile();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Games | Apikgems </title>
      </Head>

      <Header />
      <div className="flex flex-col items-center py-10 backdrop-blur-md backdrop-brightness-90 hero">
        <div className="border border-white shadow-xl shadow-black">
          <div className="flex flex-col ">
            <h1 className="text-2xl text-white font-semibold py-3 pl-3 bg-gradient-to-r from-stone-500 to-stone-800 ">
              {data.name}
            </h1>
            <h1>BALANCE: {balance}</h1>
            <img
              className="w-[48rem] h-auto"
              src={data.imageUrl}
              alt={`Photo of ${data.name}`}
              onError={(e) => (e.currentTarget.src = '/avatar.svg')}
            />
          </div>

          <div className="flex justify-between w-[48rem] items-start px-3 py-3 items-center bg-gradient-to-r from-stone-500 to-stone-800">
            <div className="flex flex-row gap-2 ">
              {data.genre.map((genre: string) => (
                <div
                  key={genre}
                  className=" border-red rounded-md px-2 py-1 bg-slate-900"
                >
                  <p className="text-white">{genre}</p>
                </div>
              ))}
            </div>
            {!isError &&
            profile.games.some(
              (game: GameCardsProps) => game.id === data.id,
            ) ? (
              <div>
                <p className="text-3xl">You already have this game</p>
              </div>
            ) : (
              <div className="flex flex-row gap-8 items-center">
                <p className="text-3xl text-white">{`$ ${data.price}`}</p>
                <button
                  className="rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={purchaseButton}
                >
                  Purchase
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const id = context.params?.id as string;

  try {
    const response = await axios.get(
      `https://apikgems.cobainweb.site/api/games/${id}`,
    );

    const data = response.data;

    return {
      props: { data },
    };
  } catch (error: any) {
    console.error('Error fetching data:', error);

    return {
      props: {},
    };
  }
};
