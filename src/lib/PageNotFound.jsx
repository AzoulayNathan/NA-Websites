import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-quartz">
      <div className="text-center">
        <h1 className="font-serif text-[80px] md:text-[120px] font-light text-ink/10 leading-none">404</h1>
        <div className="h-[1px] w-12 bg-olive/20 mx-auto my-6" />
        <p className="text-[15px] text-ink/45 font-light">This page doesn't exist.</p>
        <Link
          to="/"
          className="inline-block mt-8 text-[12px] uppercase tracking-[0.15em] text-ink/50 hover:text-ink transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}