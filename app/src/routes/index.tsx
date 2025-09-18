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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="mb-6">
            {isLoading ? (
              <div className="text-gray-600">Loading...</div>
            ) : user ? (
              <div className="bg-white rounded-lg p-4 inline-block shadow-sm">
                <p className="text-green-600 font-medium">Welcome back, {user.name || user.email}!</p>
                <button
                  onClick={handleSignOut}
                  className="mt-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 inline-block"
              >
                Sign In / Create Account
              </Link>
            )}
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Our Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Built with React, TanStack Start, and modern web technologies.
            Ready for your next big idea.
          </p>
          <div className="space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200">
              Get Started
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-8 rounded-lg border border-gray-300 transition duration-200">
              Learn More
            </button>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-lg font-semibold mb-2">Fast Development</h3>
            <p className="text-gray-600">Built with Vite and TanStack Start for lightning-fast development experience.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl mb-4">🔐</div>
            <h3 className="text-lg font-semibold mb-2">Secure by Default</h3>
            <p className="text-gray-600">Ready for authentication and database integration with Better Auth and PostgreSQL.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl mb-4">📱</div>
            <h3 className="text-lg font-semibold mb-2">Responsive Design</h3>
            <p className="text-gray-600">Styled with Tailwind CSS for beautiful, responsive interfaces out of the box.</p>
          </div>
        </div>
      </div>
    </div>
  )
}