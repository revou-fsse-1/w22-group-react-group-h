import Image from 'next/image';
import Link from 'next/link';

export type OwnedGameCardProps = {
  id: string;
  name: string;
  imageUrl: string;
};

export function OwnedGameCard(props: OwnedGameCardProps) {
  return (
    <div>
      <img
        className="w-80 h-96 border border-gray-300/10 mb-2"
        src={props.imageUrl}
        alt={`Image of game ${props.name}`}
      ></img>
      <div className="flex flex-row gap-8 justify-between items-center my-2">
        <div className="text-2xl font-normal">{props.name}</div>
        <button className="rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Play
        </button>
      </div>
    </div>
  );
}
