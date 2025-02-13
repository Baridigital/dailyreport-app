document.getElementById("dataForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let formData = {
        name: document.getElementById("name").value,
        date: document.getElementById("date").value,
        equipmentTag: document.getElementById("equipmentTag").value,
        location: document.getElementById("location").value,
        startHours: document.getElementById("startHours").value,
        endHours: document.getElementById("endHours").value,
        startFuel: document.getElementById("startFuel").value,
        endFuel: document.getElementById("endFuel").value,
        fuelAdded: document.getElementById("fuelAdded").value,
        remarks: document.getElementById("remarks").value
    };
    
    let confirmationMessage = `Please confirm your data:\n\n` +
        `Name: ${formData.name}\n` +
        `Date: ${formData.date}\n` +
        `Equipment Tag: ${formData.equipmentTag}\n` +
        `Location: ${formData.location}\n` +
        `Starting Running Hours: ${formData.startHours}\n` +
        `Ending Running Hours: ${formData.endHours}\n` +
        `Starting Fuel Level(%): ${formData.startFuel}\n` +
        `Ending Fuel Level(%): ${formData.endFuel}\n` +
        `Quantity of Fuel Added Today(Ltrs): ${formData.fuelAdded}\n` +
        `Observations/Remarks: ${formData.remarks}\n\n` +
        `Is this information correct?`;
    
    if (confirm(confirmationMessage)) {
        let storedData = JSON.parse(localStorage.getItem("userData")) || [];
        storedData.push(formData);
        localStorage.setItem("userData", JSON.stringify(storedData));
        this.reset();
    }
});