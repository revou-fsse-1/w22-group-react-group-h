import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useLocalStorageNew } from '@/hooks/useLocalStorageNew';
import React from 'react';
import Image from 'next/image';

type EditAvatarProps = {
  userId: string;
  onAvatarChange: (avatar: string | null) => void;
};

export function EditAvatar(props: EditAvatarProps) {
  //   const [avatar, setAvatar] = useLocalStorage(`${props.userId}|avatar`);
  const [avatar, setAvatar] = useLocalStorageNew(
    `${props.userId}|avatar`,
    null,
  );
  const storedAvatars = ['default', 'cat', 'dog', 'fox', 'people-1'];

  const handleAvatarChange = (avatar: string) => {
    setAvatar(avatar);
    props.onAvatarChange(avatar); // Pass the selected avatar to the parent component
  };

  return (
    <>
      <Image
        src={avatar ? `/avatar-${avatar}.jpg` : '/profile-picture.jpg'}
        alt="profile picture"
        height={240}
        width={240}
      ></Image>

      <div>
        <p className='text-white pb-3'>AVATAR</p>
        <div className="flex flex-row gap-3">
        {storedAvatars.map((ava) => (
            <button
              key={ava}
              className="w-32 h-32"
              onClick={() => {
                handleAvatarChange(ava);
              }}
            >
              <Image
                className='border border-white'
                src={`/avatar-${ava}.jpg`}
                alt="Button Image"
                height={128}
                width={128}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
