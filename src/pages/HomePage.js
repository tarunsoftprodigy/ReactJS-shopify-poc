import React, { useContext}  from 'react'
import { ShopContext } from '../context/shopContext'
import { Link} from 'react-router-dom'
import Navbar from '../components/Navbar'


const HomePage = () => {
    const {collections} = useContext(ShopContext)

    if (!collections.length === 0) return <p>Loading...</p>
    return (
        <div>
             <Navbar/>
             <div className="allprods">
                    <Link to = "/products">All Products</Link>
            </div>
            <p style={{textAlign:'center', fontSize: "24px", lineHeight: "2"}}>Categories</p>
            <div className="prdct-list">
                {collections && collections.map(collection => (
                   collection.products.length === 0 ? null : <div className="prdct-card" key={collection.id} >
                        <Link to={`/collection/${collection.id}`} style={{ textDecoration: 'none' }}>
                            <div>
                               { collection.image !== null && <img width="250px" height="125px" src={collection.image.src} alt=""/>}
                                <h3>{collection.title}</h3>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage
