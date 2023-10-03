import React from 'react'
import { ProductType } from '../context/ProductProvider'
import { ReducerActionType, ReducerAction } from '../context/CartProvider'

type propsType = {
    product: ProductType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType,
    inCart: boolean
}

const Product = (props: propsType) => {
    const { product, dispatch, REDUCER_ACTIONS, inCart } = props

    const img: string = `./${product.image}.png`

    const onAddToCart = () => dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product,qty:0 } })



    const content =
        <article className=' bg-gray-200 aspect-1/1 rounded-lg overflow-hidden p-4 m-2  '>
            <h3 className=' bg-slate-950 text-white text-center font-extrabold mb-2 rounded-sm'>{product.name}</h3>
            <img height={300} width={300} src={img} alt={product.name}
                className=' '
            />
            <div className=" bg-slate-950 mt-2 p-1 text-white flex justify-evenly ">

                <p>{new Intl.NumberFormat('en-us', { style: 'currency', currency: 'INR' }).format(product.price)}</p>
                {inCart ? <p>




                    Item In cart</p> : <button
                        className=' bg-amber-600 px-1'
                        disabled={inCart} onClick={onAddToCart}>Add TO Cart</button>}


            </div>

        </article>



    return content
}

export default Product
