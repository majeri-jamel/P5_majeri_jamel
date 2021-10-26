const allProductsURL = 'http://localhost:3000/api/products/'
const orderURL_page = 'confirmation.html'


const sectionEl = document.querySelector('#cart__items')
const totalQuantity_DOM = document.querySelector('#totalQuantity') 
const totalPrice_DOM = document.querySelector('#totalPrice') 

const data = fetch(allProductsURL).then(response => response.json())

const displayCartContent = async () => {
  const cartContent = JSON.parse(localStorage.getItem('cart'))  || []
  

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


const form_DOM = document.querySelector('.cart__order__form')
const firstName_DOM = document.querySelector('#firstName')
const lastName_DOM = document.querySelector('#lastName')
const address_DOM = document.querySelector('#address')
const city_DOM = document.querySelector('#city')
const email_DOM = document.querySelector('#email')

const firstName_DOM_ErrorMsg = document.querySelector('#firstNameErrorMsg')
const lastName_DOM_ErrorMsg = document.querySelector('#lastNameErrorMsg')
const address_DOM_ErrorMsg = document.querySelector('#addressErrorMsg')
const city_DOM_ErrorMsg = document.querySelector('#cityErrorMsg')
const email_DOM_ErrorMsg = document.querySelector('#emailErrorMsg')

const order_DOM = document.querySelector('#order')
const allFormArray = [firstName_DOM, lastName_DOM, address_DOM, city_DOM, email_DOM]
const allErrorsDOMArray = [firstName_DOM_ErrorMsg, lastName_DOM_ErrorMsg, address_DOM_ErrorMsg, city_DOM_ErrorMsg, email_DOM_ErrorMsg]
const errorsArray = []


const validateEmailAdress = (emailString) => {
  const atSymbolIndex = emailString.indexOf("@");
    if(atSymbolIndex < 1) return false;
    
    const dotIndex = emailString.indexOf(".");

    if(dotIndex <= atSymbolIndex + 2) return false;
    
    // check that the dot is not at the end
    if (dotIndex === emailString.length - 1) return false;
    
    return true;
}

const checkForm = () => {
  errorsArray.length = 0;
  allFormArray.forEach(el=> {
    const el_error_DOM =  document.querySelector(`#${el.name}ErrorMsg`)
    el_error_DOM.textContent = ""
  
    if(el.value.trim() === ''){
     el_error_DOM.textContent = "Ce champ ne doit pas être vide"
     errorsArray.push(el.name + 'ErrorMsg')
    }
  })
  
  /* check email format*/
  if(!validateEmailAdress(email_DOM.value)){

    email_DOM_ErrorMsg.textContent = 'Veuillez saisir un mail valide'
    errorsArray.push(email_DOM.name + 'ErrorMsgFormatMail')
  }

   /* Check if number in input */
   const isNumber = /\d/;
   if(isNumber.test(firstName_DOM.value)){
    firstName_DOM_ErrorMsg.textContent = "Ce champ ne doit pas contenir de chiffre"
    errorsArray.push(firstName_DOM.name + 'ErrorMsg')
   }
   if(isNumber.test(lastName_DOM.value)){
    lastName_DOM_ErrorMsg.textContent = "Ce champ ne doit pas contenir de chiffre"
    errorsArray.push(lastName_DOM.name + 'ErrorMsg')
   }
   


}
allFormArray.forEach(el=>{
  el.addEventListener('focus',()=>checkForm())
})
form_DOM.addEventListener('keypress',()=>checkForm())


const handleForm = () => {

/* remove error message */

allFormArray.forEach(el=>{
 
  document.querySelector(`#${el.name}ErrorMsg`).textContent = ""
})

/* add values to localstorage */
  order_DOM.addEventListener('click',(e)=>{

    const isProductsInCart = (localStorage.getItem('cart') || []).length
    e.preventDefault()
    checkForm();
    const contact = {firstName:firstName_DOM.value, lastName:lastName_DOM.value, address:address_DOM.value, city:city_DOM.value, email:email_DOM.value}

    if(!errorsArray.length && isProductsInCart && firstName_DOM.value && lastName_DOM.value && address_DOM.value && city_DOM.value && email_DOM.value){
      localStorage.setItem('contact', JSON.stringify(contact))
      window.location.replace(orderURL_page)
    }
  
  })
}

handleForm()




