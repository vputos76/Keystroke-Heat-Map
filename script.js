// Define *new propmt* button
let button = document.getElementById("new-paragraph-button")
let promptText = document.getElementById("prompt")

// Define rows of numbers and letters to use
const numRowKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "\\"];
const topRowKeys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]"];
const midRowKeys = ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "\'"];
const botRowKeys = ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"];

// Gradient of colours to use in heat map
let colourGradient = ["#000099", "#001098", "#001f97", "#002e96", "#003d95", "#004c94", "#005b93", "#006992", "#007791", "#008590",
    "#008f8c", "#008f7c", "#008e6d", "#008d5e", "#008c4f", "#008b40", "#008a32", "#018923", "#018815", "#018707", "#078601", "#158501",
    "#228401", "#2f8301", "#3c8201", "#498101", "#568001", "#627f01", "#6e7e01", "#7a7d01", "#7c7301", "#7c6601", "#7b5801", "#7a4b01",
    "#793e01", "#783201", "#772501", "#761901", "#750d01", "#740101"]

    // Create array of all keys that have been pressed (added to once created)
let typedKeys = []

// Define each of the div containers for the 4 keyboard rows
let numRow = document.getElementById("num-row");
let topRow = document.getElementById("top-row");
let midRow = document.getElementById("mid-row");
let botRow = document.getElementById("bot-row");

//Create number row keys
numRowKeys.forEach(element => addKeys(element, numRow))
topRowKeys.forEach(element => addKeys(element, topRow))
midRowKeys.forEach(element => addKeys(element, midRow))
botRowKeys.forEach(element => addKeys(element, botRow))


// Take a random text line from the texts.txt file and display it for the user to type
button.addEventListener("click", function(){
    button.blur()       // Remove focus from button so space bar does not trigger it
    // Choose a random line from the texts
    fetch('texts.txt')
    .then(response => response.text()) 
    .then(text => {
        // Choose a random index corresponding to the number of sample prompts in texts.txt
        let index = Math.floor(Math.random() * 30)
        console.log(index)
        let texts = text.split("\n")
        let prompt = texts[index]
        console.log(prompt)
        // Rewrite prompt text
        promptText.innerHTML = prompt
    });
})

// Bind event listener to entire window for all key strokes
window.addEventListener('keydown', increaseKeyValues)

// Set polling that decrements each key until they are back at 0
let polling = setInterval(decreaseKeyValues, 200)

// Create div that represents individual key, appending it to specified row div
function addKeys(value, rowDiv){
    let newKey = document.createElement("div")
    newKey.innerHTML = value
    newKey.className = "key"
    newKey.id = value + "-key"
    newKey.value = 0
    rowDiv.appendChild(newKey)
    typedKeys.push(newKey)
}

// Decrement the value of all keys by 1
function decreaseKeyValues(){
    typedKeys.forEach(element => {
        element.value = Math.max(0, -- element.value)   // Decrement element to a minimum of 0
        element.style.backgroundColor = colourGradient[element.value];
    })
}

// Collect key by id and increase the "heat" of the key by changing the colour
function increaseKeyValues(value){
    console.log(value)
    // If the value is associated with a button then change its colour
    let key =  value["key"].toUpperCase() + "-key";
    let keyDiv = document.getElementById(key)
    if(keyDiv){
        console.log(keyDiv);
        keyDiv.style.backgroundColor = "#3b5168";
        // Increment the number of times the key has been pressed, to a max of the length of colourGradient
        keyDiv.value = Math.min(colourGradient.length-1, keyDiv.value + 10)
        console.log(keyDiv.value);
        // Change the colour of the key to match the gradient index
        keyDiv.style.backgroundColor = colourGradient[keyDiv.value];
    }
}