'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { StarIcon, CheckCircleIcon } from 'lucide-react'

export type PricingPlan = {
  name: string
  info: string
  price: string
  features: string[]
  btn: { text: string; href: string }
  highlighted?: boolean
}

/**
 * Pricing section (adapted from @efferd/pricing-4) — single price per plan,
 * no monthly/yearly toggle. Plans come from the CMS service pricing data.
 */
export function PricingSection({
  plans,
  title = 'Plans that Scale with You',
  description = 'Transparan, tanpa biaya tersembunyi. Pilih paket yang sesuai kebutuhan bisnis Anda.',
}: {
  plans: PricingPlan[]
  title?: string
  description?: string
}) {
  if (!plans.length) return null

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-7 p-4">
      <div className="mx-auto max-w-xl space-y-2">
        <h2 className="text-center text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
          {title}
        </h2>
        <p className="text-center text-sm text-muted-foreground md:text-base">
          {description}
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard key={plan.name} plan={plan} />
        ))}
      </div>
    </div>
  )
}

export function PricingCard({
  plan,
  className,
}: React.ComponentProps<'div'> & { plan: PricingPlan }) {
  return (
    <div
      className={cn(
        'relative flex w-full flex-col overflow-hidden rounded-lg border shadow-xs',
        plan.highlighted && 'scale-105',
        className
      )}
    >
      <div className={cn('border-b p-4', plan.highlighted && 'bg-card dark:bg-card/80')}>
        {plan.highlighted && (
          <span className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-md border bg-background px-2 py-0.5 text-xs">
            <StarIcon className="size-3 fill-current" />
            Popular
          </span>
        )}
        <div className="text-lg font-medium">{plan.name}</div>
        <p className="text-sm font-normal text-muted-foreground">{plan.info}</p>
        <div className="mb-1 mt-6 flex w-max items-end gap-1">
          <span className="text-3xl font-extrabold tracking-tight">{plan.price}</span>
        </div>
      </div>
      <div
        className={cn(
          'space-y-3 px-4 pb-8 pt-6 text-sm text-muted-foreground',
          plan.highlighted && 'bg-muted/10'
        )}
      >
        {plan.features.map((feature) => (
          <div className="flex items-center gap-2" key={feature}>
            <CheckCircleIcon className="size-3.5 text-foreground" />
            <p>{feature}</p>
          </div>
        ))}
      </div>
      <div
        className={cn(
          'mt-auto w-full border-t p-3',
          plan.highlighted && 'bg-card dark:bg-card/80'
        )}
      >
        <Button asChild className="w-full" variant={plan.highlighted ? 'default' : 'outline'}>
          <Link href={plan.btn.href}>{plan.btn.text}</Link>
        </Button>
      </div>
    </div>
  )
}