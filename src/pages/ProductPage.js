import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { ShopContext } from '../context/shopContext'

const ProductPage = () => {
    let { id } = useParams()
    const { fetchProductWithId, addItem, product} = useContext(ShopContext)

    useEffect(() => {
        fetchProductWithId(id)
       
    }, [ fetchProductWithId, id])

    if (!product.title) return <p>Loading...</p>
    return (
          <>
                <Navbar/>
                <div className="prdct-detail">
                    <div>
                        <img src={product.images[0].src} alt="product"/>
                    </div>
                    <div>
                        <h2>{product.title}</h2>
                        <h3>${product.variants[0].price}</h3>
                        <p>{product.description}</p>
                        <button onClick={() => addItem(product.variants[0].id, 1)}>Add To Cart</button>
                    </div>
                </div>
          </>
    )
}

export default ProductPage
