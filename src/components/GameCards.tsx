import Image from 'next/image';
import Link from 'next/link';

export type GameCardsProps = {
  id: string;
  imageUrl: string;
  price: number;
};

export function GameCards(props: GameCardsProps) {
  return (
    <Link href={`/games/${props.id}`}>
      <div>
        <img src={props.imageUrl} alt="GamesImg" height={45} width={45}></img>
        <p>{props.price}</p>
      </div>
    </Link>
  );
}
