import Link from 'next/link';

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center group ${className}`}>
      <img 
        src="/stratix-logo.png" 
        alt="STRATIX" 
        className="w-auto h-[56px] md:h-[72px] lg:h-[90px] object-contain transition-transform group-hover:scale-105"
      />
    </Link>
  );
}
