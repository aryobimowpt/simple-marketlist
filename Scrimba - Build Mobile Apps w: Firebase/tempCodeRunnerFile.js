import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

const appSettings = {
    databaseURL: "https://playground-6bbbf-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)

const addButtonEl = document.getElementById("add-button")
const inputFieldEl = document.getElementById("input-field")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    console.log(inputValue)
})