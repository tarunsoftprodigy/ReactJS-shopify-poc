import React, { useContext}  from 'react'
import { ShopContext } from '../context/shopContext'
import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'


const AllProduct = () => {
    const { products} = useContext(ShopContext)
    if (products.length === 0) return <p>Loading...</p>
    return (
        <div>
            <Navbar />
            <div className="prdct-list">
                {products.map(product => (
                 <div className="prdct-card" key={product.id} >
                        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                            <div>
                                <img  src={product.images ? product.images[0].src : null} alt=""/>
                                <h3>{product.title}</h3>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllProduct
