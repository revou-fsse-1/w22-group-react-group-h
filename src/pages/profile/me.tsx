//import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import axios from 'axios';
import useSWR from 'swr';
import { OwnedGameCard } from '@/components/OwnedGameCard';
import { OwnedGameCardProps } from '@/components/OwnedGameCard';
import Image from 'next/image';
import { useProfile } from '@/hooks/useProfile';

export default function MyProfile() {
  // const { data, error, isLoading } = useSWR(
  //   'https://apikgems.cobainweb.site/api/users/me',
  //   fetcher,
  // );
  const { profile, isLoading, isError } = useProfile();

  if (isError) {
    return <div>Error fetching data</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log('kustom_huk', profile);
  return (
    <>
      <Head>
        <title>Profile | Apikgems </title>
      </Head>

      <div className="flex flex-col gap-12 hero">
        <div className="flex flex-row w-full gap-8">
          <Image
            src="/profile-picture.jpg"
            alt="profile picture"
            height={240}
            width={240}
          ></Image>
          <div>
            <p className="text-3xl">{profile.username}</p>
            <p>{profile.name}</p>
            <button className="rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Edit Profile
            </button>
          </div>
        </div>

        <div>
          <h1>Games Owned: {profile.games.length}</h1>
          <div>
            <h1>List Games:</h1>
            <div className="flex flex-row gap-8 items-center">
              {profile.games.map((game: OwnedGameCardProps) => (
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
      </div>
    </>
  );
}

// async function fetcher(url: string) {
//   const response = await axios.get(url, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//     },
//   });

//   return response.data;
// }

// export const getServerSideProps: GetServerSideProps = async () => {
//   //const token = window.localStorage.getItem('token');
//   try {
//     const response = await axios.get(
//       'https://apikgems.cobainweb.site/api/users/me',
//       {
//         headers: {
//           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllb3dpdHgwMDAycGQwamU5a2hiNmh3IiwiaWF0IjoxNjg5NDAwOTU4LCJleHAiOjE2ODk0MDQ1NTh9.yZXsY5UvRWOaKoGlcfXks5cUofa9MT1zhLMHvCj5mtg`,
//         },
//       },
//     );

//     const data = response.data;

//     return {
//       props: { data },
//     };
//   } catch (error: any) {
//     console.error('Error fetching data:', error);

//     return {
//       props: {},
//     };
//   }
// };
