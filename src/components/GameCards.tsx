import Image from 'next/image';
import Link from 'next/link';

export type GameCardsProps = {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
};

export function GameCards(props: GameCardsProps) {
  return (
    <Link href={`/games/${props.id}`}>
      <div className="border shadow-xl shadow-black hover:scale-110 duration-300">
        <div className="max-w-xs text-white rounded">
          <img className="w-72 h-40" src={props.imageUrl} alt="GamesImg"></img>
          <div className="flex justify-between px-3 py-1 items-center bg-gradient-to-r from-stone-500 to-stone-800">
            <p className="px-3 pt-3 pb-3 truncate rounded-2xl bg-gradient-to-b from-slate-950">
              {props.name}
            </p>
            <p className="text-lg font-bold">${props.price}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
