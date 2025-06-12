import { useState, useEffect } from 'react';
import ModalForm from './components/ModalForm';
import LandingPage from './components/LandingPage';
import { validateEmailFromUrl } from './utils/emailValidator';

function App() {
  const [emailState, setEmailState] = useState({
    isValid: false,
    email: '',
    domain: '',
    error: ''
  })

  // Parse URL for email validation
  useEffect(() => {
    const result = validateEmailFromUrl()
    setEmailState(result)
  }, [])

  // Handle modal close
  const handleModalClose = () => {
    setEmailState(prev => ({ ...prev, isValid: false }))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="h-[600px] w-full mb-8">
          <LandingPage />
        </div>
        
        {emailState.error && (
          <div className="text-red-500 text-center mt-4">
            {emailState.error}
          </div>
        )}

        {emailState.isValid && (
          <ModalForm 
            email={emailState.email} 
            domain={emailState.domain} 
            onClose={handleModalClose}
          />
        )}
      </div>
    </div>
  )
}

export default App
