import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import Image from 'next/image';
import axios from 'axios';
import { useLocalStorageNew } from '@/hooks/useLocalStorageNew';
import ProfieButton from './ProfileButton';

type HeaderProps = {
  avatar?: string | null;
};

export default function Header(props: HeaderProps) {
  const [loggedUserId, setloggedUserId] = useLocalStorageNew(
    'loggedUserId',
    '',
  );

  const [loggedUsername, setloggedUsername] = useLocalStorageNew(
    'loggedUsername',
    '',
  );

  const [balance, setBalance] = useLocalStorageNew(
    `${loggedUserId}|balance`,
    0,
  );

  const [avatar, setAvatar] = useLocalStorageNew(`${loggedUserId}|avatar`, 'default');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (loggedUsername !== '') {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="layout-header">
      <div className="hero">
        <header className="flex items-center justify-between pt-[40px] pb-[30px] px-0">
          <div>
            <h2 className="block text-[32px] font-semibold .no-underline text-white">
              <Link href="/">ApikGems</Link>
            </h2>
          </div>
          <div className="flex flex-row items-center">
            <nav>
              <ul>
                <li>
                  <Link href="/games">Games</Link>
                </li>
                <li className="ml-14">
                  <Link href="/community">Community</Link>
                </li>
                <li className="ml-14">
                  <a href="#">Guides</a>
                </li>
                <li className="mr-[150px] ml-14">
                  <Link href="/chat">Chat</Link>
                </li>
              </ul>
            </nav>

            {/* {loggedIn ? (
                <li>
                  <div className="flex flex-row gap-8 items-center">
                    <Link href="/wallet">
                      <div>${balance}</div>
                    </Link>
                    <Link href="/profile/me">
                      <div className="flex flex-col items-center">
                        <Image
                          src="/profile-picture.jpg"
                          alt="profile picture"
                          height={24}
                          width={24}
                        ></Image>
                        <div>{loggedUsername}</div>
                      </div>
                    </Link>
                  </div>
                </li>
              ) : (
                <li className="btn">
                  <Link href="/login">Login</Link>
                </li>
              )} */}
            <ProfieButton
              loggedIn={loggedIn}
              loggedUserId={loggedUserId}
              loggedUsername={loggedUsername}
              balance={balance}
              avatar={avatar}
            />
          </div>
        </header>
      </div>
    </div>
  );
}
