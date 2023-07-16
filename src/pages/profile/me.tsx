//import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import axios from 'axios';
import useSWR from 'swr';

export default function MyProfile() {
  const { data, error, isLoading } = useSWR(
    'https://apikgems.cobainweb.site/api/users/me',
    fetcher,
  );
  if (error) {
    return <div>Error fetching data</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }
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
        <h1>Games Owned: {data.games.length}</h1>
        <h1>List Games:</h1>
      </div>
    </>
  );
}

async function fetcher(url: string) {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  return response.data;
}

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
