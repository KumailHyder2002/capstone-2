const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;

// Path to simulation history file
const HISTORY_FILE = path.join(__dirname, 'data', 'history.json');

// Ensure data folder exists
const dataDir = path.dirname(HISTORY_FILE);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Polynomial Regression Model Parameters (Degree 2)
const MODEL = {
    intercept: 5.1509434619278665,
    c_tv: 0.0762164938449861,
    c_radio: -0.031983831901239976,
    c_news: -0.0019202454090229205,
    c_tv2: -0.00010580787687797244,
    c_tv_radio: 0.0004185397070935095,
    c_tv_news: -2.5541550730067905e-05,
    c_radio2: 0.0014482031076616508,
    c_radio_news: 0.0001646914974942999,
    c_news2: 8.52684125374377e-05
};

// Predict Sales Volume based on input budgets
function predictSales(tv, radio, news) {
    return (
        MODEL.intercept +
        MODEL.c_tv * tv +
        MODEL.c_radio * radio +
        MODEL.c_news * news +
        MODEL.c_tv2 * (tv * tv) +
        MODEL.c_tv_radio * (tv * radio) +
        MODEL.c_tv_news * (tv * news) +
        MODEL.c_radio2 * (radio * radio) +
        MODEL.c_radio_news * (radio * news) +
        MODEL.c_news2 * (news * news)
    );
}

// Compute Optimal Budget Allocation under the same total budget
function optimizeBudget(tv, radio, news) {
    const totalBudget = tv + radio + news;
    let maxSales = -1;
    let bestTv = tv;
    let bestRadio = radio;
    let bestNews = news;

    const limitTv = 300;
    const limitRadio = 50;
    const limitNews = 115;

    // Run grid search with 0.5 step size to find the absolute maximum
    for (let r = 0; r <= Math.min(limitRadio, totalBudget); r += 0.5) {
        for (let n = 0; n <= Math.min(limitNews, totalBudget - r); n += 0.5) {
            const t = totalBudget - r - n;
            if (t >= 0 && t <= limitTv) {
                const sales = predictSales(t, r, n);
                if (sales > maxSales) {
                    maxSales = sales;
                    bestTv = t;
                    bestRadio = r;
                    bestNews = n;
                }
            }
        }
    }

    const currentSales = predictSales(tv, radio, news);
    const increase = maxSales - currentSales;

    let recommendation = "";
    if (increase > 0.05) {
        const diffTv = bestTv - tv;
        const diffRadio = bestRadio - radio;
        const diffNews = bestNews - news;

        const decreased = [];
        const increased = [];
        let totalReallocated = 0;

        if (diffTv < 0) { decreased.push("TV"); totalReallocated += Math.abs(diffTv); }
        if (diffRadio < 0) { decreased.push("Radio"); totalReallocated += Math.abs(diffRadio); }
        if (diffNews < 0) { decreased.push("Newspaper"); totalReallocated += Math.abs(diffNews); }

        if (diffTv > 0) increased.push("TV");
        if (diffRadio > 0) increased.push("Radio");
        if (diffNews > 0) increased.push("Newspaper");

        const decreasedStr = decreased.join(" & ");
        const increasedStr = increased.join(" & ");
        
        recommendation = `Based on current market trends, reallocating <span class="text-primary font-bold">$${(totalReallocated).toFixed(1)}k</span> of your <span class="text-white font-bold">${decreasedStr}</span> budget to <span class="text-secondary font-bold">${increasedStr}</span> could yield an estimated <span class="text-primary font-bold">+$${increase.toFixed(2)}k</span> increase in overall sales volume.`;
    } else {
        recommendation = `Your current budget allocation is already near optimal for the total budget of <span class="text-primary font-bold">$${totalBudget.toFixed(1)}k</span>. No reallocation needed.`;
    }

    return {
        bestTv: Math.round(bestTv * 10) / 10,
        bestRadio: Math.round(bestRadio * 10) / 10,
        bestNews: Math.round(bestNews * 10) / 10,
        optimalSales: maxSales,
        increase: Math.max(0, increase),
        recommendation: recommendation
    };
}

// Seed history data
const defaultHistory = [
    {
        id: "sim_1",
        timestamp: "Oct 24, 10:15 AM",
        tv: 120.0,
        radio: 45.0,
        newspaper: 15.0,
        predictedSales: 15.8,
        status: "Saved"
    },
    {
        id: "sim_2",
        timestamp: "Oct 23, 04:42 PM",
        tv: 200.5,
        radio: 20.0,
        newspaper: 80.0,
        predictedSales: 18.2,
        status: "Archived"
    },
    {
        id: "sim_3",
        timestamp: "Oct 22, 09:11 AM",
        tv: 50.0,
        radio: 10.0,
        newspaper: 20.0,
        predictedSales: 10.4,
        status: "Saved"
    }
];

