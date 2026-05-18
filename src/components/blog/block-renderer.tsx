import type { BlogBlock } from '@/lib/data/blog-blocks'

import { AccordionFAQ } from './blocks/accordion-faq'
import { AuthorBio } from './blocks/author-bio'
import { CalloutBlock } from './blocks/callout-block'
import { ComparisonTable } from './blocks/comparison-table'
import { ExpertQuote } from './blocks/expert-quote'
import { ImageBlock } from './blocks/image-block'
import { KeyFiguresGrid } from './blocks/key-figures-grid'
import { KeyTakeaways } from './blocks/key-takeaways'
import { ListBlock } from './blocks/list-block'
import { ProseBlock } from './blocks/prose-block'
import { PullQuote } from './blocks/pull-quote'
import { StatBlock } from './blocks/stat-block'
import { StepperBlock } from './blocks/stepper-block'
import { TimelineBlock } from './blocks/timeline-block'

/**
 * Server component renderer for blog content blocks.
 * Maps each BlogBlock variant to its presentational component.
 * Exhaustive switch — TS compile-time check via `_exhaustive: never`.
 */
export function BlockRenderer({ block }: { block: BlogBlock }) {
  switch (block.kind) {
    case 'prose':
      return <ProseBlock text={block.text} />
    case 'lead':
      return (
        <p className="my-6 text-xl font-medium leading-relaxed text-charcoal-800">{block.text}</p>
      )
    case 'list':
      return <ListBlock ordered={block.ordered} variant={block.variant} items={block.items} />
    case 'callout':
      return <CalloutBlock tone={block.tone} title={block.title} text={block.text} />
    case 'stat':
      return (
        <StatBlock
          value={block.value}
          label={block.label}
          trend={block.trend}
          trendValue={block.trendValue}
          source={block.source}
        />
      )
    case 'keyFigures':
      return <KeyFiguresGrid items={block.items} />
    case 'pullQuote':
      return (
        <PullQuote text={block.text} attribution={block.attribution} sourceUrl={block.sourceUrl} />
      )
    case 'comparison':
      return (
        <ComparisonTable
          columns={block.columns}
          rows={block.rows}
          emphasizeCol={block.emphasizeCol}
        />
      )
    case 'image':
      return (
        <ImageBlock
          src={block.src}
          alt={block.alt}
          caption={block.caption}
          credit={block.credit}
          ratio={block.ratio}
        />
      )
    case 'timeline':
      return <TimelineBlock steps={block.steps} />
    case 'stepper':
      return <StepperBlock steps={block.steps} />
    case 'keyTakeaways':
      return <KeyTakeaways points={block.points} />
    case 'accordion':
      return <AccordionFAQ items={block.items} />
    case 'expertQuote':
      return (
        <ExpertQuote
          expertName={block.expertName}
          expertRole={block.expertRole}
          expertAvatar={block.expertAvatar}
          quote={block.quote}
        />
      )
    default: {
      const _exhaustive: never = block
      return _exhaustive
    }
  }
}

// Re-export AuthorBio so consumers can render the author footer next to blocks.
export { AuthorBio }
