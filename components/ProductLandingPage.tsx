'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG } from '@/lib/emailjs'
import type { Product, Video } from '@/lib/products'

const STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT – Abuja','Gombe',
  'Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara',
  'Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau',
  'Rivers','Sokoto','Taraba','Yobe','Zamfara',
]

type Status = 'idle' | 'sending' | 'success' | 'error'

const isLocal = (id: string) => id.startsWith('/')
const isPlaceholder = (id: string) => id === 'REPLACE_WITH_YOUTUBE_ID'

/* ─────────────────────────────────────────
   PLAY OVERLAY COMPONENT
   - Local videos: shows a styled overlay, clicking reveals the <video> player
   - YouTube videos: shows thumbnail + overlay, clicking reveals iframe
   - Placeholders: shows "Coming Soon" state
   size: 'full' = full-width stacked | 'card' = 3-column grid card

   CHANGE 1: activeId + onPlay added so parent controls which video is playing.
   When a new video is played, the previous one stops automatically.
───────────────────────────────────────── */
function VideoPlayer({
  v,
  accent,
  size = 'card',
  activeId,
  onPlay,
}: {
  v: Video
  accent: string
  size?: 'full' | 'card'
  activeId: string | null
  onPlay: (id: string) => void
}) {
  const uniqueId = v.id + '_' + size
  const isPlaying = activeId === uniqueId
  const videoRef = useRef<HTMLVideoElement>(null)

  const cardHeight = size === 'full' ? '420px' : '220px'
  const playSize = size === 'full' ? '80px' : '56px'

  // Pause local video when another one becomes active
  useEffect(() => {
    if (!isPlaying && videoRef.current) {
      videoRef.current.pause()
    }
  }, [isPlaying])

  const handlePlay = useCallback(() => {
    onPlay(uniqueId)
    setTimeout(() => videoRef.current?.play(), 50)
  }, [onPlay, uniqueId])

  // ── Placeholder ──
  if (isPlaceholder(v.id)) {
    return (
      <div style={{ background: '#1a1a1a', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ height: cardHeight, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px', position: 'relative' }}>
          {/* Blurred bg effect */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, #1a2e1a 0%, #0a0a0a 100%)' }} />
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: playSize, height: playSize, borderRadius: '50%',
              background: 'rgba(46,204,64,0.15)',
              border: '2px solid rgba(46,204,64,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: 0, height: 0, borderTop: `${size === 'full' ? '14px' : '9px'} solid transparent`, borderBottom: `${size === 'full' ? '14px' : '9px'} solid transparent`, borderLeft: `${size === 'full' ? '22px' : '15px'} solid rgba(255,255,255,0.3)`, marginLeft: '4px' }} />
            </div>
            <p style={{ color: '#444', fontSize: size === 'full' ? '0.8rem' : '0.65rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Video Coming Soon
            </p>
          </div>
        </div>
        <div style={{ padding: size === 'full' ? '16px 20px' : '12px 14px', borderTop: '1px solid #222' }}>
          <p style={{ fontFamily: 'var(--font-condensed)', fontWeight: 700, color: '#fff', fontSize: size === 'full' ? '0.95rem' : '0.8rem', marginBottom: '4px' }}>{v.title}</p>
          <p style={{ fontSize: size === 'full' ? '0.75rem' : '0.65rem', color: accent, textTransform: 'uppercase', letterSpacing: '1px' }}>{v.person}</p>
        </div>
      </div>
    )
  }

  // ── Local .mp4 video ──
  if (isLocal(v.id)) {
    return (
      <div style={{ background: '#0d0d0d', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ position: 'relative', height: cardHeight }}>
          {/* Play overlay — hidden once playing */}
          {!isPlaying && (
            <div
              onClick={handlePlay}
              style={{
                position: 'absolute', inset: 0, zIndex: 2,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
              }}
            >
              {/* Outer ring pulse */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', inset: '-12px', borderRadius: '50%',
                  background: 'rgba(46,204,64,0.15)',
                  animation: 'ctaPulse 2s ease-in-out infinite',
                }} />
                {/* Play button */}
                <div style={{
                  width: playSize, height: playSize, borderRadius: '50%',
                  background: 'rgba(46,204,64,0.9)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 8px 32px rgba(46,204,64,0.4)',
                  transition: 'transform 0.2s',
                  position: 'relative', zIndex: 1,
                }}>
                  <div style={{
                    width: 0, height: 0,
                    borderTop: `${size === 'full' ? '16px' : '10px'} solid transparent`,
                    borderBottom: `${size === 'full' ? '16px' : '10px'} solid transparent`,
                    borderLeft: `${size === 'full' ? '26px' : '17px'} solid #fff`,
                    marginLeft: size === 'full' ? '6px' : '4px',
                  }} />
                </div>
              </div>
              {size === 'full' && (
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '20px', fontFamily: 'var(--font-condensed)', fontWeight: 700 }}>
                  TAP TO PLAY
                </p>
              )}
            </div>
          )}
          {/* Video element */}
          <video
            ref={videoRef}
            controls={isPlaying}
            preload="metadata"
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', background: '#000' }}
          >
            <source src={v.id} type="video/mp4" />
          </video>
        </div>
        <div style={{ padding: size === 'full' ? '16px 20px' : '12px 14px', borderTop: '1px solid #1a1a1a' }}>
          <p style={{ fontFamily: 'var(--font-condensed)', fontWeight: 700, color: '#fff', fontSize: size === 'full' ? '0.95rem' : '0.8rem', marginBottom: '4px' }}>{v.title}</p>
          <p style={{ fontSize: size === 'full' ? '0.75rem' : '0.65rem', color: accent, textTransform: 'uppercase', letterSpacing: '1px' }}>{v.person}</p>
        </div>
      </div>
    )
  }

  // ── YouTube video ──
  const thumbUrl = `https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`
  return (
    <div style={{ background: '#0d0d0d', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ position: 'relative', height: cardHeight }}>
        {!isPlaying ? (
          /* Thumbnail + overlay */
          <div
            onClick={() => onPlay(uniqueId)}
            style={{ position: 'absolute', inset: 0, cursor: 'pointer' }}
          >
            {/* YouTube thumbnail */}
            <Image src={thumbUrl} alt={v.title} fill style={{ objectFit: 'cover' }} sizes="(max-width:700px) 100vw, 33vw" />
            {/* Dark overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 100%)' }} />
            {/* Play button */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', inset: '-12px', borderRadius: '50%', background: 'rgba(46,204,64,0.15)', animation: 'ctaPulse 2s ease-in-out infinite' }} />
                <div style={{
                  width: playSize, height: playSize, borderRadius: '50%',
                  background: 'rgba(46,204,64,0.9)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 8px 32px rgba(46,204,64,0.5)',
                  position: 'relative', zIndex: 1,
                }}>
                  <div style={{
                    width: 0, height: 0,
                    borderTop: `${size === 'full' ? '16px' : '10px'} solid transparent`,
                    borderBottom: `${size === 'full' ? '16px' : '10px'} solid transparent`,
                    borderLeft: `${size === 'full' ? '26px' : '17px'} solid #fff`,
                    marginLeft: size === 'full' ? '6px' : '4px',
                  }} />
                </div>
              </div>
              {size === 'full' && (
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-condensed)', fontWeight: 700 }}>
                  TAP TO PLAY
                </p>
              )}
            </div>
          </div>
        ) : (
          /* Autoplay iframe */
          <iframe
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            src={`https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0`}
            title={v.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
      <div style={{ padding: size === 'full' ? '16px 20px' : '12px 14px', borderTop: '1px solid #1a1a1a' }}>
        <p style={{ fontFamily: 'var(--font-condensed)', fontWeight: 700, color: '#fff', fontSize: size === 'full' ? '0.95rem' : '0.8rem', marginBottom: '4px' }}>{v.title}</p>
        <p style={{ fontSize: size === 'full' ? '0.75rem' : '0.65rem', color: accent, textTransform: 'uppercase', letterSpacing: '1px' }}>{v.person}</p>
      </div>
    </div>
  )
}

export default function ProductLandingPage({ product }: { product: Product }) {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', phone: '', qty: '', address: '', state: '' })
  const containerRef = useRef<HTMLDivElement>(null)

  // CHANGE 1: single shared state — only one video plays at a time across the whole page
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const handleVideoPlay = useCallback((id: string) => setActiveVideo(id), [])

  useEffect(() => {
    const setup = () => {
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
        { threshold: 0.1 }
      )
      containerRef.current
        ?.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale,.fact-row')
        .forEach((el) => obs.observe(el))
      return () => obs.disconnect()
    }

    // Defer until browser is idle so it doesn't block LCP
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(setup)
      return () => cancelIdleCallback(id)
    } else {
      return setup()
    }
  }, [])

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const submit = async () => {
    if (!form.name || !form.phone || !form.qty || !form.address || !form.state) {
      alert('Please fill all required fields.')
      return
    }
    setStatus('sending')
    try {
      await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, {
        product: product.name, price: product.price,
        from_name: form.name, phone: form.phone,
        quantity: form.qty, address: form.address, state: form.state,
      }, EMAILJS_CONFIG.PUBLIC_KEY)
      setStatus('success')
      setForm({ name: '', phone: '', qty: '', address: '', state: '' })
    } catch { setStatus('error') }
  }

  const inp: React.CSSProperties = {
    width: '100%', background: '#2a2a2a', border: 'none', borderRadius: '6px',
    padding: '18px', color: '#ccc', fontFamily: 'var(--font-barlow)', fontSize: '0.95rem', outline: 'none',
  }

  const ac = product.accentColor

  return (
    <div ref={containerRef} style={{ background: '#000', color: '#fff', fontFamily: 'var(--font-barlow)', minHeight: '100vh' }}>

      {/* ══════════════════════════════════════
          1. HERO
          Fields: heroHeadline, heroTagline, heroCtaLabel, price, image, accentColor
      ══════════════════════════════════════ */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '460px' }} className="hero-section">
        <div style={{ background: '#0d0d0d', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 className="hero-text-anim" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 4vw, 3.8rem)', lineHeight: 1.05, color: '#fff', marginBottom: '20px' }}>
            {product.heroHeadline.split(product.name).map((part, i, arr) => (
              <span key={i}>{part}{i < arr.length - 1 && <span style={{ fontSize: 'clamp(3.5rem, 4vw, 3.8rem)', color: ac }}>{product.name}</span>}</span>
            ))}
          </h1>
          <p className="hero-text-anim" style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#ccc', maxWidth: '380px', marginBottom: '12px', fontWeight: 600 }}>
            {product.heroTagline}
          </p>
          <p className="hero-text-anim" style={{ fontSize: '2.2rem', fontWeight: 700, color: ac, marginBottom: '28px', fontFamily: 'var(--font-bebas)', letterSpacing: '2px' }}>
            {product.price}
          </p>
          <a href="#order" className="hero-text-anim" style={{ display: 'inline-block', border: '2px solid #fff', color: ac, background: 'transparent', fontFamily: 'var(--font-condensed)', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '14px 36px', textDecoration: 'none', alignSelf: 'flex-start' }}>
            {product.heroCtaLabel}
          </a>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #1a5c1a 0%, #2ecc40 60%, #1a8c1a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '460px', overflow: 'hidden', padding: '24px', position: 'relative' }}>
          <div style={{ position: 'absolute', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
          <div className="hero-img-anim" style={{ position: 'relative', width: '100%', height: '420px' }}>
            <Image src={product.image} alt={product.name} fill style={{ objectFit: 'contain' }} priority sizes="50vw" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. NUMBERS DON'T LIE
          Fields: facts1, orangeBannerText, facts2, yellowButtonText
      ══════════════════════════════════════ */}
      <section style={{ background: '#111', padding: '56px 32px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#fff', textAlign: 'center', letterSpacing: '4px', marginBottom: '36px' }}>
            NUMBERS DON&apos;T LIE
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginBottom: '32px' }}>
            {product.facts1.map((fact, i) => (
              <div key={i} className={`fact-row delay-${(i % 5) + 1}`} style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                <span className="bullet-ping" style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#2ecc40', flexShrink: 0, marginTop: '5px', display: 'inline-block', position: 'relative' }} />
                <p style={{ fontSize: '0.9rem', fontWeight: 700, lineHeight: 1.6, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.3px' }}>{fact}</p>
              </div>
            ))}
          </div>
          <div className="reveal orange-shimmer" style={{ padding: '18px 32px', textAlign: 'center', marginBottom: '32px' }}>
            <p style={{ fontFamily: 'var(--font-condensed)', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#fff' }}>
              {product.orangeBannerText}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginBottom: '28px' }}>
            {product.facts2.map((fact, i) => (
              <div key={i} className={`fact-row delay-${(i % 5) + 1}`} style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                <span className="bullet-ping" style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#2ecc40', flexShrink: 0, marginTop: '5px', display: 'inline-block', position: 'relative' }} />
                <p style={{ fontSize: '0.9rem', fontWeight: 700, lineHeight: 1.6, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.3px' }}>{fact}</p>
              </div>
            ))}
          </div>
          <p className="reveal" style={{ display: 'block', background: '#c8c800', color: '#111', fontFamily: 'var(--font-condensed)', fontSize: '1rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '18px', textAlign: 'center' }}>
            {product.yellowButtonText}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. STORY
          Fields: BannerText, aboutStory
      ══════════════════════════════════════ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="reveal" style={{ padding: '16px 32px', background: '#2ecc40' }}>
          <p style={{ fontFamily: 'var(--font-condensed)', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#fff', textAlign: 'center' }}>
            {product.BannerText}
          </p>
        </div>
        <div style={{ padding: '56px 48px', maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {product.aboutStory.map((para, i) => (
              <p key={i} className={`reveal delay-${(i % 4) + 1}`} style={{
                fontSize: '0.95rem', lineHeight: 1.9,
                color: para.startsWith('"') ? '#fff' : '#ccc',
                fontStyle: para.startsWith('"') ? 'italic' : 'normal',
              }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. TESTIMONIALS
          Fields: testimonials
      ══════════════════════════════════════ */}
      <section style={{ background: '#000', padding: '56px 32px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <h2 className="reveal" style={{ textAlign: 'center', fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: '#fff', marginBottom: '32px' }}>
            TESTIM<em style={{ color: ac, fontStyle: 'normal' }}>onials</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="t-grid">
            {product.testimonials.map((t, i) => (
              <div key={i} className={`tcard reveal delay-${(i % 4) + 1}`} style={{ background: '#1a1a1a', borderRadius: '8px', padding: '24px 20px' }}>
                <div style={{ marginBottom: '10px' }}>
                  {[...Array(5)].map((_, si) => <span key={si} style={{ color: '#f5c518', fontSize: '0.75rem' }}>★</span>)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#2a2a2a', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', color: ac, fontWeight: 700, border: `2px solid ${ac}33` }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-condensed)', fontWeight: 700, color: '#fff', fontSize: '0.82rem' }}>{t.name}</div>
                    <div style={{ fontSize: '0.65rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>{t.location}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', fontFamily: 'Georgia, serif', fontSize: '3.5rem', color: `${ac}22`, lineHeight: 0.8, alignSelf: 'flex-start' }}>&ldquo;</div>
                </div>
                <p style={{ fontSize: '0.82rem', lineHeight: 1.7, color: '#bbb' }}>{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GREEN CTA 1 ══ */}
      <a href="#order" style={{ display: 'block', background: '#2ecc40', padding: '26px 20px', textAlign: 'center', textDecoration: 'none' }}>
        <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', color: '#fff', letterSpacing: '4px' }}>
          CLICK HERE TO PLACE AN ORDER
        </span>
      </a>

      {/* ══════════════════════════════════════
          5. FOLLOW OUR TESTIFIERS — full-width stacked videos
          Fields: videos
      ══════════════════════════════════════ */}
      <section style={{ background: '#000', padding: '48px 32px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#fff', letterSpacing: '2px', marginBottom: '4px' }}>
            FOLLOW OUR <span style={{ color: ac }}>TESTIFIERS</span> STORY
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {product.videos.map((v, i) => (
              <div key={i} className="reveal">
                {/* CHANGE 1 applied: pass activeVideo + handleVideoPlay */}
                <VideoPlayer v={v} accent={ac} size="full" activeId={activeVideo} onPlay={handleVideoPlay} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. SO WHAT WILL YOU DO
          Fields: soWhatText
      ══════════════════════════════════════ */}
      <section style={{ background: '#000', padding: '56px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 className="reveal-scale" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', color: '#fff', lineHeight: 1.05, letterSpacing: '2px' }}>
            {product.soWhatText.split(product.name).map((part, i, arr) => (
              <span key={i}>{part}{i < arr.length - 1 && <span style={{ color: ac }}>{product.name}</span>}</span>
            ))}
          </h2>
        </div>
      </section>

      {/* ══════════════════════════════════════
          7. HEALTH PRACTITIONERS — 3-column video grid
          Fields: practitionersLabel, practitionerVideos
      ══════════════════════════════════════ */}
      <section style={{ background: '#0a0a0a', padding: '56px 32px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div className="reveal" style={{ border: '2px solid #2ecc40', padding: '18px 24px', textAlign: 'center', marginBottom: '8px' }}>
            <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', color: '#fff', letterSpacing: '2px' }}>
              {product.practitionersLabel}
            </span>
          </div>
          <p style={{ fontSize: '0.7rem', color: '#444', textAlign: 'center', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>
            HEALTH PRACTITIONERS ↓
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="vid-grid">
            {product.practitionerVideos.map((v, i) => (
              <div key={i} className={`reveal delay-${i + 1}`}>
                {/* CHANGE 1 applied: pass activeVideo + handleVideoPlay */}
                <VideoPlayer v={v} accent={ac} size="card" activeId={activeVideo} onPlay={handleVideoPlay} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GREEN CTA 2 ══ */}
      <a href="#order" style={{ display: 'block', background: '#2ecc40', padding: '26px 20px', textAlign: 'center', textDecoration: 'none' }}>
        <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', color: '#fff', letterSpacing: '4px' }}>
          CLICK HERE TO PLACE AN ORDER
        </span>
      </a>

      {/* ══════════════════════════════════════
          8. STATS + TRUST BADGES
          Fields: statHeadline, statSubline, trustBadges, finalTagline
      ══════════════════════════════════════ */}
      <section style={{ background: '#000', padding: '56px 32px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: '#fff', lineHeight: 1.1, marginBottom: '16px', textAlign: 'center' }}>
            {product.statHeadline}
          </h2>
          <p className="reveal" style={{ fontSize: '0.95rem', color: '#aaa', textAlign: 'center', marginBottom: '40px' }}>
            {product.statSubline}
          </p>
          <div className="reveal" style={{ background: '#111', borderRadius: '8px', padding: '32px 36px', marginBottom: '32px' }}>
            <p style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: ac, marginBottom: '20px' }}>
              Trust Badges:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {product.trustBadges.map((badge, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: '#ddd' }}>
                  <span style={{ color: ac, fontWeight: 700, fontSize: '1.2rem' }}>·</span>
                  {badge}
                </div>
              ))}
            </div>
          </div>
          <p className="reveal" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#fff', textAlign: 'center', letterSpacing: '2px' }}>
            {product.finalTagline}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          9. FOOTER TAGLINE
          Fields: footerTagline
      ══════════════════════════════════════ */}
      <div style={{ background: '#000', padding: '14px 20px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#555' }}>
          {product.footerTagline}
        </p>
      </div>

      {/* ══════════════════════════════════════
          10. ORDER FORM
          Fields: name, price, image, whatsapp, callNumber
      ══════════════════════════════════════ */}
      <section id="order" style={{ background: '#000', padding: '40px 32px 64px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#fff', letterSpacing: '3px', textAlign: 'center', marginBottom: '28px' }}>
            FILL THE FORM BELOW TO PLACE ORDER
          </h2>
          <div className="reveal" style={{ background: 'linear-gradient(135deg, #1a6e1a 0%, #2ecc40 60%, #1a9a1a 100%)', borderRadius: '16px', padding: '36px 40px' }}>
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.2rem', color: '#fff', letterSpacing: '2px', marginBottom: '12px' }}>ORDER RECEIVED!</div>
                <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: '20px' }}>Thank you! We will contact you within 24 hours to confirm your delivery.</p>
                <button onClick={() => setStatus('idle')} style={{ background: '#fff', color: '#1a6e1a', border: 'none', borderRadius: '30px', fontFamily: 'var(--font-condensed)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '12px 28px', cursor: 'pointer' }}>
                  PLACE ANOTHER ORDER
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'start' }} className="form-layout">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input style={inp} name="name" placeholder="Name" value={form.name} onChange={handle} />
                  <input style={inp} name="phone" placeholder="Phone Number:" value={form.phone} onChange={handle} />
                  <input style={inp} name="qty" placeholder="Number of Products (e.g. 2)" value={form.qty} onChange={handle} type="text" inputMode="numeric" />
                  <input style={inp} name="address" placeholder="Delivery Address:" value={form.address} onChange={handle} />
                  <select style={{ ...inp, color: form.state ? '#ccc' : '#888' }} name="state" value={form.state} onChange={handle}>
                    <option value="" disabled>State:</option>
                    {STATES.map(s => <option key={s} value={s} style={{ background: '#2a2a2a' }}>{s}</option>)}
                  </select>
                  {status === 'error' && <p style={{ color: '#ffcccc', fontSize: '0.8rem' }}>Something went wrong. Please try via WhatsApp.</p>}
                  <button onClick={submit} disabled={status === 'sending'} style={{ background: '#fff', color: '#1a6e1a', border: 'none', borderRadius: '30px', padding: '16px', fontFamily: 'var(--font-condensed)', fontSize: '1rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', cursor: status === 'sending' ? 'not-allowed' : 'pointer', marginTop: '4px' }}>
                    {status === 'sending' ? 'SENDING...' : 'SUBMIT'}
                  </button>
                  <a href={`https://wa.me/${product.whatsapp}?text=Hello%2C%20I%20want%20to%20order%20${encodeURIComponent(product.name)}%20(${encodeURIComponent(product.price)})`} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', background: '#128c7e', color: '#fff', fontFamily: 'var(--font-condensed)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '14px', textDecoration: 'none', borderRadius: '6px' }}>
                    OR ORDER VIA WHATSAPP
                  </a>
                  {/* CHANGE 2: Call number button */}
                  <a href={`tel:${product.callNumber}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '6px', padding: '14px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '1rem', fontWeight: 700, letterSpacing: '2px', color: '#fff', textTransform: 'uppercase' }}>
                      CALL US: {product.callNumber}
                    </span>
                  </a>
                </div>
                <div className="form-divider" style={{ width: '1px', background: 'rgba(255,255,255,0.4)', alignSelf: 'stretch', margin: '0 32px' }} />
                <div className="form-img" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ position: 'relative', width: '100%', maxWidth: '340px', height: '360px' }}>
                    <Image src={product.image} alt={product.name} fill style={{ objectFit: 'contain' }} sizes="30vw" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══ SITE FOOTER ══ */}
      <div style={{ background: '#0a0a0a', borderTop: '1px solid #111', padding: '18px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ position: 'relative', width: '110px', height: '34px' }}>
          <Image src="/images/logo.png" alt="Faforlife" fill style={{ objectFit: 'contain', objectPosition: 'left' }} sizes="110px" />
        </div>
        <span style={{ fontSize: '0.7rem', color: '#333' }}>© {new Date().getFullYear()} Faforlife · www.faforlifeproductsale.online</span>
      </div>

      {/* ══ RESPONSIVE ══ */}
      <style>{`
        @media (max-width: 700px) {
          .hero-section  { grid-template-columns: 1fr !important; }
          .t-grid        { grid-template-columns: 1fr !important; }
          .vid-grid      { grid-template-columns: 1fr !important; }
          .form-layout   { grid-template-columns: 1fr !important; }
          .form-divider  { display: none !important; }
          .form-img      { margin-top: 48px !important; }
        }
      `}</style>

    </div>
  )
}
