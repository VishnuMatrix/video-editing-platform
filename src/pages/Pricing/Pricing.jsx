import { Link } from 'react-router-dom';

export default function Pricing() {
  return (
    <div style={{ minHeight: '100vh', background: '#080909', color: '#fff', padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        <p style={{ letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A47E1B', fontSize: '11px' }}>Pricing</p>
        <h1 style={{ fontSize: 'clamp(2.6rem, 5vw, 5rem)', letterSpacing: '-0.06em', margin: '12px 0 18px' }}>Transparent packages for content velocity.</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginTop: '42px' }}>
          {[
            ['Starter', 'Short-form edits for new campaigns.'],
            ['Growth', 'Ongoing content production and iteration.'],
            ['Production', 'Premium storytelling and multi-phase creative projects.'],
          ].map(([title, body]) => (
            <div key={title} style={{ padding: '24px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
              <h3 style={{ margin: '0 0 12px' }}>{title}</h3>
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
