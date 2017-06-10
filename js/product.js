(function(products){
  var cta = document.querySelectorAll(".btn");
    
  init();
  /**
   * Iterates overs all buttons and
   * invokes handleClick function
   * @param {object} cta - button element is passed
   * @param {object} index - index of target button is passed
   * returns undefined
   */
  function init() {
    for (i = 0; i < cta.length; i++) {
      var currentBtn = cta[i];
      handleClick(currentBtn, i);
    }
  }
  /**
   * Attaches event handler to all buttons and
   * invokes productDetails function
   * @param {object} cta - button element is passed
   * @param {object} index - index of target button is passed
   * returns undefined
   */
  function handleClick(cta, index) {
    cta.addEventListener("click", function() {
       productDetails(cta);
    });
  }
  /**
   * Captures the items details from DOM
   * @param {object} ele - target element is passed
   * returns undefined
   */
  function productDetails(ele) {
    var targetTitle = ele.closest('.caption').querySelector('h3').innerText,
    targetPrice = ele.closest('.caption').querySelector('.product_mrp').innerText,
    targetCurrency = ele.closest('.caption').querySelector('.product_currency').innerText;
    toggleClass(ele, targetTitle,targetPrice,targetCurrency);
  }

  /**
   * function to toggle class and pub according to button status
   * @param  {object} object           [object on which we have to toggle class]
   * @param  {string} classToBeToggled [class which is to be toggled]
   * @return                           [nothing]
   */
  function toggleClass(object, title, price, currency) {
    if (object.className === "btn btn-primary") {
      object.className = "btn btn-danger";
      object.innerText = "Remove";
      /* publish the event add_to_cart with required params */
      pubSubUtil.publish(pubSubMessageKeys.ADD_TO_CART, title, +(price), currency);
    } 
    else {
        object.className = "btn btn-primary";
        object.innerText = "Add to Cart";
        /* publish the event REMOVE_FROM_CART with required params */
        pubSubUtil.publish(pubSubMessageKeys.REMOVE_FROM_CART, title, +(price), currency);
    }
  }

})(products = {});
