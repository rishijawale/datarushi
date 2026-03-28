import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─── THEME ───────────────────────────────────────────────────────────────────
// Professional palette: Deep Charcoal Navy + Teal/Emerald
// Research-backed for DS/tech hiring: blue=trust, teal=data/analytics, green=growth
// Used by top tech portfolios that land roles at Google, Microsoft, Amazon, Flipkart etc.

const C = {
  bgDark: "#080e1a",
  bgSurface: "#0d1524",
  teal: "#14b8a6",
  tealLight: "#5eead4",
  tealDim: "rgba(20,184,166,0.12)",
  tealBorder: "rgba(20,184,166,0.22)",
  emerald: "#10b981",
  cyan: "#0891b2",
  darkTeal: "#0d9488",
  textPrimary: "#f0fdf4",
  textMuted: "rgba(240,253,244,0.5)",
  textDim: "rgba(240,253,244,0.28)",
  lBg: "#f0faf9",
  lText: "#0d2420",
  lMuted: "rgba(13,36,32,0.5)",
};

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Stack", "Contact"];

const SKILLS = [
  { name: "Python",           icon: "🐍", level: 88, color: "#14b8a6" },
  { name: "SQL",              icon: "🗄️", level: 82, color: "#0891b2" },
  { name: "Pandas",           icon: "🐼", level: 85, color: "#10b981" },
  { name: "NumPy",            icon: "🔢", level: 80, color: "#14b8a6" },
  { name: "Power BI",         icon: "📊", level: 75, color: "#0d9488" },
  { name: "Machine Learning", icon: "🤖", level: 72, color: "#0891b2" },
  { name: "Matplotlib",       icon: "📉", level: 82, color: "#10b981" },
  { name: "Seaborn",          icon: "🎨", level: 79, color: "#14b8a6" },
  { name: "Scikit-learn",     icon: "🧠", level: 74, color: "#0d9488" },
  { name: "Git",              icon: "🌿", level: 78, color: "#10b981" },
  { name: "Excel",            icon: "📈", level: 84, color: "#059669" },
];

const PROJECTS = [
  {
    title: "Customer Behavior Analysis",
    description: "Deep-dive EDA into customer purchase patterns, segmentation via K-Means clustering, and predictive churn modeling using Random Forest.",
    tags: ["Python", "Pandas", "Scikit-learn", "Seaborn"],
    icon: "👥", accent: "#14b8a6",
    github: "https://github.com/rushikeshjawale", demo: "#",
  },
  {
    title: "Fraud Detection Analysis",
    description: "Built an end-to-end anomaly detection pipeline on imbalanced transaction data using SMOTE, XGBoost, and threshold optimization.",
    tags: ["Python", "XGBoost", "SMOTE", "Matplotlib"],
    icon: "🔍", accent: "#0891b2",
    github: "https://github.com/rushikeshjawale", demo: "#",
  },
  {
    title: "Sales Dashboard",
    description: "Interactive Power BI dashboard with DAX measures tracking KPIs, revenue trends, regional breakdowns and YoY comparisons.",
    tags: ["Power BI", "DAX", "SQL", "Excel"],
    icon: "📊", accent: "#10b981",
    github: "https://github.com/rushikeshjawale", demo: "#",
  },
  {
    title: "Data Cleaning Pipeline",
    description: "Automated ETL pipeline handling missing values, outlier detection, type coercion, and duplicate removal on real-world messy datasets.",
    tags: ["Python", "Pandas", "NumPy", "Regex"],
    icon: "🧹", accent: "#0d9488",
    github: "https://github.com/rushikeshjawale", demo: "#",
  },
];

const TIMELINE = [
  { year: "2024", title: "Started the Journey",      desc: "Enrolled in B.Sc. Data Science & AI program. Discovered a passion for turning raw data into meaningful stories.", icon: "🚀" },
  { year: "2025", title: "Core Skills Built",         desc: "Mastered Python, Pandas, SQL, and NumPy. Completed 10+ guided projects and began independent EDA work.", icon: "⚡" },
  { year: "2025", title: "Machine Learning & Viz",    desc: "Deep-dived into ML algorithms, built Power BI dashboards, and earned certifications in Data Analytics.", icon: "🤖" },
  { year: "2026", title: "Portfolio & Real Projects", desc: "Built end-to-end data projects, launched datarushi.me, and actively seeking internship opportunities.", icon: "🎯" },
];

