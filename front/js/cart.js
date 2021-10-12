const allProductsURL = 'http://localhost:3000/api/products/'
const cartContent = JSON.parse(localStorage.getItem('cart'))
const sectionEl = document.querySelector('#cart__items')
const totalQuantity_DOM = document.querySelector('#totalQuantity') 
const totalPrice_DOM = document.querySelector('#totalPrice') 
const totalQuantity = cartContent.reduce((acc, curr) => acc + curr.quantity, 0)

fetch(allProductsURL).then(response => response.json()).then(allProducts=> {

    let totalPrice = 0

    console.log({allProducts});
    const productsEl = cartContent.map(productCart => {
        

        const fullProduct= allProducts.find(product => product._id === productCart.id)
        console.log({fullProduct});
       totalPrice += fullProduct.price * productCart.quantity 

        const DOM_article = document.createElement('article');
        DOM_article.className = "cart__item";
        DOM_article.dataset.id = productCart.id
        
        console.log({productCart});
        DOM_article.innerHTML = `<div class="cart__item__img">
        <img src=${fullProduct.imageUrl} alt=${fullProduct.altTxt}>
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
          <h2>${fullProduct.name}</h2>
          <p>${fullProduct.price}€</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté :${productCart.quantity} </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${productCart.quantity}>
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>`
         return DOM_article
    });
    
    sectionEl.append(...productsEl);
    console.log(totalPrice_DOM);
    totalPrice_DOM.textContent = totalPrice;
    totalQuantity_DOM.textContent = totalQuantity
})

