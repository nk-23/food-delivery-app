import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DATA_PATH = path.resolve('data/customer-behavior.csv');
const MODEL_PATH = path.resolve('models/customer-behavior-model.json');
const FEATURES = [
  'avg_order_value',
  'orders_30d',
  'discount_orders_30d',
  'days_since_last_order',
  'cancelled_orders_30d',
  'late_deliveries_30d',
  'support_tickets_30d',
  'app_opens_7d',
];
const LABEL = 'discount_responder';

const sigmoid = (value) => 1 / (1 + Math.exp(-value));

function parseCsv(text) {
  const [headerLine, ...lines] = text.trim().split(/\r?\n/);
  const headers = headerLine.split(',');

  return lines.map((line) => {
    const values = line.split(',');
    return Object.fromEntries(
      headers.map((header, index) => {
        const rawValue = values[index];
        const numericValue = Number(rawValue);
        return [header, Number.isNaN(numericValue) ? rawValue : numericValue];
      })
    );
  });
}

function getStats(rows) {
  return Object.fromEntries(
    FEATURES.map((feature) => {
      const values = rows.map((row) => row[feature]);
      const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
      const variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
      return [feature, { mean, std: Math.sqrt(variance) || 1 }];
    })
  );
}

function normalize(row, stats) {
  return FEATURES.map((feature) => (row[feature] - stats[feature].mean) / stats[feature].std);
}

function trainLogisticRegression(rows, stats) {
  const weights = Array(FEATURES.length).fill(0);
  let bias = 0;
  const learningRate = 0.08;
  const epochs = 2500;

  for (let epoch = 0; epoch < epochs; epoch += 1) {
    for (const row of rows) {
      const x = normalize(row, stats);
      const y = row[LABEL];
      const prediction = sigmoid(x.reduce((sum, value, index) => sum + value * weights[index], bias));
      const error = prediction - y;

      for (let index = 0; index < weights.length; index += 1) {
        weights[index] -= learningRate * error * x[index];
      }
      bias -= learningRate * error;
    }
  }

  return { weights, bias };
}

function predictProbability(row, model) {
  const x = normalize(row, model.stats);
  return sigmoid(x.reduce((sum, value, index) => sum + value * model.weights[index], model.bias));
}

function evaluate(rows, model) {
  let correct = 0;
  let truePositive = 0;
  let falsePositive = 0;
  let falseNegative = 0;

  for (const row of rows) {
    const probability = predictProbability(row, model);
    const prediction = probability >= model.threshold ? 1 : 0;
    const actual = row[LABEL];

    if (prediction === actual) correct += 1;
    if (prediction === 1 && actual === 1) truePositive += 1;
    if (prediction === 1 && actual === 0) falsePositive += 1;
    if (prediction === 0 && actual === 1) falseNegative += 1;
  }

  const precision = truePositive / (truePositive + falsePositive || 1);
  const recall = truePositive / (truePositive + falseNegative || 1);

  return {
    accuracy: correct / rows.length,
    precision,
    recall,
  };
}

function explainModel(model) {
  return FEATURES.map((feature, index) => ({
    feature,
    weight: Number(model.weights[index].toFixed(4)),
    effect: model.weights[index] >= 0 ? 'increases discount response likelihood' : 'decreases discount response likelihood',
  })).sort((a, b) => Math.abs(b.weight) - Math.abs(a.weight));
}

async function main() {
  const rows = parseCsv(await readFile(DATA_PATH, 'utf8'));
  const splitIndex = Math.floor(rows.length * 0.75);
  const trainingRows = rows.slice(0, splitIndex);
  const testRows = rows.slice(splitIndex);
  const stats = getStats(trainingRows);
  const trained = trainLogisticRegression(trainingRows, stats);
  const model = {
    modelType: 'logistic_regression',
    target: LABEL,
    features: FEATURES,
    threshold: 0.5,
    stats,
    ...trained,
    trainedAt: new Date().toISOString(),
  };
  const metrics = evaluate(testRows, model);
  const output = {
    ...model,
    metrics,
    featureImportance: explainModel(model),
  };

  await mkdir(path.dirname(MODEL_PATH), { recursive: true });
  await writeFile(MODEL_PATH, `${JSON.stringify(output, null, 2)}\n`);

  console.log('Customer behavior model trained');
  console.log(`Rows: ${rows.length} | Training: ${trainingRows.length} | Test: ${testRows.length}`);
  console.log(`Accuracy: ${(metrics.accuracy * 100).toFixed(1)}%`);
  console.log(`Precision: ${(metrics.precision * 100).toFixed(1)}%`);
  console.log(`Recall: ${(metrics.recall * 100).toFixed(1)}%`);
  console.log(`Saved model: ${MODEL_PATH}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
