import { useEffect, useMemo, useRef, useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  Award,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  Crown,
  Gem,
  Camera,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Users,
  X,
} from 'lucide-react'
import './App.css'

const heroImage =
  'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=2200&q=90'
const clinicImage =
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=85'

const services = [
  {
    id: 'hydrafacial',
    category: 'Face Treatments',
    title: 'Signature Hydrafacial',
    description: 'Deep cleansing, exfoliation, extraction, and infusion for polished, luminous skin.',
    benefits: ['Immediate glow', 'Refined pores', 'Hydration boost'],
    duration: '60 min',
    price: '$190',
    results: 'Visible radiance after one session',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'microneedling',
    category: 'Face Treatments',
    title: 'Collagen Microneedling',
    description: 'Controlled collagen induction to soften texture, fine lines, and acne marks.',
    benefits: ['Smoother texture', 'Collagen renewal', 'Scar refinement'],
    duration: '75 min',
    price: '$260',
    results: 'Best in a series of three',
    image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'chemical-peel',
    category: 'Face Treatments',
    title: 'Parisian Chemical Peel',
    description: 'A tailored peel protocol for clarity, pigmentation support, and silky renewal.',
    benefits: ['Brighter tone', 'Reduced congestion', 'Soft resurfacing'],
    duration: '45 min',
    price: '$150',
    results: 'Fresh skin in 5-7 days',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'deep-cleaning',
    category: 'Face Treatments',
    title: 'Deep Cleaning Ritual',
    description: 'A clinical facial with expert extractions, soothing masks, and barrier recovery.',
    benefits: ['Clearer skin', 'Calmed redness', 'Balanced oil'],
    duration: '70 min',
    price: '$135',
    results: 'Clean, calm complexion',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'anti-aging',
    category: 'Face Treatments',
    title: 'Anti-Aging Couture',
    description: 'A sculpting facial with lifting massage, actives, and LED rejuvenation.',
    benefits: ['Lifted appearance', 'Plumper skin', 'Softened lines'],
    duration: '90 min',
    price: '$310',
    results: 'Elegant lift and luminosity',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'cryolipolysis',
    category: 'Body Treatments',
    title: 'Cryolipolysis Contour',
    description: 'Non-invasive cooling treatment for targeted body contouring.',
    benefits: ['No downtime', 'Targeted sculpting', 'Comfort protocol'],
    duration: '80 min',
    price: '$390',
    results: 'Progressive results over 8-12 weeks',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'slimming',
    category: 'Body Treatments',
    title: 'Slimming Treatment',
    description: 'A toning protocol combining lymphatic technique and advanced body care.',
    benefits: ['Improved tone', 'Smoother feel', 'Lymphatic support'],
    duration: '60 min',
    price: '$170',
    results: 'Best weekly for one month',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'body-sculpting',
    category: 'Body Treatments',
    title: 'Body Sculpting Suite',
    description: 'Premium contouring sessions personalized to silhouette goals.',
    benefits: ['Custom plan', 'Firming effect', 'Progress tracking'],
    duration: '75 min',
    price: '$240',
    results: 'Visible refinement with consistency',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'mesotherapy',
    category: 'Aesthetic Treatments',
    title: 'Mesotherapy Glow',
    description: 'Micro-infusion of skin-loving actives for glow, hydration, and bounce.',
    benefits: ['Dewy finish', 'Hydration', 'Refreshed texture'],
    duration: '50 min',
    price: '$220',
    results: 'Fresh glow within days',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'skin-rejuvenation',
    category: 'Aesthetic Treatments',
    title: 'Skin Rejuvenation',
    description: 'An advanced protocol pairing LED, actives, and restorative finishing care.',
    benefits: ['Even radiance', 'Barrier support', 'Fine-line care'],
    duration: '65 min',
    price: '$210',
    results: 'Soft, rested-looking skin',
    image: 'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'beauty-treatments',
    category: 'Aesthetic Treatments',
    title: 'Luxury Beauty Treatments',
    description: 'Brows, lashes, hands, and finishing details delivered with haute precision.',
    benefits: ['Polished finish', 'Expert detail', 'Event ready'],
    duration: '45 min',
    price: '$95',
    results: 'Instantly refined look',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=85',
  },
]

const specialists = ['Dr. Claire Moreau', 'Amelie Laurent', 'Sofia Renard', 'Nadia Bellamy']
const slots = ['09:30', '10:45', '12:00', '14:15', '15:30', '17:00']

