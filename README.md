<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Deorganized - AI-Powered Application

This is a production-ready React + Vite + TypeScript application powered by Google's Gemini API.

View your app in AI Studio: https://ai.studio/apps/drive/1Z-NnIULi-5zgdoQgp5RgZpolBMFlZh-K

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- **Gemini API Key** - [Get yours here](https://aistudio.google.com/apikey)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd DeorganizedP2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:3000`

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## 📦 Deployment

### Deploy to Vercel (Recommended)

#### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Add environment variables**
   In the Vercel dashboard, go to:
   - Project Settings → Environment Variables
   - Add `GEMINI_API_KEY` with your API key value
   - Make sure to add it for Production, Preview, and Development environments

4. **Redeploy if needed**
   ```bash
   vercel --prod
   ```

#### Option 2: Deploy via GitHub Integration

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure environment variables:
     - Key: `GEMINI_API_KEY`
     - Value: Your Gemini API key
   - Click "Deploy"

3. **Automatic Deployments**
   - Every push to `main` will trigger a production deployment
   - Pull requests will create preview deployments

### Deploy to Other Platforms

#### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Add environment variable: `GEMINI_API_KEY`

#### GitHub Pages (Static Hosting)
1. Update `vite.config.ts` to include the correct base path
2. Build and deploy the `dist` folder

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key | Yes |

### Vite Configuration

The project uses custom Vite configuration in `vite.config.ts`:
- Dev server runs on port 3000
- Environment variables are exposed via `process.env`
- Path aliases configured with `@` pointing to root

## 🏗️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Google Gemini API** - AI capabilities

## 📁 Project Structure

```
DeorganizedP2/
├── components/         # React components
├── App.tsx            # Main application component
├── index.tsx          # Application entry point
├── index.html         # HTML template
├── vite.config.ts     # Vite configuration
├── tsconfig.json      # TypeScript configuration
├── package.json       # Dependencies and scripts
├── vercel.json        # Vercel deployment configuration
├── .env.example       # Environment variables template
└── .gitignore         # Git ignore rules
```

## 🔐 Security Notes

- Never commit `.env.local` or any file containing API keys
- Use environment variables for all sensitive data
- The `.gitignore` file is configured to exclude sensitive files
- Rotate your API keys if accidentally exposed

## 🐛 Troubleshooting

### Build fails
- Ensure all dependencies are installed: `npm install`
- Check Node.js version: `node --version` (should be v18+)

### API not working
- Verify your `GEMINI_API_KEY` is set correctly
- Check the browser console for errors
- Ensure the API key has the necessary permissions

### Deployment issues on Vercel
- Verify environment variables are set in Vercel dashboard
- Check build logs in Vercel deployment details
- Ensure `vercel.json` is in the repository root

## 📝 License

This project is private and not licensed for public use.

## 🤝 Contributing

This is a private project. Contact the repository owner for contribution guidelines.
