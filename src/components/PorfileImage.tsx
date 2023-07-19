import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useLocalStorageNew } from '@/hooks/useLocalStorageNew';
import Image from 'next/image';

type ProfileImageProps = {
  userId: string;
};

export function ProfileImage(props: ProfileImageProps) {
  //const [avatar] = useLocalStorage(`${props.userId}|avatar`);
  const [avatar, setAvatar] = useLocalStorageNew(
    `${props.userId}|avatar`,
    null,
  );

  return (
    <Image
      src={avatar ? `/avatar-${avatar}.jpg` : '/profile-picture.jpg'}
      alt="profile picture"
      height={240}
      width={240}
    ></Image>
  );
}
