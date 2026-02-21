# AA Web Creations - Setup Guide

## 📋 Project Overview

A modern, premium portfolio website for AA Web Creations with **automatic form submission storage** to both localStorage and a JSON file.

---

## 🚀 Quick Start

### 1. **Install Dependencies**
```bash
npm install
```

This will install:
- `express` - Web server framework
- `cors` - CORS middleware
- `body-parser` - Request body parser

### 2. **Start the Server**
```bash
npm start
```

The server will start on `http://localhost:3000`

You should see:
```
╔════════════════════════════════════════════════════════════╗
║     AA Web Creations - Server Running Successfully         ║
╚════════════════════════════════════════════════════════════╝

🚀 Server is running on: http://localhost:3000
📁 Submissions saved to: ./submissions.json
```

### 3. **Access Your Website**
Open your browser and go to: `http://localhost:3000`

---

## 💾 Data Storage

### **Dual Storage System:**

| Storage | Location | Purpose |
|---------|----------|---------|
| **JSON File** | `submissions.json` | Primary data storage on server |
| **LocalStorage** | Browser | Automatic backup (offline support) |

Every form submission is saved **automatically** to both locations!

---

## 📁 File Structure

```
AAWebCreations/
├── index.html           # Main website
├── style.css            # Styling
├── script.js            # Frontend logic + localStorage
├── server.js            # Backend server (saves to JSON)
├── package.json         # Dependencies
├── submissions.json     # Where form data is stored
└── README.md            # This file
```

---

## 🔌 API Endpoints

The server provides these endpoints:

### **1. Submit Contact Form**
```
POST /api/submit-contact-form
Content-Type: application/json

{
  "name": "Amos Anand",
  "email": "amos@example.com",
  "message": "Your message here"
}

Response:
{
  "success": true,
  "message": "Message received successfully!",
  "data": {
    "id": 1708534800000,
    "name": "Amos Anand",
    "email": "amos@example.com",
    "message": "Your message here",
    "timestamp": "2026-02-21T10:00:00.000Z",
    "ipAddress": "127.0.0.1"
  }
}
```

### **2. Get All Submissions**
```
GET /api/get-submissions

Response:
{
  "success": true,
  "count": 5,
  "data": [
    { submission 1 },
    { submission 2 },
    ...
  ]
}
```

### **3. Download Submissions as JSON**
```
GET /api/download-submissions

→ Downloads: submissions_1708534800000.json
```

### **4. Clear All Submissions**
```
POST /api/clear-submissions

Response:
{
  "success": true,
  "message": "All submissions cleared"
}
```

---

## 🎮 Browser Console Commands

Open DevTools (F12) and use these commands:

### **View LocalStorage Submissions**
```javascript
getAllSubmissions()
```

### **Export LocalStorage to JSON File**
```javascript
exportSubmissionsAsJSON()
```

---

## 📊 Viewing Submissions

### **Option 1: Via Browser**
1. Open DevTools (F12)
2. Run: `getAllSubmissions()`

### **Option 2: Via Server API**
1. Visit: `http://localhost:3000/api/get-submissions`
2. All submissions display as JSON

### **Option 3: View JSON File Directly**
- Open `submissions.json` in any text editor
- View all submissions with timestamps

### **Option 4: Download JSON File**
- Visit: `http://localhost:3000/api/download-submissions`
- Automatically downloads submissions data

---

## 🛡️ Features

✅ **Automatic Form Submission Handling**
✅ **Dual Storage** (Server + Browser)
✅ **JSON File Export** 
✅ **Offline Support** (LocalStorage backup)
✅ **Beautiful UI** with Dark Theme
✅ **Mobile Responsive**
✅ **Glassmorphism Effects**
✅ **Smooth Animations**

---

## 🔧 Troubleshooting

### **Port 3000 already in use?**
```bash
# Use a different port, edit server.js:
const PORT = 3001;  // Change to any available port
```

### **Server not connecting?**
1. Make sure server is running: `npm start`
2. Check if port 3000 is accessible
3. Check browser console (F12) for errors

### **Form not submitting?**
1. Check browser console (F12) for messages
2. Data should save to localStorage as fallback
3. Verify server is running

### **Want to use without server?**
- Just use localStorage commands
- Run: `getAllSubmissions()`
- Run: `exportSubmissionsAsJSON()`

---

## 📞 WhatsApp Integration

The website includes a WhatsApp button linking to: **+91 8757603560**

To change the number, edit in `index.html`:
```html
<a href="https://wa.me/918757603560">WhatsApp Me</a>
```

Replace `918757603560` with your WhatsApp number (international format: 91 = India code)

---

## 🚀 Deployment

### **To Deploy Online:**

1. **Choose a Host** (Heroku, Railway, Render, etc.)
2. **Push to Git**
   ```bash
   git init
   git add .
   git commit -m "AA Web Creations Portfolio"
   git push origin main
   ```

3. **Connect to Host** - Follow their deployment guide
4. **Set Environment Variables** if needed
5. **Start Server** - Your host will run `npm start`

### **Updated URLs in script.js:** (if deploying)
```javascript
// Change from localhost to your domain
fetch('https://yourdomain.com/api/submit-contact-form', {
  // ...
})
```

---

## 📝 Data Format in submissions.json

```json
[
  {
    "id": 1708534800000,
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I'm interested in your services",
    "timestamp": "2026-02-21T10:00:00.000Z",
    "ipAddress": "127.0.0.1"
  },
  {
    "id": 1708534900000,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "message": "Great website!",
    "timestamp": "2026-02-21T10:05:00.000Z",
    "ipAddress": "127.0.0.1"
  }
]
```

---

## 🎨 Customization

### **Change Server Port:**
Edit `server.js`:
```javascript
const PORT = 3000;  // Change this
```

### **Change Storage Location:**
Edit `server.js`:
```javascript
const submissionsFile = path.join(__dirname, 'submissions.json');  // Change path
```

### **Change Submission Format:**
Modify form fields in `index.html` and `script.js` to add/remove fields.

---

## 📧 Contact & Support

- **Developer:** Amos Anand
- **Location:** Ranchi, Jharkhand
- **WhatsApp:** +91 8757603560
- **Website:** AA Web Creations

---

## 📄 License

MIT License - Feel free to use and modify

---

## ✨ Enjoy Your Portfolio Website!

Your form submissions are now safely stored and easily accessible. Happy coding! 🚀
