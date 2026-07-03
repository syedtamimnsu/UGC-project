import { ClerkProvider } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable key")
}

createRoot(document.getElementById('root')! as HTMLElement).render(
    <ClerkProvider
    appearance={{
        baseTheme: dark,
        variables: {
            colorPrimary: '#4f39f6',
            colorTextOnPrimaryBackground: "#ffffff"

        }
    }}
    publishableKey={PUBLISHABLE_KEY}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ClerkProvider>
    
)