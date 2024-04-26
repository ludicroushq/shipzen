import { Link } from '@nextui-org/react';

export function Logo() {
  return (
    <Link className="flex items-center gap-2" color="foreground" href="/">
      <span className="text-3xl">TODO</span>
    </Link>
  );
}
