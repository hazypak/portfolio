/** Obsidian Signal style: the closing panel provides deliberate exit routes without decorative clutter. */
import { ArrowUpRight, Github, Mail } from "lucide-react";
import { BrandMark } from "@/components/portfolio/BrandMark";
import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/portfolio/Reveal";

export function PortfolioFooter() {
  const { profile, quickLinks } = portfolio;
  const contactHref = profile.email ? `mailto:${profile.email}` : profile.github;

  return (
    <footer className="mt-28 border-t border-white/10 px-5 pb-8 pt-12 sm:px-8 lg:mt-36 lg:px-12" id="contact">
      <Reveal>
        <div className="mx-auto grid w-full max-w-[1344px] gap-12 lg:grid-cols-[1.25fr_0.75fr_0.7fr] lg:gap-8">
          <div>
            <div className="footer-brand-lockup">
              <BrandMark className="h-12 w-12 text-white" />
              <span><strong>Muhammad Hazqeel</strong><small>NEURAL ANCHOR / SYSTEMS</small></span>
            </div>
            <p className="mt-7 max-w-md text-balance text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl">
              Open to thoughtful collaborations and ambitious systems.
            </p>
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">For project conversations, the GitHub profile is the active point of contact.</p>
            <a
              className="glass-button glass-button-primary mt-7 inline-flex"
              href={contactHref}
              rel={profile.email ? undefined : "noreferrer"}
              target={profile.email ? undefined : "_blank"}
            >
              {profile.email ? "Start a conversation" : "Connect on GitHub"}
              {profile.email ? <Mail aria-hidden="true" size={17} strokeWidth={1.8} /> : <Github aria-hidden="true" size={17} strokeWidth={1.8} />}
            </a>
          </div>
          <div>
            <p className="eyebrow">Quick links</p>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a className="footer-link" href={link.href} rel="noreferrer" target="_blank">
                    <span>{link.label}</span><ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Elsewhere</p>
            <a className="footer-link mt-5" href={profile.github} rel="noreferrer" target="_blank">
              <span>GitHub / hazypak</span><Github aria-hidden="true" size={16} strokeWidth={1.8} />
            </a>
            <p className="mt-12 text-xs leading-5 text-slate-600">© {new Date().getFullYear()} Muhammad Hazqeel. Systems, deployed with intent.</p>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
