'use client';
import { md5 } from 'js-md5';
import { HomeIcon, LogInIcon, MenuIcon } from 'lucide-react';
import type { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { signInAction } from '@/auth/actions';

type NavigationProps = {
  session: Session | null;
};

export function Navigation(props: NavigationProps) {
  const { session } = props;
  const pathname = usePathname();

  const menu = session ? (
    <>
      <li>
        <Link href="/" className={twMerge(pathname === '/' && 'active')}>
          <HomeIcon className="h-4 w-4" />
          Dashboard
        </Link>
      </li>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="avatar btn btn-circle btn-ghost btn-sm size-9"
        >
          <div className="w-10 rounded-full border">
            <Image
              alt={session.user.displayName}
              width={36}
              height={36}
              src={`https://www.gravatar.com/avatar/${md5(
                session.user.email,
              )}?d=404`}
            />
          </div>
        </div>
        <ul
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- interactive
          tabIndex={0}
          className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
        >
          <li className="text-error">
            <button type="button" onClick={() => signOut()}>
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </>
  ) : (
    <>
      <li>
        <Link href="/" className={twMerge(pathname === '/' && 'active')}>
          <HomeIcon className="h-4 w-4" />
          Home
        </Link>
      </li>

      <li>
        <form action={signInAction} className="w-auto">
          <button className="flex items-center gap-2" type="submit">
            <LogInIcon className="h-4 w-4" />
            Get Started
          </button>
        </form>
      </li>
    </>
  );

  return (
    <div className="border-b">
      <div className="container">
        <div className="navbar px-0">
          <div className="navbar-start">
            <Link href="/" className="text-2xl font-bold">
              TODO
            </Link>
          </div>
          <div className="navbar-end">
            <div className="hidden md:flex">
              <ul className="menu menu-horizontal space-x-2">{menu}</ul>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost md:hidden"
              >
                <MenuIcon />
              </div>
              <ul
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- interactive
                tabIndex={0}
                className="menu dropdown-content z-[1] mt-3 w-max space-y-2 rounded-box bg-base-100 p-2 shadow"
              >
                {menu}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
