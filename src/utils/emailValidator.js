export const validateEmailFromUrl = () => {
  try {
    // Get email from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');

    if (!email) {
      return {
        isValid: false,
        email: '',
        domain: '',
        error: 'No email parameter found in URL'
      };
    }

    // Validate email format using regex
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        email,
        domain: '',
        error: 'Invalid email format'
      };
    }

    // Extract domain from email
    const domain = email.split('@')[1];

    return {
      isValid: true,
      email,
      domain,
      error: ''
    };
  } catch (error) {
    return {
      isValid: false,
      email: '',
      domain: '',
      error: error.message
    };
  }
};
