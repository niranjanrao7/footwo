// output.js

// Function to load data from local storage and populate the table
function loadData() {
    const dataTableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    const data = JSON.parse(localStorage.getItem('posData')) || [];
    
    dataTableBody.innerHTML = ''; // Clear existing rows
    
    data.forEach(entry => {
        const row = dataTableBody.insertRow();
        
        // Customer Name
        row.insertCell(0).textContent = entry.customerName;
        
        // Court Number
        row.insertCell(1).textContent = entry.courtNumber;
        
        // Items
        const items = ['shoes', 'socks', 'racquet', 'shuttlecock', 'grip', 'shower'];
        let itemsList = '';
        let totalItems = 0;
        items.forEach(item => {
            if (entry[item] && entry[item] > 0) {
                const itemPrice = {
                    shoes: 50,
                    socks: 50,
                    racquet: 50,
                    shuttlecock: 250,
                    grip: 100,
                    shower: 50
                }[item];
                const itemTotal = itemPrice * entry[item];
                totalItems += itemTotal;
                itemsList += `${item.charAt(0).toUpperCase() + item.slice(1)} (${entry[item]} x ₹${itemPrice})<br>`;
            }
        });
        row.insertCell(2).innerHTML = itemsList || 'None';
        
        // Court Charges
        const courtCharges = entry.courtCharges || 0;
        row.insertCell(3).textContent = `₹${courtCharges}`;
        
        // Total (Items + Court Charges)
        const total = totalItems + parseInt(courtCharges, 10);
        row.insertCell(4).textContent = `₹${total}`;
    });
}

// Load data when the page loads
window.onload = loadData;
