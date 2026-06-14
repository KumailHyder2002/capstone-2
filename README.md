# AdPredict AI 📊

A sales forecasting and budget optimization dashboard powered by a Polynomial Regression model trained on advertising spend data. Built with vanilla Node.js — zero dependencies.


## Overview

AdPredict AI lets marketing teams simulate how TV, Radio, and Newspaper budget allocations affect predicted sales volume. The underlying model is a **Degree-2 Polynomial Regression** (R² = 0.953) trained on the classic Advertising dataset, with coefficients extracted and hardcoded for instant, server-side inference — no Python runtime required in production.

Key capabilities:

- **Sales Forecasting** — Input channel budgets and get an instant sales volume prediction
- **Contribution Analysis** — See how much each channel (TV, Radio, Newspaper) drives the prediction
- **Smart Optimization** — Grid-search budget reallocation to find the allocation that maximizes sales within the same total spend
- **Simulation History** — Save, archive, and export past simulation runs as CSV

---

## Model

The regression model was trained in Python using `scikit-learn` and the public [Advertising dataset](https://www.kaggle.com/datasets/ashydv/advertising-dataset).

| Metric | Value |
|--------|-------|
| Algorithm | Polynomial Regression (Degree 2) |
| Train / Test Split | 80 / 20 |
| MAE | 0.903 |
| RMSE | 1.201 |
| R² Score | 0.953 |

The trained coefficients were extracted and embedded directly into `server.js` for zero-latency inference. See `advertising_model.ipynb` for the full training notebook.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js (≥ 16) |
| Server | Native `http` module — no frameworks |
| Frontend | Vanilla HTML + CSS + JS |
| Persistence | JSON flat-file (`data/history.json`) |
| ML Training | Python, scikit-learn, pandas, numpy |
| Dependencies | **None** (`"dependencies": {}`) |

---

## Project Structure

```
adpredict-ai/
├── server.js              # HTTP server, ML inference, optimization logic
├── test_model.js          # Mathematical parity tests for the JS model
├── package.json
├── advertising_model.ipynb  # Python training notebook
├── DESIGN.md              # Visual language & design system spec
├── public/
│   └── index.html         # Frontend dashboard
└── data/
    └── history.json       # Auto-generated simulation history (git-ignored)
```

---

## Getting Started

**Prerequisites:** Node.js 16+

```bash
# Clone the repo
git clone https://github.com/your-username/adpredict-ai.git
cd adpredict-ai

# No install step needed — zero dependencies

# Start the server
node server.js

# Visit the dashboard
open http://localhost:3000
```

To run on a custom port:

```bash
PORT=8080 node server.js
```

---

## API Reference

All endpoints return JSON unless noted.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/predict` | Run a sales forecast |
| `GET` | `/api/history` | Fetch all saved simulations |
| `POST` | `/api/history` | Save a simulation run |
| `POST` | `/api/history/update-status` | Archive or delete a simulation |
| `POST` | `/api/history/reset` | Reset history to seed data |
| `GET` | `/api/history/export` | Download history as CSV |

### POST `/api/predict`

**Request body:**
```json
{
  "tv": 150,
  "radio": 25,
  "newspaper": 30
}
```

**Response:**
```json
{
  "predictedSales": 16.4,
  "weights": { "tv": 62, "radio": 28, "newspaper": 10 },
  "optimization": {
    "bestTv": 163.5,
    "bestRadio": 36.5,
    "bestNews": 5.0,
    "optimalSales": 17.8,
    "increase": 1.4,
    "recommendation": "..."
  }
}
```

---

## Testing

A mathematical parity test validates that the JavaScript model exactly matches the Python-trained coefficients:

```bash
node test_model.js
```

Expected output:
```
Running Node.js Mathematical Parity Checks...
Test Case 1: TV=45, Radio=23, News=12  → PASS
Test Case 2: TV=120, Radio=45, News=15 → PASS
Test Case 3: TV=200.5, Radio=20, News=80 → PASS
SUCCESS: All mathematical model test cases passed in Node.js!
```

---

## Design System

The UI follows a custom **Glassmorphism + Corporate Modern** visual language documented in `DESIGN.md`. Key tokens:

- **Background:** `#0B1326` (deep slate)
- **Primary Accent:** `#4EDEA3` (neon emerald — growth & profit signals)
- **Secondary:** `#ADC6FF` (soft blue)
- **Typography:** Outfit (headings) + Inter (body/UI)
- **Cards:** `backdrop-filter: blur(12px)` with `1px #334155` precision borders

---

## License

MIT
