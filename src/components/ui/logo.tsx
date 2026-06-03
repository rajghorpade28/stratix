import Link from 'next/link';

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center group ${className}`}>
      <img 
        src="/stratix-logo.png" 
        alt="STRATIX" 
        className="w-auto h-8 md:h-9 lg:h-10 object-contain transition-transform group-hover:scale-105"
      />
    </Link>
  );
}
