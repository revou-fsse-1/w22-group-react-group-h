import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isLogin, setisLogin] = useState(false);

  // useEffect data.accessToken setisLogin

  return (
    <div className="layout-header">
      <div className="hero">
        <header className="flex items-center justify-between pt-[40px] pb-[30px] px-0">
          <div>
            <h2 className="block text-[32px] font-semibold .no-underline text-white">
              <Link href="/">ApikGems</Link>
            </h2>
          </div>

          <nav>
            <ul>
              <li>
                <Link href="/games">Games</Link>
              </li>
              <li>
                <Link href="/community">Community</Link>
              </li>
              <li>
                <a href="#">Event</a>
              </li>
              <li className="mr-[150px]">
                <a href="#">Chat</a>
              </li>
              <li className="btn">
                {isLogin ? (
                  <Link href="#">Profile</Link>
                ) : (
                  <Link href="/login">Login</Link>
                )}
              </li>
            </ul>
          </nav>
        </header>
      </div>
    </div>
  );
}
