const allProductsURL = 'http://localhost:3000/api/products'
const displayAllProducts = fetch(allProductsURL).then(res => res.json()).then(res => {

    
    const itemsEl = document.querySelector('#items');
   
    const allProductsElem =  res.map((el)=>{

        const DOM_a = document.createElement('a');
        DOM_a.href = `./product.html?id=${el._id}`
        DOM_a.innerHTML = ` <article>
            <img src=${el.imageUrl} alt=${el.altTxt}>
            <h3 class="productName">${el.name}</h3>
            <p class="productDescription">${el.description}</p>
            </article>` 
        return DOM_a
})

itemsEl.append(...allProductsElem)

    })


