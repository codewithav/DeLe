// Grab DOM nodes cleanly
const modal = document.getElementById('bookingModal');
const closeModalBtn = document.querySelector('.close-modal');
const checkoutForm = document.getElementById('checkoutForm');

// State configuration variables
let activeItemPrice = 0;
let activeItemName = "";
const SECURITY_DEPOSIT = 50;

// Dynamic pricing calculation helper
function runBillingStatement() {
  const dayCount = parseInt(document.getElementById('rentalDays').value) || 1;
  const subtotal = activeItemPrice * dayCount;
  const grandTotal = subtotal + SECURITY_DEPOSIT;

  // Real-time DOM values generation
  document.getElementById('summaryItemName').textContent = activeItemName;
  document.getElementById('summaryRate').textContent = `$${activeItemPrice.toFixed(2)} / day`;
  document.getElementById('summarySubtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('summaryGrandTotal').textContent = `$${grandTotal.toFixed(2)}`;
}

// Bind single click capture event listeners across items loop
document.querySelectorAll('.card-button').forEach(btn => {
  btn.addEventListener('click', function() {
    const targetCard = this.closest('.card');
    activeItemName = targetCard.querySelector('.card-title').textContent;
    
    // Extract base price attribute data directly safely
    const priceNode = targetCard.querySelector('.card-price');
    activeItemPrice = parseFloat(priceNode.getAttribute('data-price'));

    // Render modal element view visible state 
    modal.classList.add('active');
    
    // Reset control fields default view values
    document.getElementById('rentalDays').value = 3;
    runBillingStatement();
  });
});

// Calculate metrics instantly inside structural input modification
document.getElementById('rentalDays').addEventListener('input', runBillingStatement);

// Clean dismiss handling routes close modal views
closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('active');
});

// Secure capture pipeline output alert delivery
checkoutForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const customerName = document.getElementById('renterName').value;
  const customerEmail = document.getElementById('renterEmail').value;
  const totalDays = document.getElementById('rentalDays').value;
  const grossTotal = (activeItemPrice * totalDays) + SECURITY_DEPOSIT;

  // Render comprehensive, authentic text invoice receipt summary to user
  alert(
    `✨ Rental Authorization Success! ✨\n\n` +
    `Merchant File Reference: DeLe Inc.\n` +
    `Item Authorized: ${activeItemName}\n` +
    `Rental Window: ${totalDays} days\n` +
    `Authorized Customer: ${customerName} (${customerEmail})\n\n` +
    `Total Charged (With Deposit): $${grossTotal.toFixed(2)}\n\n` +
    `Thank you for keeping resources local! Check your inbox for pick-up instructions.`
  );

  // Close modal dialog clean down actions
  modal.classList.remove('active');
  checkoutForm.reset();
});