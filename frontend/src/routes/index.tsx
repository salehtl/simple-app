// src/routes/index.tsx
import * as fs from 'node:fs'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

const filePath = 'count.txt'

async function readCount() {
  return parseInt(
    await fs.promises.readFile(filePath, 'utf-8').catch(() => '0'),
  )
}

const getCount = createServerFn({
  method: 'GET',
}).handler(() => {
  return readCount()
})

const updateCount = createServerFn({ method: 'POST' })
  .validator((d: number) => d)
  .handler(async ({ data }) => {
    const count = await readCount()
    await fs.promises.writeFile(filePath, `${count + data}`)
  })

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => await getCount(),
})

function Home() {
  const router = useRouter()
  const state = Route.useLoaderData()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Simple App
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A modern, full-stack React application built with TanStack Router and TanStack Start.
            Experience seamless server-side functionality with beautiful design.
          </p>

          {/* Counter Demo */}
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Interactive Counter</h2>
            <p className="text-gray-600 mb-6">Try our server-persisted counter demo</p>
            <div className="text-4xl font-bold text-indigo-600 mb-6">{state}</div>
            <button
              type="button"
              onClick={() => {
                updateCount({ data: 1 }).then(() => {
                  router.invalidate()
                })
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Increment Counter
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6">
            <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Fast & Modern</h3>
            <p className="text-gray-600">Built with React 19, Vite, and modern development tools for optimal performance.</p>
          </div>

          <div className="text-center p-6">
            <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔧</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Full-Stack Ready</h3>
            <p className="text-gray-600">Server functions with TanStack Start provide seamless backend integration.</p>
          </div>

          <div className="text-center p-6">
            <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Beautiful Design</h3>
            <p className="text-gray-600">Styled with Tailwind CSS for responsive and elegant user interfaces.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 Simple App. Built with TanStack Router & TanStack Start.</p>
        </div>
      </footer>
    </div>
  )
}