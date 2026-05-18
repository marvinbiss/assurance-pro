/**
 * HeroBackground — fond hero premium (Luke Premium Workflow spec).
 *
 * Priorité MP4 video > mesh shader gradient fallback.
 *
 * Pour ajouter une vidéo hero:
 * 1. Générer image hero via Google AI Studio (Nano Banana 2, gratuit) — aspect 16:9, 5sec loop.
 * 2. Animer image → vidéo via Kling AI (klingai.com, ~$1 en crédits).
 * 3. Compresser MP4 sous 2 MB via ezgif.com.
 * 4. Sauvegarder sous `public/hero.mp4`.
 * 5. Le composant détecte automatiquement le fichier.
 *
 * Overlay 30% dark obligatoire pour lisibilité texte (Luke rule).
 */

interface Props {
  /** Chemin vers MP4 hero (ex: '/hero.mp4'). Si null, mesh shader fallback. */
  videoSrc?: string | null
  /** Opacité overlay dark (0-1). Default 0.35 = Luke spec 25-35%. */
  overlayOpacity?: number
}

export function HeroBackground({ videoSrc = null, overlayOpacity = 0.35 }: Props) {
  return (
    <>
      {videoSrc ? (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            poster="/hero-poster.jpg"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-charcoal-950"
            style={{ opacity: overlayOpacity }}
          />
        </>
      ) : (
        <>
          {/* Fallback mesh shader gradient — GPU only */}
          <div className="mesh-shader absolute inset-0 opacity-90" aria-hidden="true" />

          {/* Radial blobs decoratifs */}
          <div
            className="pointer-events-none absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full bg-secondary-500/30 blur-[140px]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-primary-400/30 blur-[120px]"
            aria-hidden="true"
          />

          {/* Hero pattern subtle */}
          <div className="absolute inset-0 bg-hero-pattern opacity-30" aria-hidden="true" />
        </>
      )}
    </>
  )
}
