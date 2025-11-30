const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Initialize Firebase Admin
const { initializeFirebase } = require('./config/firebase-admin-config');
try {
  initializeFirebase();
} catch (error) {
  console.error('⚠️  Warning: Firebase not initialized. Please configure Firebase credentials.');
  console.error('   The server will start but Firebase features will not work.');
}

const activitiesRoutes = require('./routes/activities');
const reservationsRoutes = require('./routes/reservations');
const currencyRoutes = require('./routes/currency');
const adminRoutes = require('./routes/admin');
const analyticsRoutes = require('./routes/analytics');

const app = express();
const PORT = 3001;

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Multer for file uploads (Memory Storage for Firebase)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Upload Endpoint
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const firebaseService = require('./services/firebaseService');
    const result = await firebaseService.uploadFile(req.file, 'activities');

    res.json({
      imageUrl: result.url,
      filename: result.filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
});

// Routes
app.use('/api/activities', activitiesRoutes);
app.use('/api/reservations', reservationsRoutes);
app.use('/api/currency', currencyRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/analytics', analyticsRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Ghassen Travel Guide API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
