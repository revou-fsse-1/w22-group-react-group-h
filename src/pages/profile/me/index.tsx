import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import useSWR from 'swr';
import { OwnedGameCard } from '@/components/OwnedGameCard';
import { OwnedGameCardProps } from '@/components/OwnedGameCard';
import { ProfileImage } from '@/components/PorfileImage';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import LoginModal from '@/components/LoginModal';
import { useLocalStorageNew } from '@/hooks/useLocalStorageNew';

async function fetcher(url: string) {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  return response.data;
}

export default function MyProfile() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loggedUserId, setloggedUserId] = useLocalStorageNew(
    'loggedUserId',
    '',
  );
  const [loggedUsername, setloggedUsername] = useLocalStorageNew(
    'loggedUsername',
    '',
  );

  const { data, error } = useSWR(
    'https://apikgems.cobainweb.site/api/users/me',
    fetcher,
  );

  const buttonLogout = () => {
    setIsModalOpen(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUserId');
    localStorage.removeItem('loggedUsername');

    setIsModalOpen(false);
    router.push('/');
  };

  const cancelLogout = () => {
    setIsModalOpen(false);
  };

  // if (error) {
  //   return (
  //     <LoginModal message={"You seem to be logged out - let's fix that!"} />
  //   );
  // }

  // if (!data) {
  //   return <Loading />;
  // }

  return (
    <>
      <Head>
        <title>Profile | Apikgems </title>
      </Head>
      {error ? (
        <LoginModal message={"You seem to be logged out - let's fix that!"} />
      ) : !data ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div className="grow px-10 py-10 mx-auto flex flex-col justify-center items-center place-content-start backdrop-blur-md backdrop-brightness-90 hero gap-5 divide-y">
            <div className="flex w-full gap-8">
              <ProfileImage userId={data.id} />
              <div>
                <p className=" text-3xl font-medium pb-2 text-white">
                  {data.username}
                </p>
                <p className=" pb-24 text-m text-white">{data.name}</p>

                <button
                  className="rounded-md border border-transparent mr-4 bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => {
                    router.push('/profile/me/edit', undefined, {
                      shallow: true,
                    });
                  }}
                >
                  Edit Profile
                </button>

                <button
                  className="rounded-md border border-transparent mr-4 bg-[#b81a1a] px-8 py-3 text-base font-medium text-white hover:bg-[#d41e1e] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={buttonLogout}
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="pt-5 flex flex-col">
              <h1 className="text-white">Games Owned: {data.games.length}</h1>
              <div className="pt-3 gap-x-5 gap-y-10 flex flex-wrap flex-row justify-between">
                {data.games.map((game: OwnedGameCardProps) => (
                  <OwnedGameCard
                    key={game.id}
                    id={game.id}
                    name={game.name}
                    imageUrl={game.imageUrl}
                  />
                ))}
              </div>
            </div>
          </div>
          {isModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
              <div className="absolute inset-0 bg-black opacity-50" />

              <div className="relative bg-white p-6 rounded-md shadow-md z-10 flex flex-col">
                <h2 className="text-2xl font-semibold mb-4">Logout</h2>
                <p className="text-lg">Are you sure?</p>
                <div className="flex flex-row justify-end gap-2">
                  <button
                    className="px-4 py-2 mt-4 rounded-lg text-white text-lg font-semibold bg-[#19222E]"
                    onClick={cancelLogout}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 mt-4 rounded-lg text-white text-lg font-semibold bg-[#b81a1a] "
                    onClick={confirmLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
