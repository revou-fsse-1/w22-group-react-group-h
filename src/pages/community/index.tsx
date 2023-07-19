import { useEffect, useState } from 'react';
import axios from 'axios';
import { GameCards } from '@/components/GameCards';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserCardsProps } from '@/components/UserCards';
import { UserCards } from '@/components/UserCards';
import Head from 'next/head';

export default function GameTables() {
  const navigate = useRouter();
  const [users, setUsers] = useState<UserCardsProps[]>([]);

  async function getUsers() {
    try {
      const response = await axios.get(
        'https://apikgems.cobainweb.site/api/users',
      );
      console.log(response);

      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Head>
        <title>Community | Apikgems </title>
      </Head>
      <Link href="/">
        <div className="grow px-10 py-10 mx-auto flex flex-col justify-center items-center place-content-start backdrop-blur-md backdrop-brightness-90 hero">
          <div className="pt-6 gap-x-5 gap-y-10 flex flex-wrap flex-row justify-evenly">
            {users.map((user) => (
              <UserCards
                key={user.id}
                id={user.id}
                // imageUrl={user.imageUrl}
                username={user.username}
              />
            ))}
          </div>
        </div>
      </Link>
    </>
  );
}
