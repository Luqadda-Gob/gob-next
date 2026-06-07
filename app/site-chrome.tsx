import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/gob.png" alt="" />
        <span>Gob</span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/#mobile">App-ka</Link>
        <Link href="/docs">Hage</Link>
        <Link href="/downloads">Lasoo Degis</Link>
        <Link href="/support">Caawimaad</Link>
        <a
          className="nav-icon"
          href="https://github.com/yaseressa/gob"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          title="GitHub"
        >
          <FaGithub size={20} />
        </a>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="brand footer-brand" href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/gob.png" alt="" />
          <span>Gob</span>
        </Link>
        <p>Programming ku hadlaya Af-Soomaali.</p>
      </div>
      <div className="footer-links">
        <Link href="/#mobile">App-ka</Link>
        <Link href="/docs">Hage</Link>
        <Link href="/downloads">Lasoo Degis</Link>
        <Link href="/support">Caawimaad</Link>
        <Link href="/privacy">Siyaasada Asturnaanta</Link>
      </div>
      <p className="copyright">© 2026 Gob</p>
    </footer>
  );
}
