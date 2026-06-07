import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Award,
  CalendarDays,
  Camera,
  Check,
  ChevronDown,
  Clock3,
  Gem,
  Heart,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PackageCheck,
  Phone,
  Save,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
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

function AdminDashboard() {
  const [reservations, setReservations] = useStoredState(storeKeys.reservations, [])
  const [services, setServices] = useStoredState(storeKeys.services, defaultServices)
  const [settings, setSettings] = useStoredState(storeKeys.settings, {
    hours: 'Lun–Ven 09:00–19:30 · Sam 09:00–18:00',
    promotion: '−20 % sur votre premier soin Signature',
    photos: comparisons.map((item) => item.after),
  })
  const [messages] = useStoredState(storeKeys.messages, [])
  const [active, setActive] = useState('reservations')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    document.title = 'Administration | Maison Elara Paris'
  }, [])

  const updateReservation = (id, status) => setReservations((current) => current.map((item) => item.id === id ? { ...item, status } : item))
  const deleteReservation = (id) => setReservations((current) => current.filter((item) => item.id !== id))
  const updateService = (id, field, value) => setServices((current) => current.map((item) => item.id === id ? { ...item, [field]: field === 'price' ? Number(value) : value } : item))
  const saveNotice = () => {
    setNotice('Modifications enregistrées.')
    window.setTimeout(() => setNotice(''), 2500)
  }

  const tabs = [
    ['reservations', CalendarDays, 'Réservations'],
    ['services', Sparkles, 'Services & prix'],
    ['photos', Camera, 'Photos'],
    ['hours', Clock3, 'Horaires'],
    ['promotions', PackageCheck, 'Promotions'],
    ['messages', Mail, 'Messages clients'],
  ]

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link to="/"><Logo light /></Link>
        <nav>{tabs.map(([id, Icon, label]) => <button className={active === id ? 'active' : ''} onClick={() => setActive(id)} key={id}><Icon /> {label}{id === 'reservations' && <span>{reservations.length}</span>}</button>)}</nav>
        <Link className="back-site" to="/">Voir le site <ArrowRight /></Link>
      </aside>
      <main className="admin-main">
        <header><div><span>Maison Elara Paris</span><h1>Tableau de bord</h1></div><div className="admin-profile">ME</div></header>
        <div className="admin-stats">
          <article><span>Réservations</span><strong>{reservations.length}</strong><small>Demandes enregistrées</small></article>
          <article><span>À confirmer</span><strong>{reservations.filter((item) => item.status === 'Nouvelle').length}</strong><small>Action recommandée</small></article>
          <article><span>Services actifs</span><strong>{services.length}</strong><small>Catalogue en ligne</small></article>
          <article><span>Messages</span><strong>{messages.length}</strong><small>Demandes clients</small></article>
        </div>

        <section className="admin-panel">
          {active === 'reservations' && (
            <>
              <div className="panel-title"><div><span>Gestion</span><h2>Réservations</h2></div><button className="admin-save" onClick={saveNotice}><Save /> Actualiser</button></div>
              <div className="reservation-table">
                {reservations.length === 0 && <div className="empty-state"><CalendarDays /><h3>Aucune réservation</h3><p>Les nouvelles demandes apparaîtront automatiquement ici.</p></div>}
                {reservations.map((item) => {
                  const message = encodeURIComponent(`Bonjour ${item.name}, votre demande de rendez-vous ${item.service} le ${item.date} à ${item.time} a bien été reçue par Maison Elara Paris.`)
                  return (
                    <article className="reservation-row" key={item.id}>
                      <div><strong>{item.name}</strong><small>{item.email} · {item.phone}</small></div>
                      <div><strong>{item.service}</strong><small>{item.date} à {item.time}</small></div>
                      <select value={item.status} onChange={(e) => updateReservation(item.id, e.target.value)}><option>Nouvelle</option><option>Confirmée</option><option>Terminée</option><option>Annulée</option></select>
                      <div className="row-actions">
                        <a href={`mailto:${item.email}?subject=Votre rendez-vous Maison Elara&body=${message}`} aria-label="Notifier par e-mail"><Mail /></a>
                        <a href={`https://wa.me/${item.phone.replace(/\D/g, '')}?text=${message}`} target="_blank" rel="noreferrer" aria-label="Notifier par WhatsApp"><MessageCircle /></a>
                        <button onClick={() => deleteReservation(item.id)} aria-label="Supprimer"><Trash2 /></button>
                      </div>
                    </article>
                  )
                })}
              </div>
            </>
          )}

          {active === 'services' && (
            <>
              <div className="panel-title"><div><span>Catalogue</span><h2>Services & tarifs</h2></div><button className="admin-save" onClick={saveNotice}><Save /> Enregistrer</button></div>
              <div className="service-editor">{services.map((service) => <article key={service.id}><img src={service.image} alt="" /><input value={service.title} onChange={(e) => updateService(service.id, 'title', e.target.value)} /><label>Prix (€)<input type="number" value={service.price} onChange={(e) => updateService(service.id, 'price', e.target.value)} /></label><label>Durée<input value={service.duration} onChange={(e) => updateService(service.id, 'duration', e.target.value)} /></label></article>)}</div>
            </>
          )}

          {active === 'photos' && <SettingsEditor title="Photos & réalisations" label="URLs des photos, une par ligne" value={settings.photos.join('\n')} onChange={(value) => setSettings({ ...settings, photos: value.split('\n').filter(Boolean) })} onSave={saveNotice} />}
          {active === 'hours' && <SettingsEditor title="Horaires d’ouverture" label="Horaires affichés sur le site" value={settings.hours} onChange={(value) => setSettings({ ...settings, hours: value })} onSave={saveNotice} />}
          {active === 'promotions' && <SettingsEditor title="Promotions" label="Offre actuellement mise en avant" value={settings.promotion} onChange={(value) => setSettings({ ...settings, promotion: value })} onSave={saveNotice} />}
          {active === 'messages' && <><div className="panel-title"><div><span>Conciergerie</span><h2>Messages clients</h2></div></div>{messages.length === 0 ? <div className="empty-state"><Mail /><h3>Aucun message</h3><p>Les messages reçus seront centralisés dans cet espace.</p></div> : messages.map((message) => <pre key={message.id}>{JSON.stringify(message, null, 2)}</pre>)}</>}
          {notice && <div className="admin-notice"><Check /> {notice}</div>}
        </section>
      </main>
    </div>
  )
}

function SettingsEditor({ title, label, value, onChange, onSave }) {
  return (
    <>
      <div className="panel-title"><div><span>Paramètres</span><h2>{title}</h2></div><button className="admin-save" onClick={onSave}><Save /> Enregistrer</button></div>
      <label className="settings-field">{label}<textarea value={value} onChange={(event) => onChange(event.target.value)} /></label>
    </>
  )
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
