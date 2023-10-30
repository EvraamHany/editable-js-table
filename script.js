document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search');
    const table = document.getElementById('table');
    const rows = table.getElementsByTagName('tr');
    const addRowButton = document.getElementById('addRow');
    const newNameInput = document.getElementById('newName');
    const newAgeInput = document.getElementById('newAge');

    // Function to add a new row
    function addNewRow() {
        const newRow = table.insertRow(table.rows.length - 1);
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        cell1.contentEditable = true;
        cell2.contentEditable = true;
        cell1.innerText = newNameInput.value;
        cell2.innerText = newAgeInput.value;
        // Add input event listeners to new cells for data changes
        cell1.addEventListener('input', saveTableData);
        cell2.addEventListener('input', saveTableData);

        // Clear the input fields after adding a new row
        newNameInput.value = '';
        newAgeInput.value = '';

        // Save the table data to localStorage after adding a row
        saveTableData();
    }

    // Event listener for the "Add Row" button
    addRowButton.addEventListener('click', addNewRow);

    // Event listener for the search input
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();

        for (let i = 1; i < rows.length - 1; i++) {
            const rowData = rows[i].innerText.toLowerCase();

            if (rowData.includes(searchTerm)) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    });

    // Function to save the table data to localStorage
    function saveTableData() {
        const data = [];
        for (let i = 1; i < rows.length - 1; i++) {
            const cells = rows[i].querySelectorAll('td');
            data.push({
                name: cells[0].innerText,
                age: cells[1].innerText
            });
        }
        localStorage.setItem('tableData', JSON.stringify(data));
    }

    // Function to load the table data from localStorage
    function loadTableData() {
        const savedData = localStorage.getItem('tableData');
        if (savedData) {
            const data = JSON.parse(savedData);
            for (let i = 0; i < data.length; i++) {
                const newRow = table.insertRow(table.rows.length - 1);
                const cell1 = newRow.insertCell(0);
                const cell2 = newRow.insertCell(1);
                cell1.contentEditable = true;
                cell2.contentEditable = true;
                cell1.innerText = data[i].name;
                cell2.innerText = data[i].age;
                // Add input event listeners to cells for loaded data
                cell1.addEventListener('input', saveTableData);
                cell2.addEventListener('input', saveTableData);
            }
        }
    }

    // Load the table data from localStorage when the page loads
    loadTableData();
});
