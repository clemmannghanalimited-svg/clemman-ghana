import { useEffect, useRef, useState } from 'react'

/* Fades + slides an element up into view the first time it crosses the viewport. */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in')
          obs.unobserve(el)
        }
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useReveal()
  return (
    <Tag ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

function Nav({ tab, setTab }) {
  const items = [
    ['home', 'Home'],
    ['about', 'Leadership'],
    ['kwahu', 'Kwahu Diagnostic Centre'],
    ['contact', 'Contact'],
  ]
  const go = (key) => (e) => { e.preventDefault(); setTab(key); window.scrollTo(0, 0) }
  return (
    <header className="site">
      <div className="wrap navrow">
        <a className="brand" href="#" onClick={go('home')}>
          <span className="brand-mark"></span>
          Clemman&nbsp;Ghana
        </a>
        <nav className="links">
          {items.map(([key, label]) => (
            <a key={key} href="#" className={tab === key ? 'tab-active' : ''} onClick={go(key)}>
              {label}
            </a>
          ))}
        </nav>
        <a className="navcta" href="#" onClick={go('contact')}>Contact Us</a>
      </div>
    </header>
  )
}

function Marquee() {
  const items = ['Oil & Gas', 'Construction', 'Mining', 'Hospital', 'Pharmaceutical']
  const loop = [...items, ...items]
  return (
    <div className="marquee-band">
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  )
}

const SECTORS = [
  {
    idx: '01',
    name: 'Oil & Gas',
    desc: 'Downstream and supply operations serving Ghana\u2019s energy sector.',
    tags: ['Energy', 'Downstream'],
    img: '/images/oilgas.jpg',
    alt: 'Oil pump jack and refinery pipelines',
  },
  {
    idx: '02',
    name: 'Construction',
    desc: 'Civil works and building projects across residential and commercial sites.',
    tags: ['Civil Works', 'Build & Delivery'],
    img: '/images/construction.jpg',
    alt: 'Construction site with heavy equipment',
  },
  {
    idx: '03',
    name: 'Mining',
    desc: 'Resource extraction and materials operations under strict site standards.',
    tags: ['Resource Extraction'],
    img: '/images/mining.jpg',
    alt: 'Gold processing equipment at a mining site',
  },
  {
    idx: '04',
    name: 'Hospital',
    desc: 'Healthcare delivery grounded in access and consistent standards of care.',
    tags: ['Healthcare', 'Patient Care'],
    img: '/images/hospital.jpg',
    alt: 'Hospital ward with patient beds and monitors',
  },
  {
    idx: '05',
    name: 'Pharmaceutical',
    desc: 'Distribution and supply of medicines within the Ghanaian market.',
    tags: ['Distribution', 'Supply Chain'],
    img: '/images/pharma.jpg',
    alt: 'Laboratory scientist preparing samples',
  },
]

function HomePage({ setTab }) {
  const go = (key) => (e) => { e.preventDefault(); setTab(key); window.scrollTo(0, 0) }
  return (
    <>
      <section className="hero" id="top">
        <div className="hero-photo"></div>
        <div className="hero-scrim"></div>
        <div className="hero-lines"></div>
        <div className="wrap">
          <div className="status-pill"><span className="status-dot"></span> Open for partnership discussions</div>
          <h1>Building the infrastructure Ghana runs on — <em>and the diagnosis it deserves.</em></h1>
          <p className="lede">Clemman Ghana operates across oil &amp; gas, construction, mining, hospital and pharmaceutical sectors. We're now seeking a partner to help us build a diagnostic centre in Kwahu.</p>
          <div className="hero-ctas">
            <a className="btn primary" href="#" onClick={go('kwahu')}>See the Kwahu proposal</a>
            <a className="btn ghost" href="#" onClick={go('contact')}>Talk to us</a>
          </div>

          <div className="hero-stats">
            <div className="stat"><b>5</b><span>Sectors of operation</span></div>
            <div className="stat"><b>1</b><span>Flagship health initiative</span></div>
            <div className="stat"><b>Kwahu</b><span>Proposed site</span></div>
            <div className="stat"><b>GH</b><span>Ghanaian owned &amp; operated</span></div>
          </div>
        </div>
      </section>

      <Marquee />

      <section className="section" id="sectors">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <p className="tag">What we do</p>
              <h2>Five sectors, one operating discipline.</h2>
            </div>
            <p>Clemman Ghana's businesses span heavy industry and healthcare — run under a shared standard for delivery, compliance and long-term partnership.</p>
          </Reveal>

          <div className="sector-list">
            {SECTORS.map((s) => (
              <Reveal as="div" className="sector-row" key={s.idx}>
                <div className="sector-idx">{s.idx}</div>
                <div className="sector-body">
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                  <div className="sector-tags">
                    {s.tags.map((t) => <span className="sector-tag" key={t}>{t}</span>)}
                  </div>
                </div>
                <div className="sector-thumb-wrap">
                  <img className="sector-thumb" src={s.img} alt={s.alt} />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal style={{ marginTop: 40 }}>
            <p className="tag" style={{ marginBottom: 10 }}>Next chapter</p>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
              Diagnostics in Kwahu — our newest initiative, and where we're looking for a partner.{' '}
              <a href="#" style={{ color: 'var(--gold)', textDecoration: 'underline' }} onClick={go('kwahu')}>Read the proposal →</a>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" id="why" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <p className="tag">Why Clemman Ghana</p>
              <h2>Built to deliver on the ground.</h2>
            </div>
            <p>What we bring to a diagnostic centre partnership, beyond capital.</p>
          </Reveal>

          <Reveal>
            <div className="why-grid">
              <div>
                <div className="why-num">Reach</div>
                <h3>Multi-sector presence</h3>
                <p>Operations already spanning oil &amp; gas, construction, mining, hospital and pharmaceutical work give us a working understanding of both healthcare delivery and physical build.</p>
              </div>
              <div>
                <div className="why-num">Delivery</div>
                <h3>In-house construction</h3>
                <p>Our construction arm can take a diagnostic centre from site works to a completed, operational facility.</p>
              </div>
              <div>
                <div className="why-num">Supply</div>
                <h3>Pharmaceutical network</h3>
                <p>Existing pharmaceutical distribution gives a new diagnostic facility a running start on supply and logistics.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cta-band">
        <Reveal as="div" className="wrap">
          <h2>Interested in building Kwahu's diagnostic centre with us?</h2>
          <p>We're speaking with investors, healthcare operators, equipment partners and development partners. Get in touch to see the proposal.</p>
          <a className="btn dark" href="mailto:Clemmannghanalimited@gmail.com">Start the conversation</a>
        </Reveal>
      </section>
    </>
  )
}

function AboutPage() {
  return (
    <section className="section" style={{ paddingTop: 64 }}>
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <p className="tag">Leadership</p>
            <h2>Clement Osei-Amoako</h2>
          </div>
          <p>CEO of Clemman Ghana Ltd — a career built across chambers of commerce, public-private policy, and private-sector leadership.</p>
        </Reveal>

        <Reveal className="about-layout">
          <div className="about-photo-wrap">
            <img className="about-photo" src="/images/clement-osei-amoako.jpg" alt="Clement Osei-Amoako" />
          </div>

          <div className="about-bio">
            <p>Clement Osei-Amoako is a distinguished leader with a legacy of excellence in strategic economic development, public policy, and corporate governance. Over the years, he has held some of the most influential positions across national, regional, and continental institutions — contributing significantly to economic transformation and private sector growth in Africa.</p>

            <p>As the former 1st Vice President of the Federation of West African Chambers of Commerce &amp; Industry (FEWACCI), he was instrumental in providing strategic guidance to ECOWAS, particularly in advancing regional economic integration and fostering impactful public-private partnerships. His influence extended across the continent as an Executive Member of the Pan African Chamber of Commerce &amp; Industry, where he helped shape policies that enhanced private sector participation and improved the business environment across Africa.</p>

            <p>He previously served as President of the Ghana National Chamber of Commerce &amp; Industry (GNCCI), leading strategic planning efforts, engaging in high-level government dialogues, and spearheading initiatives that strengthened the Chamber's institutional capacity, financial sustainability, and relevance to its members. Under his leadership, the GNCCI implemented groundbreaking programs supporting SME development, promoting export readiness, and deepening stakeholder collaboration.</p>

            <p>His professional journey includes notable leadership in labor representation and academic advocacy — as National Organizer of the GCB Professionals, Chairman of the Managerial Staff Union, and President of the Legon Economics Students' Association, fostering mentorship, knowledge exchange, and institutional advocacy across diverse constituencies.</p>

            <p>As CEO of Clemman Ghana Ltd, he has led ventures spanning agriculture, trade, and construction — work consistently anchored in rigorous research and analysis, from the development of loan monitoring tools to the implementation of large-scale business transformation strategies.</p>

            <p>He has contributed meaningfully to educational institutions including St. Peter's Senior High School, the Ghana Institute of Languages, and the University of Ghana's Institute of Statistical, Social, and Economic Research (ISSER), where his mentorship and insight have inspired a new generation of thinkers and leaders.</p>

            <p>Today, Clement remains a highly respected voice in economic discourse — a career marked by integrity, innovation, and an enduring commitment to empowering businesses, strengthening institutions, and shaping a more prosperous African economy.</p>
          </div>
        </Reveal>

        <Reveal className="about-roles">
          <div className="role-item"><b>01</b> Former 1st Vice President, Federation of West African Chambers of Commerce &amp; Industry (FEWACCI)</div>
          <div className="role-item"><b>02</b> Executive Member, Pan African Chamber of Commerce &amp; Industry</div>
          <div className="role-item"><b>03</b> Former President, Ghana National Chamber of Commerce &amp; Industry (GNCCI)</div>
          <div className="role-item"><b>04</b> CEO, Clemman Ghana Ltd</div>
        </Reveal>
      </div>
    </section>
  )
}

function KwahuPage() {
  return (
    <section className="flagship" style={{ paddingTop: 64 }}>
      <Reveal as="div" className="wrap" style={{ paddingTop: 0 }}>
        <div>
          <div className="flagship-badge">Flagship Initiative</div>
          <h2>A diagnostic centre for Kwahu.</h2>
          <p>Clemman Ghana is developing plans to build a diagnostic centre serving Kwahu and the surrounding communities — and we're looking for the right partner to help us build it.</p>
          <p>This is a genuine ground-floor opportunity: an established, multi-sector Ghanaian group bringing capital, construction and pharmaceutical-supply capability to a healthcare gap that residents of Kwahu currently travel out of the district to fill.</p>

          <ul className="flagship-list">
            <li><b>01</b> A dedicated diagnostic facility for Kwahu — imaging, laboratory and screening services, close to the communities that need them.</li>
            <li><b>02</b> Backed by Clemman Ghana's existing hospital and pharmaceutical operations, and its construction capability to deliver the build.</li>
            <li><b>03</b> Open to partners across funding, medical equipment, clinical operations, or delivery — structured to fit the right partner.</li>
          </ul>
        </div>

        <div className="kwahu-panel">
          <h3>Partnership snapshot</h3>
          <div className="kwahu-row"><span>Project</span><span>Kwahu Diagnostic Centre</span></div>
          <div className="kwahu-row"><span>Location</span><span>Kwahu, Eastern Region, Ghana</span></div>
          <div className="kwahu-row"><span>Led by</span><span>Clemman Ghana</span></div>
          <div className="kwahu-row"><span>Seeking</span><span>Build &amp; development partner</span></div>
          <div className="kwahu-row"><span>Status</span><span>Open for partnership discussions</span></div>
          <a className="btn primary" href="mailto:Clemmannghanalimited@gmail.com" style={{ display: 'block', textAlign: 'center', marginTop: 28 }}>Discuss this project</a>
        </div>
      </Reveal>
    </section>
  )
}

function ContactPage() {
  return (
    <section className="section" style={{ paddingTop: 64 }}>
      <div className="wrap">
        <Reveal className="section-head" style={{ borderBottom: 'none', marginBottom: 40, paddingBottom: 0 }}>
          <div>
            <p className="tag">Contact us</p>
            <h2>Let's talk about Kwahu.</h2>
          </div>
          <p>Reach out directly — by phone or email — to discuss the diagnostic centre partnership.</p>
        </Reveal>

        <Reveal className="kwahu-panel" style={{ maxWidth: 560 }}>
          <h3>Clemman Ghana</h3>
          <div className="kwahu-row"><span>Phone</span><span><a className="contact-link" href="tel:+233556592629">+233 55 659 2629</a></span></div>
          <div className="kwahu-row"><span>Email</span><span><a className="contact-link" href="mailto:Clemmannghanalimited@gmail.com">Clemmannghanalimited@gmail.com</a></span></div>
          <div className="kwahu-row"><span>Location</span><span>Kwahu, Eastern Region, Ghana</span></div>
          <a className="btn primary" href="mailto:Clemmannghanalimited@gmail.com" style={{ display: 'block', textAlign: 'center', marginTop: 28 }}>Email us about the project</a>
        </Reveal>
      </div>
    </section>
  )
}

export default function App() {
  const [tab, setTab] = useState('home')
  const go = (key) => (e) => { e.preventDefault(); setTab(key); window.scrollTo(0, 0) }

  return (
    <>
      <Nav tab={tab} setTab={setTab} />

      {tab === 'home' && <HomePage setTab={setTab} />}
      {tab === 'about' && <AboutPage />}
      {tab === 'kwahu' && <KwahuPage />}
      {tab === 'contact' && <ContactPage />}

      <footer className="site">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <h4>Clemman Ghana</h4>
              <p style={{ maxWidth: '38ch', opacity: 0.65 }}>A diversified Ghanaian group operating in oil &amp; gas, construction, mining, hospital and pharmaceutical sectors — now building a diagnostic centre for Kwahu.</p>
            </div>
            <div>
              <h4>Pages</h4>
              <a href="#" onClick={go('home')}>Home</a>
              <a href="#" onClick={go('about')}>Leadership</a>
              <a href="#" onClick={go('kwahu')}>Kwahu Diagnostic Centre</a>
            </div>
            <div>
              <h4>Sectors</h4>
              <span style={{ display: 'block', opacity: 0.75 }}>Oil &amp; Gas</span>
              <span style={{ display: 'block', opacity: 0.75 }}>Construction</span>
              <span style={{ display: 'block', opacity: 0.75 }}>Mining</span>
              <span style={{ display: 'block', opacity: 0.75 }}>Hospital</span>
              <span style={{ display: 'block', opacity: 0.75 }}>Pharmaceutical</span>
            </div>
            <div>
              <h4>Get in touch</h4>
              <a className="contact-link" href="tel:+233556592629">+233 55 659 2629</a>
              <a className="contact-link" href="mailto:Clemmannghanalimited@gmail.com">Clemmannghanalimited@gmail.com</a>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© Clemman Ghana</span>
            <span>Kwahu, Eastern Region · Ghana</span>
          </div>
        </div>
      </footer>
    </>
  )
}
