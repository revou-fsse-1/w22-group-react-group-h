import { useEffect, useState } from 'react';
import axios from 'axios';
import { GameCards } from '@/components/GameCards';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GameCardsProps } from '@/components/GameCards';
import { GameSearchBar } from '@/components/SearchBar';
import Head from 'next/head';

// export type GameType = {
//   id: string;
//   imageUrl: string;
//   price: number;
// };

export default function GameTables() {
  const navigate = useRouter();
  const [games, setGames] = useState<GameCardsProps[]>([]);
  const [filterValue, setFilterValue] = useState<string>('');

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

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
  };

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(filterValue.toLowerCase()),
  );

  return (
    <>
      <Head>
        <title>Games | Apikgems </title>
      </Head>
      <div className="grow px-10 py-10 mx-auto flex flex-col justify-center items-center place-content-start backdrop-blur-md backdrop-brightness-90 hero">
        <div className="pb-8">
          <p className="pb-2 text-white">Featured & Recommended</p>
          <img src="/Doraemon.jpg" className="pb-4"></img>
        </div>
        <GameSearchBar setFilterValue={handleFilterChange} />
        <Link href="/">
          <div className="pt-6 gap-x-5 gap-y-10 flex flex-wrap flex-row justify-evenly">
            {filteredGames.map((game) => (
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
    </>
  );
}