const products = [
  ['Rose Quartz Recovery Serum', 'Skincare', '$88', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=85'],
  ['Velvet Barrier Cream', 'Skincare', '$74', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85'],
  ['Gold Radiance Mask', 'Masks', '$64', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85'],
  ['Silk Body Oil', 'Body', '$92', 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85'],
  ['Pearl Cleansing Balm', 'Cleansers', '$58', 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=900&q=85'],
  ['Lumiere Eye Elixir', 'Skincare', '$96', 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=85'],
]

const team = [
  ['Dr. Claire Moreau', 'Medical Aesthetic Director', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=85'],
  ['Amelie Laurent', 'Senior Skin Therapist', 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=900&q=85'],
  ['Sofia Renard', 'Body Contouring Expert', 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=85'],
]

const reviews = [
  ['A discreet, serene experience with results that looked expensive but never overdone.', 'Isabelle D.', 'Executive client'],
  ['The booking flow was effortless and the clinic felt immaculate. My skin looked lit from within.', 'Camille R.', 'Hydrafacial guest'],
  ['Trustworthy, refined, and incredibly personal. I finally found my beauty address.', 'Marion V.', 'Membership client'],
]

const posts = [
  ['How to Prepare for Your First Hydrafacial', 'Beauty Tips', 'A refined pre-treatment routine for the best glow.', 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=85'],
  ['The Modern Guide to Collagen Care', 'Aesthetic News', 'What premium clients should know about texture and renewal.', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=85'],
  ['Winter Skin in Paris: Barrier First', 'Skincare', 'Creams, peels, and rituals that keep skin calm.', 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85'],
]

const socialLinks = {
  facebook: 'https://www.facebook.com/maisonelara',
  instagram: 'https://www.instagram.com/maisonelara',
  whatsapp: 'https://wa.me/12125550188?text=Bonjour%20Maison%20Elara%2C%20I%20would%20like%20to%20book%20an%20appointment.',
}

const apiBase = import.meta.env.VITE_API_URL || 'http://127.0.0.1:4000'
const productCatalog = products.map(([name, category, price, image]) => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  name,
  category,
  price,
  image,
}))
const postCatalog = posts.map(([title, category, excerpt, image]) => ({
  slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  title,
  category,
  excerpt,
  image,
  body: `${excerpt} Maison Elara recommends a calm consultation, precise preparation, and a refined aftercare ritual tailored to your skin.`,
}))

const storeKeys = {
  cart: 'maison-elara-cart',
  bookings: 'maison-elara-bookings',
  contacts: 'maison-elara-contacts',
  subscribers: 'maison-elara-subscribers',
  orders: 'maison-elara-orders',
  admin: 'maison-elara-admin-records',
}

function readStore(key, fallback = []) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback
  } catch {
    return fallback
  }
}

function writeStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
  window.dispatchEvent(new Event('maison-elara-store'))
}

function appendStore(key, item) {
  const saved = { ...item, id: item.id || crypto.randomUUID(), createdAt: new Date().toISOString() }
  writeStore(key, [...readStore(key), saved])
  return saved
}

function useStoredCount(key) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const sync = () => setCount(readStore(key).reduce((total, item) => total + (item.quantity || 1), 0))
    sync()
    window.addEventListener('maison-elara-store', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('maison-elara-store', sync)
      window.removeEventListener('storage', sync)
    }
  }, [key])
  return count
}

async function postJson(path, payload) {
  const response = await fetch(`${apiBase}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error('The live server is unavailable.')
  return response.json()
}

function priceNumber(price) {
  return Number(String(price).replace(/[^0-9.]/g, '')) || 0
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function StatusMessage({ status }) {
  if (!status?.message) return null
  return <p className={`form-status ${status.type || 'info'}`}>{status.message}</p>
}

function SEO({ title, description }) {
  useEffect(() => {
    document.title = `${title} | Maison Elara`
    const tags = [
      ['description', description],
      ['og:title', `${title} | Maison Elara`],
      ['og:description', description],
      ['og:type', 'website'],
    ]
    tags.forEach(([name, content]) => {
      const attr = name.startsWith('og:') ? 'property' : 'name'
      let tag = document.querySelector(`meta[${attr}="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attr, name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    })
  }, [title, description])
  return null
}

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const nav = [
    ['Accueil', '/'],
    ["L'Institut", '/about'],
    ['Soins du visage', '/services'],
    ['Peeling', '/services'],
    ['Cryolipolyse', '/services'],
    ['Mésothérapie', '/services'],
    ['Boutique', '/boutique'],
    ['Réserver', '/booking'],
    ['Actualités', '/blog'],
    ['Contact', '/contact'],
  ]
  return (
    <header className="site-header">
      <Link className="brand" to="/" onClick={() => setOpen(false)}>
        <div>Maison Elara<small>Paris</small></div>
      </Link>
      <nav className={open ? 'nav open' : 'nav'}>
        {nav.map(([item, path]) => (
          <NavLink key={item} to={path} onClick={() => setOpen(false)}>
            {item}
          </NavLink>
        ))}
      </nav>
      <div className="social-cluster" aria-label="Social links">
        <a href={socialLinks.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
        <a href="tel:+12125550188" aria-label="Phone"><Phone /></a>
        <a href={socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Camera /></a>
      </div>
      <button className="icon-btn menu-btn" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
        {open ? <X /> : <Menu />}
      </button>
    </header>
  )
}

function Layout({ children }) {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [pathname])
  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <Reveal className="section-title">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  )
}

function Hero() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.04])
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-34%'])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.62], [1, 0.45])
  const reserveLetters = 'Réserver'.split('')
  const cartCount = useStoredCount(storeKeys.cart)

  return (
    <section className="hero sticky-photo-hero" ref={heroRef}>
      <motion.div
        className="hero-image"
        aria-label="Luxury facial treatment close up"
        style={{ y: imageY, scale: imageScale }}
      />
      <div className="hero-overlay" />
      <motion.div className="hero-content reserve-hero-content" style={{ y: titleY, opacity: titleOpacity }}>
        <motion.h1
          className="animated-reserve-title"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.075, delayChildren: 0.2 } },
          }}
        >
          {reserveLetters.map((letter, index) => (
            <motion.span
              key={`${letter}-${index}`}
              variants={{
                hidden: { opacity: 0, y: 34, rotateX: -80, filter: 'blur(10px)' },
                visible: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' },
              }}
              transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>
        <motion.div
          className="hero-title-line"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
      <motion.div
        className="floating-cart-wrap"
        initial={{ opacity: 0, x: 28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
      <Link className="floating-cart" to="/boutique" aria-label="Open boutique cart">
        <span>{cartCount}</span>
        <ShoppingBag />
      </Link>
      </motion.div>
    </section>
  )
}

function BookingIntro() {
  return (
    <section className="booking-intro">
      <div className="floral-mark" aria-hidden="true">
        <img src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=300&q=80" alt="" />
      </div>
      <Reveal>
        <h2>Réservez dès maintenant votre séance de soins de beauté à Paris 16 - réservation en ligne</h2>
      </Reveal>
    </section>
  )
}

function Home() {
  return (
    <>
      <SEO title="Luxury Beauty Salon" description="Premium Paris-inspired aesthetic clinic website with online booking, boutique, services, reviews, and gallery." />
      <Hero />
      <BookingIntro />
      <Stats />
      <BeforeAfter />
      <ServicesPreview />
      <LatestTreatments />
      <TestimonialsPreview />
      <TeamPreview />
      <InstagramFeed />
      <FAQ />
      <Newsletter />
      <ContactStrip />
      <StructuredData />
    </>
  )
}

function Stats() {
  return (
    <section className="stats">
      {[
        ['12+', 'Years expertise'],
        ['8.2k', 'Clients treated'],
        ['96%', 'Rebooking rate'],
        ['24h', 'Confirmation'],
      ].map(([num, label], index) => (
        <Reveal className="stat" delay={index * 0.06} key={label}>
          <strong>{num}</strong><span>{label}</span>
        </Reveal>
      ))}
    </section>
  )
}

function BeforeAfter() {
  return (
    <section className="split-section">
      <Reveal className="split-copy">
        <span className="eyebrow">Before / after</span>
        <h2>Visible results, never a heavy-handed look.</h2>
        <p>Every plan is tailored to skin history, lifestyle, and the level of refinement you want clients to notice without asking.</p>
        <Link className="text-link" to="/gallery">View transformations <ArrowRight /></Link>
      </Reveal>
      <Reveal className="before-after" delay={0.1}>
        <div><img src="https://images.unsplash.com/photo-1601412436009-d964bd02edbc?auto=format&fit=crop&w=900&q=85" alt="Before treatment skin portrait" /><span>Before</span></div>
        <div><img src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=900&q=85" alt="After treatment skin portrait" /><span>After</span></div>
      </Reveal>
    </section>
  )
}

function ServicesPreview() {
  return (
    <section className="section">
      <SectionTitle eyebrow="Treatments" title="A curated clinic menu" text="Advanced aesthetic protocols presented with the calm polish of a private Paris institute." />
      <div className="card-grid three">
        {services.slice(0, 6).map((service, index) => <ServiceCard service={service} key={service.id} delay={index * 0.05} />)}
      </div>
    </section>
  )
}

function ServiceCard({ service, delay = 0 }) {
  return (
    <Reveal className="service-card" delay={delay}>
      <div className="image-shell"><img src={service.image} alt={service.title} /></div>
      <div className="card-body">
        <span>{service.category}</span>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <div className="meta"><Clock /> {service.duration}<strong>{service.price}</strong></div>
        <Link className="mini-btn" to={`/booking?service=${service.id}`}>Reserve</Link>
      </div>
    </Reveal>
  )
}

function LatestTreatments() {
  return (
    <section className="cream-band">
      <SectionTitle eyebrow="New season" title="Latest treatment arrivals" text="Fresh protocols for tone, texture, hydration, and sculpted confidence." />
      <div className="treatment-row">
        {['LED collagen veil', 'Gold peptide infusion', 'Lymphatic silhouette'].map((item, index) => (
          <Reveal className="treatment-pill" delay={index * 0.08} key={item}>
            <Gem /><strong>{item}</strong><span>Available this week</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function TestimonialsPreview() {
  return (
    <section className="section">
      <SectionTitle eyebrow="Trust" title="Clients return for the feeling" />
      <div className="card-grid three">
        {reviews.map(([quote, name, role], index) => (
          <Reveal className="review-card" delay={index * 0.08} key={name}>
            <div className="stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} fill="currentColor" />)}</div>
            <p>"{quote}"</p>
            <strong>{name}</strong><span>{role}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function TeamPreview() {
  return (
    <section className="section team-section">
      <SectionTitle eyebrow="Specialists" title="Expert hands, elegant judgment" />
      <div className="card-grid three">
        {team.map(([name, role, img], index) => (
          <Reveal className="team-card" delay={index * 0.06} key={name}>
            <img src={img} alt={name} />
            <h3>{name}</h3>
            <p>{role}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function InstagramFeed() {
  const images = [clinicImage, ...services.slice(0, 5).map((s) => s.image)]
  return (
    <section className="section">
      <SectionTitle eyebrow="Instagram" title="@maisonelara" />
      <div className="insta-grid">
        {images.map((img, index) => (
          <Reveal className="insta-tile" delay={index * 0.03} key={img}>
            <a href={socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Open Maison Elara Instagram">
              <img src={img} alt="Maison Elara social post" /><Camera />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function FAQ() {
  const faqs = [
    ['How do I choose a treatment?', 'Book a consultation or select your main concern. Your specialist will refine the protocol before treatment.'],
    ['Are treatments suitable before events?', 'Many glow treatments are event-friendly. Resurfacing and collagen protocols require more planning.'],
    ['Do I receive confirmation?', 'Yes. The booking journey includes appointment details and a confirmation success screen.'],
  ]
  return (
    <section className="section faq">
      <SectionTitle eyebrow="FAQ" title="Quiet answers before you book" />
      {faqs.map(([q, a]) => <Reveal className="faq-row" key={q}><strong>{q}</strong><p>{a}</p></Reveal>)}
    </section>
  )
}

function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    if (loading) return
    const cleanEmail = email.trim()
    if (!isEmail(cleanEmail)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' })
      return
    }
    setLoading(true)
    const subscribers = readStore(storeKeys.subscribers)
    if (!subscribers.some((item) => item.email.toLowerCase() === cleanEmail.toLowerCase())) {
      appendStore(storeKeys.subscribers, { email: cleanEmail, source: 'newsletter' })
    }
    setEmail('')
    setStatus({ type: 'success', message: 'You are on the private list. Appointment windows will arrive by email.' })
    setLoading(false)
  }

  return (
    <section className="newsletter">
      <Reveal>
        <span className="eyebrow">Private list</span>
        <h2>Receive treatment launches and member-only appointment windows.</h2>
        <form onSubmit={submit}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" type="email" />
          <button className="btn primary" disabled={loading}>{loading ? 'Joining...' : 'Join'} <Mail /></button>
        </form>
        <StatusMessage status={status} />
      </Reveal>
    </section>
  )
}

function ContactStrip() {
  return (
    <section className="contact-strip">
      <div><Phone /> +1 212 555 0188</div>
      <div><Mail /> concierge@maisonelara.com</div>
      <div><MapPin /> 18 Rue Lumiere, Paris</div>
      <Link to="/contact" className="btn primary">Contact concierge</Link>
    </section>
  )
}

function About() {
  return (
    <PageShell eyebrow="About us" title="A Paris beauty institute built on clinical precision and feminine ease." image={clinicImage}>
      <SEO title="About Us" description="Learn about Maison Elara's founder, team, certifications, experience, values, and luxury beauty awards." />
      <section className="split-section">
        <Reveal className="split-copy">
          <h2>Our story</h2>
          <p>Maison Elara was imagined as a calm address for discerning clients who want visible skin confidence without losing their natural expression. Every room, product, and protocol is chosen for safety, refinement, and comfort.</p>
        </Reveal>
        <Reveal className="founder-card glass">
          <img src={team[0][2]} alt="Founder Dr. Claire Moreau" />
          <div><span>Founder</span><h3>Dr. Claire Moreau</h3><p>Board-certified aesthetic physician with 12 years in dermatologic beauty and luxury wellness.</p></div>
        </Reveal>
      </section>
      <section className="section">
        <div className="card-grid four">
          {['Certified Aesthetic Practice', 'Advanced Skin Science', 'Luxury Hospitality Award', 'Medical-Grade Protocols'].map((item) => <Reveal className="value-card" key={item}><Award /><strong>{item}</strong></Reveal>)}
        </div>
      </section>
      <TeamPreview />
    </PageShell>
  )
}

function Services() {
  const groups = [...new Set(services.map((s) => s.category))]
  return (
    <PageShell eyebrow="Services" title="Premium treatments with clear benefits, timing, pricing, and results." image={services[4].image}>
      <SEO title="Services" description="Explore face treatments, body treatments, and aesthetic treatments with descriptions, benefits, duration, prices, and booking." />
      {groups.map((group) => (
        <section className="section compact" key={group}>
          <SectionTitle eyebrow={group} title={group} />
          <div className="card-grid three">
            {services.filter((s) => s.category === group).map((service) => <ServiceCard service={service} key={service.id} />)}
          </div>
        </section>
      ))}
    </PageShell>
  )
}

function Booking() {
  return (
    <>
      <SEO title="Online Booking" description="Book a luxury beauty treatment by selecting service, specialist, date, time, client information, and confirmation." />
      <Hero />
      <BookingIntro />
      <ReferenceReservationImages />
      <ReferenceContactFooter />
    </>
  )
}

function BookingSystem() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedService = services.find((service) => service.id === searchParams.get('service')) || services[0]
  const [step, setStep] = useState(1)
  const [booking, setBooking] = useState({ service: selectedService, specialist: specialists[0], date: '2026-06-05', time: slots[1], name: '', email: '', phone: '', notes: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const days = ['2026-06-05', '2026-06-06', '2026-06-07', '2026-06-08', '2026-06-09']
  const update = (patch) => {
    setStatus(null)
    setBooking((value) => ({ ...value, ...patch }))
  }
  const confirmed = step === 6
  const validateClient = () => {
    if (booking.name.trim().length < 2) return 'Please enter your full name.'
    if (!isEmail(booking.email.trim())) return 'Please enter a valid email address.'
    if (booking.phone.trim().length < 6) return 'Please enter a reachable phone number.'
    return ''
  }
  const continueFlow = async () => {
    if (loading) return
    if (step < 5) {
      setStep((s) => Math.min(6, s + 1))
      return
    }
    const error = validateClient()
    if (error) {
      setStatus({ type: 'error', message: error })
      return
    }
    const payload = {
      serviceId: booking.service.id,
      specialist: booking.specialist,
      date: booking.date,
      time: booking.time,
      clientName: booking.name.trim(),
      clientEmail: booking.email.trim(),
      clientPhone: booking.phone.trim(),
      notes: booking.notes.trim(),
      serviceTitle: booking.service.title,
      price: booking.service.price,
    }
    setLoading(true)
    try {
      await postJson('/api/bookings', payload)
      appendStore(storeKeys.bookings, { ...payload, status: 'confirmed', source: 'api' })
      setStatus({ type: 'success', message: 'Appointment confirmed. A concierge confirmation is prepared.' })
    } catch {
      appendStore(storeKeys.bookings, { ...payload, status: 'confirmed', source: 'local' })
      setStatus({ type: 'success', message: 'Appointment confirmed locally. The concierge team can see it in admin.' })
    } finally {
      setLoading(false)
      setStep(6)
    }
  }
  const selectService = (service) => {
    update({ service })
    setSearchParams({ service: service.id })
  }
  const resetBooking = () => {
    setBooking({ service: services[0], specialist: specialists[0], date: '2026-06-05', time: slots[1], name: '', email: '', phone: '', notes: '' })
    setSearchParams({})
    setStatus(null)
    setStep(1)
  }

  return (
    <section className="booking-layout">
      <Reveal className="booking-panel">
        <div className="steps">{[1, 2, 3, 4, 5, 6].map((n) => <span className={step >= n ? 'active' : ''} key={n}>{n}</span>)}</div>
        {!confirmed && <h2>{['Select service', 'Choose specialist', 'Select date', 'Select time', 'Client information'][step - 1]}</h2>}
        {step === 1 && <ChoiceGrid items={services.slice(0, 6)} selected={booking.service.id} label={(s) => `${s.title} ${s.price}`} onPick={selectService} />}
        {step === 2 && <ChoiceGrid items={specialists} selected={booking.specialist} label={(s) => s} onPick={(specialist) => update({ specialist })} />}
        {step === 3 && <ChoiceGrid items={days} selected={booking.date} label={(d) => new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} onPick={(date) => update({ date })} />}
        {step === 4 && <ChoiceGrid items={slots} selected={booking.time} label={(s) => s} onPick={(time) => update({ time })} />}
        {step === 5 && <ClientForm booking={booking} update={update} />}
        {confirmed && <Success booking={booking} onReset={resetBooking} />}
        <StatusMessage status={status} />
        <div className="booking-actions">
          <button className="btn ghost" disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}><ChevronLeft /> Back</button>
          {!confirmed && <button className="btn primary" disabled={loading} onClick={continueFlow}>{loading ? 'Confirming...' : 'Continue'} <ChevronRight /></button>}
        </div>
      </Reveal>
      <BookingSummary booking={booking} />
    </section>
  )
}

function ReferenceReservationImages() {
  return (
    <section className="reference-image-section">
      <Reveal className="reference-image-tile">
        <img src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1100&q=90" alt="Esthetician preparing a facial treatment" />
      </Reveal>
      <Reveal className="reference-image-tile" delay={0.08}>
        <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1100&q=90" alt="Luxury facial care treatment" />
      </Reveal>
    </section>
  )
}

function ReferenceContactFooter() {
  return (
    <section className="reference-contact-footer">
      <div className="reference-contact-grid">
        <Reveal>
          <h3>Adresse</h3>
          <p>18 Rue Lumiere 75116 Paris</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h3>Téléphone</h3>
          <p>+1 212 555 0188</p>
        </Reveal>
        <Reveal delay={0.12}>
          <h3>Email</h3>
          <p>concierge@maisonelara.com</p>
        </Reveal>
      </div>
      <BookingSystem />
    </section>
  )
}

function ChoiceGrid({ items, selected, label, onPick }) {
  return (
    <div className="choice-grid">
      {items.map((item) => {
        const id = item.id || item
        return <button className={selected === id ? 'choice active' : 'choice'} key={id} onClick={() => onPick(item)}>{label(item)}<Check /></button>
      })}
    </div>
  )
}

function ClientForm({ booking, update }) {
  return (
    <div className="form-grid">
      <input value={booking.name} onChange={(e) => update({ name: e.target.value })} placeholder="Full name" />
      <input value={booking.email} onChange={(e) => update({ email: e.target.value })} placeholder="Email address" type="email" />
      <input value={booking.phone} onChange={(e) => update({ phone: e.target.value })} placeholder="Phone number" type="tel" />
      <textarea value={booking.notes} onChange={(e) => update({ notes: e.target.value })} placeholder="Notes for your specialist" />
    </div>
  )
}

function BookingSummary({ booking }) {
  return (
    <Reveal className="summary-card glass" delay={0.1}>
      <h3>Booking summary</h3>
      <p><Sparkles /> {booking.service.title}</p>
      <p><Users /> {booking.specialist}</p>
      <p><CalendarDays /> {booking.date}</p>
      <p><Clock /> {booking.time}</p>
      <strong>{booking.service.price}</strong>
      <span>Email confirmation prepared</span>
    </Reveal>
  )
}

function Success({ booking, onReset }) {
  return (
    <div className="success">
      <ShieldCheck />
      <h2>Appointment confirmed</h2>
      <p>Your confirmation for {booking.service.title} with {booking.specialist} is ready. A concierge email will be sent to {booking.email || 'your inbox'}.</p>
      <button className="btn primary" onClick={onReset}>Book another treatment</button>
    </div>
  )
}

function Boutique() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [cart, setCart] = useState(() => readStore(storeKeys.cart))
  const [status, setStatus] = useState(null)
  const categories = ['All', ...new Set(productCatalog.map((p) => p.category))]
  const visible = productCatalog.filter((p) => (category === 'All' || p.category === category) && p.name.toLowerCase().includes(query.toLowerCase()))
  const addToCart = (product) => {
    const next = [...cart]
    const existing = next.find((item) => item.id === product.id)
    if (existing) existing.quantity += 1
    else next.push({ ...product, quantity: 1 })
    setCart(next)
    writeStore(storeKeys.cart, next)
    setStatus({ type: 'success', message: `${product.name} added to cart.` })
  }
  const removeFromCart = (id) => {
    const next = cart.filter((item) => item.id !== id)
    setCart(next)
    writeStore(storeKeys.cart, next)
    setStatus({ type: 'info', message: 'Item removed from cart.' })
  }
  const checkout = async () => {
    if (cart.length === 0) {
      setStatus({ type: 'error', message: 'Your cart is empty. Add a product before checkout.' })
      return
    }
    const order = {
      clientName: 'Maison Elara Guest',
      clientEmail: 'guest@maisonelara.local',
      items: cart.map((item) => ({ productId: item.id, quantity: item.quantity, unitPrice: priceNumber(item.price), name: item.name })),
      total: cart.reduce((total, item) => total + priceNumber(item.price) * item.quantity, 0),
      status: 'paid',
    }
    try {
      await postJson('/api/orders', { ...order, items: cart.map((item) => ({ productId: item.id, quantity: item.quantity })) })
      appendStore(storeKeys.orders, { ...order, source: 'api' })
    } catch {
      appendStore(storeKeys.orders, { ...order, source: 'local' })
    }
    setCart([])
    writeStore(storeKeys.cart, [])
    setStatus({ type: 'success', message: 'Checkout complete. Your order confirmation has been saved.' })
  }

  return (
    <PageShell eyebrow="Boutique" title="Clinical-luxury skincare for your ritual at home." image={products[0][3]}>
      <SEO title="Shop Boutique" description="Luxury beauty product catalog with search, filters, product cards, cart, checkout, and order confirmation." />
      <section className="shop-tools">
        <label><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" /></label>
        <div>{categories.map((c) => <button className={category === c ? 'active' : ''} onClick={() => setCategory(c)} key={c}>{c}</button>)}</div>
      </section>
      <section className="card-grid three">
        {visible.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}
      </section>
      <CartCheckout cart={cart} onRemove={removeFromCart} onCheckout={checkout} />
      <StatusMessage status={status} />
    </PageShell>
  )
}

function ProductCard({ product, onAdd }) {
  return (
    <Reveal className="product-card">
      <div className="image-shell"><img src={product.image} alt={product.name} /></div>
      <span>{product.category}</span><h3>{product.name}</h3><p>Elegant, sensorial, and selected for post-treatment skin support.</p>
      <div className="meta"><strong>{product.price}</strong><button className="mini-btn" onClick={() => onAdd(product)}><ShoppingBag /> Add</button></div>
    </Reveal>
  )
}

function CartCheckout({ cart, onRemove, onCheckout }) {
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0)
  const total = cart.reduce((sum, item) => sum + priceNumber(item.price) * item.quantity, 0)
  return (
    <Reveal className="checkout-strip glass">
      <div><ShoppingBag /><strong>Cart</strong><span>{itemCount} selected item{itemCount === 1 ? '' : 's'}</span></div>
      <div><CreditCard /><strong>Checkout</strong><span>${total.toFixed(2)} secure payment ready</span><button className="mini-btn" onClick={onCheckout}>Checkout</button></div>
      <div><ShieldCheck /><strong>Order confirmation</strong><span>Receipt and delivery email</span>{cart.map((item) => <button className="mini-btn" key={item.id} onClick={() => onRemove(item.id)}>Remove {item.quantity}x {item.name}</button>)}</div>
    </Reveal>
  )
}

function Blog() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const categories = ['All', ...new Set(postCatalog.map((post) => post.category))]
  const visible = postCatalog.filter((post) => {
    const haystack = `${post.title} ${post.category} ${post.excerpt}`.toLowerCase()
    return (category === 'All' || post.category === category) && haystack.includes(query.toLowerCase())
  })

  return (
    <PageShell eyebrow="Blog" title="Beauty intelligence for polished routines and smarter bookings." image={posts[0][3]}>
      <SEO title="Blog & News" description="Beauty articles, tips, news, categories, search, and related article previews." />
      <section className="shop-tools">
        <label><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search beauty articles" /></label>
        <div>{categories.map((c) => <button className={category === c ? 'active' : ''} onClick={() => setCategory(c)} key={c}>{c}</button>)}</div>
      </section>
      <section className="card-grid three">
        {visible.map((post) => (
          <Reveal className="article-card" key={post.title}>
            <img src={post.image} alt={post.title} /><span>{post.category}</span><h3>{post.title}</h3><p>{post.excerpt}</p>
            <Link className="text-link" to={`/blog/${post.slug}`}>Read article <ArrowRight /></Link>
          </Reveal>
        ))}
      </section>
    </PageShell>
  )
}

function BlogArticle() {
  const { pathname } = useLocation()
  const slug = pathname.split('/').pop()
  const post = postCatalog.find((item) => item.slug === slug) || postCatalog[0]
  return (
    <PageShell eyebrow={post.category} title={post.title} image={post.image}>
      <SEO title={post.title} description={post.excerpt} />
      <section className="section">
        <Reveal className="article-card">
          <p>{post.body}</p>
          <Link className="text-link" to="/blog"><ChevronLeft /> Back to articles</Link>
        </Reveal>
      </section>
    </PageShell>
  )
}

function Gallery() {
  const imgs = [heroImage, clinicImage, ...services.map((s) => s.image)].slice(0, 12)
  return (
    <PageShell eyebrow="Gallery" title="Before-after results, treatment rooms, team details, and social moments." image={clinicImage}>
      <SEO title="Gallery" description="Luxury gallery with before and after results, treatment photos, clinic photos, team photos, and Instagram-style layout." />
      <section className="masonry">{imgs.map((img, i) => <Reveal className={i % 3 === 0 ? 'tall gallery-item' : 'gallery-item'} key={img}><img src={img} alt="Maison Elara gallery" /><span>{i % 2 ? 'Clinic' : 'Results'}</span></Reveal>)}</section>
    </PageShell>
  )
}

function Testimonials() {
  return (
    <PageShell eyebrow="Testimonials" title="Success stories from clients who value subtle, beautiful results." image={services[8].image}>
      <SEO title="Testimonials" description="Customer reviews, ratings, success stories, and before-after treatment experiences." />
      <TestimonialsPreview />
      <BeforeAfter />
    </PageShell>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const update = (field, value) => {
    setStatus(null)
    setForm((current) => ({ ...current, [field]: value }))
  }
  const submit = async (event) => {
    event.preventDefault()
    if (loading) return
    if (form.name.trim().length < 2) {
      setStatus({ type: 'error', message: 'Please enter your full name.' })
      return
    }
    if (!isEmail(form.email.trim())) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' })
      return
    }
    if (form.message.trim().length < 10) {
      setStatus({ type: 'error', message: 'Please enter a message of at least 10 characters.' })
      return
    }
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
    }
    setLoading(true)
    try {
      await postJson('/api/contact', payload)
      appendStore(storeKeys.contacts, { ...payload, source: 'api', isRead: false })
      setStatus({ type: 'success', message: 'Message sent. The concierge team will reply shortly.' })
    } catch {
      appendStore(storeKeys.contacts, { ...payload, source: 'local', isRead: false })
      setStatus({ type: 'success', message: 'Message saved locally for the concierge team.' })
    } finally {
      setLoading(false)
      setForm({ name: '', email: '', phone: '', message: '' })
    }
  }

  return (
    <PageShell eyebrow="Contact" title="Speak with the concierge team." image={clinicImage}>
      <SEO title="Contact" description="Contact form, phone, email, address, map, and WhatsApp booking support for Maison Elara." />
      <section className="contact-page">
        <Reveal className="contact-form" as="form">
          <form className="contact-form" onSubmit={submit}>
            <input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Full name" />
            <input value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="Email address" type="email" />
            <input value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="Phone" type="tel" />
            <textarea value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="How may we help?" />
            <button className="btn primary" disabled={loading}>{loading ? 'Sending...' : 'Send message'} <Mail /></button>
            <StatusMessage status={status} />
          </form>
        </Reveal>
        <Reveal className="map-card glass">
          <div className="map"><MapPin /></div>
          <p><Phone /> +1 212 555 0188</p><p><Mail /> concierge@maisonelara.com</p><p><MapPin /> 18 Rue Lumiere, Paris</p>
          <a className="btn whatsapp" href={socialLinks.whatsapp} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a>
        </Reveal>
      </section>
    </PageShell>
  )
}

function Admin() {
  const modules = ['Users', 'Bookings', 'Services', 'Products', 'Orders', 'Reviews', 'Blog articles', 'Team members', 'Gallery', 'Newsletter subscribers', 'Contact messages']
  const [active, setActive] = useState(null)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const [editing, setEditing] = useState(null)
  const [status, setStatus] = useState(null)
  const fileInput = useRef(null)
  const getRecords = (module) => {
    const admin = readStore(storeKeys.admin, {})
    const saved = admin[module] || []
    const defaults = {
      Services: services.map((item) => ({ id: item.id, title: item.title, category: item.category, status: 'active' })),
      Products: productCatalog.map((item) => ({ id: item.id, title: item.name, category: item.category, status: 'active' })),
      Bookings: readStore(storeKeys.bookings).map((item) => ({ ...item, title: item.serviceTitle || item.serviceId, category: item.status || 'confirmed' })),
      Orders: readStore(storeKeys.orders).map((item) => ({ ...item, title: `Order ${item.id?.slice(0, 8) || 'local'}`, category: item.status || 'paid' })),
      'Newsletter subscribers': readStore(storeKeys.subscribers).map((item) => ({ ...item, title: item.email, category: item.source || 'newsletter' })),
      'Contact messages': readStore(storeKeys.contacts).map((item) => ({ ...item, title: item.name, category: item.isRead ? 'read' : 'unread' })),
      'Blog articles': postCatalog.map((item) => ({ id: item.slug, title: item.title, category: item.category, status: 'published' })),
      'Team members': team.map(([name, role]) => ({ id: name, title: name, category: role, status: 'active' })),
      Gallery: [heroImage, clinicImage, ...services.slice(0, 4).map((item) => item.image)].map((image, index) => ({ id: `image-${index + 1}`, title: `Gallery image ${index + 1}`, category: 'published', image })),
      Users: [{ id: 'admin-local', title: 'Maison Elara Admin', category: 'admin', status: 'active' }],
      Reviews: reviews.map(([quote, name, role]) => ({ id: name, title: name, category: role, status: quote })),
    }
    return saved.length ? saved : (defaults[module] || [])
  }
  const setRecords = (module, records) => {
    const admin = readStore(storeKeys.admin, {})
    writeStore(storeKeys.admin, { ...admin, [module]: records })
  }
  const records = active ? getRecords(active) : []
  const categories = ['All', ...new Set(records.map((record) => record.category || record.status).filter(Boolean))]
  const visible = records.filter((record) => {
    const text = JSON.stringify(record).toLowerCase()
    return (filter === 'All' || record.category === filter || record.status === filter) && text.includes(query.toLowerCase())
  })
  const openModule = (module) => {
    setActive(module)
    setQuery('')
    setFilter('All')
    setEditing(null)
    setStatus({ type: 'info', message: `${module} management opened.` })
  }
  const saveRecord = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const record = {
      id: editing?.id || crypto.randomUUID(),
      title: String(data.get('title') || '').trim(),
      category: String(data.get('category') || '').trim() || 'general',
      status: String(data.get('status') || '').trim() || 'active',
      updatedAt: new Date().toISOString(),
    }
    if (!record.title) {
      setStatus({ type: 'error', message: 'Please enter a title before saving.' })
      return
    }
    const next = editing
      ? records.map((item) => (item.id === editing.id ? { ...item, ...record } : item))
      : [...records, record]
    setRecords(active, next)
    setEditing(null)
    setStatus({ type: 'success', message: `${active} saved.` })
  }
  const deleteRecord = (record) => {
    if (!window.confirm(`Delete ${record.title || record.name || record.email}?`)) return
    setRecords(active, records.filter((item) => item.id !== record.id))
    setStatus({ type: 'success', message: 'Record deleted safely.' })
  }
  const viewRecord = (record) => {
    setStatus({ type: 'info', message: JSON.stringify(record, null, 2) })
  }
  const exportRecords = () => {
    const blob = new Blob([JSON.stringify(records, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${active.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.json`
    link.click()
    URL.revokeObjectURL(url)
    setStatus({ type: 'success', message: `${active} exported.` })
  }
  const uploadRecords = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result)
        if (!Array.isArray(imported)) throw new Error('Expected an array.')
        setRecords(active, imported.map((item) => ({ id: item.id || crypto.randomUUID(), ...item })))
        setStatus({ type: 'success', message: `${imported.length} records uploaded.` })
      } catch {
        setStatus({ type: 'error', message: 'Upload a valid JSON array export.' })
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  return (
    <PageShell eyebrow="Admin" title="Executive dashboard for clinic operations." image={clinicImage}>
      <SEO title="Admin Dashboard" description="Admin dashboard to manage users, bookings, services, products, orders, reviews, articles, team, gallery, subscribers, and messages." />
      <section className="dashboard">
        {[
          ['Revenue', '$84.2k', '12% this month'],
          ['Appointments', '318', '42 upcoming'],
          ['Orders', '96', '18 awaiting fulfillment'],
          ['Conversion', '7.8%', 'Booking funnel'],
          ['Visitors', '24.1k', 'Premium traffic'],
        ].map(([label, value, note]) => <Reveal className="dash-stat" key={label}><span>{label}</span><strong>{value}</strong><p>{note}</p></Reveal>)}
      </section>
      <section className="admin-grid">
        {modules.map((item) => <Reveal className="admin-card" key={item}><Crown /><strong>{item}</strong><button onClick={() => openModule(item)}>Manage</button></Reveal>)}
      </section>
      {active && (
        <section className="admin-panel">
          <div className="shop-tools">
            <label><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${active}`} /></label>
            <div>{categories.map((item) => <button className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div>
          </div>
          <div className="admin-actions">
            <button className="mini-btn" onClick={() => setEditing({ title: '', category: '', status: 'active' })}>Create</button>
            <button className="mini-btn" onClick={exportRecords}>Export</button>
            <button className="mini-btn" onClick={() => fileInput.current?.click()}>Upload</button>
            <button className="mini-btn" onClick={() => { setActive(null); setEditing(null); setStatus(null) }}>Close</button>
            <input ref={fileInput} className="sr-only" type="file" accept="application/json" onChange={uploadRecords} />
          </div>
          {editing && (
            <form className="admin-edit" onSubmit={saveRecord}>
              <input name="title" defaultValue={editing.title || editing.name || editing.email || ''} placeholder="Title" />
              <input name="category" defaultValue={editing.category || editing.status || ''} placeholder="Category" />
              <input name="status" defaultValue={editing.status || 'active'} placeholder="Status" />
              <button className="btn primary">Save</button>
              <button className="btn ghost" type="button" onClick={() => setEditing(null)}>Cancel</button>
            </form>
          )}
          <div className="admin-table">
            {visible.map((record) => (
              <div className="admin-row" key={record.id}>
                <strong>{record.title || record.name || record.email || record.clientEmail || record.id}</strong>
                <span>{record.category || record.status || 'record'}</span>
                <button className="mini-btn" onClick={() => viewRecord(record)}>View</button>
                <button className="mini-btn" onClick={() => setEditing(record)}>Edit</button>
                <button className="mini-btn" onClick={() => deleteRecord(record)}>Delete</button>
              </div>
            ))}
          </div>
          <StatusMessage status={status} />
        </section>
      )}
    </PageShell>
  )
}

function PageShell({ eyebrow, title, image, children }) {
  return (
    <>
      <section className="page-hero">
        <img src={image} alt="" />
        <div />
        <motion.article initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
        </motion.article>
      </section>
      {children}
    </>
  )
}

function Footer() {
  return (
    <footer>
      <div className="brand"><span>ME</span><div>Maison Elara<small>Paris Aesthetic Institute</small></div></div>
      <p>Luxury beauty salon and aesthetic clinic for high-end skin, body, and beauty rituals.</p>
      <div className="footer-links"><Link to="/booking">Booking</Link><Link to="/services">Services</Link><Link to="/contact">Contact</Link></div>
    </footer>
  )
}

function StructuredData() {
  const schema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: 'Maison Elara',
    image: heroImage,
    telephone: '+1-212-555-0188',
    address: '18 Rue Lumiere, Paris',
    priceRange: '$$$',
    makesOffer: services.slice(0, 5).map((service) => ({ '@type': 'Offer', name: service.title, price: service.price.replace('$', '') })),
  }), [])
  return <script type="application/ld+json">{JSON.stringify(schema)}</script>
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/boutique" element={<Boutique />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
