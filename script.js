const api_url = "https://jsonplaceholder.typicode.com/users" ;

async function fetchandUpdate(){
    try{
        const response = await fetch(api_url) ;
        if(!response.ok){
            throw new Error("failed to fetch data from API.") ;
        }

        const data = await response.json() ;
        const tableBody = document.getElementById("dataTable").querySelector("tbody") ;

        data.forEach((item) => {
            const row = document.createElement("tr") ;

            row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.username}</td>
            <td>${item.email}</td>
            <td>${item.phone}</td>
            <td>${item.website}</td>
            ` ;
            tableBody.appendChild(row) ;
        }) ;
    } catch(error){
        console.error("Error fetching and displaying data:" , error) ;
    }
}


function toggleSort(button) {
    const columnIndex = button.getAttribute("data-column");
    const currentOrder = button.getAttribute("data-order");

   
    const newOrder = currentOrder === "asc" ? "desc" : "asc";
    button.setAttribute("data-order", newOrder);

  
    button.textContent = newOrder === "asc" ? '\u2191' :'\u2193';

   
    sortTable(columnIndex, newOrder);
}

function sortTable(columnIndex, order) {
    const table = document.getElementById("dataTable");
    const rows = Array.from(table.querySelector("tbody").rows);

   
    rows.sort((a, b) => {
        const cellA = a.cells[columnIndex].textContent.toLowerCase();
        const cellB = b.cells[columnIndex].textContent.toLowerCase();

        if (order === 'asc') {
            return cellA > cellB ? 1 : cellA < cellB ? -1 : 0;
        } else {
            return cellA < cellB ? 1 : cellA > cellB ? -1 : 0;
        }
    });

    
    const tbody = table.querySelector("tbody");
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
}


fetchandUpdate() ;