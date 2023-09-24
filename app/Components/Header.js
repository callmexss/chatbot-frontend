import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handleLogout = () => {
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          My App
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/chat">
          Chat
        </Link>
        <Link href="/document">
          Document Management
        </Link>
        <Link href="/settings">
          Settings
        </Link>
      </nav>
      <div className={styles.userActions}>
        <Link href="/profile">
          Profile
        </Link>
        {true? (
          <button onClick={handleLogout}>Logout</button>  // 绑定 handleLogout 函数
        ) : (
          <button onClick={handleLogin}>Login</button>  // 绑定 handleLogin 函数
        )}
      </div>
    </header>
  );
};

export default Header;
