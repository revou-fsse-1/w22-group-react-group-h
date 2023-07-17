import { useEffect, useState } from 'react';
import axios from 'axios';
import { GameCards } from '@/components/GameCards';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GameCardsProps } from '@/components/GameCards';

// export type GameType = {
//   id: string;
//   imageUrl: string;
//   price: number;
// };

export default function GameTables() {
  const navigate = useRouter();
  const [games, setGames] = useState<GameCardsProps[]>([]);

  async function getGames() {
    try {
      const response = await axios.get(
        'https://apikgems.cobainweb.site/api/games',
      );
      console.log(response);

      setGames(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getGames();
  }, []);

  return (
    <div className="flex flex-col hero mt-4">
      <div>
        <p>Featured & Recommended</p>
      </div>
      <Link href="/">
        <div>
          {games.map((game) => (
            <GameCards
              key={game.id}
              id={game.id}
              imageUrl={game.imageUrl}
              price={game.price}
              name={game.name}
            />
          ))}
        </div>
      </Link>
    </div>
  );
}
