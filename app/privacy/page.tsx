import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How SkinLogic handles your data. Short version: we collect as little as possible, and we never store your skin images or analysis results.',
}

export default function PrivacyPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12 prose prose-gray prose-sm">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: June 2026</p>

      <p className="text-gray-700 leading-relaxed">
        The short version: we collect as little as we possibly can, and the
        tools that touch your skin data don’t store any of it. This page
        explains exactly what that means in plain English.
      </p>

      <Section title="Educational tools (free)">
        <p>
          Our ingredient explainer, sunscreen guide, app &amp; scanner
          comparison, and other reading content don’t require an account and
          don’t collect personal information.
        </p>
        <p>
          The Skin Profile Educator sends the answers you type to an AI model to
          generate your educational profile, then discards them. We don’t log
          your answers, your results, or your IP address in connection with that
          tool. Gender and ethnicity are optional and are used only to make the
          research translation more accurate.
        </p>
      </Section>

      <Section title="Paid AI Skin Analysis — zero data retention">
        <p>
          This is the only tool with a payment. It is built so that we never
          hold your skin data:
        </p>
        <ul>
          <li>
            <strong>Your image and your result are never stored.</strong> Your
            photo is sent straight to the AI model and your analysis is returned
            to your browser. Neither is ever written to a database, a log file,
            a storage bucket, or any file system. They exist only in server
            memory for the few seconds the analysis takes, and then they’re
            gone.
          </li>
          <li>
            <strong>No account, no email.</strong> Checkout is guest-only. We
            don’t ask you to register, and we don’t capture your email unless you
            explicitly choose to have your result emailed — and even then, that
            email is not stored after delivery.
          </li>
          <li>
            <strong>Payments.</strong> Stripe processes your payment. We never
            see or touch your card details. Stripe keeps only what it’s legally
            required to keep for the transaction on their side.
          </li>
          <li>
            <strong>What we keep.</strong> For each purchase we store an
            anonymous transaction record — a transaction id, timestamp, amount,
            the Stripe payment reference (so we can issue refunds), a hashed
            one-time access token, whether the analysis succeeded, and the
            number of AI tokens used (so we can monitor cost). That’s the
            complete list. No images. No results. No profile answers. No IP
            address. No device fingerprint.
          </li>
        </ul>
        <p>
          Because we don’t collect this personal data, there is nothing to leak:
          we cannot be breached for skin-analysis data we never stored. This is
          also how we stay compliant with GDPR and CCPA by design.
        </p>
      </Section>

      <Section title="Your rights">
        <p>
          Under GDPR and CCPA you have rights to access, correct, and delete
          personal data a company holds about you. For the skin tools, there is
          effectively nothing to delete because we don’t keep your inputs or
          outputs. For a payment, you can ask us to look up a transaction by its
          Stripe reference and issue a refund. Contact us and we’ll help.
        </p>
      </Section>

      <Section title="Changes to this policy">
        <p>
          If we change how we handle data, we’ll update this page and the “last
          updated” date above. Material changes to the paid tool’s zero-retention
          model would be called out clearly before you pay.
        </p>
      </Section>

      <p className="text-gray-500 leading-relaxed mt-8 border-t border-gray-100 pt-6">
        Questions about your data? Reach out and we’ll answer in plain English.
      </p>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
        {title}
      </h2>
      <div className="space-y-3 text-gray-700 leading-relaxed">{children}</div>
    </section>
  )
}
