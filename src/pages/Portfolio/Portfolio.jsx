import { Link } from 'react-router-dom';

export default function Portfolio() {
  return (
    <div style={{ minHeight: '100vh', background: '#080909', color: '#fff', padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        <p style={{ letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A47E1B', fontSize: '11px' }}>Portfolio</p>
        <h1 style={{ fontSize: 'clamp(2.6rem, 5vw, 5rem)', letterSpacing: '-0.06em', margin: '12px 0 18px' }}>Selected work from our studio archive.</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '38px' }}>
          {['Campaign Launches', 'Founder Stories', 'Social Cuts', 'Product Films'].map((item) => (
            <div key={item} style={{ padding: '24px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ height: '170px', border: '1px solid rgba(255,255,255,0.08)', display: 'grid', placeItems: 'center', fontSize: '0.8rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Preview</div>
              <h3 style={{ margin: '18px 0 8px' }}>{item}</h3>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)' }}>Portfolio entry placeholder ready for live project work.</p>
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
