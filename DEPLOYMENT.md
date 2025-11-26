# Deployment Guide

This guide will help you deploy the ThinkMinnt Foundation website.

## 🚀 Quick Deploy

### Frontend (Vercel) - Recommended

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with your GitHub account
3. **Import Repository**:
   - Click "Add New..." → "Project"
   - Select `tejaschaudhari131/Thinkminnt`
4. **Configure**:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. **Deploy!**

### Backend (Render) - Recommended

1. **Go to Render**: https://render.com
2. **Sign in** with your GitHub account
3. **New Web Service**:
   - Connect repository: `tejaschaudhari131/Thinkminnt`
4. **Configure**:
   - Name: `thinkminnt-api`
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: Free
5. **Environment Variables** (Add these):
   ```
   NODE_ENV=production
   PORT=3001
   ```
6. **Deploy!**

## 🔗 Connect Frontend to Backend

After deploying both:

1. **Get your Render backend URL** (e.g., `https://thinkminnt-api.onrender.com`)

2. **Update API calls in frontend**:
   - Create `.env.production` file:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

3. **Update fetch calls** to use environment variable:
   ```javascript
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
   fetch(`${API_URL}/api/contacts`, ...)
   ```

4. **Redeploy frontend** on Vercel

## 📝 Important Notes

### Database
- SQLite database will reset on Render's free tier (use PostgreSQL for production)
- Uploaded files (resumes) will be lost on restart

### CORS
- Update CORS settings in `server/index.js` to allow your Vercel domain

### Secrets
- Never commit `.env` files
- Use platform environment variables for sensitive data

## 🎯 Alternative: All-in-One Deployment

### Railway (Frontend + Backend together)

1. Go to https://railway.app
2. Sign in with GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect and deploy both

## 🌐 Custom Domain Setup (thinkminnt.com)

### Frontend (Vercel)
1. Go to your Vercel Project Settings → **Domains**
2. Add `thinkminnt.com`
3. Vercel will provide **DNS Records** (A Record and CNAME)
4. Go to your Domain Registrar (GoDaddy, Namecheap, etc.)
5. Add the provided records:
   - **A Record**: `@` points to `76.76.21.21`
   - **CNAME**: `www` points to `cname.vercel-dns.com`

### Backend (Render)
1. Go to your Render Web Service → **Settings** → **Custom Domains**
2. Add `api.thinkminnt.com` (Recommended)
3. Render will provide a CNAME record
4. Add it to your Domain Registrar:
   - **CNAME**: `api` points to `your-service.onrender.com`

### Update Configuration
Once domains are active:
1. Update `VITE_API_URL` in Vercel to `https://api.thinkminnt.com`
2. Redeploy Frontend

## 🔒 Production Checklist

- [ ] Update CORS origins
- [ ] Set up environment variables
- [ ] Configure database (PostgreSQL recommended)
- [ ] Set up file storage (AWS S3, Cloudinary)
- [ ] Enable HTTPS
- [ ] Set up monitoring
- [ ] Configure custom domain

## 📞 Need Help?

Refer to platform documentation:
- Vercel: https://vercel.com/docs
- Render: https://render.com/docs
- Railway: https://docs.railway.app
