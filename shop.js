// Wait for the document to finish loading before executing the code
if (document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
// Function to execute when the document is ready

function ready () {
    // Add event listeners for removing basket items, changing quantities, and adding items to the basket
    var removeBasketItemButtons = document.getElementsByClassName('remove-button')
    console.log(removeBasketItemButtons)
    for (var i = 0; i < removeBasketItemButtons.length; i++) {
        var button = removeBasketItemButtons[i]
        button.addEventListener('click', removeBasketItem)
    }

    var quantityInputs = document.getElementsByClassName('basket-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    
    var addToBasketButtons = document.getElementsByClassName('basket-button')
    for (var i = 0; i < addToBasketButtons.length; i++) {
        var button = addToBasketButtons[i]
        button.addEventListener('click', addToBasketClicked)
    }
}
 
// Function to remove an item from the basket
function removeBasketItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateBasketTotal()
}
// Function to handle quantity changes
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {//NaN means is not a number 
        input.value = 1
    }
    updateBasketTotal()
}

// Function to handle adding items to the basket
function addToBasketClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    console.log(title,price,imageSrc)
    addItemToBasket(title,price,imageSrc)
    updateBasketTotal()
}
// Function to add an item to the basket
function addItemToBasket(title,price,imageSrc) {
    var basketRow = document.createElement('div')
    basketRow.classList.add('basket-row')
    basketRow.innerText = title
    var basketItems = document.getElementsByClassName('basket-items')[0]
    var basketItemNames = basketItems.getElementsByClassName('basket-item-name')
    for (var i = 0; i < basketItemNames.length; i++) {
        if (basketItemNames[i].innerText == title) {
            alert('This item has already been added to the cart')
            return
        }
    }
    var basketRowContents = `
        <div class="basket-item basket-column">
            <img class="basket-item-image" src="${imageSrc}" width="100" height="100">
            <span class="basket-item-name basket-text">${title}</span>
        </div>
        <span class="basket-price basket-column basket-text">${price}</span>
        <div class="basket-quantity basket-column">
            <input class="basket-quantity-input" type="number" value="1">
            <button class="button remove-button">REMOVE</button>
        </div>`
    basketRow.innerHTML = basketRowContents
    basketItems.append(basketRow)
    basketRow.getElementsByClassName('remove-button')[0].addEventListener('click',removeBasketItem)
    basketRow.getElementsByClassName('basket-quantity-input')[0].addEventListener('change', quantityChanged)
}
// Function to update the total price of the basket
function updateBasketTotal() {
    var basketItemContainer = document.getElementsByClassName('basket-items')[0]
    var basketRows = basketItemContainer.getElementsByClassName('basket-row')
    var total = 0 
    // Loops through each basket row and calculates the total price
    for (var i = 0; i < basketRows.length; i++) {
        var basketRow = basketRows[i]
        var priceElement = basketRow.getElementsByClassName('basket-price')[0]
        var quantityElement = basketRow.getElementsByClassName('basket-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('£', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    // Round the total to 2 decimal places
    total = Math.round(total * 100 ) / 100
    // Updates the total price displayed in the basket
    document.getElementsByClassName("basket-total-price")[0].innerText = '£' + total
}