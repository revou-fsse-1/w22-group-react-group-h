import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import Image from 'next/image';
import axios from 'axios';

export default function Header() {
  // const [isLogin, setisLogin] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     setisLogin(true);
  //   }
  // }, []);

  const [profile, setProfile] = useState({
    id: '',
    username: '',
  });

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(
          'https://apikgems.cobainweb.site/api/users/me',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );
        console.log('sdhaushdusiah', response.data);
        const user = response.data;
        // const fetchedUsername = user.username;
        setProfile({
          id: user.id,
          username: user.username,
        });
        // localStorage.setItem('username', fetchedUsername);
      } catch (error) {
        // Handle error
      }
    };

    fetchUsername();
  }, []);

  //const { profile, isLoading, isError } = useProfile();

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
              <li className="ml-14">
                <Link href="/community">Community</Link>
              </li>
              <li className="ml-14">
                <a href="#">Event</a>
              </li>
              <li className="mr-[150px] ml-14">
                <a href="#">Chat</a>
              </li>

              {profile ? (
                <li>
                  <Link href="/profile/me">
                    <div className="flex flex-col items-center">
                      <Image
                        src="/profile-picture.jpg"
                        alt="profile picture"
                        height={24}
                        width={24}
                      ></Image>
                      <p>{profile.username}</p>
                    </div>
                  </Link>
                </li>
              ) : (
                <li className="btn">
                  <Link href="/login">Login</Link>
                </li>
              )}
            </ul>
          </nav>
        </header>
      </div>
    </div>
  );
}
