import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useState } from 'react'
import { authClient } from '../lib/auth-client'

export const Route = createFileRoute('/register')({
  component: Register,
})

function Register() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true)
      setError('')
      setSuccess('')

      try {
        const result = await authClient.signUp.email({
          email: value.email,
          password: value.password,
          name: value.name,
        })

        if (result.error) {
          setError(result.error.message)
        } else {
          setSuccess('Account created successfully! Please check your email to verify your account before logging in.')
          // Redirect to verify email page after successful registration
          setTimeout(() => {
            router.navigate({ to: '/verify-email' })
          }, 3000)
        }
      } catch (err) {
        setError('Registration failed. Please try again.')
      } finally {
        setIsLoading(false)
      }
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-900">
          Create Account
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="space-y-6"
        >
          {/* Name Field */}
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Name is required' : undefined,
              onChangeAsyncDebounceMs: 500,
            }}
          >
            {(field) => (
              <div>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    field.state.meta.errors.length > 0
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="mt-1 text-sm text-red-600">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Email Field */}
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Email is required'
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                  return 'Please enter a valid email address'
                }
                return undefined
              },
              onChangeAsyncDebounceMs: 500,
            }}
          >
            {(field) => (
              <div>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    field.state.meta.errors.length > 0
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="mt-1 text-sm text-red-600">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Password Field */}
          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Password is required'
                if (value.length < 8) {
                  return 'Password must be at least 8 characters long'
                }
                if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                  return 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
                }
                return undefined
              },
              onChangeAsyncDebounceMs: 500,
            }}
          >
            {(field) => (
              <div>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    field.state.meta.errors.length > 0
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                  placeholder="Create a strong password"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="mt-1 text-sm text-red-600">
                    {field.state.meta.errors[0]}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Must be at least 8 characters with uppercase, lowercase, and number
                </p>
              </div>
            )}
          </form.Field>

          {/* Confirm Password Field */}
          <form.Field
            name="confirmPassword"
            validators={{
              onChange: ({ value, fieldApi }) => {
                if (!value) return 'Please confirm your password'
                const password = fieldApi.form.getFieldValue('password')
                if (value !== password) {
                  return 'Passwords do not match'
                }
                return undefined
              },
              onChangeAsyncDebounceMs: 500,
            }}
          >
            {(field) => (
              <div>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    field.state.meta.errors.length > 0
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="mt-1 text-sm text-red-600">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-md p-3">
              <p className="text-green-600 text-sm">{success}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !form.state.canSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign in here
            </a>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium text-gray-700 mb-2">Demo Account:</h3>
          <p className="text-sm text-gray-600">Email: demo@example.com</p>
          <p className="text-sm text-gray-600">Password: password123</p>
          <p className="text-xs text-gray-500 mt-2">
            You can use this account to test the login functionality.
          </p>
        </div>
      </div>
    </div>
  )
}
