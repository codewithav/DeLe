document.querySelectorAll('.card_button').forEach(btn => {
    btn.addEventListener('click', () => {
        const card  = btn.closest('.card');
        const item  = card.querySelector('.card_title').textContent;
        const price = card.querySelector('.card_price').textContent;

        const name  = prompt(`Booking: ${item}\nPrice: ${price}\n\nEnter your full name:`);
        if (!name) return;
        const email = prompt('Enter your email:');
        if (!email) return;
        const card_no = prompt('Enter your card number:');
        if (!card_no) return;

        alert(`✅ Booking Confirmed!\nItem: ${item}\nPrice: ${price}\nName: ${name}\nEmail: ${email}`);
    });
});