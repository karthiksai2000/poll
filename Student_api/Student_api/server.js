// 1. Import express
const express = require('express');
const path = require('path'); // <-- Added for static path handling

// 2. Initialize app
const app = express();

// 3. Middleware to parse JSON request body
app.use(express.json());

// 4. Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// 5. Import routes
const studentRoutes = require('./Routes/studentRoutes'); // Adjust path if needed

// 6. Mount routes
app.use('/students', studentRoutes);

// 7. Root test route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 8. Start server
const port = process.env.PORT || 3000; // Render provides PORT env variable
app.listen(port, () => {
  console.log(`✅ Server running at port: ${port}`);
});

