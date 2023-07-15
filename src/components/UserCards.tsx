import Image from 'next/image';
import Link from 'next/link';

export type UserCardsProps = {
  id: string;
  username: string;
};

export function UserCards(props: UserCardsProps) {
  return (
    <Link href={`/profile/${props.id}`}>
      <div>
        <p>{props.username}</p>
      </div>
    </Link>
  );
}
