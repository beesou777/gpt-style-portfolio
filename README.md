# Bishwa Jung Shah Interactive Portfolio

A modern, interactive portfolio website featuring a ChatGPT-inspired design with a smart rule-based chatbot. The site showcases projects in card view, skills, work experience, and includes an AI-like chat assistant that answers questions about the portfolio (no AI API required!).

## Features

- 🎨 **Modern Portfolio Layout**: Hero section, skills showcase, and project cards
- 💬 **Smart Chatbot**: Rule-based chat interface that responds based on portfolio data
- 🎯 **Project Cards**: Beautiful card view with icons, descriptions, and tech stacks
- ⚡ **Typing Animation**: Real-time character-by-character response streaming
- 🎭 **Smooth Animations**: Framer Motion animations throughout
- 💡 **Suggestion Buttons**: Quick-start conversation prompts
- 📱 **Responsive Design**: Works seamlessly on all devices
- 🚀 **No API Keys Required**: Works completely offline, no external services needed
- 🔗 **Social Links**: Direct links to GitHub, LinkedIn, Medium, and more

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Backend**: Rule-based response system (no AI API needed!)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- **No API keys required!** Works completely offline.

### Installation

1. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # API route for chat
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   └── ChatInterface.tsx         # Main chat component
├── data/
│   └── portfolio.json            # Portfolio data
└── public/                       # Static assets
```

## Customization

### Update Portfolio Data

Edit `data/portfolio.json` to update portfolio information. The chatbot will only answer based on this data.

### Modify Chatbot Behavior

Edit the `generateResponse` function in `app/api/chat/route.ts` to customize how the chatbot responds to different queries. You can add new keyword matches and responses as needed.

### Styling

Modify `tailwind.config.js` and `app/globals.css` to customize the appearance.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy! (No environment variables needed)

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## License

MIT
