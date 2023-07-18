import Image from 'next/image';
import Link from 'next/link';

export type CommunityOwnedGameCardProps = {
  id: string;
  name: string;
  imageUrl: string;
};

export function CommunityOwnedGameCard(props: CommunityOwnedGameCardProps) {
  return (
    <div className="border border-white shadow-black shadow-lg ">
      <img
        className="w-72 h-40 "
        src={props.imageUrl}
        alt={`Image of game ${props.name}`}
      ></img>
      <div className="flex flex-row justify-between items-center bg-gradient-to-r from-stone-500 to-stone-800 py-3 px-3">
        <div className="text-m font-medium text-white">{props.name}</div>
      </div>
    </div>
  );
}
