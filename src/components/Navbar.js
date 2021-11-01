import React, {useContext, useState, useEffect} from 'react'
import { Link} from 'react-router-dom'
import { ShopContext } from '../context/shopContext'

import Cart from './Cart'

const Navbar = () => {

    const [pageStatus, setPageStatus] = useState(false)
    const { openCart } = useContext(ShopContext)
    const cartOpen = () => {
        document.getElementById("sidebar").style.display = "block";
        openCart()
      }

    useEffect(() => {
       if(window.location.pathname.includes('thank-you')) {
           setPageStatus(true)
       } else {
           setPageStatus(false)
       }
    }, [])


    return (
        <>  
            <div className="navbar">
                <Link to="/">Home</Link>
                {pageStatus ? <p>Help</p>  : <button onClick={cartOpen}>Cart</button>}
            </div>
            <Cart />
        </>
    )
}

export default Navbar
