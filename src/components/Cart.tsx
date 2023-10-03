import  {ReactElement} from 'react'
import useCart from '../Hooks/useCart'
import {useState} from 'react'
import CartItem from './CartItem'

const Cart = () => {

    const [confirm, setConfirm] = useState<boolean>(false)
    const { dispatch, REDUCER_ACTIONS, totalItem, totalPrice, cart } = useCart()
    
    const onSubmitOrder = () => {
        dispatch({ type: REDUCER_ACTIONS.SUBMIT })
        setConfirm(true)
    }

    const pageContent: ReactElement| ReactElement[] = confirm ? <h2>Order completed Successfully!</h2> : <>
        <h2 className='text-center py-3 text-white font-bold underline'>Cart</h2>
        <ul className=' flex-1 w-full flex-nowrap '>
            {cart.map(item => {
                return (
                    <CartItem
                        key={item.itemId}
                        item={item}
                        dispatch={dispatch}
                        REDUCER_ACTIONS= {REDUCER_ACTIONS}
                    />
                    )
            })}
        </ul>

        <div className='m-4 text-white font-bold'>
            <p>Total Items:{totalItem}</p>
            <p>Total Price: {totalPrice}</p>
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" disabled={!totalItem}
            onClick={onSubmitOrder}
            >Place Order</button>
        </div>
    
    </>

    const content = (
        <main className=' bg-slate-400 min-h-[85vh]'>
            {pageContent}
        </main>
    )



    return content
}

export default Cart
