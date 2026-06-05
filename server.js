const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from dist
app.use(express.static(path.join(__dirname, 'artifacts', 'mockup-sandbox', 'dist')));

// SPA fallback — serve index.html for all non-file routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'artifacts', 'mockup-sandbox', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
