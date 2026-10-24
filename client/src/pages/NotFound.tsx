import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <main className="page-atmosphere grid min-h-screen place-items-center px-5 text-frost sm:px-8">
      <section aria-labelledby="not-found-title" className="w-full max-w-2xl">
        <p className="eyebrow">404 · Page not found</p>
        <h1 className="section-title mt-4 text-balance" id="not-found-title">
          There's nothing at this address.
        </h1>
        <p className="mt-5 max-w-lg leading-relaxed text-mist">
          The link may be outdated or mistyped. Everything lives on the home
          page.
        </p>
        <Link className="btn btn-primary mt-8" href="/">
          <ArrowLeft aria-hidden="true" size={16} /> Back to the portfolio
        </Link>
      </section>
    </main>
  );
}
