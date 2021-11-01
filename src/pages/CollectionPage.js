import React, {useContext, useEffect }  from 'react'
import { ShopContext } from '../context/shopContext'
import { Link, useParams } from 'react-router-dom'

import Navbar from '../components/Navbar'

const CollectionPage = () => {
    const {fetchCollectionWithId, collection} = useContext(ShopContext)
    let {id} = useParams()

    useEffect(() => {
        fetchCollectionWithId(id)
    }, [])

    return (
        <div>
            <Navbar />
            <div className="prdct-list">
            {collection && collection.length !== 0 ?  collection.products.map(product => (
                    <div className="prdct-card" key={product.id} >
                      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                        <div>
                            <img src={product.images[0].src} alt=""/>
                            <h3>{product.title}</h3>
                        </div>
                      </Link>
                     </div>
            )) : <p>Loading....</p>}
            </div>
        </div>
    )
}

export default CollectionPage
