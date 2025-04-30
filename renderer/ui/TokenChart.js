// renderer/ui/TokenChart.js

let chartInstance = null;

export function createEmptyChart() {
  const canvas = document.getElementById('tokenChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['No data'],
      datasets: [{
        label: 'Probabilities (empty)',
        data: [0],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 1,
          grid: { color: '#555' }
        },
        x: {
          grid: { color: '#555' }
        }
      }
    }
  });
}

export function renderTokenChart(topLogProbs) {
  const canvas = document.getElementById('tokenChart');
  if (!canvas || !Array.isArray(topLogProbs) || topLogProbs.length === 0) return;

  const ctx = canvas.getContext('2d');
  if (chartInstance) chartInstance.destroy();

  const labels = topLogProbs.slice(0, 5).map(p => p.token);
  const values = topLogProbs.slice(0, 5).map(p => Math.exp(p.logprob));

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: `Top 5 probabilities for "${topLogProbs[0].token}"`,
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: '#888',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 1,
          grid: { color: '#555' }
        },
        x: {
          grid: { color: '#555' }
        }
      }
    }
  });
}
