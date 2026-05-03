import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HabitsPage } from './features/habits/HabitsPage'
import { ProgressPage } from './features/progress/ProgressPage'
import { TodayPage } from './features/today/TodayPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/today" replace />} />
        <Route path="/habits" element={<HabitsPage />} />
        <Route path="/today" element={<TodayPage />} />
        <Route path="/progress" element={<ProgressPage />} />
      </Route>
    </Routes>
  )
}
