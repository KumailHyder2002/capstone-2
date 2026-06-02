// Mathematical model parity test for Node.js
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

// Actual predictions from the trained regression model:
const testCases = [
    { tv: 45.0, radio: 23.0, news: 12.0, expected: 8.85098276 },
    { tv: 120.0, radio: 45.0, news: 15.0, expected: 16.5823157 },
    { tv: 200.5, radio: 20.0, news: 80.0, expected: 18.0427138 }
];

console.log("Running Node.js Mathematical Parity Checks...");
console.log("--------------------------------------------------");

let passCount = 0;
testCases.forEach((tc, i) => {
    const pred = predictSales(tc.tv, tc.radio, tc.news);
    const diff = Math.abs(pred - tc.expected);
    const passed = diff < 1e-6;
    
    if (passed) {
        passCount++;
    }
    
    console.log(`Test Case ${i+1}: TV=${tc.tv}, Radio=${tc.radio}, News=${tc.news}`);
    console.log(`  Predicted: ${pred.toFixed(8)}`);
    console.log(`  Expected:  ${tc.expected.toFixed(8)}`);
    console.log(`  Status:    ${passed ? "PASS" : "FAIL"} (diff: ${diff.toExponential(3)})`);
    console.log("--------------------------------------------------");
});

if (passCount === testCases.length) {
    console.log("SUCCESS: All mathematical model test cases passed in Node.js!");
    process.exit(0);
} else {
    console.log("FAILURE: Some mathematical model test cases failed.");
    process.exit(1);
}
