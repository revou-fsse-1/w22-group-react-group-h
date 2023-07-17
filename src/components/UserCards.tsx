import Image from 'next/image';
import Link from 'next/link';

export type UserCardsProps = {
  id: string;
  username: string;
};

export function UserCards(props: UserCardsProps) {
  return (
    <Link href={`/profile/${props.id}`}>
      <div className="max-w-xs text-white rounded border shadow-xl shadow-black hover:scale-110 duration-300">
        <img src="/profile-picture.jpg"></img>
        <div className="flex justify-between px-3 py-1 items-center bg-gradient-to-r from-stone-500 to-stone-800">
          <p className="px-3 pt-3 pb-3 truncate rounded-2xl">
            {props.username}
          </p>
        </div>
      </div>
    </Link>
  );
}
