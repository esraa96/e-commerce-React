# E-Commerce Store Setup Guide

## Overview
This is a modern e-commerce application built with React + Vite, Commerce.js, and Stripe integration, inspired by depot.qodeinteractive.com.

## Features
- Product catalog with Commerce.js API
- Shopping cart functionality
- Checkout process with Stripe integration
- Responsive design with TailwindCSS
- Modern UI components

## Prerequisites
- Node.js (v16 or higher)
- Commerce.js account
- Stripe account (for payments)

## Setup Instructions

### 1. Commerce.js Setup
1. Go to [Commerce.js](https://commercejs.com/) and create an account
2. Create a new store
3. Add some products to your store via the Commerce.js dashboard
4. Get your Public API key from the Developer section

### 2. Stripe Setup
1. Go to [Stripe](https://stripe.com/) and create an account
2. Get your Publishable key from the API keys section
3. In Commerce.js dashboard, go to Settings > Payment Gateways
4. Enable Stripe and connect your Stripe account

### 3. Environment Variables
Create a `.env` file in the root directory and add:

```env
VITE_COMMERCEJS_PUBLIC_KEY=your_commercejs_public_key_here
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Run Development Server
```bash
npm run dev
```

## Deployment

### Vercel Deployment
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Netlify Deployment
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Add environment variables in Netlify dashboard

## Project Structure
```
src/
├── components/          # React components
│   ├── Home.jsx        # Homepage with product grid
│   ├── ProductCard.jsx # Product card component
│   ├── ProductDetail.jsx # Product detail page
│   ├── Cart.jsx        # Shopping cart
│   ├── Checkout.jsx    # Checkout process
│   └── Nav.jsx         # Navigation
├── hooks/              # Custom hooks
│   └── useCart.js      # Cart management
├── services/           # API services
│   ├── commerce.js     # Commerce.js client
│   └── stripe.js       # Stripe client
└── App.jsx            # Main app component
```

## API Integration

### Commerce.js Features Used
- Product listing and retrieval
- Cart management (add, update, remove)
- Checkout token generation
- Order processing

### Stripe Integration
- Payment processing through Commerce.js
- Secure checkout flow

## Customization
- Modify TailwindCSS classes for styling
- Add more product filters and categories
- Implement user authentication
- Add product search functionality
- Integrate with Google Analytics

## Support
For issues with:
- Commerce.js: Check [Commerce.js Documentation](https://commercejs.com/docs/)
- Stripe: Check [Stripe Documentation](https://stripe.com/docs)
- React/Vite: Check respective documentation

## License
MIT License