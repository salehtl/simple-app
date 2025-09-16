import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: '#333'
        }}>
          Welcome to Simple App
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#666',
          maxWidth: '600px',
          lineHeight: '1.6'
        }}>
          A clean and simple web application built with modern technologies.
          Explore our features and discover what we have to offer.
        </p>
      </header>

      <nav style={{ marginBottom: '2rem' }}>
        <Link
          to="/about"
          style={{
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          Learn More About Us
        </Link>
      </nav>

      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        maxWidth: '800px',
        width: '100%'
      }}>
        <div style={{
          padding: '2rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: '#333'
          }}>
            Fast & Modern
          </h3>
          <p style={{ color: '#666', lineHeight: '1.5' }}>
            Built with the latest web technologies for optimal performance.
          </p>
        </div>

        <div style={{
          padding: '2rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: '#333'
          }}>
            User-Friendly
          </h3>
          <p style={{ color: '#666', lineHeight: '1.5' }}>
            Intuitive design that makes everything easy to use and understand.
          </p>
        </div>

        <div style={{
          padding: '2rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: '#333'
          }}>
            Reliable
          </h3>
          <p style={{ color: '#666', lineHeight: '1.5' }}>
            Dependable service you can count on for all your needs.
          </p>
        </div>
      </section>
    </div>
  )
}
