import { reloadCounter, getProduct, plusProductCart, minusProductCart } from "./logica.js";


document.addEventListener("DOMContentLoaded", reloadCounter);
document.addEventListener("DOMContentLoaded", loadCart);

async function loadCart(){
    const main= document.querySelector("main");

    const deleteButton=document.createElement("button");
    deleteButton.addEventListener("click",() => {emptyCart(), reloadCounter()});
    deleteButton.textContent="Vaciar Carrito";
    deleteButton.classList.add("clear-cart-btn")

    const container = document.createElement("div");
    container.classList.add("colum");
    container.appendChild(deleteButton);
    const guardado=localStorage.getItem("carrito");
    let carrito= JSON.parse(guardado) || new Cart();

    for (const product of carrito.products ){
        let productEl = await cartElement(product,carrito);
        productEl.classList.add("container-product")
        container.appendChild(document.createElement("hr"));
        container.appendChild(productEl);
        



    }
    main.appendChild(container)

    const buttonFinPurchase=document.createElement("button");
    buttonFinPurchase.textContent="Finalizar Compra"
    buttonFinPurchase.addEventListener("click", () => finPurchase())
    buttonFinPurchase.classList.add("checkout-btn")

    container.appendChild(buttonFinPurchase);
}

async function cartElement(productCart,cart){


    const product= await getProduct(productCart.id);

    const arrow= document.createElement("div");
    arrow.classList.add("arrow");

    const img = document.createElement("img");
    img.src=product.images[0]

    const productName=document.createElement("span");
    productName.textContent=product.title;

    const quantitySelector= document.createElement("div")
    quantitySelector.classList.add("row");
    quantitySelector.classList.add("quantitySelector");

    const plusButton=document.createElement("button");
    plusButton.addEventListener("click",(event) => plusProductCart(product.id,event));
    plusButton.textContent="+"

    const minusButton=document.createElement("button");
    minusButton.addEventListener("click", (event) => minusProductCart(product.id, event));
    minusButton.textContent="-"

    const productCant= document.createElement("span");
    productCant.textContent= cart.products.find(el => el.id==product.id).cant;


    const price= document.createElement("span");
    price.classList.add("product-price")
    price.textContent=`$${product.price * productCart.cant}`;

    arrow.append(img,productName,quantitySelector,price);
    quantitySelector.append(minusButton,productCant,plusButton);

    return arrow;


}

async function emptyCart() {
  localStorage.removeItem("carrito");
  document.querySelector("main").replaceChildren();

}

function finPurchase(){
    localStorage.removeItem("carrito");
    window.location.href="../index.html"
}
