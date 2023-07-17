import { useRouter } from 'next/router';
import React from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <div>
      <div>
        <button
          onClick={handleLogout}
          className="text-white bg-red-800 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-3 text-center"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
