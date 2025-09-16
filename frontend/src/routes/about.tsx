import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div style={{
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem',
      backgroundColor: '#fafafa'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '3rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <nav style={{ marginBottom: '2rem' }}>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}
          >
            ← Back to Home
          </Link>
        </nav>

        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#333'
          }}>
            About Simple App
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            lineHeight: '1.6'
          }}>
            Learn more about our mission, values, and the team behind Simple App.
          </p>
        </header>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.8rem',
            marginBottom: '1rem',
            color: '#333',
            borderBottom: '2px solid #007bff',
            paddingBottom: '0.5rem'
          }}>
            Our Mission
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#555',
            lineHeight: '1.7',
            marginBottom: '1.5rem'
          }}>
            At Simple App, we believe that great software should be both powerful and easy to use.
            Our mission is to create applications that solve real problems while maintaining
            simplicity and elegance in design.
          </p>
          <p style={{
            fontSize: '1rem',
            color: '#555',
            lineHeight: '1.7'
          }}>
            We're committed to building technology that empowers users and makes their
            daily tasks more efficient and enjoyable.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.8rem',
            marginBottom: '1rem',
            color: '#333',
            borderBottom: '2px solid #007bff',
            paddingBottom: '0.5rem'
          }}>
            Our Values
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#333' }}>
                Simplicity First
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                We prioritize clean, intuitive interfaces that users can understand immediately.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#333' }}>
                Quality Over Quantity
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Every feature is carefully crafted and thoroughly tested before release.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#333' }}>
                User-Centered Design
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                All our decisions are made with the end user's experience in mind.
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.8rem',
            marginBottom: '1rem',
            color: '#333',
            borderBottom: '2px solid #007bff',
            paddingBottom: '0.5rem'
          }}>
            Get in Touch
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#555',
            lineHeight: '1.7',
            marginBottom: '1rem'
          }}>
            We'd love to hear from you! Whether you have questions, feedback, or just want to say hello,
            don't hesitate to reach out.
          </p>
          <div style={{
            padding: '1.5rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            borderLeft: '4px solid #007bff'
          }}>
            <p style={{ margin: '0', color: '#555' }}>
              <strong>Contact us:</strong> hello@simpleapp.com
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}