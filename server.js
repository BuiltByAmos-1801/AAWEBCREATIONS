const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));

// Path to JSON file where submissions will be stored
const submissionsFile = path.join(__dirname, 'submissions.json');

// Initialize submissions file if it doesn't exist
if (!fs.existsSync(submissionsFile)) {
    fs.writeFileSync(submissionsFile, JSON.stringify([], null, 2));
}

// Route to handle form submissions
app.post('/api/submit-contact-form', (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validate data
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please fill out all fields'
            });
        }

        // Create submission object
        const submission = {
            id: Date.now(),
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
            timestamp: new Date().toISOString(),
            ipAddress: req.ip
        };

        // Read existing submissions
        const fileContent = fs.readFileSync(submissionsFile, 'utf-8');
        let submissions = JSON.parse(fileContent);

        // Add new submission
        submissions.push(submission);

        // Write back to file
        fs.writeFileSync(submissionsFile, JSON.stringify(submissions, null, 2));

        console.log(`✅ New submission received from ${email}`);
        console.log(`📁 Saved to submissions.json`);
        console.log(`📊 Total submissions: ${submissions.length}\n`);

        res.json({
            success: true,
            message: 'Message received successfully!',
            data: submission
        });

    } catch (error) {
        console.error('❌ Error saving submission:', error);
        res.status(500).json({
            success: false,
            message: 'Error saving your message. Please try again.'
        });
    }
});

// Route to get all submissions (optional - for admin viewing)
app.get('/api/get-submissions', (req, res) => {
    try {
        const fileContent = fs.readFileSync(submissionsFile, 'utf-8');
        const submissions = JSON.parse(fileContent);

        res.json({
            success: true,
            count: submissions.length,
            data: submissions
        });
    } catch (error) {
        console.error('Error reading submissions:', error);
        res.status(500).json({
            success: false,
            message: 'Error reading submissions'
        });
    }
});

// Route to download submissions as JSON
app.get('/api/download-submissions', (req, res) => {
    try {
        const fileContent = fs.readFileSync(submissionsFile, 'utf-8');
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', `attachment; filename=submissions_${new Date().getTime()}.json`);
        res.send(fileContent);

        console.log('📥 Submissions downloaded');
    } catch (error) {
        console.error('Error downloading submissions:', error);
        res.status(500).json({
            success: false,
            message: 'Error downloading submissions'
        });
    }
});

// Route to delete all submissions (admin only)
app.post('/api/clear-submissions', (req, res) => {
    try {
        fs.writeFileSync(submissionsFile, JSON.stringify([], null, 2));
        console.log('🗑️  All submissions cleared');
        res.json({
            success: true,
            message: 'All submissions cleared'
        });
    } catch (error) {
        console.error('Error clearing submissions:', error);
        res.status(500).json({
            success: false,
            message: 'Error clearing submissions'
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║     AA Web Creations - Server Running Successfully         ║
╚════════════════════════════════════════════════════════════╝

🚀 Server is running on: http://localhost:${PORT}
📁 Submissions saved to: ${submissionsFile}

📝 Available Endpoints:
  POST   /api/submit-contact-form    - Submit form data
  GET    /api/get-submissions        - View all submissions
  GET    /api/download-submissions   - Download as JSON
  POST   /api/clear-submissions      - Clear all submissions

✨ Visit http://localhost:${PORT} to access your website
    `);
});
