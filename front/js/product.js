const getOneProductURL = 'http://localhost:3000/api/products/'

const currentURL = new URL(window.location.href)
const idProduct = currentURL.searchParams.get('id')

const fullGetOneProductURL = getOneProductURL + idProduct

const cartContent = JSON.parse(localStorage.getItem('cart'))
if(!cartContent){
    localStorage.setItem('cart', JSON.stringify([]))
}

const currentProduct = fetch(fullGetOneProductURL).then(res=>res.json())

const displayProductById = async () => {
        const res = await currentProduct;
    
        /* Add image in DOM */
        const item__img = document.querySelector('.item__img')
        item__img.innerHTML = `<img src=${res.imageUrl} alt=${res.altText}>`

        /* Add title in DOM */
        const title = document.querySelector('#title')
        title.textContent = res.name

        /* Add price in DOM */
        const price = document.querySelector('#price')
        price.textContent = res.price

        /* Add description in DOM */
        const description = document.querySelector('#description')
        description.textContent = res.description

        /* Add options elements in DOM */

        const select = document.querySelector("#colors")
        const colorsProduct = res.colors;

        const allColorsElem = colorsProduct.map(el=> {
            const option = document.createElement('option')
            option.value = el;
            option.textContent = el
            return option
        })
        select.append(...allColorsElem)           
    
}

displayProductById()

const addToCartButton = document.querySelector('#addToCart')

addToCartButton.addEventListener('click',()=> addProductToCart())


const addProductToCart = () => {
    const colorsSelect = document.querySelector('#colors')
    const colorSelected = colorsSelect.options[colorsSelect.options.selectedIndex].value;
    const quantitySelected = Number(document.querySelector('#quantity').value)
    
    if(!quantitySelected){
        alert('vous devez sélectionner au moins un article')
      return
    }
    if(!colorSelected){
        alert('vous devez sélectionner au moins une couleur')
      return
    }

   
    if(cartContent.length){
    /* Check if product is already in the cart */
    const productAlreadyInCart = cartContent.find(productEl => (productEl.id === idProduct) && (productEl.color === colorSelected))

    if(productAlreadyInCart){
       
        productAlreadyInCart.quantity = productAlreadyInCart.quantity + quantitySelected
        const newCartContent =  cartContent.map(productEl => {
            if((productEl.id === idProduct) && (productEl.color === colorSelected)){
                return productAlreadyInCart
            }
            return productEl
        })
        localStorage.setItem('cart', JSON.stringify(newCartContent)) 
    } else {
        cartContent.push({id:idProduct, color: colorSelected, quantity:quantitySelected})
      
        localStorage.setItem('cart', JSON.stringify(cartContent)) 

    }
    }

    if(!cartContent.length){
        cartContent.push({id:idProduct, color: colorSelected, quantity:quantitySelected})
        localStorage.setItem('cart', JSON.stringify(cartContent))
    }
   
}


