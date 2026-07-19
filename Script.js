const modal = document.getElementById('bookingModal');
const closeModalBtn = document.querySelector('.close-modal');
const checkoutForm = document.getElementById('checkoutForm');


let activeItemPrice = 0;
let activeItemName = "";
const SECURITY_DEPOSIT = 500;


function formatRupees(amount) {
  return '₹' + amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function runBillingStatement() {
  const dayCount = parseInt(document.getElementById('rentalDays').value) || 1;
  const subtotal = activeItemPrice * dayCount;
  const grandTotal = subtotal + SECURITY_DEPOSIT;

  
  document.getElementById('summaryItemName').textContent = activeItemName;
  document.getElementById('summaryRate').textContent = `₹${activeItemPrice.toLocaleString('en-IN')} / day`;
  document.getElementById('summarySubtotal').textContent = formatRupees(subtotal);
  document.getElementById('summaryGrandTotal').textContent = formatRupees(grandTotal);
}


document.querySelectorAll('.card-button').forEach(btn => {
  btn.addEventListener('click', function() {
    const targetCard = this.closest('.card');
    activeItemName = targetCard.querySelector('.card-title').textContent;
    
    
    const priceNode = targetCard.querySelector('.card-price');
    activeItemPrice = parseFloat(priceNode.getAttribute('data-price'));

    
    modal.classList.add('active');
    
    
    document.getElementById('rentalDays').value = 3;
    runBillingStatement();
  });
});


document.getElementById('rentalDays').addEventListener('input', runBillingStatement);


closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('active');
});


checkoutForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const customerName = document.getElementById('renterName').value;
  const customerEmail = document.getElementById('renterEmail').value;
  const totalDays = document.getElementById('rentalDays').value;
  const grossTotal = (activeItemPrice * totalDays) + SECURITY_DEPOSIT;

  
  alert(
    `✨ Rental Authorization Success! ✨\n\n` +
    `Merchant File Reference: DeLe Inc.\n` +
    `Item Authorized: ${activeItemName}\n` +
    `Rental Window: ${totalDays} days\n` +
    `Authorized Customer: ${customerName} (${customerEmail})\n\n` +
    `Total Charged (With Deposit): ${formatRupees(grossTotal)}\n\n` +
    `Thank you for keeping resources local! Check your inbox for pick-up instructions.`
  );


  modal.classList.remove('active');
  checkoutForm.reset();
});

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
 
  const searchButton = document.querySelector(".search-box button") || document.querySelector(".search-btn");
  const cards = document.querySelectorAll(".card");

  function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    cards.forEach(card => {
      const title = card.querySelector(".card-title").textContent.toLowerCase();
      
      if (query === "" || title.includes(query)) {
        card.style.display = "";
      } else {
        card.style.display = "none"; 
      }
    });
  }

  if (searchButton) {
    searchButton.addEventListener("click", performSearch);
  }

  if (searchInput) {
    searchInput.addEventListener("input", performSearch);
  }
});