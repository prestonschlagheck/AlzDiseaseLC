# Alzheimer's Disease Learning Center

A modern, responsive web application for the Alzheimer's Disease Learning Center, providing evidence-based knowledge and resources for clinicians. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Expert Faculty**: Showcase of leading Alzheimer's disease researchers and clinicians
- **Educational Resources**: Curated CME activities and clinical practice resources
- **Statistics Display**: Interactive impact statistics and prevalence data
- **Resource Center**: Therapeutic guidelines and diagnostic resources
- **Performance Optimized**: Built with Next.js Image optimization and best practices

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd alzheimers-learning-center
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run clean` - Clean build cache

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── VideoIntroduction.tsx # Hub information and statistics
│   ├── Statistics.tsx  # Key Alzheimer's statistics
│   ├── Faculty.tsx     # Expert faculty showcase
│   ├── EducationalPrograms.tsx # Educational activities
│   ├── ResourceCenter.tsx # Guidelines and resources
│   └── Footer.tsx      # Footer component
public/
├── alzlogo.png         # Main Alzheimer's logo
└── ...
```

## Key Components

### Header
- Dynamic color-changing navigation based on scroll position
- Responsive mobile menu
- Smooth scroll navigation

### VideoIntroduction (Hub Section)
- Impact statistics with animated numbers
- Regional prevalence data links
- Interactive buttons to key resources

### Statistics
- Three key Alzheimer's statistics cards
- Links to authoritative sources (Alzheimer's Association, NIH, CDC)
- Responsive grid layout

### Faculty
- Expert faculty and steering committee showcase
- Organized display of credentials and expertise areas
- Responsive layout (2-6 columns based on screen size)

### ResourceCenter
- Therapeutic guidelines and diagnostic resources
- Conference calendar and CME activities
- Collapsible resource display

## Deployment

This project is optimized for Vercel deployment:

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

## Performance Features

- Next.js Image optimization
- Static generation where possible
- Optimized bundle size
- Responsive images with proper sizing

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

This project was developed by Preston Schlagheck for the Alzheimer's Disease Learning Center initiative.

## Author

**Preston Schlagheck**

## License

This project is proprietary and confidential.