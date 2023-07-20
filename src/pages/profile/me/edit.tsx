import Head from 'next/head';
import axios from 'axios';
import useSWR from 'swr';
import { EditAvatar } from '@/components/EditAvatar';
import EditProfileForm from '@/components/EditProfileForm';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import LoginModal from '@/components/LoginModal';

async function fetcher(url: string) {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  console.log('fetch profile', response.data);

  return response.data;
}

export default function EditProfile() {
  const { data, error } = useSWR(
    'https://apikgems.cobainweb.site/api/users/me',
    fetcher,
    { shouldRetryOnError: false },
  );

  if (error) {
    return (
      <LoginModal message={"You seem to be logged out - let's fix that!"} />
    );
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Edit Profile | Apikgems </title>
      </Head>

      <Header />
      <div className="grow px-10 py-10 mx-auto flex flex-col justify-center items-center place-content-start backdrop-blur-md backdrop-brightness-90 hero gap-5 divide-y">
        <div className="flex flex-col w-full gap-8">
          <div className="flex gap-8">
            <EditProfileForm
              userId={data.id}
              username={data.username}
              name={data.name}
              email={data.email}
            />
            <EditAvatar userId={data.id} />
          </div>
        </div>
      </div>
    </>
  );
}
