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
      <div className="border">
        <div className="max-w-xs text-white rounded">
          <img
            className="w-full"
            src={props.imageUrl}
            alt="GamesImg"
            height={45}
            width={45}
          ></img>
          <div className="flex justify-between px-3 py-1 bg-blue-700 items-center">
            <p className="text-l font-bold border px-2 py-1">{props.name}</p>
            <p className="text-lg font-bold">{props.price}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
