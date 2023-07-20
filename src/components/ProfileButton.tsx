import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import Image from 'next/image';
import axios from 'axios';
import { useLocalStorageNew } from '@/hooks/useLocalStorageNew';

type ProfileButtonProps = {
  loggedIn: boolean;
  loggedUserId: string;
  loggedUsername: string;
  balance: number | string;
};
export default function ProfieButton(props: ProfileButtonProps) {
  //   const [loggedUserId, setloggedUserId] = useLocalStorageNew(
  //     'loggedUserId',
  //     '',
  //   );

  //   const [loggedUsername, setloggedUsername] = useLocalStorageNew(
  //     'loggedUsername',
  //     '',
  //   );

  //   const [balance, setBalance] = useLocalStorageNew(
  //     `${loggedUserId}|balance`,
  //     0,
  //   );

  //   const [loggedIn, setLoggedIn] = useState(false);

  //   useEffect(() => {
  //     if (loggedUsername !== '') {
  //       setLoggedIn(true);
  //     }
  //   }, []);

  return (
    <>
      {props.loggedIn ? (
        <div className="flex flex-row gap-8 items-center">
          <Link href="/wallet">
            <div>${props.balance}</div>
          </Link>
          <Link href="/profile/me">
            <div className="flex flex-col items-center">
              <Image
                src="/profile-picture.jpg"
                alt="profile picture"
                height={24}
                width={24}
              ></Image>
              <div>{props.loggedUsername}</div>
            </div>
          </Link>
        </div>
      ) : (
        <div className="btn">
          <Link href="/login">Login</Link>
        </div>
      )}
    </>
  );
}
