import Link from 'next/link';

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 group ${className}`}>
      <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-primary overflow-hidden">
        {/* Abstract brand mark */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-80 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-0.5 bg-background rounded-md z-10 flex items-center justify-center">
          <span className="font-heading font-bold text-lg leading-none bg-clip-text text-transparent bg-gradient-to-br from-white to-white/70">S</span>
        </div>
      </div>
      <span className="font-heading font-bold text-xl tracking-wide text-foreground group-hover:text-primary transition-colors">STRATIX</span>
    </Link>
  );
}
