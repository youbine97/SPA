import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Activity,
  Archive,
  Award,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CreditCard,
  Edit3,
  Eye,
  FileText,
  Filter,
  Gem,
  Heart,
  Image,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  MoreHorizontal,
  Newspaper,
  PanelsTopLeft,
  Phone,
  Plus,
  Quote,
  Save,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  Tag,
  Trash2,
  TrendingUp,
  UploadCloud,
  UserCog,
  UserRound,
  Users,
  X,
} from 'lucide-react'
import './App.css'

function FacebookIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 8h3V4h-3c-3.3 0-5 2-5 5v2H6v4h3v7h4v-7h3.5l.5-4h-4V9c0-.7.3-1 1-1Z" /></svg>
}

function InstagramIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" /></svg>
}

const apiBase = import.meta.env.VITE_API_URL || 'http://127.0.0.1:4000'

const images = {
  hero: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=2200&q=90',
  studio: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=85',
  portrait: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1400&q=85',
}

const defaultServices = [
  { id: 'visage', title: 'Soins du visage', price: 95, duration: '60 min', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1100&q=85', text: 'Protocoles experts pour révéler une peau lumineuse, nette et profondément hydratée.' },
  { id: 'corps', title: 'Soins du corps', price: 120, duration: '75 min', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1100&q=85', text: 'Rituels sculptants et relaxants pensés pour délier, lisser et revitaliser.' },
  { id: 'maquillage', title: 'Maquillage', price: 75, duration: '50 min', image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=1100&q=85', text: 'Une mise en beauté raffinée, sur mesure, pour sublimer sans transformer.' },
  { id: 'onglerie', title: 'Onglerie', price: 55, duration: '45 min', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1100&q=85', text: 'Manucure couture, finitions précises et élégance jusque dans les moindres détails.' },
  { id: 'epilation', title: 'Épilation', price: 45, duration: '30 min', image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1100&q=85', text: 'Techniques douces et rigoureuses pour un résultat net et un confort optimal.' },
  { id: 'massage', title: 'Massage', price: 110, duration: '60 min', image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1100&q=85', text: 'Une parenthèse sensorielle qui libère les tensions et restaure l’équilibre.' },
  { id: 'regard', title: 'Beauté du regard', price: 65, duration: '45 min', image: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=1100&q=85', text: 'Sourcils et cils dessinés avec précision pour intensifier naturellement le regard.' },
]

const pricing = [
  { name: 'Essentiel', label: 'Basic', price: 149, text: 'La parenthèse beauté idéale', features: ['Diagnostic personnalisé', 'Soin visage signature', 'Massage détente 20 min', 'Conseils beauté'] },
  { name: 'Signature', label: 'Premium', price: 289, text: 'Notre expérience la plus choisie', featured: true, features: ['Diagnostic expert', 'Soin visage avancé', 'Soin corps ciblé', 'Beauté du regard', 'Suivi personnalisé'] },
  { name: 'Élixir', label: 'VIP', price: 490, text: 'Le privilège Maison Elara', features: ['Consultation privée', 'Rituel visage et corps', 'Massage 60 min', 'Mise en beauté complète', 'Accès prioritaire'] },
]

const comparisons = [
  {
    title: 'Éclat & texture',
    before: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=900&q=85',
    after: 'https://images.unsplash.com/photo-1601412436009-d964bd02edbc?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'Pureté du teint',
    before: 'https://images.unsplash.com/photo-1598301257982-0cf014dabbcd?auto=format&fit=crop&w=900&q=85',
    after: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=900&q=85',
  },
]

const testimonials = [
  { quote: 'Une adresse rare. Chaque geste est précis, l’accueil est délicat et les résultats dépassent mes attentes.', name: 'Sophie M.', detail: 'Cliente depuis 2022' },
  { quote: 'Le lieu est sublime et apaisant. Mon soin Signature a transformé l’éclat de ma peau dès la première séance.', name: 'Camille R.', detail: 'Soin du visage' },
  { quote: 'Une équipe d’une grande écoute, avec une vraie expertise. Je recommande Maison Elara sans hésitation.', name: 'Inès L.', detail: 'Rituel corps' },
]

const articles = [
  { category: 'Conseils', title: 'Préparer sa peau avant un soin expert', text: 'Les gestes essentiels pour optimiser les bénéfices de votre prochain rendez-vous.', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1000&q=85' },
  { category: 'Expertise', title: 'Le rituel idéal pour une peau lumineuse', text: 'Nettoyage, actifs et protection : notre méthode pour préserver l’éclat au quotidien.', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=85' },
  { category: 'Bien-être', title: 'Pourquoi le massage transforme aussi la peau', text: 'Circulation, détente et qualité du sommeil : les bénéfices d’un rituel régulier.', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=85' },
]

const faqItems = [
  ['Quels sont vos tarifs ?', 'Nos soins commencent à 45 €. Le tarif exact dépend du protocole et de vos objectifs. Un diagnostic est réalisé avant chaque première séance.'],
  ['Combien de temps dure un rendez-vous ?', 'Selon le soin choisi, prévoyez entre 30 et 90 minutes. La durée est indiquée lors de votre réservation.'],
  ['Puis-je annuler mon rendez-vous ?', 'Oui, sans frais jusqu’à 24 heures avant le rendez-vous. Passé ce délai, un acompte pourra être conservé.'],
  ['Quels moyens de paiement acceptez-vous ?', 'Nous acceptons les cartes bancaires, les espèces et les paiements sans contact. Les packs peuvent être réglés en plusieurs fois.'],
  ['Comment choisir le soin adapté ?', 'Notre équipe vous conseille avant la réservation ou réalise un diagnostic sur place pour construire le protocole le plus pertinent.'],
]

const storeKeys = {
  reservations: 'maison-elara-reservations',
  messages: 'maison-elara-client-messages',
  services: 'maison-elara-services',
  settings: 'maison-elara-settings',
  adminSuite: 'maison-elara-admin-suite',
}

function readStore(key, fallback) {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

function writeStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
  window.dispatchEvent(new Event('maison-elara-data'))
}

function useStoredState(key, fallback) {
  const [value, setValue] = useState(() => readStore(key, fallback))
  const update = (next) => {
    const resolved = typeof next === 'function' ? next(value) : next
    setValue(resolved)
    writeStore(key, resolved)
  }
  return [value, update]
}

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Logo({ light = false }) {
  return (
    <span className={`logo ${light ? 'logo-light' : ''}`}>
      <span className="logo-mark">ME</span>
      <span>Maison Elara<small>Paris</small></span>
    </span>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const links = [
    ['Accueil', 'accueil'],
    ['Services', 'services'],
    ['Réalisations', 'realisations'],
    ['Tarifs', 'tarifs'],
    ['À propos', 'a-propos'],
    ['Avis', 'avis'],
    ['FAQ', 'faq'],
    ['Contact', 'contact'],
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <button className="logo-button" onClick={() => goTo('accueil')} aria-label="Retour à l’accueil">
        <Logo />
      </button>
      <nav className={open ? 'main-nav open' : 'main-nav'} aria-label="Navigation principale">
        {links.map(([label, id]) => (
          <button key={id} onClick={() => goTo(id)}>{label}</button>
        ))}
      </nav>
      <button className="header-book" onClick={() => goTo('reservation')}>Réserver</button>
      <button className="menu-toggle" onClick={() => setOpen((current) => !current)} aria-label="Ouvrir le menu" aria-expanded={open}>
        {open ? <X /> : <Menu />}
      </button>
    </header>
  )
}

function SectionHeading({ eyebrow, title, text, align = 'center' }) {
  return (
    <Reveal className={`section-heading ${align}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  )
}

function Hero() {
  return (
    <section className="hero" id="accueil">
      <motion.div className="hero-bg" initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }} />
      <div className="hero-shade" />
      <motion.div className="hero-content" initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.25 }}>
        <span className="hero-kicker">Institut de beauté & bien-être · Paris</span>
        <h1>L’Art de la Beauté<br />et du Bien-Être</h1>
        <p>Découvrez une expérience unique alliant élégance, expertise et excellence.</p>
        <div className="hero-actions">
          <a className="button gold" href="#reservation">Réserver un rendez-vous <ArrowRight /></a>
          <a className="button glass-button" href="#services">Découvrir nos services</a>
        </div>
      </motion.div>
      <div className="hero-note"><span>01</span><i /><p>Une beauté naturelle,<br />révélée avec précision.</p></div>
      <a className="scroll-cue" href="#services"><span>Découvrir</span><i /></a>
    </section>
  )
}

function ServicesSection({ services }) {
  return (
    <section className="section services-section" id="services">
      <SectionHeading eyebrow="Notre expertise" title="Des rituels pensés pour vous" text="Chaque protocole est personnalisé avec exigence pour révéler votre beauté naturelle et vous offrir un résultat visible, élégant et durable." />
      <div className="services-grid">
        {services.map((service, index) => (
          <Reveal className={`service-card ${index === 0 ? 'service-featured' : ''}`} delay={(index % 4) * 0.06} key={service.id}>
            <img src={service.image} alt={service.title} />
            <div className="service-overlay" />
            <div className="service-number">0{index + 1}</div>
            <article>
              <span>{service.duration} · Dès {service.price} €</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <a href="#reservation">Découvrir <ArrowRight /></a>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="about-section" id="a-propos">
      <Reveal className="about-images">
        <img className="about-main" src={images.studio} alt="Cabine de soin Maison Elara Paris" />
        <img className="about-detail" src={images.portrait} alt="Soin expert du visage" />
        <span className="experience-seal"><strong>12</strong> années<br />d’expertise</span>
      </Reveal>
      <Reveal className="about-copy">
        <span className="eyebrow">La Maison</span>
        <h2>L’excellence du soin, l’élégance en héritage</h2>
        <p className="lead">Maison Elara est née d’une conviction : la beauté la plus précieuse est celle qui respecte votre singularité.</p>
        <p>Dans un écrin confidentiel au cœur de Paris, notre équipe associe expertise esthétique, gestuelle précise et produits d’exception. Chaque visite est imaginée comme un moment suspendu, entièrement dédié à votre bien-être.</p>
        <div className="signature">Maison Elara <small>Paris</small></div>
        <a className="text-link" href="#reservation">Rencontrer nos expertes <ArrowRight /></a>
      </Reveal>
    </section>
  )
}

function BeforeAfter({ managedPhotos = [] }) {
  const gallery = comparisons.map((item, index) => ({ ...item, after: managedPhotos[index] || item.after }))
  return (
    <section className="section results-section" id="realisations">
      <SectionHeading eyebrow="Résultats visibles" title="Avant / Après" text="Des résultats authentiques, obtenus grâce à des protocoles précis et un accompagnement sur mesure." />
      <div className="comparison-grid">
        {gallery.map((item, index) => (
          <Reveal className="comparison-card" delay={index * 0.1} key={item.title}>
            <div><img src={item.before} alt={`Avant - ${item.title}`} /><span>Avant</span></div>
            <div><img src={item.after} alt={`Après - ${item.title}`} /><span>Après</span></div>
            <h3>{item.title}</h3>
          </Reveal>
        ))}
      </div>
      <p className="results-note">Les résultats peuvent varier selon chaque personne. Photos présentées avec l’accord de nos clientes.</p>
    </section>
  )
}

function PricingSection() {
  return (
    <section className="pricing-section" id="tarifs">
      <SectionHeading eyebrow="Nos expériences" title="Choisissez votre rituel" text="Des formules pensées pour répondre à vos envies, du soin essentiel à l’expérience la plus exclusive." />
      <div className="pricing-grid">
        {pricing.map((pack, index) => (
          <Reveal className={`price-card ${pack.featured ? 'featured' : ''}`} delay={index * 0.08} key={pack.name}>
            {pack.featured && <span className="popular">Le plus choisi</span>}
            <span className="pack-label">{pack.label}</span>
            <h3>{pack.name}</h3>
            <p>{pack.text}</p>
            <div className="price"><span>€</span>{pack.price}<small>/ rituel</small></div>
            <ul>{pack.features.map((feature) => <li key={feature}><Check /> {feature}</li>)}</ul>
            <a className={`button ${pack.featured ? 'gold' : 'outline'}`} href="#reservation">Choisir ce rituel</a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function WhyUs() {
  const reasons = [
    [Gem, 'Produits premium', 'Des formules sélectionnées pour leur efficacité, leur sensorialité et leur haute tolérance.'],
    [Users, 'Équipe qualifiée', 'Des praticiennes expérimentées, régulièrement formées aux protocoles les plus exigeants.'],
    [Award, 'Résultats professionnels', 'Une approche rigoureuse qui conjugue diagnostic, précision et suivi des résultats.'],
    [Heart, 'Accompagnement personnalisé', 'Votre peau, vos attentes et votre rythme guident chacune de nos recommandations.'],
  ]
  return (
    <section className="why-section">
      <div className="why-image"><img src={images.portrait} alt="Expertise beauté Maison Elara" /></div>
      <div className="why-content">
        <SectionHeading eyebrow="Pourquoi nous choisir" title="Votre confiance mérite l’excellence" align="left" />
        <div className="reason-grid">
          {reasons.map(([Icon, title, text], index) => (
            <Reveal className="reason" delay={index * 0.05} key={title}>
              <span><Icon /></span><div><h3>{title}</h3><p>{text}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Promotions({ offer }) {
  return (
    <section className="promotion-section">
      <div className="promotion-image" />
      <div className="promotion-shade" />
      <Reveal className="promotion-content">
        <span>Offre découverte</span>
        <h2>Votre premier rituel<br />Maison Elara</h2>
        <p>{offer || <>Bénéficiez de <strong>−20 %</strong> sur le soin Signature de votre choix pour votre première visite.</>}</p>
        <a className="button light" href="#reservation">Profiter de l’offre <ArrowRight /></a>
      </Reveal>
      <div className="promotion-badge">−20<small>%</small></div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="section testimonials-section" id="avis">
      <SectionHeading eyebrow="Elles nous font confiance" title="L’expérience Maison Elara" />
      <div className="testimonial-grid">
        {testimonials.map((review, index) => (
          <Reveal className="testimonial-card" delay={index * 0.08} key={review.name}>
            <div className="stars">{Array.from({ length: 5 }, (_, star) => <Star key={star} />)}</div>
            <blockquote>“{review.quote}”</blockquote>
            <div className="reviewer"><span>{review.name.charAt(0)}</span><p><strong>{review.name}</strong><small>{review.detail}</small></p></div>
          </Reveal>
        ))}
      </div>
      <div className="review-score"><strong>4.9</strong><div><span className="stars">{Array.from({ length: 5 }, (_, star) => <Star key={star} />)}</span><p>Basé sur plus de 180 avis vérifiés</p></div></div>
    </section>
  )
}

function ReservationForm({ services }) {
  const initialForm = { name: '', phone: '', email: '', service: services[0]?.title || '', date: '', time: '', message: '' }
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)
  const minDate = new Date().toISOString().split('T')[0]

  const update = (field, value) => {
    setStatus(null)
    setForm((current) => ({ ...current, [field]: value }))
  }

  const submit = async (event) => {
    event.preventDefault()
    if (sending) return
    if (form.name.trim().length < 2 || form.phone.trim().length < 6 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus({ type: 'error', text: 'Merci de renseigner vos coordonnées complètes et une adresse e-mail valide.' })
      return
    }
    if (!form.date || !form.time) {
      setStatus({ type: 'error', text: 'Sélectionnez une date et une heure pour continuer.' })
      return
    }

    setSending(true)
    const reservation = {
      id: crypto.randomUUID(),
      ...form,
      status: 'Nouvelle',
      createdAt: new Date().toISOString(),
      notification: { emailPrepared: true, whatsappPrepared: true },
    }
    const saved = readStore(storeKeys.reservations, [])
    writeStore(storeKeys.reservations, [reservation, ...saved])
    if (form.message.trim()) {
      const messages = readStore(storeKeys.messages, [])
      writeStore(storeKeys.messages, [{
        id: crypto.randomUUID(),
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        createdAt: reservation.createdAt,
      }, ...messages])
    }

    try {
      await fetch(`${apiBase}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: defaultServices.find((item) => item.title === form.service)?.id || 'custom',
          specialist: 'Équipe Maison Elara',
          date: form.date,
          time: form.time,
          clientName: form.name,
          clientEmail: form.email,
          clientPhone: form.phone,
          notes: form.message,
        }),
      })
    } catch {
      // Local persistence keeps the booking available when the API is offline.
    }

    setForm(initialForm)
    setStatus({ type: 'success', text: 'Votre demande est enregistrée. Notre concierge vous confirme le rendez-vous très prochainement.' })
    setSending(false)
  }

  return (
    <section className="reservation-section" id="reservation">
      <div className="reservation-copy">
        <span className="eyebrow">Votre moment</span>
        <h2>Réservez votre expérience</h2>
        <p>Confiez-nous vos envies. Notre équipe vous recontacte pour confirmer votre rendez-vous et personnaliser votre rituel.</p>
        <div className="reservation-perks">
          <span><ShieldCheck /> Confirmation personnalisée</span>
          <span><Clock3 /> Réponse sous 24 heures</span>
          <span><Sparkles /> Diagnostic offert</span>
        </div>
        <div className="direct-contact">
          <small>Besoin d’un conseil immédiat ?</small>
          <a href="tel:+33142885678"><Phone /> +33 1 42 88 56 78</a>
        </div>
      </div>
      <Reveal className="booking-card">
        <form onSubmit={submit}>
          <div className="field-grid">
            <label>Nom complet<input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Votre nom" /></label>
            <label>Téléphone<input value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+33 6 00 00 00 00" type="tel" /></label>
          </div>
          <label>Adresse e-mail<input value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="vous@exemple.fr" type="email" /></label>
          <label>Service souhaité<select value={form.service} onChange={(e) => update('service', e.target.value)}>{services.map((service) => <option key={service.id}>{service.title}</option>)}</select></label>
          <div className="field-grid">
            <label>Date<input value={form.date} min={minDate} onChange={(e) => update('date', e.target.value)} type="date" /></label>
            <label>Heure<select value={form.time} onChange={(e) => update('time', e.target.value)}><option value="">Choisir</option>{['09:30', '10:45', '12:00', '14:00', '15:30', '17:00', '18:30'].map((time) => <option key={time}>{time}</option>)}</select></label>
          </div>
          <label>Votre message<textarea value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Parlez-nous de vos attentes..." /></label>
          <button className="button gold submit-button" disabled={sending}>{sending ? 'Enregistrement...' : 'Réserver maintenant'} <ArrowRight /></button>
          {status && <p className={`form-status ${status.type}`}>{status.text}</p>}
          <small className="privacy-note">En envoyant ce formulaire, vous acceptez d’être contacté(e) au sujet de votre rendez-vous.</small>
        </form>
      </Reveal>
    </section>
  )
}

function BlogSection() {
  return (
    <section className="section blog-section">
      <SectionHeading eyebrow="Le journal Elara" title="Conseils beauté & expertise" text="Nos expertes partagent leurs rituels, recommandations et secrets pour prendre soin de vous au quotidien." />
      <div className="blog-grid">
        {articles.map((article, index) => (
          <Reveal className="article-card" delay={index * 0.08} key={article.title}>
            <div><img src={article.image} alt={article.title} /><span>{article.category}</span></div>
            <article><small>06 Juin 2026 · 4 min</small><h3>{article.title}</h3><p>{article.text}</p><a href="#contact">Lire l’article <ArrowRight /></a></article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function FAQ() {
  const [active, setActive] = useState(0)
  return (
    <section className="faq-section" id="faq">
      <div className="faq-intro">
        <span className="eyebrow">Questions fréquentes</span>
        <h2>Tout ce que vous souhaitez savoir</h2>
        <p>Une question reste sans réponse ? Notre concierge est à votre écoute.</p>
        <a className="text-link" href="#contact">Nous contacter <ArrowRight /></a>
      </div>
      <div className="faq-list">
        {faqItems.map(([question, answer], index) => (
          <div className={`faq-item ${active === index ? 'active' : ''}`} key={question}>
            <button onClick={() => setActive(active === index ? -1 : index)} aria-expanded={active === index}>
              <span>0{index + 1}</span>{question}<ChevronDown />
            </button>
            <AnimatePresence initial={false}>
              {active === index && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p>{answer}</p></motion.div>}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="map-placeholder">
        <div className="map-lines" />
        <span className="map-pin"><MapPin /></span>
        <small>Maison Elara Paris</small>
      </div>
      <div className="contact-content">
        <span className="eyebrow">Nous trouver</span>
        <h2>Votre parenthèse beauté au cœur de Paris</h2>
        <div className="contact-details">
          <a href="https://maps.google.com" target="_blank" rel="noreferrer"><MapPin /><span><small>Adresse</small>18 rue de la Beauté<br />75008 Paris, France</span></a>
          <a href="tel:+33142885678"><Phone /><span><small>Téléphone</small>+33 1 42 88 56 78</span></a>
          <a href="mailto:bonjour@maisonelara.fr"><Mail /><span><small>E-mail</small>bonjour@maisonelara.fr</span></a>
        </div>
        <a className="button whatsapp" href="https://wa.me/33142885678?text=Bonjour%20Maison%20Elara%2C%20je%20souhaite%20prendre%20rendez-vous." target="_blank" rel="noreferrer"><MessageCircle /> Écrire sur WhatsApp</a>
        <div className="social-row">
          <span>Suivez-nous</span>
          <a href="https://instagram.com" aria-label="Instagram"><InstagramIcon /></a>
          <a href="https://facebook.com" aria-label="Facebook"><FacebookIcon /></a>
        </div>
      </div>
    </section>
  )
}

function Footer({ hours }) {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand"><Logo light /><p>L’art de prendre soin de vous, dans un écrin d’élégance et de sérénité.</p><div className="footer-socials"><a href="https://instagram.com" aria-label="Instagram"><InstagramIcon /></a><a href="https://facebook.com" aria-label="Facebook"><FacebookIcon /></a></div></div>
        <div><h3>Navigation</h3><a href="#services">Nos services</a><a href="#realisations">Réalisations</a><a href="#tarifs">Tarifs & packs</a><a href="#avis">Avis clients</a><a href="#reservation">Réserver</a></div>
        <div><h3>Horaires</h3><p>{hours || 'Lun–Ven 09:00–19:30 · Sam 09:00–18:00'}</p><p>Dimanche<br /><strong>Fermé</strong></p></div>
        <div><h3>Contact</h3><p>18 rue de la Beauté<br />75008 Paris</p><a href="tel:+33142885678">+33 1 42 88 56 78</a><a href="mailto:bonjour@maisonelara.fr">bonjour@maisonelara.fr</a></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Maison Elara Paris. Tous droits réservés.</span><span><a href="#legal">Mentions légales</a><a href="#privacy">Confidentialité</a><Link to="/admin">Administration</Link></span></div>
    </footer>
  )
}

function HomePage() {
  const [services] = useStoredState(storeKeys.services, defaultServices)
  const [settings] = useStoredState(storeKeys.settings, {
    hours: 'Lun–Ven 09:00–19:30 · Sam 09:00–18:00',
    promotion: '−20 % sur votre premier soin Signature',
    photos: comparisons.map((item) => item.after),
  })
  useEffect(() => {
    document.title = 'Maison Elara Paris | Institut de beauté & soins d’exception'
    document.documentElement.lang = 'fr'
  }, [])
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ServicesSection services={services} />
        <AboutSection />
        <BeforeAfter managedPhotos={settings.photos} />
        <PricingSection />
        <WhyUs />
        <Promotions offer={settings.promotion} />
        <Testimonials />
        <ReservationForm services={services} />
        <BlogSection />
        <FAQ />
        <ContactSection />
      </main>
      <Footer hours={settings.hours} />
      <a className="floating-whatsapp" href="https://wa.me/33142885678" target="_blank" rel="noreferrer" aria-label="Contacter Maison Elara sur WhatsApp"><MessageCircle /></a>
      <StructuredData />
    </>
  )
}

const adminSeed = {
  clients: [
    { id: 'client-1', name: 'Sophie Martin', email: 'sophie@example.fr', phone: '+33 6 12 34 56 78', visits: 8, spent: 1240, lastVisit: '2026-06-05', notes: 'Préfère les rendez-vous en matinée.' },
    { id: 'client-2', name: 'Camille Robert', email: 'camille@example.fr', phone: '+33 6 98 76 54 32', visits: 4, spent: 680, lastVisit: '2026-06-03', notes: 'Peau sensible.' },
  ],
  packages: pricing.map((item, index) => ({ id: `pack-${index}`, name: item.name, type: item.label, price: item.price, status: 'Actif', discount: index === 1 ? '10%' : '0%' })),
  gallery: comparisons.flatMap((item, index) => [
    { id: `gallery-${index}-a`, name: `${item.title} - Avant`, category: 'Avant / Après', image: item.before, status: 'Publié' },
    { id: `gallery-${index}-b`, name: `${item.title} - Après`, category: 'Avant / Après', image: item.after, status: 'Publié' },
  ]),
  promotions: [
    { id: 'promo-1', name: 'Première visite', discount: '20%', expires: '2026-08-31', status: 'Active' },
    { id: 'promo-2', name: 'Rituel duo', discount: '15%', expires: '2026-07-15', status: 'Planifiée' },
  ],
  blog: articles.map((item, index) => ({ id: `article-${index}`, name: item.title, category: item.category, status: index === 2 ? 'Brouillon' : 'Publié', seo: 'Optimisé' })),
  testimonials: testimonials.map((item, index) => ({ id: `review-${index}`, name: item.name, detail: item.detail, content: item.quote, status: index === 2 ? 'En attente' : 'Approuvé' })),
  faq: faqItems.map(([question, answer], index) => ({ id: `faq-${index}`, name: question, content: answer, order: index + 1, status: 'Publié' })),
  roles: [
    { id: 'role-1', name: 'Claire Moreau', email: 'claire@maisonelara.fr', role: 'Super Admin', status: 'Actif' },
    { id: 'role-2', name: 'Amélie Laurent', email: 'amelie@maisonelara.fr', role: 'Admin', status: 'Actif' },
    { id: 'role-3', name: 'Sofia Renard', email: 'sofia@maisonelara.fr', role: 'Staff', status: 'Actif' },
  ],
  notifications: [
    { id: 'notif-1', name: 'Confirmation de réservation', channel: 'Email', status: 'Activée' },
    { id: 'notif-2', name: 'Rappel 24 heures avant', channel: 'WhatsApp', status: 'Préparée' },
    { id: 'notif-3', name: 'Nouveau message client', channel: 'Push', status: 'Activée' },
  ],
  content: [
    { id: 'content-1', name: 'Hero principal', section: 'Accueil', status: 'Publié' },
    { id: 'content-2', name: 'Présentation de la Maison', section: 'À propos', status: 'Publié' },
    { id: 'content-3', name: 'Coordonnées & footer', section: 'Footer', status: 'Publié' },
  ],
  security: [
    { id: 'security-1', name: 'Connexion réussie', detail: 'Paris, France · Chrome', createdAt: 'Aujourd’hui, 09:42', status: 'Sécurisé' },
    { id: 'security-2', name: 'Modification des tarifs', detail: 'Par Claire Moreau', createdAt: 'Hier, 18:16', status: 'Journalisé' },
    { id: 'security-3', name: 'Nouvelle session', detail: 'iPhone · Paris, France', createdAt: '05 juin, 11:03', status: 'Active' },
  ],
}

const adminNavigation = [
  { label: 'Pilotage', items: [['overview', LayoutDashboard, 'Vue d’ensemble'], ['reservations', CalendarDays, 'Réservations'], ['clients', Users, 'Clients']] },
  { label: 'Catalogue', items: [['services', Sparkles, 'Services'], ['packages', CreditCard, 'Tarifs & packs'], ['gallery', Image, 'Galerie'], ['promotions', Tag, 'Promotions']] },
  { label: 'Communication', items: [['messages', Mail, 'Messages'], ['notifications', Bell, 'Notifications'], ['blog', Newspaper, 'Blog'], ['testimonials', Quote, 'Témoignages'], ['faq', BookOpen, 'FAQ']] },
  { label: 'Configuration', items: [['content', PanelsTopLeft, 'Contenu du site'], ['business', Settings, 'Entreprise'], ['roles', UserCog, 'Rôles & accès'], ['security', LockKeyhole, 'Sécurité']] },
]

const moduleMeta = {
  packages: ['Tarifs & packages', 'Créez des offres rentables et cohérentes avec votre positionnement.', 'Nouveau package'],
  gallery: ['Galerie', 'Organisez vos albums et vos résultats avant / après.', 'Ajouter des images'],
  promotions: ['Promotions & remises', 'Planifiez vos offres et maîtrisez leur visibilité.', 'Créer une promotion'],
  notifications: ['Centre de notifications', 'Pilotez les alertes email, push et WhatsApp.', 'Nouvelle règle'],
  blog: ['Blog & conseils beauté', 'Publiez des contenus experts optimisés pour le référencement.', 'Nouvel article'],
  testimonials: ['Témoignages', 'Modérez et mettez en avant les retours de vos clientes.', 'Ajouter un avis'],
  faq: ['Questions fréquentes', 'Maintenez une FAQ claire, utile et bien ordonnée.', 'Ajouter une question'],
  content: ['Contenu du site', 'Gérez les sections éditoriales sans toucher au code.', 'Nouveau bloc'],
  roles: ['Utilisateurs & permissions', 'Contrôlez précisément les accès de votre équipe.', 'Inviter un membre'],
  security: ['Sécurité & audit', 'Surveillez les sessions, connexions et actions sensibles.', 'Exporter le journal'],
}

function AdminDashboard() {
  const [reservations, setReservations] = useStoredState(storeKeys.reservations, [])
  const [services, setServices] = useStoredState(storeKeys.services, defaultServices)
  const [settings, setSettings] = useStoredState(storeKeys.settings, {
    hours: 'Lun–Ven 09:00–19:30 · Sam 09:00–18:00',
    promotion: '−20 % sur votre premier soin Signature',
    photos: comparisons.map((item) => item.after),
  })
  const [messages, setMessages] = useStoredState(storeKeys.messages, [])
  const [suite, setSuite] = useStoredState(storeKeys.adminSuite, adminSeed)
  const [active, setActive] = useState('overview')
  const [dark, setDark] = useState(() => readStore('maison-elara-admin-theme', 'light') === 'dark')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('Tous')
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    document.title = 'Dashboard | Maison Elara Paris'
  }, [])

  useEffect(() => {
    writeStore('maison-elara-admin-theme', dark ? 'dark' : 'light')
  }, [dark])

  const clients = useMemo(() => {
    const collected = new Map()
    ;(suite.clients || []).forEach((item) => collected.set(item.email || item.id, item))
    reservations.forEach((item) => {
      const key = item.email || item.phone || item.name
      const existing = collected.get(key) || { id: key, name: item.name, email: item.email, phone: item.phone, visits: 0, spent: 0, lastVisit: item.date, notes: item.message || '' }
      existing.visits += 1
      existing.spent += services.find((service) => service.title === item.service)?.price || 95
      existing.lastVisit = item.date || existing.lastVisit
      collected.set(key, existing)
    })
    return [...collected.values()]
  }, [reservations, services, suite.clients])

  const today = new Date().toISOString().slice(0, 10)
  const revenue = reservations.filter((item) => !['Annulée', 'Cancelled'].includes(item.status)).reduce((sum, item) => sum + (services.find((service) => service.title === item.service)?.price || 95), 0)
  const notify = (message, type = 'success') => {
    setToast({ message, type })
    window.setTimeout(() => setToast(null), 2800)
  }
  const navigate = (id) => {
    setActive(id)
    setQuery('')
    setFilter('Tous')
    setPage(1)
    setSidebarOpen(false)
  }
  const updateReservation = (id, status) => {
    setReservations((current) => current.map((item) => item.id === id ? { ...item, status } : item))
    notify(`Réservation ${status.toLowerCase()}.`)
  }
  const removeReservation = (id) => setModal({ type: 'confirm', title: 'Supprimer cette réservation ?', text: 'Cette action retirera définitivement la demande.', onConfirm: () => { setReservations((current) => current.filter((item) => item.id !== id)); setModal(null); notify('Réservation supprimée.') } })
  const saveService = (record) => {
    setServices((current) => record.id ? current.map((item) => item.id === record.id ? record : item) : [...current, { ...record, id: crypto.randomUUID() }])
    setModal(null)
    notify('Service enregistré.')
  }
  const removeService = (id) => setModal({ type: 'confirm', title: 'Supprimer ce service ?', text: 'Il disparaîtra du catalogue public.', onConfirm: () => { setServices((current) => current.filter((item) => item.id !== id)); setModal(null); notify('Service supprimé.') } })
  const saveGeneric = (module, record) => {
    setSuite((current) => ({ ...current, [module]: record.id ? current[module].map((item) => item.id === record.id ? record : item) : [{ ...record, id: crypto.randomUUID() }, ...current[module]] }))
    setModal(null)
    notify('Élément enregistré.')
  }
  const saveReservation = (record) => {
    setReservations((current) => [{ ...record, id: crypto.randomUUID(), status: 'Nouvelle', createdAt: new Date().toISOString() }, ...current])
    setModal(null)
    notify('Nouvelle réservation enregistrée.')
  }
  const saveClient = (record) => {
    setSuite((current) => ({ ...current, clients: [{ ...record, id: crypto.randomUUID(), visits: 0, spent: 0, lastVisit: '—' }, ...(current.clients || [])] }))
    setModal(null)
    notify('Nouvelle cliente ajoutée.')
  }
  const removeGeneric = (module, id) => setModal({ type: 'confirm', title: 'Confirmer la suppression ?', text: 'Cette action est irréversible.', onConfirm: () => { setSuite((current) => ({ ...current, [module]: current[module].filter((item) => item.id !== id) })); setModal(null); notify('Élément supprimé.') } })

  const title = adminNavigation.flatMap((group) => group.items).find(([id]) => id === active)?.[2] || 'Vue d’ensemble'

  return (
    <div className={`saas-admin ${dark ? 'is-dark' : ''}`}>
      <aside className={`saas-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="saas-brand"><Logo light /><button onClick={() => setSidebarOpen(false)}><X /></button></div>
        <nav>
          {adminNavigation.map((group) => (
            <div className="nav-group" key={group.label}>
              <span>{group.label}</span>
              {group.items.map(([id, Icon, label]) => (
                <button className={active === id ? 'active' : ''} onClick={() => navigate(id)} key={id}>
                  <Icon /><b>{label}</b>
                  {id === 'reservations' && reservations.filter((item) => ['Nouvelle', 'Pending'].includes(item.status)).length > 0 && <em>{reservations.filter((item) => ['Nouvelle', 'Pending'].includes(item.status)).length}</em>}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-profile">
          <span>CM</span><div><strong>Claire Moreau</strong><small>Super Admin</small></div><MoreHorizontal />
        </div>
      </aside>

      <div className="saas-workspace">
        <header className="saas-topbar">
          <button className="mobile-nav-button" onClick={() => setSidebarOpen(true)}><Menu /></button>
          <div className="topbar-title"><small>Administration</small><strong>{title}</strong></div>
          <label className="global-search"><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher partout..." /><kbd>⌘ K</kbd></label>
          <div className="topbar-actions">
            <button onClick={() => setDark((current) => !current)} aria-label="Changer de thème">{dark ? <Sun /> : <Moon />}</button>
            <button className="notification-button" onClick={() => navigate('notifications')} aria-label="Notifications"><Bell /><span /></button>
            <Link to="/" aria-label="Voir le site"><Eye /></Link>
            <button className="profile-button">CM</button>
          </div>
        </header>

        <main className="saas-main">
          {active === 'overview' && <AdminOverview reservations={reservations} clients={clients} revenue={revenue} today={today} navigate={navigate} />}
          {active === 'reservations' && <ReservationsModule records={reservations} query={query} filter={filter} setFilter={setFilter} page={page} setPage={setPage} updateStatus={updateReservation} remove={removeReservation} openModal={setModal} />}
          {active === 'clients' && <ClientsModule clients={clients} query={query} openModal={setModal} />}
          {active === 'services' && <ServicesModule services={services} query={query} openModal={setModal} remove={removeService} />}
          {active === 'messages' && <MessagesModule messages={messages} setMessages={setMessages} query={query} notify={notify} />}
          {active === 'business' && <BusinessSettings settings={settings} setSettings={setSettings} notify={notify} />}
          {moduleMeta[active] && <GenericModule module={active} records={suite[active] || []} query={query} filter={filter} setFilter={setFilter} openModal={setModal} remove={removeGeneric} />}
        </main>
      </div>
      {sidebarOpen && <button className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} aria-label="Fermer le menu" />}
      <AnimatePresence>{modal && <AdminModal modal={modal} close={() => setModal(null)} saveService={saveService} saveGeneric={saveGeneric} saveReservation={saveReservation} saveClient={saveClient} services={services} />}</AnimatePresence>
      <AnimatePresence>{toast && <motion.div className={`saas-toast ${toast.type}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}><Check /> {toast.message}</motion.div>}</AnimatePresence>
    </div>
  )
}

function AdminOverview({ reservations, clients, revenue, today, navigate }) {
  const seededReservations = reservations.length || 48
  const seededRevenue = revenue || 18740
  const stats = [
    [Users, 'Clients actifs', clients.length || 1264, '+12,5%', 'vs. mois dernier'],
    [CalendarDays, 'Réservations', seededReservations, '+8,2%', 'ce mois-ci'],
    [Clock3, 'Aujourd’hui', reservations.filter((item) => item.date === today).length || 6, '3 à venir', 'planning du jour'],
    [TrendingUp, 'Chiffre d’affaires', `${seededRevenue.toLocaleString('fr-FR')} €`, '+18,4%', 'vs. mois dernier'],
  ]
  const chart = [42, 54, 49, 68, 61, 76, 72, 88, 81, 96, 91, 108]
  const upcoming = reservations.slice(0, 4)
  const fallback = [
    { id: 'up-1', name: 'Sophie Martin', service: 'Soin visage Signature', time: '10:30', status: 'Confirmée' },
    { id: 'up-2', name: 'Inès Laurent', service: 'Massage relaxant', time: '12:00', status: 'Nouvelle' },
    { id: 'up-3', name: 'Camille Robert', service: 'Beauté du regard', time: '14:30', status: 'Confirmée' },
  ]
  const list = upcoming.length ? upcoming : fallback
  return (
    <div className="dashboard-view">
      <section className="welcome-row"><div><span>Dimanche 7 juin 2026</span><h1>Bonjour Claire,</h1><p>Voici ce qui se passe chez Maison Elara aujourd’hui.</p></div><button className="primary-action" onClick={() => navigate('reservations')}><Plus /> Nouvelle réservation</button></section>
      <section className="metric-grid">{stats.map(([Icon, label, value, trend, note]) => <article className="metric-card" key={label}><div className="metric-icon"><Icon /></div><div className="metric-copy"><span>{label}</span><strong>{value}</strong><small><b>{trend}</b> {note}</small></div><Activity /></article>)}</section>
      <section className="analytics-grid">
        <article className="saas-card chart-card">
          <div className="card-heading"><div><span>Performance</span><h2>Revenus mensuels</h2></div><select><option>12 derniers mois</option><option>6 derniers mois</option></select></div>
          <div className="chart-total"><strong>{seededRevenue.toLocaleString('fr-FR')} €</strong><span><TrendingUp /> +18,4%</span></div>
          <div className="line-chart">
          <div className="chart-labels"><span>20k</span><span>15k</span><span>10k</span><span>5k</span><span>0</span></div>
            <svg viewBox="0 0 660 220" preserveAspectRatio="none" aria-label="Évolution du chiffre d’affaires"><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#b5965c" stopOpacity=".28" /><stop offset="100%" stopColor="#b5965c" stopOpacity="0" /></linearGradient></defs><path d={`M 0 ${220-chart[0]} ${chart.map((value, index) => `L ${index * 60} ${220-value * 1.65}`).join(' ')} L 660 220 Z`} fill="url(#chartFill)" /><path d={`M 0 ${220-chart[0]} ${chart.map((value, index) => `L ${index * 60} ${220-value * 1.65}`).join(' ')}`} fill="none" stroke="#b5965c" strokeWidth="3" vectorEffect="non-scaling-stroke" /></svg>
            <div className="month-labels">{['Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc', 'Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin'].map((month) => <span key={month}>{month}</span>)}</div>
          </div>
        </article>
        <article className="saas-card donut-card">
          <div className="card-heading"><div><span>Répartition</span><h2>Services populaires</h2></div><button><MoreHorizontal /></button></div>
          <div className="donut-wrap"><div className="donut"><div><strong>{seededReservations}</strong><span>soins</span></div></div></div>
          <div className="legend"><span><i className="gold" />Soins visage <b>42%</b></span><span><i className="black" />Massages <b>28%</b></span><span><i className="beige" />Beauté regard <b>18%</b></span><span><i className="pale" />Autres <b>12%</b></span></div>
        </article>
      </section>
      <section className="overview-bottom">
        <article className="saas-card upcoming-card"><div className="card-heading"><div><span>Planning</span><h2>Prochains rendez-vous</h2></div><button className="text-action" onClick={() => navigate('reservations')}>Tout voir <ArrowRight /></button></div>{list.map((item) => <div className="appointment-line" key={item.id}><div className="time-block"><strong>{item.time || '10:00'}</strong><small>{item.date ? new Date(item.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }) : 'Aujourd’hui'}</small></div><span className="client-avatar">{item.name?.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span><div><strong>{item.name}</strong><small>{item.service}</small></div><StatusBadge value={item.status || 'Nouvelle'} /></div>)}</article>
        <article className="saas-card activity-card"><div className="card-heading"><div><span>Flux en direct</span><h2>Activité récente</h2></div><button><MoreHorizontal /></button></div>{[['CalendarDays', 'Nouvelle réservation', 'Sophie M. · Soin visage', 'Il y a 8 min'], ['CreditCard', 'Paiement reçu', '289 € · Pack Signature', 'Il y a 32 min'], ['Star', 'Nouvel avis 5 étoiles', '“Une expérience parfaite”', 'Il y a 1 h'], ['UserRound', 'Nouvelle cliente', 'Camille R. a créé son profil', 'Il y a 2 h']].map(([type, label, detail, time]) => <div className="activity-line" key={label}><span>{type === 'Star' ? <Star /> : type === 'CreditCard' ? <CreditCard /> : type === 'UserRound' ? <UserRound /> : <CalendarDays />}</span><div><strong>{label}</strong><small>{detail}</small></div><time>{time}</time></div>)}</article>
      </section>
    </div>
  )
}

function ModuleHeader({ eyebrow, title, text, action, onAction, children }) {
  return <><section className="module-header"><div><span>{eyebrow}</span><h1>{title}</h1><p>{text}</p></div>{action && <button className="primary-action" onClick={onAction}><Plus /> {action}</button>}</section>{children}</>
}

function Toolbar({ query, filter, setFilter, filters = ['Tous', 'Pending', 'Confirmed', 'Completed', 'Cancelled'] }) {
  return <div className="module-toolbar"><div className="toolbar-search"><Search /><span>{query ? `Résultats pour “${query}”` : 'Recherche instantanée active'}</span></div><div className="filter-tabs">{filters.map((item) => <button className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div><button className="icon-action"><Filter /></button></div>
}

function ReservationsModule({ records, query, filter, setFilter, page, setPage, updateStatus, remove, openModal }) {
  const normalized = records.map((item) => ({ ...item, status: item.status || 'Pending' }))
  const filtered = normalized.filter((item) => (filter === 'Tous' || item.status.toLowerCase().includes(filter.toLowerCase().replace('pending', 'nouvelle').replace('confirmed', 'confirmée').replace('completed', 'terminée').replace('cancelled', 'annulée'))) && JSON.stringify(item).toLowerCase().includes(query.toLowerCase()))
  const pageSize = 7
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize)
  return (
    <ModuleHeader eyebrow="Opérations" title="Réservations" text="Gérez chaque rendez-vous depuis la demande jusqu’au suivi client." action="Nouvelle réservation" onAction={() => openModal({ type: 'reservation' })}>
      <Toolbar query={query} filter={filter} setFilter={setFilter} />
      <section className="saas-card data-card">
        <div className="table-scroll"><table className="saas-table"><thead><tr><th>Cliente</th><th>Service</th><th>Date & heure</th><th>Statut</th><th>Contact</th><th /></tr></thead><tbody>{visible.map((item) => <tr key={item.id}><td><div className="person-cell"><span>{item.name?.slice(0, 2).toUpperCase()}</span><div><strong>{item.name}</strong><small>{item.email}</small></div></div></td><td><strong>{item.service}</strong><small>{servicesPriceLabel(item.service)}</small></td><td><strong>{item.date || 'À planifier'}</strong><small>{item.time || 'Horaire flexible'}</small></td><td><select className="status-select" value={item.status} onChange={(event) => updateStatus(item.id, event.target.value)}><option>Nouvelle</option><option>Pending</option><option>Confirmée</option><option>Confirmed</option><option>Terminée</option><option>Completed</option><option>Annulée</option><option>Cancelled</option></select></td><td><div className="inline-actions"><a href={`mailto:${item.email}`}><Mail /></a><a href={`https://wa.me/${(item.phone || '').replace(/\D/g, '')}`} target="_blank" rel="noreferrer"><MessageCircle /></a></div></td><td><button className="danger-ghost" onClick={() => remove(item.id)}><Trash2 /></button></td></tr>)}</tbody></table></div>
        {!visible.length && <AdminEmpty icon={CalendarDays} title="Aucune réservation trouvée" text="Modifiez les filtres ou créez une nouvelle réservation." />}
        <Pagination page={page} setPage={setPage} total={filtered.length} pageSize={pageSize} />
      </section>
      <section className="mini-calendar saas-card"><div className="card-heading"><div><span>Vue calendrier</span><h2>Juin 2026</h2></div><div className="inline-actions"><button><ChevronLeft /></button><button><ChevronRight /></button></div></div><div className="calendar-grid">{['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'].map((day) => <b key={day}>{day}</b>)}{Array.from({ length: 35 }, (_, index) => <button className={index + 1 === 7 ? 'today' : [4, 9, 12, 18, 22].includes(index) ? 'has-event' : ''} key={index}>{index < 30 ? index + 1 : index - 29}</button>)}</div></section>
    </ModuleHeader>
  )
}

function servicesPriceLabel(service) {
  return service ? 'Prestation Maison Elara' : 'Service personnalisé'
}

function ClientsModule({ clients, query, openModal }) {
  const filtered = clients.filter((item) => JSON.stringify(item).toLowerCase().includes(query.toLowerCase()))
  return <ModuleHeader eyebrow="Relation client" title="Clientes" text="Retrouvez les profils, habitudes, historique et notes de suivi." action="Nouvelle cliente" onAction={() => openModal({ type: 'client' })}><section className="client-grid">{filtered.map((client) => <article className="client-card saas-card" key={client.id}><div className="client-card-head"><span>{client.name.split(' ').map((part) => part[0]).join('').slice(0,2)}</span><StatusBadge value="VIP" /><button><MoreHorizontal /></button></div><h3>{client.name}</h3><p>{client.email}<br />{client.phone}</p><div className="client-metrics"><span><strong>{client.visits}</strong>visites</span><span><strong>{client.spent} €</strong>dépensés</span><span><strong>{client.lastVisit || '—'}</strong>dernière visite</span></div><div className="client-note">{client.notes || 'Aucune note particulière.'}</div><button className="secondary-action" onClick={() => openModal({ type: 'clientView', record: client })}>Voir le profil <ArrowRight /></button></article>)}</section>{!filtered.length && <AdminEmpty icon={Users} title="Aucune cliente trouvée" text="Essayez une autre recherche." />}</ModuleHeader>
}

function ServicesModule({ services, query, openModal, remove }) {
  const filtered = services.filter((item) => JSON.stringify(item).toLowerCase().includes(query.toLowerCase()))
  return <ModuleHeader eyebrow="Catalogue" title="Services" text="Créez et optimisez votre carte de prestations." action="Créer un service" onAction={() => openModal({ type: 'service' })}><section className="service-admin-grid">{filtered.map((service) => <article className="service-admin-card saas-card" key={service.id}><div className="service-admin-image"><img src={service.image} alt={service.title} /><span>Actif</span></div><div className="service-admin-body"><small>{service.duration}</small><h3>{service.title}</h3><p>{service.text}</p><div><strong>{service.price} €</strong><span><button onClick={() => openModal({ type: 'service', record: service })}><Edit3 /></button><button onClick={() => remove(service.id)}><Trash2 /></button></span></div></div></article>)}</section></ModuleHeader>
}

function MessagesModule({ messages, setMessages, query, notify }) {
  const records = messages.length ? messages : [{ id: 'msg-demo', name: 'Élodie Bernard', email: 'elodie@example.fr', message: 'Bonjour, je souhaiterais un conseil avant de choisir mon soin visage.', createdAt: new Date().toISOString(), status: 'Nouveau' }]
  const filtered = records.filter((item) => JSON.stringify(item).toLowerCase().includes(query.toLowerCase()))
  const mark = (id, status) => { setMessages(records.map((item) => item.id === id ? { ...item, status } : item)); notify(status === 'Archivé' ? 'Message archivé.' : 'Message marqué comme lu.') }
  return <ModuleHeader eyebrow="Conciergerie" title="Messages clients" text="Centralisez les demandes et assurez un suivi attentionné."><section className="message-layout"><div className="message-list saas-card">{filtered.map((message, index) => <button className={index === 0 ? 'active' : ''} key={message.id}><span>{message.name.slice(0,2).toUpperCase()}</span><div><strong>{message.name}</strong><p>{message.message}</p><small>{new Date(message.createdAt).toLocaleDateString('fr-FR')}</small></div>{message.status !== 'Lu' && <i />}</button>)}</div><article className="message-reader saas-card">{filtered[0] ? <><div className="message-reader-head"><div className="person-cell"><span>{filtered[0].name.slice(0,2).toUpperCase()}</span><div><strong>{filtered[0].name}</strong><small>{filtered[0].email}</small></div></div><div className="inline-actions"><button onClick={() => mark(filtered[0].id, 'Lu')}><Eye /></button><button onClick={() => mark(filtered[0].id, 'Archivé')}><Archive /></button></div></div><p>{filtered[0].message}</p><div className="reply-box"><textarea placeholder="Rédiger une réponse personnalisée..." /><button className="primary-action"><Send /> Envoyer</button></div></> : <AdminEmpty icon={Mail} title="Aucun message" text="Les nouvelles demandes apparaîtront ici." />}</article></section></ModuleHeader>
}

function BusinessSettings({ settings, setSettings, notify }) {
  const [draft, setDraft] = useState({ ...settings, company: 'Maison Elara Paris', phone: '+33 1 42 88 56 78', email: 'bonjour@maisonelara.fr', address: '18 rue de la Beauté, 75008 Paris', instagram: '@maisonelara.paris' })
  const save = () => { setSettings({ ...settings, ...draft }); notify('Paramètres de l’entreprise enregistrés.') }
  return <ModuleHeader eyebrow="Configuration" title="Paramètres de l’entreprise" text="Centralisez les informations qui alimentent votre site et vos communications."><section className="settings-layout"><aside className="settings-nav saas-card"><button className="active"><Settings /> Informations générales</button><button><Clock3 /> Horaires</button><button><MapPin /> Localisation</button><button><MessageCircle /> Réseaux sociaux</button><button><UploadCloud /> Identité visuelle</button></aside><div className="settings-form saas-card"><div className="logo-upload"><div className="logo-preview">ME</div><div><strong>Logo de l’entreprise</strong><p>PNG ou SVG, 2 Mo maximum.</p><button className="secondary-action"><UploadCloud /> Remplacer</button></div></div><div className="form-grid-admin">{[['company','Nom de l’entreprise'],['phone','Téléphone'],['email','Adresse e-mail'],['address','Adresse'],['hours','Horaires d’ouverture'],['instagram','Instagram']].map(([field,label]) => <label key={field}>{label}<input value={draft[field] || ''} onChange={(event) => setDraft({ ...draft, [field]: event.target.value })} /></label>)}</div><div className="form-footer"><button className="primary-action" onClick={save}><Save /> Enregistrer les modifications</button></div></div></section></ModuleHeader>
}

function GenericModule({ module, records, query, filter, setFilter, openModal, remove }) {
  const [title, text, action] = moduleMeta[module]
  const statuses = ['Tous', ...new Set(records.map((record) => record.status).filter(Boolean))]
  const filtered = records.filter((record) => (filter === 'Tous' || record.status === filter) && JSON.stringify(record).toLowerCase().includes(query.toLowerCase()))
  if (module === 'gallery') return <ModuleHeader eyebrow="Médiathèque" title={title} text={text} action={action} onAction={() => openModal({ type: 'generic', module })}><div className="drop-zone"><UploadCloud /><strong>Glissez-déposez vos images ici</strong><p>JPG, PNG ou WebP · 10 Mo maximum par fichier</p><button className="secondary-action">Parcourir les fichiers</button></div><section className="gallery-admin-grid">{filtered.map((record) => <article key={record.id}><img src={record.image} alt={record.name} /><div><strong>{record.name}</strong><small>{record.category}</small><span><button onClick={() => openModal({ type: 'generic', module, record })}><Edit3 /></button><button onClick={() => remove(module, record.id)}><Trash2 /></button></span></div></article>)}</section></ModuleHeader>
  if (module === 'security') return <ModuleHeader eyebrow="Protection" title={title} text={text} action={action} onAction={() => notifyUndefined()}><section className="security-grid"><article className="security-score saas-card"><ShieldCheck /><div><strong>92</strong><span>/100</span></div><h3>Excellent niveau de sécurité</h3><p>L’authentification forte et la journalisation sont actives.</p><button className="secondary-action">Renforcer la sécurité</button></article><article className="saas-card audit-list"><div className="card-heading"><div><span>Audit</span><h2>Activité de sécurité</h2></div></div>{records.map((record) => <div className="audit-line" key={record.id}><span><LockKeyhole /></span><div><strong>{record.name}</strong><small>{record.detail}</small></div><time>{record.createdAt}</time><StatusBadge value={record.status} /></div>)}</article></section></ModuleHeader>
  return <ModuleHeader eyebrow="Gestion" title={title} text={text} action={action} onAction={() => openModal({ type: 'generic', module })}><Toolbar query={query} filter={filter} setFilter={setFilter} filters={statuses} /><section className="saas-card data-card"><div className="table-scroll"><table className="saas-table"><thead><tr><th>Nom</th><th>Détails</th><th>Statut</th><th>Dernière modification</th><th /></tr></thead><tbody>{filtered.map((record) => <tr key={record.id}><td><strong>{record.name}</strong><small>{record.email || record.category || record.type || record.section || record.channel}</small></td><td>{record.price ? `${record.price} €` : record.discount || record.detail || record.content?.slice(0,50) || record.role || record.seo || '—'}</td><td><StatusBadge value={record.status || 'Actif'} /></td><td><small>Aujourd’hui, 10:24</small></td><td><div className="inline-actions"><button onClick={() => openModal({ type: 'generic', module, record })}><Edit3 /></button><button onClick={() => remove(module, record.id)}><Trash2 /></button></div></td></tr>)}</tbody></table></div>{!filtered.length && <AdminEmpty icon={FileText} title="Aucun élément" text="Créez votre premier contenu pour commencer." />}</section></ModuleHeader>
}

function notifyUndefined() {}

function StatusBadge({ value }) {
  const normalized = String(value || '').toLowerCase()
  const tone = normalized.includes('confirm') || normalized.includes('actif') || normalized.includes('publié') || normalized.includes('approuvé') || normalized.includes('sécur') ? 'success' : normalized.includes('annul') || normalized.includes('rejet') ? 'danger' : normalized.includes('termin') || normalized.includes('completed') || normalized.includes('archiv') ? 'neutral' : 'warning'
  return <span className={`status-badge ${tone}`}><i />{value}</span>
}

function Pagination({ page, setPage, total, pageSize }) {
  const pages = Math.max(1, Math.ceil(total / pageSize))
  return <div className="pagination"><span>{total} résultat{total > 1 ? 's' : ''}</span><div><button disabled={page === 1} onClick={() => setPage(page - 1)}><ChevronLeft /></button>{Array.from({ length: pages }, (_, index) => <button className={page === index + 1 ? 'active' : ''} onClick={() => setPage(index + 1)} key={index}>{index + 1}</button>)}<button disabled={page === pages} onClick={() => setPage(page + 1)}><ChevronRight /></button></div></div>
}

function AdminEmpty({ icon: Icon, title, text }) {
  return <div className="saas-empty"><span><Icon /></span><h3>{title}</h3><p>{text}</p></div>
}

function AdminModal({ modal, close, saveService, saveGeneric, saveReservation, saveClient, services }) {
  const [form, setForm] = useState(modal.record || {})
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))
  if (modal.type === 'confirm') return <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={close}><motion.div className="confirm-modal" initial={{ scale: .96, y: 12 }} animate={{ scale: 1, y: 0 }} onMouseDown={(event) => event.stopPropagation()}><span className="modal-warning"><Trash2 /></span><h2>{modal.title}</h2><p>{modal.text}</p><div><button className="secondary-action" onClick={close}>Annuler</button><button className="danger-action" onClick={modal.onConfirm}>Supprimer</button></div></motion.div></motion.div>
  if (modal.type === 'clientView') return <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={close}><motion.div className="admin-modal client-detail-modal" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={close}><X /></button><span className="large-avatar">{modal.record.name.slice(0,2).toUpperCase()}</span><h2>{modal.record.name}</h2><p>{modal.record.email} · {modal.record.phone}</p><div className="client-metrics"><span><strong>{modal.record.visits}</strong> visites</span><span><strong>{modal.record.spent} €</strong> dépensés</span></div><label>Notes privées<textarea defaultValue={modal.record.notes} /></label><button className="primary-action" onClick={close}><Save /> Enregistrer</button></motion.div></motion.div>
  const isService = modal.type === 'service'
  const isGeneric = modal.type === 'generic'
  const title = isService ? (modal.record ? 'Modifier le service' : 'Créer un service') : isGeneric ? (modal.record ? 'Modifier l’élément' : 'Créer un élément') : modal.type === 'reservation' ? 'Nouvelle réservation' : 'Nouvelle cliente'
  const submit = (event) => {
    event.preventDefault()
    if (isService) saveService({ id: form.id, title: form.title || 'Nouveau service', price: Number(form.price || 95), duration: form.duration || '60 min', image: form.image || images.portrait, text: form.text || 'Description du service à personnaliser.' })
    else if (isGeneric) saveGeneric(modal.module, { ...form, name: form.name || 'Nouvel élément', status: form.status || 'Actif' })
    else if (modal.type === 'reservation') saveReservation({ name: form.name, email: form.email, phone: form.phone, service: form.service || services[0]?.title, date: form.date, time: form.time, message: form.message || '' })
    else if (modal.type === 'client') saveClient({ name: form.name, email: form.email, phone: form.phone, notes: form.notes || '' })
  }
  return <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={close}><motion.form className="admin-modal" initial={{ scale: .97, y: 16 }} animate={{ scale: 1, y: 0 }} onMouseDown={(event) => event.stopPropagation()} onSubmit={submit}><div className="modal-heading"><div><span>Maison Elara</span><h2>{title}</h2></div><button type="button" onClick={close}><X /></button></div><div className="modal-form-grid"><label>Nom / titre<input value={form.title || form.name || ''} onChange={(event) => update(isService ? 'title' : 'name', event.target.value)} required /></label>{isService && <><label>Prix (€)<input type="number" value={form.price || ''} onChange={(event) => update('price', event.target.value)} /></label><label>Durée<input value={form.duration || ''} onChange={(event) => update('duration', event.target.value)} /></label><label>URL de l’image<input value={form.image || ''} onChange={(event) => update('image', event.target.value)} /></label><label className="full">Description<textarea value={form.text || ''} onChange={(event) => update('text', event.target.value)} /></label></>}{isGeneric && <><label>Statut<select value={form.status || 'Actif'} onChange={(event) => update('status', event.target.value)}><option>Actif</option><option>Publié</option><option>Brouillon</option><option>En attente</option><option>Archivé</option></select></label><label>Détail<input value={form.detail || form.category || ''} onChange={(event) => update('detail', event.target.value)} /></label><label className="full">Contenu<textarea value={form.content || ''} onChange={(event) => update('content', event.target.value)} /></label></>}{modal.type === 'reservation' && <><label>E-mail<input type="email" value={form.email || ''} onChange={(event) => update('email', event.target.value)} required /></label><label>Téléphone<input value={form.phone || ''} onChange={(event) => update('phone', event.target.value)} required /></label><label>Service<select value={form.service || services[0]?.title} onChange={(event) => update('service', event.target.value)}>{services.map((service) => <option key={service.id}>{service.title}</option>)}</select></label><label>Date<input type="date" value={form.date || ''} onChange={(event) => update('date', event.target.value)} required /></label><label>Heure<input type="time" value={form.time || ''} onChange={(event) => update('time', event.target.value)} required /></label><label className="full">Note<textarea value={form.message || ''} onChange={(event) => update('message', event.target.value)} /></label></>}{modal.type === 'client' && <><label>E-mail<input type="email" value={form.email || ''} onChange={(event) => update('email', event.target.value)} required /></label><label>Téléphone<input value={form.phone || ''} onChange={(event) => update('phone', event.target.value)} required /></label><label className="full">Notes privées<textarea value={form.notes || ''} onChange={(event) => update('notes', event.target.value)} /></label></>}</div><div className="modal-footer"><button type="button" className="secondary-action" onClick={close}>Annuler</button><button className="primary-action"><Save /> Enregistrer</button></div></motion.form></motion.div>
}

function StructuredData() {
  const schema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: 'Maison Elara Paris',
    image: images.hero,
    telephone: '+33 1 42 88 56 78',
    email: 'bonjour@maisonelara.fr',
    address: { '@type': 'PostalAddress', streetAddress: '18 rue de la Beauté', postalCode: '75008', addressLocality: 'Paris', addressCountry: 'FR' },
    priceRange: '€€€',
    openingHours: ['Mo-Fr 09:00-19:30', 'Sa 09:00-18:00'],
  }), [])
  return <script type="application/ld+json">{JSON.stringify(schema)}</script>
}

function AppRoutes() {
  const location = useLocation()
  useEffect(() => window.scrollTo(0, 0), [location.pathname])
  return <Routes><Route path="/" element={<HomePage />} /><Route path="/admin" element={<AdminDashboard />} /></Routes>
}

export default function App() {
  return <BrowserRouter><AppRoutes /></BrowserRouter>
}
