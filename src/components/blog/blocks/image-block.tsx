import Image from 'next/image'

export interface ImageBlockProps {
  src: string
  alt: string
  caption?: string
  credit?: string
  ratio?: '16/9' | '4/3' | '1/1' | '21/9'
}

const RATIO_MAP = {
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
  '21/9': 'aspect-[21/9]',
} as const

const DIMS_MAP = {
  '16/9': { width: 1600, height: 900 },
  '4/3': { width: 1600, height: 1200 },
  '1/1': { width: 1200, height: 1200 },
  '21/9': { width: 1600, height: 685 },
} as const

export function ImageBlock({ src, alt, caption, credit, ratio = '16/9' }: ImageBlockProps) {
  const dims = DIMS_MAP[ratio]
  return (
    <figure className="my-10">
      <div className={`relative overflow-hidden rounded-2xl shadow-soft ${RATIO_MAP[ratio]}`}>
        <Image
          src={src}
          alt={alt}
          width={dims.width}
          height={dims.height}
          sizes="(min-width: 1024px) 880px, 100vw"
          className="h-full w-full object-cover"
        />
      </div>
      {(caption || credit) && (
        <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-xs">
          {caption && <span className="italic text-charcoal-500">{caption}</span>}
          {credit && (
            <span className="ml-auto font-bold uppercase tracking-wider text-charcoal-500">
              © {credit}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  )
}
