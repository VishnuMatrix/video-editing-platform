import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div style={{ minHeight: '100vh', background: '#080909', color: '#fff', padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A47E1B', fontSize: '11px' }}>Contact</p>
        <h1 style={{ fontSize: 'clamp(2.6rem, 5vw, 5rem)', letterSpacing: '-0.06em', margin: '12px 0 18px' }}>Let’s build the next edit.</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, maxWidth: '620px' }}>
          Use the studio contact workflow to brief your project and coordinate the next production cycle.
        </p>

        <div style={{ marginTop: '28px', padding: '22px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.72)' }}>Email: hello@oneforedits.com</p>
        </div>

        <div style={{ marginTop: '32px' }}>
          <Link to="/" style={{ color: '#A47E1B', textDecoration: 'none', letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: '12px' }}>Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
