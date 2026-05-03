import { NavLink, Outlet } from 'react-router-dom'
import { APP_NAME, APP_TAGLINE } from '../branding'

const linkBase =
  'flex flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl px-2 py-2 text-xs font-semibold transition-all duration-200'
const inactive = 'text-stone-500 hover:bg-white/50 hover:text-stone-800'
const active =
  'bg-white text-indigo-700 shadow-md shadow-indigo-100/80 ring-2 ring-indigo-200/90'

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 22c0-8 3-14 10-18C14 8 12 14 12 22z" opacity="0.35" />
      <path d="M12 22C12 10 9 5 2 2c9 4 12 10 10 20z" />
    </svg>
  )
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path strokeWidth="2" strokeLinecap="round" d="M4 19V5M8 19v-6M12 19V9M16 19v-4M20 19v-9" />
    </svg>
  )
}

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-10 border-b border-violet-100/70 bg-white/75 px-4 pb-4 pt-[max(0.75rem,env(safe-area-inset-top))] shadow-sm shadow-violet-100/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-md flex-col gap-1">
          <p className="font-display text-center text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-indigo-500">
            {APP_NAME}
          </p>
          <p className="text-center font-display text-base font-semibold leading-snug text-stone-800 sm:text-lg">
            {APP_TAGLINE}
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-md flex-1 px-4 pb-28 pt-5">
        <Outlet />
      </main>

      <nav
        className="fixed bottom-4 left-0 right-0 z-20 px-3 pb-[max(0rem,env(safe-area-inset-bottom))]"
        aria-label="Main"
      >
        <div className="mx-auto flex max-w-md rounded-[1.35rem] border border-violet-100/80 bg-white/90 p-1.5 shadow-[0_12px_40px_-4px_rgba(99,102,241,0.18)] backdrop-blur-md">
          <NavLink
            to="/habits"
            className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
            end
          >
            <LeafIcon />
            Habits
          </NavLink>
          <NavLink to="/today" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
            <SunIcon />
            Today
          </NavLink>
          <NavLink to="/progress" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
            <ChartIcon />
            Progress
          </NavLink>
        </div>
      </nav>
    </div>
  )
}
