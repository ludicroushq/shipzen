'use client';
import { md5 } from 'js-md5';
import { ChevronDownIcon, HomeIcon, LogInIcon, MenuIcon } from 'lucide-react';
import type { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/shadcn/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shadcn/ui/dropdown-menu';
import { Button } from '@/shadcn/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar';
import { signInAction } from '@/auth/actions';
import { Logo } from '../logo';

type NavigationProps = {
  session: Session | null;
};

export function Navigation(props: NavigationProps) {
  const { session } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  function getButtonVariant(path: string) {
    if (path === pathname) {
      return 'default' as const;
    }

    return 'ghost' as const;
  }

  return (
    <div className="container">
      <div className="flex flex-col items-center justify-between py-4 md:flex-row">
        <div className="flex h-16 w-full items-center justify-between">
          <Logo />
          <div className="md:hidden">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsMenuOpen((prevValue) => !prevValue)}
            >
              <MenuIcon />
            </Button>
          </div>
        </div>

        <div
          className={cn(
            isMenuOpen ? 'flex' : 'hidden',
            'w-full flex-col gap-2 md:flex md:flex-row md:justify-end',
          )}
        >
          {session ? (
            <>
              <Button asChild variant={getButtonVariant('/')} size="lg">
                <Link href="/">
                  <HomeIcon className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <DropdownMenu>
                <Button asChild variant="ghost" size="lg">
                  <DropdownMenuTrigger>
                    <Avatar className="mr-4">
                      <AvatarImage
                        src={`https://www.gravatar.com/avatar/${md5(
                          session.user.email,
                        )}?d=404`}
                      />
                      <AvatarFallback className="bg-slate-900 text-white">
                        {session.user.displayName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {session.user.displayName}
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </DropdownMenuTrigger>
                </Button>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => signOut()}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button asChild variant={getButtonVariant('/')} size="lg">
                <Link href="/">
                  <HomeIcon className="mr-2 h-4 w-4" />
                  Home
                </Link>
              </Button>
              <form action={signInAction} className="w-auto">
                <Button
                  type="submit"
                  variant="ghost"
                  size="lg"
                  className="w-full"
                >
                  <LogInIcon className="mr-2 h-4 w-4" />
                  Get Started
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
