import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';

export default function ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Games | Apikgems </title>
      </Head>

      <div className="flex flex-col items-center my-16 gap-8">
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl">{data.name}</h1>
          <img
            className="w-[48rem] h-auto"
            src={data.imageUrl}
            alt={`Photo of ${data.name}`}
            onError={(e) => (e.currentTarget.src = '/avatar.svg')}
          />
        </div>

        <div className="flex justify-between w-[48rem] items-start">
          <div className="flex flex-row gap-6">
            {data.genre.map((genre: string) => (
              <div
                key={genre}
                className="bg-gray-300 border-red rounded-md px-2 py-1"
              >
                <p>{genre}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-row gap-8 items-center">
            <p className="text-3xl">{`$ ${data.price}`}</p>
            <button className="rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Purchase
            </button>
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
