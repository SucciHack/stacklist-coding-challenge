import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="relative h-8 w-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          className="text-brand-purple"
        >
          <rect x="6" y="20" width="20" height="4" rx="2" fill="currentColor" />
          <rect x="6" y="14" width="20" height="4" rx="2" fill="currentColor" />
          <rect x="6" y="8" width="20" height="4" rx="2" fill="currentColor" />
        </svg>
      </div>
      <span className="text-xl font-bold text-brand-purple">stacklist</span>
    </Link>
  )
}