const STACK = [
  { name: "Python",       icon: "🐍", bg: "#0d2420" },
  { name: "SQL",          icon: "🗄️", bg: "#082030" },
  { name: "Power BI",     icon: "📊", bg: "#0d2010" },
  { name: "Pandas",       icon: "🐼", bg: "#062520" },
  { name: "Matplotlib",   icon: "📉", bg: "#0a1f18" },
  { name: "Seaborn",      icon: "🎨", bg: "#0d2420" },
  { name: "Scikit-learn", icon: "🧠", bg: "#082030" },
  { name: "Git",          icon: "🌿", bg: "#0a1f18" },
  { name: "GitHub",       icon: "🐙", bg: "#111827" },
  { name: "VS Code",      icon: "💻", bg: "#082028" },
  { name: "Jupyter",      icon: "📓", bg: "#0d1e10" },
];

const TYPING_WORDS = ["Data Scientist", "Data Analyst", "ML Engineer", "Insight Hunter", "Problem Solver"];

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useTypingEffect(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) setTimeout(() => setDeleting(true), pause);
        else setCharIdx((c) => c + 1);
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) { setDeleting(false); setWordIdx((w) => (w + 1) % words.length); setCharIdx(0); }
        else setCharIdx((c) => c - 1);
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return display;
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function ParticleCanvas({ dark }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const pts = Array.from({ length: 80 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
      a: Math.random() * 0.45 + 0.08,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dark ? `rgba(20,184,166,${p.a})` : `rgba(8,145,178,${p.a * 0.3})`;
        ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = dark ? `rgba(13,148,136,${0.11 * (1 - d / 130)})` : `rgba(8,145,178,${0.06 * (1 - d / 130)})`;
          ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [dark]);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.55 }} />;
}

function FadeIn({ children, delay = 0, y = 28, style = {}, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} style={style} className={className}>
      {children}
    </motion.div>
  );
}

function Card({ children, style = {}, hover = true }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.012 } : {}}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      style={{ background: "rgba(13,21,36,0.78)", border: "1px solid rgba(20,184,166,0.11)", backdropFilter: "blur(14px)", borderRadius: "16px", ...style }}
    >{children}</motion.div>
  );
}

// ─── SECTIONS ────────────────────────────────────────────────────────────────

