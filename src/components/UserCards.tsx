import Image from 'next/image';
import Link from 'next/link';

export type UserCardsProps = {
  id: string;
  username: string;
  avatar: string | null;
};

export function UserCards(props: UserCardsProps) {
  return (
    <Link href={`/community/${props.id}`}>
      <div className="max-w-xs text-white rounded border shadow-xl shadow-black hover:scale-110 duration-300">
      <Image
          src={props.avatar ? `/avatar-${props.avatar}.jpg` : '/profile-picture.jpg'}
          alt="profile picture"
          height={240}
          width={240}
        />
        <div className="flex justify-between px-3 py-1 items-center bg-gradient-to-r from-stone-500 to-stone-800">
          <p className="px-3 pt-3 pb-3 truncate rounded-2xl">
            {props.username}
          </p>
        </div>
      </div>
    </Link>
  );
}
