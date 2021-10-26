const allProductsURL = 'http://localhost:3000/api/products'

fetch(allProductsURL).then(arrayAllProducts => arrayAllProducts.json()).then(arrayAllProducts => {

    
    const itemsEl = document.querySelector('#items');
    arrayAllProducts.forEach((product)=>{

        const DOM_a = document.createElement('a');
        DOM_a.href = `./front/html/product.html?id=${product._id}`
        DOM_a.innerHTML = `<article>
            <img src=${product.imageUrl} alt=${product.altTxt}>
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
            </article>` 
            itemsEl.appendChild(DOM_a)
        return DOM_a
        })
})



