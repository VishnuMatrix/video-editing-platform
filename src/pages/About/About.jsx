import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div style={{ minHeight: '100vh', background: '#080909', color: '#fff', padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        <p style={{ letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A47E1B', fontSize: '11px' }}>About</p>
        <h1 style={{ fontSize: 'clamp(2.6rem, 5vw, 5rem)', letterSpacing: '-0.06em', margin: '12px 0 18px' }}>Built for stories that deserve to move.</h1>
        <p style={{ maxWidth: '680px', color: 'rgba(255,255,255,0.72)', fontSize: '1.08rem', lineHeight: 1.8 }}>
          We are a premium video editing studio helping brands, founders, and creative teams transform rough footage into sharp, cinematic stories.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginTop: '42px' }}>
          {[
            ['Creative direction', 'Brand-led storytelling and editorial structure.'],
            ['Editing & finishing', 'Polished cuts, pacing, motion, color, and sound.'],
            ['Campaign support', 'Short-form and long-form edits for launch and growth.'],
          ].map(([title, body]) => (
            <div key={title} style={{ padding: '22px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: '1.15rem' }}>{title}</h3>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>{body}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '32px' }}>
          <Link to="/" style={{ color: '#A47E1B', textDecoration: 'none', letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: '12px' }}>Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