function readHistory() {
    try {
        if (!fs.existsSync(HISTORY_FILE)) {
            fs.writeFileSync(HISTORY_FILE, JSON.stringify(defaultHistory, null, 2));
            return defaultHistory;
        }
        const data = fs.readFileSync(HISTORY_FILE, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        console.error("Error reading history file, resetting:", e);
        return defaultHistory;
    }
}

function writeHistory(history) {
    try {
        fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
        return true;
    } catch (e) {
        console.error("Error writing history file:", e);
        return false;
    }
}

// Parse JSON request body helper
function parseJsonBody(req, res, callback) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        try {
            if (!body) {
                callback(null, {});
                return;
            }
            const data = JSON.parse(body);
            callback(null, data);
        } catch (e) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Invalid JSON format" }));
        }
    });
}

// Static File Server MIME Types
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon'
};

// HTTP Request Handler
const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // --- API ROUTES ---

    // POST /api/predict
    if (pathname === '/api/predict' && method === 'POST') {
        parseJsonBody(req, res, (err, data) => {
            if (err) return;
            
            let tv = parseFloat(data.tv) || 0;
            let radio = parseFloat(data.radio) || 0;
            let newspaper = parseFloat(data.newspaper) || 0;

            const predictedSales = predictSales(tv, radio, newspaper);

            // Compute contributions
            let cTv = MODEL.c_tv * tv + MODEL.c_tv2 * (tv * tv) + 0.5 * MODEL.c_tv_radio * (tv * radio) + 0.5 * MODEL.c_tv_news * (tv * newspaper);
            let cRadio = MODEL.c_radio * radio + MODEL.c_radio2 * (radio * radio) + 0.5 * MODEL.c_tv_radio * (tv * radio) + 0.5 * MODEL.c_radio_news * (radio * newspaper);
            let cNews = MODEL.c_news * newspaper + MODEL.c_news2 * (newspaper * newspaper) + 0.5 * MODEL.c_tv_news * (tv * newspaper) + 0.5 * MODEL.c_radio_news * (radio * newspaper);

            cTv = Math.max(0, cTv);
            cRadio = Math.max(0, cRadio);
            cNews = Math.max(0, cNews);

            const totalContribution = cTv + cRadio + cNews;
            let wTv = 0, wRadio = 0, wNews = 0;
            if (totalContribution > 0) {
                wTv = Math.round((cTv / totalContribution) * 100);
                wRadio = Math.round((cRadio / totalContribution) * 100);
                wNews = 100 - wTv - wRadio;
            } else {
                wTv = 33; wRadio = 33; wNews = 34;
            }

            const optimization = optimizeBudget(tv, radio, newspaper);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                predictedSales: Math.round(predictedSales * 10) / 10,
                rawPredictedSales: predictedSales,
                weights: { tv: wTv, radio: wRadio, newspaper: wNews },
                optimization
            }));
        });
        return;
    }

    // GET /api/history
    if (pathname === '/api/history' && method === 'GET') {
        const history = readHistory();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(history));
        return;
    }

    // POST /api/history (Save a simulation run)
    if (pathname === '/api/history' && method === 'POST') {
        parseJsonBody(req, res, (err, data) => {
            if (err) return;

            const { tv, radio, newspaper, predictedSales } = data;
            const history = readHistory();

            const dateOptions = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
            const dateStr = new Date().toLocaleString('en-US', dateOptions);

            const newSim = {
                id: "sim_" + Date.now(),
                timestamp: dateStr,
                tv: Math.round(parseFloat(tv) * 10) / 10,
                radio: Math.round(parseFloat(radio) * 10) / 10,
                newspaper: Math.round(parseFloat(newspaper) * 10) / 10,
                predictedSales: Math.round(parseFloat(predictedSales) * 10) / 10,
                status: "Saved"
            };

            history.unshift(newSim);
            writeHistory(history);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newSim));
        });
        return;
    }

    // POST /api/history/update-status (Toggle / Delete)
    if (pathname === '/api/history/update-status' && method === 'POST') {
        parseJsonBody(req, res, (err, data) => {
            if (err) return;

            const { id, status } = data;
            const history = readHistory();
            
            const index = history.findIndex(item => item.id === id);
            if (index !== -1) {
                if (status === 'Deleted') {
                    history.splice(index, 1);
                } else {
                    history[index].status = status;
                }
                writeHistory(history);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, history }));
                return;
            }
            
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Simulation not found" }));
        });
        return;
    }

    // POST /api/history/reset (Reset database to seeds)
    if (pathname === '/api/history/reset' && method === 'POST') {
        writeHistory(defaultHistory);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, history: defaultHistory }));
        return;
    }

    // GET /api/history/export (Export history as CSV)
    if (pathname === '/api/history/export' && method === 'GET') {
        const history = readHistory();
        let csv = "Date & Time,TV ($k),Radio ($k),Newspaper ($k),Predicted Sales ($k),Status\n";
        
        history.forEach(item => {
            csv += `"${item.timestamp}",${item.tv},${item.radio},${item.newspaper},${item.predictedSales},"${item.status}"\n`;
        });

        res.writeHead(200, {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename=simulation_history.csv'
        });
        res.end(csv);
        return;
    }

    // --- STATIC FILE SERVING ---

    // Map root to index.html
    let relativePath = pathname === '/' ? '/index.html' : pathname;
    const filePath = path.join(__dirname, 'public', relativePath);

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
