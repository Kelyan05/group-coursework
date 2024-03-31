let sectionPrompts = [
    ["First Name", "Surname", "Age", "Gender"],
    ["Email", "Phone Number", "Address", "Postcode"],
    ["Allergies", "Health Problems", "Blood Type", "Current Medications"]
];

let currentSectionIndex = 0;
let currentPromptIndex = 0;

function showPrompt() {
document.querySelector(".inputSection").style.display = "flex";
document.querySelector(".user-inputs").style.display = "flex"; 
displayCurrentPrompt();
}

function displayCurrentPrompt() {
    document.querySelector(".prompt").innerText = getCurrentPrompt();
    document.getElementById("input").value = ""; // Clears the last input from the user
    document.getElementById("input").placeholder = "Enter your " + getCurrentPrompt();
}

function Next() {
let inputValue = document.getElementById("input").value.trim();
if (inputValue !== "") {
    // Progress bar updated by what the current step is
    let totalPrompts = sectionPrompts.reduce((acc, val) => acc + val.length, 0);
    let progressPercent = ((currentSectionIndex * 4 + currentPromptIndex + 1) / totalPrompts) * 100;
    document.querySelector(".progress").style.width = progressPercent + "%";

    // Gets index of current div element to update
    let currentDivIndex = currentSectionIndex * 4 + currentPromptIndex;
    let userInputDiv = document.querySelectorAll(".user-inputs div")[currentDivIndex];

    // Updates content of the div element with user input 
    userInputDiv.innerText = getCurrentPrompt() + ": " + inputValue;

    currentPromptIndex++;
    if (currentPromptIndex >= sectionPrompts[currentSectionIndex].length) {
        currentSectionIndex++;
        currentPromptIndex = 0;
        if (currentSectionIndex < sectionPrompts.length) {
            document.querySelector(".section-indicator").innerText = "Section: " + (currentSectionIndex + 1);
            displayCurrentPrompt();
        } else {
            // To keep the cover displayed when all user profile sections are done
            currentSectionIndex = sectionPrompts.length - 1; // Goes back to last section index
            currentPromptIndex = sectionPrompts[currentSectionIndex].length - 1; // Goes back to last prompt index
            document.querySelector(".prompt").innerText = "User Profile Complete"; 
            document.getElementById("input").style.display = "none"; // Hides no longer needed input field
            document.querySelector(".bottom").style.display = "none"; // Hides next and skip buttons as no longer needed
            document.querySelector(".top").innerHTML = "<h1>Thank You!</h1>"; // Adds a thank you message in place of previously removed fields
        }
    } else {
        displayCurrentPrompt();
    }
} else {
    alert("Please provide an answer to the field first.");
}
}

function getCurrentPrompt() {
    return sectionPrompts[currentSectionIndex][currentPromptIndex];
}

function Skip() {
// Updates the progress bar
let totalPrompts = sectionPrompts.reduce((acc, val) => acc + val.length, 0);
let progressPercent = ((currentSectionIndex * 4 + currentPromptIndex + 1) / totalPrompts) * 100;
document.querySelector(".progress").style.width = progressPercent + "%";

currentPromptIndex++;
if (currentPromptIndex >= sectionPrompts[currentSectionIndex].length) {
    currentSectionIndex++;
    currentPromptIndex = 0;
    if (currentSectionIndex < sectionPrompts.length) {
        document.querySelector(".section-indicator").innerText = "Section: " + (currentSectionIndex + 1);
        displayCurrentPrompt();
    } else {
         // To keep the cover displayed when all user profile sections are done
         currentSectionIndex = sectionPrompts.length - 1; // Goes back to last section index
         currentPromptIndex = sectionPrompts[currentSectionIndex].length - 1; // Goes back to last prompt index
         document.querySelector(".prompt").innerText = "User Profile Complete"; 
         document.getElementById("input").style.display = "none"; // Hides no longer needed input field
         document.querySelector(".bottom").style.display = "none"; // Hides next and skip buttons as no longer needed
         document.querySelector(".top").innerHTML = "<h1>Thank You!</h1>"; // Adds a thank you message in place of previously removed fields
    }
} else {
    displayCurrentPrompt();
}
}