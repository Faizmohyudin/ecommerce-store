let cart = JSON.parse(localStorage.getItem("cart")) || [];
let btnWhatsapp = document.querySelector("#btn-whatsapp");
let form = document.querySelector("#whatsappCheckoutForm");


function waCheckout() {
    

form.addEventListener("submit" , (e)=>{
    e.preventDefault();

    let nameValue = document.querySelector("#customerName").value;
    let phNumber = document.querySelector("#customerPhone").value;
    let address = document.querySelector("#customerAddress").value;

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = 
    `New Order Received! 🛒

*Customer Details:*

Name: ${nameValue}
Phone: ${phNumber}
Address: ${address}

*Order Items:*
`

    let total = 0
    cart.forEach(element => {
        total += (element.price * element.quantity);
        message += `
- ${element.name} (Qty: ${element.quantity}) - RS. ${(element.price * element.quantity).toLocaleString()}  `;
    });
    
    message += `

*Total Bill:* RS. ${total.toLocaleString()}`
    
    let whatsappNumber = "923274518054"; 

    let whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");

    localStorage.removeItem("cart")
})



}

waCheckout();