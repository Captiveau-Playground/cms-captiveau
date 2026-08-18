import { ArrowRight, Layers, Send, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"

const steps = [
  {
    n: "01",
    icon: Layers,
    title: "Pick a block",
    body: "Browse the catalog and copy the install command. Each block ships as a single .tsx file.",
  },
  {
    n: "02",
    icon: ShieldCheck,
    title: "Drop it in",
    body: "Run the shadcn CLI from your project root. Imports, primitives and styles install themselves.",
  },
  {
    n: "03",
    icon: Send,
    title: "Ship the page",
    body: "Swap the copy, drop your brand mark in, push to production. No surprises in dark mode.",
  },
]

export default function HowItWorks01() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            How it works
          </span>
          <h2
            className="text-balance font-medium tracking-[-0.04em]"
            style={{
              fontSize: "clamp(1.85rem, 4vw, 2.75rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
            }}
          >
            From catalog to live page in three steps
          </h2>
          <p className="max-w-md text-balance text-sm text-muted-foreground sm:text-base">
            No build pipeline to learn, no proprietary framework — just the
            shadcn CLI you already use.
          </p>
        </div>

        <ol className="mt-14 grid gap-6 sm:grid-cols-3">
          {steps.map((s) => (
            <li
              key={s.n}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm shadow-black/5 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-xl bg-foreground/5 text-foreground">
                  <s.icon className="size-5" />
                </span>
                <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {s.n}
                </span>
              </div>
              <h3 className="font-semibold text-lg tracking-tight">
                {s.title}
              </h3>
              <p className="text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex justify-center">
          <Button size="lg" className="rounded-full">
            Get started
            <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  )
}
