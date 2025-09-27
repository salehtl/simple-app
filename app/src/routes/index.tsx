// src/routes/index.tsx
import { createFileRoute, Link } from '@tanstack/react-router'
import { authClient } from '../lib/auth-client'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      try {
        const session = await authClient.getSession()
        setUser(session.data?.user || null)
      } catch (error) {
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }
    getSession()
  }, [])

  const handleSignOut = async () => {
    await authClient.signOut()
    setUser(null)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">Platform</div>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, {user.name || user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
            Welcome to Our Platform
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-10">
            Built with React, TanStack Start, and modern web technologies.
            Ready for your next big idea.
          </p>

          {user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/vanity-calc"
                className="inline-flex items-center gap-2 px-6 py-3 text-white bg-gray-900 hover:bg-gray-800 rounded-lg font-medium transition-colors"
              >
                🏗️ 3D Marble Calculator
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-3 text-white bg-gray-900 hover:bg-gray-800 rounded-lg font-medium transition-colors"
              >
                Get Started
              </Link>
              <button className="px-8 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
                Learn More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built for Performance
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A modern stack designed for speed, security, and scalability
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-xl border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast Development</h3>
              <p className="text-gray-600 leading-relaxed">
                Built with Vite and TanStack Start for lightning-fast development experience.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🔐</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure by Default</h3>
              <p className="text-gray-600 leading-relaxed">
                Ready for authentication and database integration with Better Auth and PostgreSQL.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Responsive Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Styled with Tailwind CSS for beautiful, responsive interfaces out of the box.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}