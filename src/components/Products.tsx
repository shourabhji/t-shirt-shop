import useCart from "../Hooks/useCart"
import useProducts from "../Hooks/useProducts"
import {ReactElement} from 'react'
import Product from "./Product"

const Products = () => {
    const { dispatch, REDUCER_ACTIONS, cart } = useCart()
    const { products } = useProducts()


    let pageContent:ReactElement|ReactElement[] = <p>Loading...</p>
    if (products?.length) {
        pageContent = products.map(product => {
            const inCart: boolean = cart.some(item => item.itemId === product.itemId)
            return (
            < Product
                    key={product.itemId}
                    product={product}
                    dispatch={dispatch}
                    REDUCER_ACTIONS={REDUCER_ACTIONS}
                    inCart={inCart}
                
                />
            )
        })
    }

    return (
        <div className=" bg-slate-400 flex flex-wrap p-4 justify-center ">
     {pageContent}
        </div>
    )
}

export default Products
