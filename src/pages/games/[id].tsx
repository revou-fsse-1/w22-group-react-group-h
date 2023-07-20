import { useState } from 'react';
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
import Loading from '@/components/Loading';

export default function GameDetail({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loggedUserId, setloggedUserId] = useLocalStorageNew(
    'loggedUserId',
    '',
  );

  const [balance, setBalance] = useLocalStorageNew(
    `${loggedUserId}|balance`,
    0,
  );

  async function purchaseButton() {
    if (data.price > parseInt(balance)) {
      alert('Insufficient balance!');
    } else {
      setIsModalOpen(true);
    }
  }

  const confirmPurchase = async () => {
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

      setIsModalOpen(false);
      alert('Payment Success!');
      router.push('/profile/me');
    } catch (error: any) {
      alert(`Updating failed: ${error.message}`);
      console.error('Error updating data:', error.message);
    }
  };

  const cancelPurchase = () => {
    setIsModalOpen(false);
  };

  const { profile, isLoading, isError } = useProfile();

  if (isLoading) {
    return <Loading />;
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
                <p className="text-3xl text-white">
                  You already have this game
                </p>
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

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" />

          <div className="relative bg-white p-6 rounded-md shadow-md z-10 flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">Payment Detail</h2>
            <p className="text-lg">Total payment: ${data.price}</p>
            <div className="flex flex-row justify-end gap-2">
              <button
                className="px-4 py-2 mt-4 rounded-lg text-white text-lg font-semibold bg-[#b81a1a]"
                onClick={cancelPurchase}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 mt-4 rounded-lg text-white text-lg font-semibold bg-[#19222E]"
                onClick={confirmPurchase}
              >
                Purchase
              </button>
            </div>
          </div>
        </div>
      )}
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
