const orderURL_API = 'http://localhost:3000/api/products/order/'


const postOrder = async () => {
      const contact = JSON.parse(localStorage.getItem('contact'));
      const products = JSON.parse(localStorage.getItem('cart')) || [];
      const productsId = products.map(el=>{
        return el.id
      })     
      const orderId_DOM = document.querySelector('#orderId')
      const rawResponse = await fetch(orderURL_API, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({contact: contact, products:productsId })
      }).then(res=>res.json()).then(res=>{
            orderId_DOM.textContent = res.orderId
            localStorage.clear()
      });
    }

    postOrder()