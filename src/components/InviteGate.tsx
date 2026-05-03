import { type ReactNode, useState } from 'react'
import { APP_NAME } from '../branding'

const STORAGE_KEY = 'lumina_invite_ok'

/**
 * Optional first screen: set `VITE_INVITE_CODE` in the host’s env at build time
 * (e.g. Vercel → Project → Settings → Environment Variables). Not in git.
 *
 * This is casual privacy (stops people who only guess the URL). The value ships
 * in the JS bundle — do not use for real secrets.
 */
function readExpected(): string | undefined {
  const v = import.meta.env.VITE_INVITE_CODE
  if (typeof v !== 'string') return undefined
  const t = v.trim()
  return t.length > 0 ? t : undefined
}

export function InviteGate({ children }: { children: ReactNode }) {
  const expected = readExpected()
  const [unlocked, setUnlocked] = useState(() => {
    if (!expected) return true
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  })
  const [value, setValue] = useState('')
  const [err, setErr] = useState(false)

  if (!expected || unlocked) {
    return <>{children}</>
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (value.trim() === expected) {
      sessionStorage.setItem(STORAGE_KEY, '1')
      setUnlocked(true)
      setErr(false)
      return
    }
    setErr(true)
    setValue('')
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-gradient-to-b from-violet-50 via-indigo-50/40 to-amber-50/50 px-4">
      <div className="w-full max-w-sm rounded-3xl border border-violet-100 bg-white/95 p-6 shadow-lg shadow-indigo-100/40">
        <p className="text-center font-display text-lg font-bold text-stone-900">{APP_NAME}</p>
        <p className="mt-2 text-center text-sm text-stone-600">
          Enter the invite phrase you were given. This page is not listed publicly.
        </p>
        <form className="mt-5 flex flex-col gap-3" onSubmit={submit}>
          <input
            type="password"
            autoComplete="off"
            className="rounded-2xl border border-violet-100 bg-violet-50/30 px-4 py-3 text-stone-800 outline-none ring-indigo-200 focus:ring-2"
            placeholder="Invite phrase"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              setErr(false)
            }}
          />
          {err ? <p className="text-center text-sm font-medium text-amber-800">That does not match. Try again.</p> : null}
          <button
            type="submit"
            className="rounded-2xl bg-indigo-600 py-3 font-display font-bold text-white shadow-md shadow-indigo-200/50"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}
