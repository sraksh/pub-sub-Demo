(function(shoppingCart) {
  /* subscribe the events ADD_TO_CART/REMOVE_FROM_CART with required callbacks */
  pubSubUtil.subscribe(pubSubMessageKeys.ADD_TO_CART, addInCart);
  pubSubUtil.subscribe(pubSubMessageKeys.REMOVE_FROM_CART, removeFromCart);
  
  var sum, totalAmount = document.querySelector('.cart__total__amount');
  /**
   * Sums the cart value on adding any product
   * @param {String} targetTitle - selected product title
   * @param {Number} targetPrice - selected product price
   * @param {String} targetCurrency - selected product currency
   * returns undefined
   */
  function addInCart(targetTitle, targetPrice, targetCurrency) {
    var cartStatus = document.querySelector('.alert.alert-info');
    generateDom(targetTitle,targetPrice,targetCurrency);
    sum = Number(totalAmount.innerHTML);
    sum += targetPrice;
    totalAmount.innerHTML = sum;

    /* Removes the alert "Cart is empty" when items added to cart*/
    if(cartStatus && sum!= 0){
      cartStatus.outerHTML = "";
      delete cartStatus;
    }
  }

  /**
   * Subtracts the cart value on removing any product
   * @param {String} targetTitle - selected product title
   * @param {Number} targetPrice - selected product price
   * @param {String} targetCurrency - selected product currency
   * returns undefined
   */
  function removeFromCart(targetTitle, targetPrice) {
    var emptyDiv, currentTotal = Number(totalAmount.innerHTML),
    emptyDivContainer = document.querySelector('.panel-body');
    currentTotal-=targetPrice;
    totalAmount.innerHTML = currentTotal;
    /* Adds an alert saying "Cart is empty" when no items on cart*/
    if(currentTotal === 0){
      emptyDiv = document.createElement('div');
      emptyDiv.setAttribute('class', 'alert alert-info');
      emptyDiv.innerHTML='Cart is empty';
      emptyDivContainer.insertBefore(emptyDiv, emptyDivContainer.firstChild);
    }
    removeProductFromCart(targetTitle);
  }
  /**
   * Subtracts the cart value on removing any product
   * @param {number} targetPrice - the current cart value
   * returns undefined
   */
  function removeProductFromCart(targetTitle) {
    var k, cartListItem, cartItems = document.querySelectorAll('.cart-item'),
    len = cartItems.length;
    for(k=0; k < len; k++) {
      cartListItem = cartItems[k].querySelector('.cart-item__name').innerHTML;
      if(targetTitle === cartListItem) {
        cartItems[k].outerHTML = "";
        delete cartItems[k];
      }
    }
  }
  /**
   * Generates the list when procuct is added to cart
   * @param {String} targetTitle - selected product title
   * @param {Number} targetPrice - selected product price
   * @param {String} targetCurrency - selected product currency
   * returns undefined
   */
  function generateDom(targetTitle,targetPrice,targetCurrency) {
    var list = document.querySelector('.panel-body ul'),
        temporaryListContainer = document.createElement('li'),
        itemName = document.createElement('span'),
        itemPriceContainer = document.createElement('span'),
        itemPrice = document.createElement('span'),
        itemCurrency = document.createElement('span');

    temporaryListContainer.setAttribute('class', 'cart-item');
    itemName.setAttribute('class', 'cart-item__name');
    itemPriceContainer.setAttribute('class', 'cart-item__price');
    
    temporaryListContainer.appendChild(itemName);
    temporaryListContainer.appendChild(itemPriceContainer);
    itemPriceContainer.appendChild(itemPrice);
    itemPriceContainer.appendChild(itemCurrency);
    list.appendChild(temporaryListContainer);

    itemName.innerHTML = targetTitle;
    itemPrice.innerHTML = targetPrice + " ";
    itemCurrency.innerHTML = targetCurrency;
  }

})(shoppingCart = {});
