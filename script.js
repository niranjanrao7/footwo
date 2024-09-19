// script.js

// Function to update the real-time summary
function updateSummary() {
    const itemPrices = {
        shoes: 50,
        socks: 50,
        racquet: 50,
        shuttlecock: 250,
        grip: 100,
        shower: 50
    };

    const items = ['shoes', 'socks', 'racquet', 'shuttlecock', 'grip', 'shower'];
    const tableBody = document.getElementById('summary-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing rows

    let totalAmount = 0;

    items.forEach(item => {
        const quantityInput = document.getElementById(`${item}-quantity`);
        const quantity = parseInt(quantityInput.value, 10);
        if (quantity > 0) {
            const price = itemPrices[item];
            const total = price * quantity;
            totalAmount += total;

            const row = tableBody.insertRow();
            row.insertCell(0).textContent = item.charAt(0).toUpperCase() + item.slice(1);
            row.insertCell(1).textContent = quantity;
            row.insertCell(2).textContent = `₹${price}`;
            row.insertCell(3).textContent = `₹${total}`;
        }
    });

    document.getElementById('total-amount').textContent = `Total Amount: ₹${totalAmount}`;
}

// Function to save data to local storage
function saveData() {
    const customerName = document.getElementById('customer-name').value;
    const courtNumber = getSelectedCourt();
    const items = getItemsQuantities();
    
    if (!customerName || !courtNumber) {
        alert("Please fill out all required fields.");
        return;
    }
    
    let existingData = JSON.parse(localStorage.getItem('posData')) || [];
    
    const newEntry = {
        customerName,
        courtNumber,
        ...items
    };
    
    existingData.push(newEntry);
    localStorage.setItem('posData', JSON.stringify(existingData));
    
    clearFields();
    alert("Data saved successfully.");
}

// Function to get the selected court number
function getSelectedCourt() {
    const courtButtons = document.querySelectorAll('.court-btn');
    for (let button of courtButtons) {
        if (button.classList.contains('selected')) {
            return button.textContent.trim().split(' ')[1];
        }
    }
    return null;
}

// Function to get item quantities
function getItemsQuantities() {
    const items = ['shoes', 'socks', 'racquet', 'shuttlecock', 'grip', 'shower'];
    let quantities = {};
    items.forEach(item => {
        const quantityInput = document.getElementById(`${item}-quantity`);
        if (quantityInput) {
            quantities[item] = quantityInput.value;
        }
    });
    return quantities;
}

// Function to clear all input fields
function clearFields() {
    document.getElementById('customer-name').value = '';
    document.querySelectorAll('.item-quantity').forEach(input => input.value = 0);
    document.querySelectorAll('.court-btn').forEach(button => button.classList.remove('selected'));
    updateSummary(); // Update summary after clearing fields
}

// Function to update the quantity field when an item image is clicked
function updateQuantity(item) {
    const quantityInput = document.getElementById(`${item}-quantity`);
    if (quantityInput) {
        quantityInput.value = parseInt(quantityInput.value, 10) + 1;
        quantityInput.focus();
        const itemImage = document.getElementById(`${item}-image`);
        if (itemImage) {
            itemImage.classList.add('clicked');
            setTimeout(() => itemImage.classList.remove('clicked'), 300);
        }
        updateSummary(); // Update summary on item quantity change
    }
}

// Function to handle court selection
function selectCourt(courtNumber) {
    const courtButtons = document.querySelectorAll('.court-btn');
    courtButtons.forEach(button => {
        button.classList.remove('selected');
    });
    const selectedButton = document.getElementById(`court-${courtNumber}`);
    if (selectedButton) {
        selectedButton.classList.add('selected');
    }
}

// Attach event listeners to item quantity inputs
document.querySelectorAll('.item-quantity').forEach(input => {
    input.addEventListener('input', () => updateSummary());
});

// Attach event listeners to item images
document.querySelectorAll('.item-image').forEach(image => {
    image.addEventListener('click', (event) => {
        const itemId = event.target.id.split('-')[0];
        updateQuantity(itemId);
    });
});

// Attach event listeners to court buttons
document.querySelectorAll('.court-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const courtNumber = event.target.textContent.trim().split(' ')[1];
        selectCourt(courtNumber);
    });
});
