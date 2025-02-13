if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

const storedData = JSON.parse(localStorage.getItem("userData")) || [];
const tableBody = document.getElementById("dataTable");
const summaryContent = document.getElementById("summaryContent");
const dailyReportContent = document.getElementById("dailyReportContent");
const reportHeading = document.getElementById("reportHeading");

function loadTable() {
    tableBody.innerHTML = "";
    storedData.forEach((data, index) => {
        let row = `<tr>
            <td><input type='checkbox' data-index='${index}'></td>
            <td>${data.name}</td>
            <td>${data.date}</td>
            <td>${data.equipmentTag}</td>
            <td>${data.location}</td>
            <td>${data.startHours}</td>
            <td>${data.endHours}</td>
            <td>${data.startFuel}</td>
            <td>${data.endFuel}</td>
            <td>${data.fuelAdded}</td>
            <td>${data.remarks}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}
function loadSummary() {
    summaryContent.innerHTML = "";
    storedData.forEach(data => {
        let summaryText = `
            <p>
                <strong>Name of Operator:</strong> ${data.name}<br>
                <strong>Date:</strong> ${data.date}<br>
                <strong>Equipment Tag:</strong> ${data.equipmentTag}<br>
                <strong>Location:</strong> ${data.location}<br>
                <strong>Starting Running Hours:</strong> ${data.startHours}<br>
                <strong>Ending Running Hours:</strong> ${data.endHours}<br>
                <strong>Starting Fuel Level:</strong> ${data.startFuel}<br>
                <strong>Ending Fuel Level:</strong> ${data.endFuel}<br>
                <strong>Quantity of Fuel Added:</strong> ${data.fuelAdded}<br>
                <strong>Remarks:</strong> ${data.remarks}
            </p>
        `;
        summaryContent.innerHTML += summaryText;
    });
}

function deleteSelected() {
    const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
    if (checkboxes.length === 0) {
        alert("Please select at least one entry to delete.");
        return;
    }
    
    const indexesToDelete = Array.from(checkboxes).map(cb => parseInt(cb.dataset.index));
    const newData = storedData.filter((_, index) => !indexesToDelete.includes(index));
    localStorage.setItem("userData", JSON.stringify(newData));
    location.reload();
}

function generateDailyReport() {
    const datePicked = prompt("Enter the date for the daily report (YYYY-MM-DD):");
    if (!datePicked) return;

    const filteredData = storedData.filter(data => data.date === datePicked);
    if (filteredData.length === 0) {
        alert("No entries found for the selected date.");
        return;
    }

    reportHeading.textContent = `DAILY REPORT FOR ${datePicked} FROM GPP KWALE`;
    dailyReportContent.innerHTML = "";

    filteredData.forEach(data => {
        let reportText = `<p>
            <strong>Equipment Tag:</strong> ${data.equipmentTag}<br>
            <strong>Location:</strong> ${data.location}<br>
            <strong>Starting Running Hours:</strong> ${data.startHours}<br>
            <strong>Ending Running Hours:</strong> ${data.endHours}<br>
            <strong>Starting Fuel Level:</strong> ${data.startFuel}%<br>
            <strong>Ending Fuel Level:</strong> ${data.endFuel}%<br>
            <strong>Quantity of Fuel Added:</strong> ${data.fuelAdded} Liters
        </p><hr>`;
        dailyReportContent.innerHTML += reportText;
    });

    document.getElementById("dataSection").style.display = "none";
    document.getElementById("summary").style.display = "none";
    document.getElementById("dailyReport").style.display = "block";
}

function copyReport() {
    const textToCopy = reportHeading.innerText + "\n\n" + dailyReportContent.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("Daily report copied to clipboard!");
    }).catch(err => {
        console.error("Error copying text: ", err);
    });
}

function showData() {
    document.getElementById("dataSection").style.display = "block";
    document.getElementById("summary").style.display = "none";
    document.getElementById("dailyReport").style.display = "none";
}

function showSummary() {
    document.getElementById("dataSection").style.display = "none";
    document.getElementById("summary").style.display = "block";
    document.getElementById("dailyReport").style.display = "none";
}

loadTable();
loadSummary();