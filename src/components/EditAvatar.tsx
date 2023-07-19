import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useLocalStorageNew } from '@/hooks/useLocalStorageNew';

import Image from 'next/image';

type EditAvatarProps = {
  userId: string;
};

export function EditAvatar(props: EditAvatarProps) {
  //   const [avatar, setAvatar] = useLocalStorage(`${props.userId}|avatar`);
  const [avatar, setAvatar] = useLocalStorageNew(
    `${props.userId}|avatar`,
    null,
  );
  const storedAvatars = ['default', 'cat', 'dog', 'fox', 'people-1'];

  return (
    <>
      <Image
        src={avatar ? `/avatar-${avatar}.jpg` : '/profile-picture.jpg'}
        alt="profile picture"
        height={240}
        width={240}
      ></Image>

      <div>
        AVATAR
        <div className="flex flex-row">
          {storedAvatars.map((ava) => (
            <button
              key={ava}
              className="w-32 h-32"
              onClick={() => {
                setAvatar(ava);
              }}
            >
              <Image
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
