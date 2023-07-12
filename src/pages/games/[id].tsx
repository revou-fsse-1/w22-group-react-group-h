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

      <div>
        <h1>{data.name}</h1>
        <p>{`$ ${data.price}`}</p>

        <div className="flex flex-row">
          {data.genre.map((genre: string) => (
            <div key={genre} className="bg-gray-300 border-red rounded-md">
              <p>{genre}</p>
            </div>
          ))}
        </div>

        <img
          className="w-32 h-auto"
          src={data.imageUrl}
          alt={`Photo of ${data.name}`}
          onError={(e) => (e.currentTarget.src = '/avatar.svg')}
        />
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
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllb3dpdHgwMDAycGQwamU5a2hiNmh3IiwiaWF0IjoxNjg5MTMxNzg2LCJleHAiOjE2ODkxMzUzODZ9.C0K4_YfsaV8B7JOKdbAwc860nyNpZWwyxvAJlBp1n9Q`,
        },
      },
    );

    const data = response.data;
    console.log(data);
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
