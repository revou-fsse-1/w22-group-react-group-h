import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import axios from 'axios';

export default function MyProfile({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Profile | Apikgems </title>
      </Head>

      <div>
        <h1>Profile</h1>
        <p>{data.username}</p>
        <p>{data.name}</p>
      </div>

      <div>
        <h1>Games Owned</h1>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get(
      'https://apikgems.cobainweb.site/api/users/me',
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllb3dpdHgwMDAycGQwamU5a2hiNmh3IiwiaWF0IjoxNjg5MTMxNzg2LCJleHAiOjE2ODkxMzUzODZ9.C0K4_YfsaV8B7JOKdbAwc860nyNpZWwyxvAJlBp1n9Q`,
        },
      },
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
