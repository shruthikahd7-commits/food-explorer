# Foodie Explorer

A responsive food discovery and ordering demo built with React, TypeScript, and Vite. Browse dishes, search by name or ingredient, filter by category, and manage a shopping basket with quantity controls and Indian rupee pricing.

## Getting Started

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173/`.

## Features

- Search dishes by name, description, or category.
- Filter the menu by food category.
- View dish photos, ratings, prices, and estimated preparation times.
- Add dishes to the basket, adjust quantities, and see the subtotal, delivery fee, and total.
- Get free delivery on orders of ₹25 or more.
- Responsive layout for desktop and mobile screens.

## Scripts

- `npm run dev` starts the local development server.
- `npm run build` runs the TypeScript check and creates a production build in `dist/`.
- `npm run preview` serves the production build locally.
- `npm run lint` runs Oxlint.

## Demo Notes

Menu data and basket state are held in the frontend; no backend or payment provider is connected. The checkout button demonstrates order confirmation and clears the basket. Dish photos and fonts are loaded from Unsplash and Google Fonts, so those assets require an internet connection.