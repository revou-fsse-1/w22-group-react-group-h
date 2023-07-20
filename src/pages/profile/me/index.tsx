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

  const { data, error } = useSWR(
    'https://apikgems.cobainweb.site/api/users/me',
    fetcher,
  );

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
                <p className=" text-3xl font-medium">{data.username}</p>
                <p className=" pb-24 text-m">{data.name}</p>
                <button
                  className="rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => {
                    router.push('/profile/me/edit', undefined, {
                      shallow: true,
                    });
                  }}
                >
                  Edit Profile
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
        </>
      )}
    </>
  );
}
