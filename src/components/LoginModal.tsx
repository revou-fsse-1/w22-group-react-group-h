import { useRouter } from 'next/router';

type LoginModalProps = {
  message: string;
};

export default function LoginModal(props: LoginModalProps) {
  const router = useRouter();

  const loginButton = () => {
    router.push('/login');
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
        <div className="absolute inset-0 bg-black opacity-50" />

        <div className="relative bg-white p-6 rounded-md shadow-md z-10 flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">Please Login</h2>
          <p className="text-lg">{props.message}</p>
          <button
            className="px-4 py-2 mt-4 rounded-lg text-white text-lg font-semibold bg-[#19222E] self-end"
            onClick={loginButton}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}
