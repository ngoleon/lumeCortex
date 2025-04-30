import { setupPersonas, handlePersonaChange } from './ui/PersonaSelector.js';
import { createEmptyChart, renderTokenChart } from './ui/TokenChart.js';
import { setupEventHandlers } from './events/EventHandlers.js';

document.addEventListener('DOMContentLoaded', () => {
  setupPersonas();
  createEmptyChart();

  const personaSelect = document.getElementById('persona');
  personaSelect.addEventListener('change', handlePersonaChange);
  personaSelect.dispatchEvent(new Event('change'));

  // 🔥 Pass in renderTokenChart to hook up the click logic
  setupEventHandlers(renderTokenChart);
});
