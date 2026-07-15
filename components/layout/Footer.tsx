// components/layout/Footer.tsx

const LINKEDIN_URL =
  "https://www.linkedin.com/in/hamza-khan-5886b1410?utm_source=share_via&utm_content=profile&utm_medium=member_ios";
const INSTAGRAM_URL = "https://www.instagram.com/nexora__technologies?utm_source=qr";

export function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-center">
        <p className="text-muted text-xs">© 2026 Nexora Technologies. All rights reserved.</p>
        <div className="flex gap-4">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted text-xs hover:text-text-primary transition-colors focus-visible-ring"
          >
            LinkedIn
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted text-xs hover:text-text-primary transition-colors focus-visible-ring"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
