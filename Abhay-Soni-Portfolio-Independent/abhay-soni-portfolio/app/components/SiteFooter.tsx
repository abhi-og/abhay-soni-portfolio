export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p className="footer-kicker">Let&apos;s make something useful.</p>
        <p className="footer-title">Have an idea worth building?</p>
      </div>
      <div className="footer-links">
        <a href="mailto:abhispacesoni@gmail.com">Email</a>
        <a
          href="https://github.com/abhi-og"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/abhay-soni-650b13410"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <a href="/studio">Owner login</a>
      </div>
      <p className="footer-note">
        © {new Date().getFullYear()} Abhay Soni. Built with curiosity.
      </p>
    </footer>
  );
}
