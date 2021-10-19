const allProductsURL = 'http://localhost:3000/api/products/'

const sectionEl = document.querySelector('#cart__items')
const totalQuantity_DOM = document.querySelector('#totalQuantity') 
const totalPrice_DOM = document.querySelector('#totalPrice') 


const data = fetch(allProductsURL).then(response => response.json())

const displayCartContent = async () => {
  const cartContent = JSON.parse(localStorage.getItem('cart'))

  const totalQuantity = cartContent.reduce((acc, curr) => acc + parseInt(curr.quantity), 0)
  const allProducts = await data


  let totalPrice = 0

    const productsEl = cartContent.forEach(productCart => {        

        const productDetails= allProducts.find(product => product._id === productCart.id)
       totalPrice += productDetails.price * productCart.quantity 

        const DOM_article = document.createElement('article');
        DOM_article.className = "cart__item";
        DOM_article.dataset.id = `${productCart.id}-${productCart.color}`
        
        

        DOM_article.innerHTML = `<div class="cart__item__img">
        <img src=${productDetails.imageUrl} alt=${productDetails.altTxt}>
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
          <h2>${productDetails.name}</h2>
          <p>${productDetails.price}€</p>
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
      sectionEl.appendChild(DOM_article);
    });
    
    totalPrice_DOM.textContent = totalPrice;
    totalQuantity_DOM.textContent = totalQuantity
    

    const allArticles_DOM= document.querySelectorAll('.cart__item')
  /* Add events to change quantity and remove product */
    allArticles_DOM.forEach(el=>{

      const deleteItem_DOM = el.querySelector('.deleteItem');
      const idProductWithColor = el.dataset.id;

      deleteItem_DOM.addEventListener('click',()=>removeProduct(idProductWithColor));
     
      const itemQuantity_DOM = el.querySelector('.itemQuantity');
      const newQuantity =  itemQuantity_DOM.value;
      itemQuantity_DOM.addEventListener('click', (e)=>{
        const newQuantity =  itemQuantity_DOM.value;
        handleQuantity(newQuantity, idProductWithColor);
      
    }
    )
  })
}

displayCartContent()

const removeAllChildNodes= (parent) => {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}
/* To remove product on click */
const removeProduct = (idProductWithColor) => {
 
  const cartContent = JSON.parse(localStorage.getItem('cart'));
  const newCartContent = cartContent.filter(el => `${el.id}-${el.color}` !== idProductWithColor)
  localStorage.setItem('cart', JSON.stringify(newCartContent))

  /* to remove old products from dom */
  removeAllChildNodes(sectionEl)

  /* to show the new cart content whitout the product removed */
  displayCartContent()

}

const handleQuantity = (newQuantity, idProductWithColor) => {
  const cartContent = JSON.parse(localStorage.getItem('cart'));
 const newCartContent =  cartContent.map(el=> {
  const currentIdProductWithColor = `${el.id}-${el.color}`

  if(currentIdProductWithColor === idProductWithColor){
    const currentProductWithNewQuantity = {...el}
    currentProductWithNewQuantity.quantity = newQuantity
    return currentProductWithNewQuantity
  }
  return el
  })

  localStorage.setItem('cart', JSON.stringify(newCartContent))
  removeAllChildNodes(sectionEl);
  displayCartContent();
}

const handleForm = () => {
const firstName_DOM = document.querySelector('#firstName')
firstName_DOM.addEventListener('change',()=> {
  console.log(firstName_DOM.value);
})

}
handleForm()

