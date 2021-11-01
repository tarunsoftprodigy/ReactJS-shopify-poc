import React, { useContext} from 'react'
import {ShopContext} from '../context/shopContext'

const Cart = () => {

    
    const {closeCart, checkout, updateItem, removeItem} = useContext(ShopContext)

    const cartClose = () => {
        document.getElementById("sidebar").style.display = "none";
        closeCart()
      }


    if (checkout) {
        return (
            <div id="sidebar">
                <div>
                    <div className="close-btn">
                        <h3>Bag</h3>
                        <button onClick={cartClose}>close</button>
                    </div>
                    <div className="cart-products">
                        {checkout.lineItems && checkout.lineItems.length < 1 ?
                            <div>
                                <div><h3>Cart Is Empty</h3></div>
                            </div>
                            :
                            <>
                                {checkout.lineItems && checkout.lineItems.map(item => (
                                    <div key={item.id}>
                                        <div>
                                            <img src={item.variant.image.src} alt=""/>
                                        </div>
                                        <div>
                                            <p>{item.title}</p>
                                            <p>{item.variant.title}</p>
                                           <div className="inc-dec">
                                                <button onClick={() => updateItem(item.id, item.quantity - 1)}>-</button>
                                                  {item.quantity}
                                                <button onClick={() => updateItem(item.id, item.quantity + 1)}>+</button>
                                            </div>
                                        </div>
                                        <div>
                                            <p>${item.variant.price}</p>
                                            <p>{item.vendor}</p>
                                        </div>
                                        <button style={{marginTop: "10px"}} onClick={() => removeItem(item.id)}>X</button>
                                    </div>
                                ))}
                            </>
                        }
                    </div>
                    <div>
                       {(checkout.lineItems && checkout.lineItems.length >= 1) ? <a className="checkout-btn" href={checkout.webUrl}>
                                Checkout
                        </a> : null}
                    </div>
                </div>
            </div>
        )
    }
    else {
        <div>Cart is empty</div>
    }

    return null

}

export default Cart

