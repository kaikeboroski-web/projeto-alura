document.getElementById('goal-form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Obter valores dos inputs
  const goalName = document.getElementById('goal-name').value;
  const targetAmount = parseFloat(document.getElementById('target-amount').value);
  const timeMonths = parseInt(document.getElementById('time-months').value);
  const interestRateInput = parseFloat(document.getElementById('interest-rate').value) || 0;

  // Cálculo sem juros (divisão simples)
  const monthlySimple = targetAmount / timeMonths;

  let monthlyWithInterest = monthlySimple;
  let hasInterest = false;

  // Cálculo com juros compostos (Aporte periódico com taxa de juros)
  // Fórmula do valor futuro de série de pagamentos: PMT = FV * i / (((1 + i)^n) - 1)
  if (interestRateInput > 0) {
    const i = interestRateInput / 100;
    const n = timeMonths;
    monthlyWithInterest = (targetAmount * i) / (Math.pow(1 + i, n) - 1);
    hasInterest = true;
  }

  // Exibir resultados
  const resultSection = document.getElementById('result-section');
  const resultContent = document.getElementById('result-content');

  let htmlResult = `
    <p>Para alcançar seu objetivo de <strong>${goalName}</strong>:</p>
    <p>Meta Total: <span class="highlight">R$ ${targetAmount.toFixed(2)}</span> em <strong>${timeMonths} meses</strong>.</p>
    <p>Aporte mensal simples (sem rendimento): <span class="highlight">R$ ${monthlySimple.toFixed(2)}/mês</span>.</p>
  `;

  if (hasInterest) {
    const totalInvested = monthlyWithInterest * timeMonths;
    const interestEarned = targetAmount - totalInvested;

    htmlResult += `
      <hr style="margin: 1rem 0; border: 0; border-top: 1px solid #eee;">
      <p>Com rendimento de <strong>${interestRateInput}% ao mês</strong>:</p>
      <p>Você precisa guardar: <span class="highlight">R$ ${monthlyWithInterest.toFixed(2)}/mês</span>.</p>
      <p>Total do seu bolso: <strong>R$ ${totalInvested.toFixed(2)}</strong>.</p>
      <p>Juros a seu favor (dinheiro "ganho"): <span class="highlight">R$ ${interestEarned.toFixed(2)}</span>.</p>
    `;
  }

  resultContent.innerHTML = htmlResult;
  resultSection.classList.remove('hidden');
});