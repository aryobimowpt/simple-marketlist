import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-6bbbf-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const addButtonEl = document.getElementById("add-button")
const inputFieldEl = document.getElementById("input-field")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    let newItem = { 
        value: inputValue,
        completed: false
    }
    push(shoppingListInDB, newItem)

    clearInputFieldEl()
})

inputFieldEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault()

        let inputValue = inputFieldEl.value
        let newItem = {
            value: inputValue,
            completed: false
        }

        push(shoppingListInDB, newItem)

        clearInputFieldEl()
    }
})
   
onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let shoppingListArray = Object.entries(snapshot.val())

        clearShoppingListEl()

        for (let i = 0; i < shoppingListArray.length; i++) {
            let currentItem = shoppingListArray[i]
            let currentItemId = currentItem[0]
            let currentItemValue = currentItem[1]

            renderList(currentItemId, currentItemValue)
        }
    } else {
        shoppingListEl.innerHTML = ""
        }
})

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function renderList(itemID, ItemData) {
    // shoppingListEl.innerHTML += `<li>${itemValue}</li>`
    // let itemID = item[0]
    // let itemValue = item[1]

    let itemValue = ItemData.value
    let isCompleted = ItemData.completed

    let newEL = document.createElement("li")
    newEL.textContent = itemValue

    if (isCompleted) {
        newEL.classList.add("strikethrough")
    }

    newEL.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        update(exactLocationOfItemInDB, { completed: !isCompleted })
    })

    newEL.addEventListener("dblclick", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    shoppingListEl.append(newEL)
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

const clearEl = document.getElementById("clear-button")

clearEl.addEventListener("click", function() {
    let allItemsInDB = ref(database, `shoppingList`)
    remove(allItemsInDB)
})
