import { DailyTip } from '@/components/learn/DailyTip'
import { SkinJourney } from '@/components/home/SkinJourney'

export default function HomePage() {
  return (
    <main>
      <SkinJourney />

      {/* Daily tip sits after the journey, before the footer */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <DailyTip />
      </section>
    </main>
  )
}
