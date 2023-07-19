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
import { CommunityOwnedGameCardProps } from '@/components/CommunityOwnedGameCard';
import { CommunityOwnedGameCard } from '@/components/CommunityOwnedGameCard';

export default function GameDetail({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Community | Apikgems </title>
      </Head>

      <div className="grow px-10 py-10 mx-auto flex flex-col justify-center items-center place-content-start backdrop-blur-md backdrop-brightness-90 hero gap-5 divide-y">
        <div className="flex w-full gap-8">
          <Image
            src="/profile-picture.jpg"
            alt="profile picture"
            height={240}
            width={240}
          ></Image>
          <div>
            <p className=" text-3xl font-medium">{data.username}</p>
            <p className=" pb-24 text-m">{data.name}</p>
          </div>
        </div>

        <div className="pt-5 flex flex-col">
          <h1 className="text-white">Games Owned: {data.games.length}</h1>
          <div className="pt-3 gap-x-5 gap-y-10 flex flex-wrap flex-row">
            {data.games.map((game: CommunityOwnedGameCardProps) => (
              <CommunityOwnedGameCard
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
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const id = context.params?.id as string;

  try {
    const response = await axios.get(
      `https://apikgems.cobainweb.site/api/users/${id}`,
    );

    console.log(response);

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
