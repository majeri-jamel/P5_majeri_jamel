const orderURL_API = 'http://localhost:3000/api/products/order/'


const postOrder = async () => {
      const contact = JSON.parse(localStorage.getItem('contact'));
      const products = JSON.parse(localStorage.getItem('cart')) || [];
      const productsId = products.map(el=>{
        return el.id
      })     
      const orderId_DOM = document.querySelector('#orderId')
      const confirmation_DOM = document.querySelector('.confirmation')
    
      const rawResponse = await fetch(orderURL_API, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({contact: contact, products:productsId })
      }).then(res=>res.json()).then(res=>{
        confirmation_DOM.innerHTML = res.orderId ?`<p>Commande validée ! <br>Votre numéro de commande est : <strong>${res.orderId}</strong><br><strong>Merci et à bientôt</strong></br></p>` : `<p>Commande déjà validée</p>`

           localStorage.clear()
      });
    }

    postOrder()