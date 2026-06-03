import Link from 'next/link';

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center group ${className}`}>
      <img 
        src="/stratix-logo.png" 
        alt="STRATIX" 
        className="w-auto h-10 md:h-12 lg:h-14 object-contain transition-transform group-hover:scale-105"
      />
    </Link>
  );
}
