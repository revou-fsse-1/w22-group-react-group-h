import Image from 'next/image';
import Link from 'next/link';

export type OwnedGameCardProps = {
  id: string;
  name: string;
  imageUrl: string;
};

export function OwnedGameCard(props: OwnedGameCardProps) {
  return (
    <div className="border border-white shadow-black shadow-lg ">
      <img
        className="w-72 h-40 "
        src={props.imageUrl}
        alt={`Image of game ${props.name}`}
      ></img>
      <div className="flex flex-row justify-between items-center bg-gradient-to-r from-stone-500 to-stone-800 py-3 px-3">
        <div className="text-m font-medium text-white">{props.name}</div>
        <button className="shadow-md shadow-black rounded-md border border-transparent bg-indigo-600 px-6 py-2 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Play
        </button>
      </div>
    </div>
  );
}
