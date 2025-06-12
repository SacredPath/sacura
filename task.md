# Project: Secure Modal Form Webpage with Tailwind CSS and Vercel

## Project Overview
Build a webpage that displays a modal form when opened with a valid email in the URL query parameter (e.g., `example.com/?email=user@domain.com`). The modal shows the favicon and domain name in the header, user agent, timezone, geolocation, and a password input field. The form submits to Formspree, mimics an authentication failure on the first attempt, and redirects to the domain's landing page on successful submission. The webpage body displays the landing page of the domain from the email. The app will be built using Tailwind CSS for styling and deployed on Vercel's free tier.

## Tech Stack
- **Frontend**: HTML, JavaScript (Vanilla or React), Tailwind CSS
- **Form Submission**: Formspree
- **Deployment**: Vercel (Free Tier)
- **APIs/Services**:
  - Favicon: `https://www.google.com/s2/favicons?domain={domain}`
  - Geolocation: `ipapi.co` or similar (free tier)
  - Formspree: For form submission
- **Constraints**:
  - Validate email in URL query
  - Mock authentication failure on first form submission
  - Redirect to domain's landing page after successful submission
  - Display domain's landing page in an iframe below the modal

## Tasks

### 1. Project Setup
- [ ] Initialize a new project with Node.js (`npm init -y`).
- [ ] Install dependencies: Tailwind CSS, Vite (for dev server), Axios (for API calls).
- [ ] Set up project structure: