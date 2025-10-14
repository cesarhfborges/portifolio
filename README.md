# NgDevFolio - Modern Angular Portfolio Website

> This is an Angular adaptation of the excellent [Developer Portfolio](https://github.com/cesarhfborges) project originally created by [César Borges](https://github.com/said7388) in Next.js.

<p align="center">
  <img src="https://github.com/JaveedIshaq/ng-dev-folio/blob/main/screenshot.png?raw=true" alt="Ng Dev Folio Screenshot"/>
</p>

A modern, responsive, and customizable portfolio website built with Angular 19. Perfect for developers looking to showcase their work, skills, and professional journey.

## 🌟 Features

- 📱 Fully Responsive Design
- 🎨 Modern UI with Tailwind CSS
- 📝 Dynamic Blog Integration with Dev.to API
- 📧 Contact Form with EmailJS
- 🚀 Optimized Performance
- 🔍 SEO Friendly
- 🌓 Dark Mode Support
- 📊 Analytics Ready

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Angular CLI](https://angular.io/cli) (v19 or higher)
- [Git](https://git-scm.com/)

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/JaveedIshaq/ng-dev-folio
   cd ng-dev-folio
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```
### Important Notes on Configuration

#### Using --legacy-peer-deps
We use `npm install --legacy-peer-deps` because Angular 19 has strict peer dependency requirements. This flag allows us to:
- Install packages with peer dependency conflicts
- Maintain compatibility with packages that haven't yet updated to support Angular 19
- Work around the dependency conflict between @angular-builders/custom-webpack and Angular 19

#### Custom Webpack Configuration
The [custom-webpack.config.js](cci:7://file:///Users/javeedishaq/devwork/ng-dev-folio/custom-webpack.config.js:0:0-0:0) is essential because:
1. Angular 19 doesn't natively support `.env` files for environment variables
2. We use `dotenv-webpack` plugin to:
  - Load environment variables from `.env` files
  - Access these variables using `process.env` in our application
  - Keep sensitive information like API keys secure
  - Support different configurations for development and production

This setup allows us to maintain secure and flexible environment configurations while working with Angular 19's architecture.

3. **Set up environment variables**
  - Create a `.env` file in the root directory
  - Copy contents from `.env.template`
  - Fill in your values:
   ```env
   EMAILJS_PUBLIC_KEY=your_public_key
   EMAILJS_SERVICE_ID=your_service_id
   EMAILJS_TEMPLATE_ID=your_template_id
   ```

4. **Start development server**
   ```bash
   ng serve
   ```

5. **View your portfolio**
   Open [http://localhost:4200](http://localhost:4200) in your browser

## 📝 Configuration

### Personal Information
Edit `src/app/core/data/personal-info.ts`:
```typescript
export const personalInfo = {
  name: 'Your Name',
  title: 'Your Title',
  email: 'your.email@example.com',
  // ... other personal details
};
```

### Projects
Edit `src/app/core/data/projects.ts`:
```typescript
export const projects = [
  {
    title: 'Project Name',
    description: 'Project Description',
    technologies: ['Angular', 'TypeScript', 'Tailwind'],
    github: 'https://github.com/...',
    demo: 'https://demo-link...'
  },
  // ... more projects
];
```

### Blog Integration
1. Get your Dev.to username
2. Update `src/utils/data/personal-data.ts`:
   ```typescript
   export const personalData = {
     // ... other config
     devUsername: 'your-devto-username'
   };
   ```

### Email Configuration
1. Create an [EmailJS](https://www.emailjs.com/) account
2. Create an email template
3. Get your credentials
4. Add them to your `.env` file

## 🎨 Customization

### Styling
- Main styles: `src/styles.css`
- Tailwind config: `tailwind.config.js`
- Component-specific styles: `src/app/components/*/*.css`

### Content
- Components: `src/app/components/`
- Data: `src/app/core/data/`
- Assets: `src/assets/`

## 📦 Building for Production

1. **Build the project**
   ```bash
   ng build --configuration production
   ```

2. **Test the production build locally**
   ```bash
   npm install -g http-server
   http-server dist/ngdevfolio
   ```

## 🚀 Deployment

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Netlify
1. Push to GitHub
2. Connect repository in Netlify
3. Configure build settings:
  - Build command: `ng build --configuration production`
  - Publish directory: `dist/ngdevfolio`

## 🔧 Troubleshooting

### Common Issues

1. **EmailJS not working**
  - Check if environment variables are properly set
  - Verify EmailJS template configuration

2. **Blog posts not loading**
  - Confirm Dev.to username is correct
  - Check network requests for API errors

3. **Styling issues**
  - Run `npm run build:css` to rebuild Tailwind
  - Clear browser cache

## 📚 Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [Dev.to API Documentation](https://developers.forem.com/api)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original Portfolio Design by [César Borges](https://github.com/cesarhfborges) built with Next.js
- Angular Team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- EmailJS for the email service
- Dev.to for the blog integration capabilities

---

## What's Next?

- [ ] Add support for multiple blog platforms
- [ ] Integrate with other services (e.g. Twitter, GitHub, etc.)
- [ ] Add more customization options
- [ ] Improve accessibility
- [ ] Add a feedback system

dev version: 1.0

Made with ❤️ by Javeed Ishaq
