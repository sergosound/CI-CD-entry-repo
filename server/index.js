import express from 'express';
import serverless from 'serverless-http';

const app = express();
const port = process.env.PORT || 3000;

// Example route matching your snippet
app.get('/api/ping', (req, res) => res.json({ ok: true }));

// Keep previous health route for convenience (optional)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// New route returning a plain string
app.get('/api/console', (req, res) => {
  res.type('text/plain').send('word');
});

// Initialize serverless wrapper (no export; useful if imported elsewhere)
const _handler = serverless(app);

// Start HTTP server for local/dev usage
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
