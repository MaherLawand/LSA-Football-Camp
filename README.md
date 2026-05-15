# Football Camp Registration Form

A React-based static website for football camp registration with Google Sheets integration.

## Features

- 📝 Responsive registration form
- ⚽ Football-specific fields (position, experience, etc.)
- 📊 Automatic data submission to Google Sheets
- 🎨 Modern, clean UI design
- 📱 Mobile-friendly responsive design

## Tech Stack

- **Frontend**: React 19 + Vite
- **HTTP Client**: Axios
- **Backend**: Google Apps Script (for Google Sheets integration)
- **Styling**: CSS3 with modern design

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google account (for Sheets integration)

### Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd football-form
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Google Sheets Setup

Before running the app, you need to set up Google Sheets integration:

1. Follow the detailed setup instructions in [`GOOGLE_SHEETS_SETUP.md`](./GOOGLE_SHEETS_SETUP.md)
2. Update the `.env` file with your Google Apps Script URL

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## Form Fields

- First Name & Last Name
- Email & Phone Number
- Age (8-18 years)
- Preferred Position
- Football Experience
- Emergency Contact Information

## Deployment

This is a static React app that can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Replace `YOUR_SCRIPT_ID` with your actual Google Apps Script deployment URL.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
