import { Link } from '@nextui-org/react';
import { baseDomain } from '@/config/app';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-6 border-t border-divider py-6">
      <div className="container">
        <div className="prose">
          <p>
            a ludicrous company <br />
            made with ❤️ by{' '}
            <Link
              color="foreground"
              href="https://twitter.com/nahtnam"
              target="_blank"
            >
              @nahtnam
            </Link>
            <br />
            <Link color="foreground" href={`mailto:support@${baseDomain}`}>
              contact support
            </Link>
            <br />
            <small>&copy; {year} ludicrous LLC. All rights reserved.</small>
          </p>
        </div>
      </div>
    </footer>
  );
}