function Navbar({ dark, setDark, scrolled }) {
  const [open, setOpen] = useState(false);
  const navBg = dark ? (scrolled ? "rgba(8,14,26,0.96)" : "transparent") : (scrolled ? "rgba(240,250,249,0.96)" : "transparent");
  const lc = dark ? "rgba(240,253,244,0.58)" : "rgba(13,36,32,0.52)";
  return (
    <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: navBg, backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? (dark ? "1px solid rgba(20,184,166,0.09)" : "1px solid rgba(20,184,166,0.14)") : "none",
        transition: "all 0.35s ease", padding: "0 clamp(1.5rem,5vw,4rem)",
        height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}
    >
      <span style={{ fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "1.2rem", background: "linear-gradient(135deg,#14b8a6,#10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.02em" }}>
        DataRushi<span style={{ color: "#5eead4", WebkitTextFillColor: "#5eead4" }}>.</span>
      </span>

      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="hide-mobile">
        {NAV_LINKS.map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`}
            style={{ color: lc, textDecoration: "none", fontFamily: "'Space Mono',monospace", fontSize: "0.75rem", letterSpacing: "0.06em", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.target.style.color = "#14b8a6")}
            onMouseLeave={(e) => (e.target.style.color = lc)}
          >{l.toUpperCase()}</a>
        ))}
        <button onClick={() => setDark(!dark)} style={{ background: "rgba(20,184,166,0.09)", border: "1px solid rgba(20,184,166,0.22)", borderRadius: "8px", padding: "6px 12px", color: dark ? "#5eead4" : "#0d9488", cursor: "pointer", fontSize: "0.9rem" }}>
          {dark ? "☀️" : "🌙"}
        </button>
      </div>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }} className="hide-desktop">
        <button onClick={() => setDark(!dark)} style={{ background: "transparent", border: "none", color: dark ? "#5eead4" : "#0d9488", cursor: "pointer", fontSize: "1.1rem" }}>{dark ? "☀️" : "🌙"}</button>
        <button onClick={() => setOpen(!open)} style={{ background: "transparent", border: "none", color: dark ? C.textPrimary : C.lText, cursor: "pointer", fontSize: "1.4rem" }}>{open ? "✕" : "☰"}</button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            style={{ position: "absolute", top: "68px", left: 0, right: 0, background: dark ? "rgba(8,14,26,0.98)" : "rgba(240,250,249,0.98)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(20,184,166,0.14)", padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {NAV_LINKS.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
                style={{ color: dark ? "rgba(240,253,244,0.8)" : "rgba(13,36,32,0.75)", textDecoration: "none", fontFamily: "'Space Mono',monospace", fontSize: "0.88rem", letterSpacing: "0.05em" }}>
                {l.toUpperCase()}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Hero({ dark }) {
  const typed = useTypingEffect(TYPING_WORDS);
  const text = dark ? C.textPrimary : C.lText;
  const muted = dark ? C.textMuted : C.lMuted;
  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px clamp(1.5rem,6vw,6rem) 80px", position: "relative", textAlign: "center", flexDirection: "column" }}>
      <div style={{ position: "absolute", top: "18%", left: "8%", width: "380px", height: "380px", borderRadius: "50%", background: "radial-gradient(circle,rgba(20,184,166,0.08) 0%,transparent 70%)", filter: "blur(50px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "35%", right: "8%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle,rgba(8,145,178,0.07) 0%,transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "15%", left: "35%", width: "260px", height: "260px", borderRadius: "50%", background: "radial-gradient(circle,rgba(16,185,129,0.06) 0%,transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />

      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "relative", zIndex: 1, maxWidth: "820px" }}>

        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.15 }}
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(20,184,166,0.07)", border: "1px solid rgba(20,184,166,0.2)", borderRadius: "100px", padding: "6px 18px", marginBottom: "2rem", fontFamily: "'Space Mono',monospace", fontSize: "0.72rem", color: "#5eead4", letterSpacing: "0.1em" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", display: "inline-block", animation: "pulse 2s infinite" }} />
          OPEN TO INTERNSHIPS
        </motion.div>

        <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2.8rem,8vw,5.5rem)", lineHeight: 1.04, letterSpacing: "-0.03em", color: text, margin: "0 0 0.4rem" }}>
          Rushikesh<br />
          <span style={{ background: "linear-gradient(135deg,#14b8a6 0%,#10b981 55%,#0891b2 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Jawale</span>
        </h1>

        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(1rem,2.5vw,1.3rem)", color: "#14b8a6", marginBottom: "1.25rem", minHeight: "2rem", letterSpacing: "0.02em" }}>
          Aspiring <span style={{ color: "#5eead4" }}>{typed}<span style={{ borderRight: "2px solid #5eead4", marginLeft: "2px", animation: "blink 1s step-end infinite" }} /></span>
        </div>

        <p style={{ color: muted, fontSize: "clamp(0.95rem,2vw,1.08rem)", lineHeight: 1.75, maxWidth: "540px", margin: "0 auto 2.5rem", fontFamily: "'DM Sans',sans-serif" }}>
          Turning messy data into clear insights. Building ML models that actually solve problems.
          Passionate about the full pipeline from raw CSV to production dashboard.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <motion.a href="#projects" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            style={{ background: "linear-gradient(135deg,#0d9488,#14b8a6)", color: "#f0fdf4", padding: "13px 32px", borderRadius: "10px", textDecoration: "none", fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "0.83rem", letterSpacing: "0.02em", boxShadow: "0 0 32px rgba(20,184,166,0.22)" }}>
            View Projects →
          </motion.a>
          <motion.a href="#contact" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            style={{ background: "transparent", color: text, padding: "13px 32px", borderRadius: "10px", textDecoration: "none", fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "0.83rem", letterSpacing: "0.02em", border: dark ? "1px solid rgba(20,184,166,0.22)" : "1px solid rgba(13,148,136,0.28)" }}>
            Contact Me
          </motion.a>
        </div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          style={{ marginTop: "4rem", color: dark ? "rgba(94,234,212,0.35)" : "rgba(13,148,136,0.35)", fontSize: "1.4rem" }}>↓</motion.div>
      </motion.div>
    </section>
  );
}

function About({ dark }) {
  const text = dark ? C.textPrimary : C.lText;
  const muted = dark ? C.textMuted : C.lMuted;
  return (
    <section id="about" style={{ padding: "100px clamp(1.5rem,6vw,8rem)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="grid-responsive">
        <FadeIn>
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div style={{ width: "260px", height: "260px", borderRadius: "50%", background: "linear-gradient(135deg,#0d9488,#14b8a6,#10b981)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "7rem", position: "relative", boxShadow: "0 0 70px rgba(20,184,166,0.2)" }}>
              👨‍💻
              <div style={{ position: "absolute", inset: -12, borderRadius: "50%", border: "1px solid rgba(20,184,166,0.16)" }} />
              <div style={{ position: "absolute", inset: -26, borderRadius: "50%", border: "1px dashed rgba(20,184,166,0.09)" }} />
            </div>
            {[{ label: "Projects", value: "10+", pos: { top: "0", right: "-20px" } }, { label: "Skills", value: "11+", pos: { bottom: "20px", left: "-20px" } }].map((s) => (
              <Card key={s.label} style={{ position: "absolute", padding: "10px 18px", ...s.pos, textAlign: "center", minWidth: "80px" }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#14b8a6" }}>{s.value}</div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.65rem", color: muted, letterSpacing: "0.08em" }}>{s.label.toUpperCase()}</div>
              </Card>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.73rem", letterSpacing: "0.12em", color: "#14b8a6", marginBottom: "1rem" }}>// ABOUT ME</p>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: text, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            Data nerd.<br />
            <span style={{ background: "linear-gradient(135deg,#14b8a6,#10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Story teller.</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: muted, lineHeight: 1.8, fontSize: "1.05rem", marginBottom: "1rem" }}>
            I'm Rushikesh — a Data Science & AI student who believes every dataset has a story waiting to be told. I love the full spectrum: from wrangling messy CSVs to deploying ML models and crafting dashboards that make stakeholders go "wow."
          </p>
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: muted, lineHeight: 1.8, fontSize: "1.05rem", marginBottom: "1.75rem" }}>
            My goal is to join a forward-thinking team where I can apply data-driven thinking to real business problems — and keep growing every single day.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {["📍 Pune, India", "🎓 B.Sc. Data Science & AI", "🎯 Seeking Internship"].map((tag) => (
              <span key={tag} style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.71rem", padding: "6px 14px", borderRadius: "100px", background: "rgba(20,184,166,0.08)", border: "1px solid rgba(20,184,166,0.18)", color: "#5eead4", letterSpacing: "0.04em" }}>{tag}</span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Skills({ dark }) {
  const text = dark ? C.textPrimary : C.lText;
  const muted = dark ? C.textMuted : C.lMuted;
  return (
    <section id="skills" style={{ padding: "100px clamp(1.5rem,6vw,8rem)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.73rem", letterSpacing: "0.12em", color: "#14b8a6", marginBottom: "0.75rem" }}>// SKILLS</p>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: text, letterSpacing: "-0.03em", margin: 0 }}>
            My <span style={{ background: "linear-gradient(135deg,#14b8a6,#10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Toolkit</span>
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "1.2rem" }}>
          {SKILLS.map((skill, i) => (
            <FadeIn key={skill.name} delay={i * 0.05}>
              <Card style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "1.7rem" }}>{skill.icon}</span>
                  <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.94rem", color: text }}>{skill.name}</span>
                  <span style={{ marginLeft: "auto", fontFamily: "'Space Mono',monospace", fontSize: "0.7rem", color: muted }}>{skill.level}%</span>
                </div>
                <div style={{ height: "3px", background: "rgba(20,184,166,0.08)", borderRadius: "100px", overflow: "hidden" }}>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }}
                    transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                    style={{ height: "100%", borderRadius: "100px", background: `linear-gradient(90deg,${skill.color}bb,${skill.color})` }} />
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects({ dark }) {
  const text = dark ? C.textPrimary : C.lText;
  const muted = dark ? C.textMuted : C.lMuted;
  return (
    <section id="projects" style={{ padding: "100px clamp(1.5rem,6vw,8rem)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.73rem", letterSpacing: "0.12em", color: "#14b8a6", marginBottom: "0.75rem" }}>// PROJECTS</p>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: text, letterSpacing: "-0.03em", margin: 0 }}>
            Things I've <span style={{ background: "linear-gradient(135deg,#14b8a6,#10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Built</span>
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.5rem" }}>
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.08}>
              <Card style={{ padding: "1.75rem", height: "100%", display: "flex", flexDirection: "column", borderTop: `2px solid ${p.accent}38`, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, right: 0, width: "130px", height: "130px", background: `radial-gradient(circle at top right,${p.accent}12,transparent 70%)`, pointerEvents: "none" }} />
                <div style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>{p.icon}</div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.05rem", color: text, margin: "0 0 0.75rem", lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: muted, fontSize: "0.88rem", lineHeight: 1.7, flex: 1, margin: "0 0 1.25rem" }}>{p.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "1.25rem" }}>
                  {p.tags.map((t) => (
                    <span key={t} style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.63rem", padding: "3px 10px", borderRadius: "100px", background: `${p.accent}12`, border: `1px solid ${p.accent}32`, color: p.accent, letterSpacing: "0.04em" }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "14px" }}>
                  <a href={p.github} target="_blank" rel="noreferrer"
                    style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.71rem", color: muted, textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#14b8a6")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = dark ? C.textMuted : C.lMuted)}
                  >🐙 GitHub</a>
                  <a href={p.demo}
                    style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.71rem", color: muted, textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#10b981")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = dark ? C.textMuted : C.lMuted)}
                  >🚀 Demo</a>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience({ dark }) {
  const text = dark ? C.textPrimary : C.lText;
  const muted = dark ? C.textMuted : C.lMuted;
  return (
    <section id="experience" style={{ padding: "100px clamp(1.5rem,6vw,8rem)" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.73rem", letterSpacing: "0.12em", color: "#14b8a6", marginBottom: "0.75rem" }}>// EXPERIENCE & LEARNING</p>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: text, letterSpacing: "-0.03em", margin: 0 }}>
            The <span style={{ background: "linear-gradient(135deg,#14b8a6,#10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Journey</span>
          </h2>
        </FadeIn>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: "28px", top: 0, bottom: 0, width: "1px", background: "linear-gradient(180deg,#14b8a6,#10b981,transparent)", opacity: 0.22 }} />
          {TIMELINE.map((item, i) => (
            <FadeIn key={item.year} delay={i * 0.1}>
              <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2.5rem", position: "relative" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "linear-gradient(135deg,rgba(20,184,166,0.14),rgba(16,185,129,0.14))", border: "1px solid rgba(20,184,166,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0, backdropFilter: "blur(8px)", zIndex: 1 }}>
                  {item.icon}
                </div>
                <Card style={{ padding: "1.25rem 1.5rem", flex: 1 }} hover={false}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1rem", color: text, margin: 0 }}>{item.title}</h3>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.7rem", color: "#14b8a6", background: "rgba(20,184,166,0.08)", padding: "3px 10px", borderRadius: "100px", border: "1px solid rgba(20,184,166,0.18)" }}>{item.year}</span>
                  </div>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", color: muted, fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                </Card>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stack({ dark }) {
  const text = dark ? C.textPrimary : C.lText;
  return (
    <section id="stack" style={{ padding: "100px clamp(1.5rem,6vw,8rem)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.73rem", letterSpacing: "0.12em", color: "#14b8a6", marginBottom: "0.75rem" }}>// TECH STACK</p>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: text, letterSpacing: "-0.03em", margin: 0 }}>
            What I <span style={{ background: "linear-gradient(135deg,#14b8a6,#10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Work With</span>
          </h2>
        </FadeIn>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
          {STACK.map((s, i) => (
            <FadeIn key={s.name} delay={i * 0.05}>
              <motion.div whileHover={{ y: -6, scale: 1.06 }}
                style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 22px", borderRadius: "10px", background: dark ? s.bg : "rgba(20,184,166,0.05)", border: "1px solid rgba(20,184,166,0.12)", backdropFilter: "blur(8px)", cursor: "default", transition: "border-color 0.2s, box-shadow 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(20,184,166,0.38)"; e.currentTarget.style.boxShadow = "0 0 16px rgba(20,184,166,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(20,184,166,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <span style={{ fontSize: "1.25rem" }}>{s.icon}</span>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.78rem", color: text, letterSpacing: "0.04em" }}>{s.name}</span>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ dark }) {
  const text = dark ? C.textPrimary : C.lText;
  const muted = dark ? C.textMuted : C.lMuted;
  const contacts = [
    { label: "Email",     value: "rushikeshjawale2006@gmail.com",      href:"mailto:rushikeshjawale2006@gmail.com",          icon: "✉️", color: "#14b8a6" },
    { label: "LinkedIn",  value: "in/rushikesh-jawale",          href: "https://linkedin.com/in/rushikesh-jawale", icon: "💼", color: "#0891b2" },
    { label: "GitHub",    value: "github.com/rishijawale",  href: "https://github.com/rishijawale",      icon: "🐙", color: "#10b981" },
    { label: "Portfolio", value: "datarushi.me",                href: "https://datarushi.me",                    icon: "🌐", color: "#0d9488" },
  ];
  return (
    <section id="contact" style={{ padding: "100px clamp(1.5rem,6vw,8rem)" }}>
      <div style={{ maxWidth: "810px", margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.73rem", letterSpacing: "0.12em", color: "#14b8a6", marginBottom: "0.75rem" }}>// CONTACT</p>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: text, letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>
            Let's <span style={{ background: "linear-gradient(135deg,#14b8a6,#10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Connect</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: muted, fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "500px", margin: "0 auto 3rem" }}>
            I'm actively looking for internship opportunities in Data Science & Analytics. Drop me a message — I'd love to hear from you!
          </p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "1.25rem", marginBottom: "3rem" }}>
          {contacts.map((c, i) => (
            <FadeIn key={c.label} delay={i * 0.08}>
              <motion.a href={c.href} target="_blank" rel="noreferrer" whileHover={{ y: -4, scale: 1.03 }}
                style={{ display: "block", padding: "1.5rem", borderRadius: "14px", background: "rgba(13,21,36,0.7)", border: `1px solid ${c.color}22`, backdropFilter: "blur(12px)", textDecoration: "none", textAlign: "center", position: "relative", overflow: "hidden", transition: "border-color 0.25s" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${c.color}50`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${c.color}22`)}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg,transparent,${c.color},transparent)` }} />
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{c.icon}</div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.68rem", letterSpacing: "0.1em", color: c.color, marginBottom: "0.4rem" }}>{c.label.toUpperCase()}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: muted, wordBreak: "break-all" }}>{c.value}</div>
              </motion.a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ dark }) {
  const muted = dark ? C.textDim : "rgba(13,36,32,0.32)";
  const text = dark ? "rgba(240,253,244,0.52)" : "rgba(13,36,32,0.48)";
  return (
    <footer style={{ padding: "2.5rem clamp(1.5rem,6vw,8rem)", borderTop: dark ? "1px solid rgba(20,184,166,0.07)" : "1px solid rgba(20,184,166,0.14)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
      <span style={{ fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "1rem", background: "linear-gradient(135deg,#14b8a6,#10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>DataRushi.</span>
      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.68rem", color: muted, letterSpacing: "0.04em" }}>© {new Date().getFullYear()} Rushikesh Jawale. Crafted with ❤️ & ☕</span>
      <div style={{ display: "flex", gap: "1.25rem" }}>
        {[{ label: "GitHub", href: "https://github.com/rushikeshjawale" }, { label: "LinkedIn", href: "https://linkedin.com/in/rushikeshjawale" }, { label: "Email", href: "mailto:rushikesh@datarushi.me" }].map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
            style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.68rem", color: text, textDecoration: "none", letterSpacing: "0.04em", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.target.style.color = "#14b8a6")}
            onMouseLeave={(e) => (e.target.style.color = dark ? "rgba(240,253,244,0.52)" : "rgba(13,36,32,0.48)")}
          >{l.label}</a>
        ))}
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bg = dark ? C.bgDark : C.lBg;
  const sectionAlt = dark ? "rgba(13,21,36,0.52)" : "rgba(224,245,242,0.55)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:${bg};transition:background 0.4s ease}
        section:nth-child(even){background:${sectionAlt}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes pulse{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(16,185,129,0.4)}50%{opacity:.7;box-shadow:0 0 0 6px rgba(16,185,129,0)}}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:rgba(20,184,166,0.32);border-radius:100px}
        ::-webkit-scrollbar-thumb:hover{background:rgba(20,184,166,0.52)}
        .hide-mobile{display:flex!important}
        .hide-desktop{display:none!important}
        .grid-responsive{grid-template-columns:1fr 1fr}
        @media(max-width:768px){
          .hide-mobile{display:none!important}
          .hide-desktop{display:flex!important}
          .grid-responsive{grid-template-columns:1fr!important}
        }
        a:focus-visible{outline:2px solid #14b8a6;outline-offset:3px;border-radius:4px}
        ::selection{background:rgba(20,184,166,0.22);color:#f0fdf4}
      `}</style>
      <div style={{ minHeight: "100vh", position: "relative", transition: "all 0.4s ease" }}>
        <ParticleCanvas dark={dark} />
        <Navbar dark={dark} setDark={setDark} scrolled={scrolled} />
        <main style={{ position: "relative", zIndex: 1 }}>
          <Hero dark={dark} />
          <About dark={dark} />
          <Skills dark={dark} />
          <Projects dark={dark} />
          <Experience dark={dark} />
          <Stack dark={dark} />
          <Contact dark={dark} />
        </main>
        <Footer dark={dark} />
      </div>
    </>
  );
}
