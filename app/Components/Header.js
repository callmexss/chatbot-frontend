import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handleLogout = () => {
  };

  return (
    <header className="p-4 bg-gray-900 text-white flex flex-wrap justify-between items-center sticky top-0 z-50">
      <div className="text-2xl font-bold">
        <Link href="/">ESChat</Link>
      </div>
      <div className="relative md:hidden">
        <button
          className="p-2 rounded-md text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
        </button>
        <div className={`absolute top-full mt-2 w-48 rounded-md shadow-lg bg-gray-900 transition-all duration-300 ease-in-out transform ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <nav className="flex flex-col space-y-4 text-white">
            <Link href="/chat">Chat</Link>
            <Link href="/doc-chat">DocChat</Link>
            <Link href="/document">Document Management</Link>
            <Link href="/settings">Settings</Link>
          </nav>
        </div>
      </div>
      <nav className={`hidden md:flex space-x-4 ${isOpen ? 'block' : 'hidden'}`}>
        <Link href="/chat">Chat</Link>
        <Link href="/doc-chat">DocChat</Link>
        <Link href="/document">Document Management</Link>
        <Link href="/settings">Settings</Link>
      </nav>
      <div className="flex space-x-4">
        <Link href="/profile" className="hover:bg-gray-700 p-2 rounded-full transition duration-300 ease-in-out">
          Profile
        </Link>
        {true ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition duration-300 ease-in-out"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition duration-300 ease-in-out"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
