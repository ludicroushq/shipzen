import { Link } from '@nextui-org/react';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-6 border-t border-divider py-6">
      <div className="container">
        <div className="prose">
          <p>
            &copy; {year} TODO. All rights reserved.
            <br />
            <small>
              Powered by{' '}
              <Link
                color="foreground"
                href="https://www.shipzen.dev"
                target="_blank"
              >
                <small>ShipZen</small>
              </Link>
              .
            </small>
          </p>
        </div>
      </div>
    </footer>
  );
}
