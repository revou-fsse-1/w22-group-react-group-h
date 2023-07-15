import { useEffect, useState } from 'react';
import axios from 'axios';
import { GameCards } from '@/components/GameCards';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserCardsProps } from '@/components/UserCards';
import { UserCards } from '@/components/UserCards';

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
    <Link href="/">
      <div className="flex flex-col hero cards">
        {users.map((user) => (
          <UserCards
            key={user.id}
            id={user.id}
            // imageUrl={user.imageUrl}
            username={user.username}
          />
        ))}
      </div>
    </Link>
  );
}
