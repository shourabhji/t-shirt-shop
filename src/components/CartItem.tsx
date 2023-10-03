import React,{ReactElement,ChangeEvent,memo} from 'react'
import { CartItemType } from '../context/CartProvider'
import { ReducerAction } from '../context/CartProvider'
import { ReducerActionType } from '../context/CartProvider'

type propsType = {
    item: CartItemType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType
}

const CartItem = (props: propsType) => {
    
    const { item, dispatch, REDUCER_ACTIONS } = props
    
    const img: string = `./${item.image}.png`
    const lineTotal: number = (item.qty* item.price)

    const highestQty: number = 20 > item.qty ? 20 : item.qty
    
    const optionValues: number[] = [...Array(highestQty).keys()].map(i => i + 1)
    
    const options: ReactElement[] = optionValues.map(val => {
        return <option key={`opt${val}`} value={val}>{ val}</option> })

    const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: REDUCER_ACTIONS.QUANTITY,
        payload : {...item , qty : Number(e.target.value) }
        })
    }


    const onRemoveCart = () => {
        dispatch({
            type: REDUCER_ACTIONS.REMOVE, 
            payload: item
        })
    }

    const content = (
        <li className='flex justify-between items-center flex-wrap  my-3 bg-slate-200 p-2 mx-4 space-x-4 '>
            <img width={50} src={img} alt={item.name} />
            <div>{item.name}</div>
            <div>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(item.price)}</div>
            <label htmlFor="itemQty">
                Item Quentity
            </label>
            <select
                name='itemQty'
                id="itemQty"
                value={item.qty}
                onChange={onChangeQty}
            >
                {options}
            </select>

            <div aria-label='Line Item Subtotal'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(lineTotal)}</div>

            <button
                aria-label='Remove Item From Cart'
                title='Remove Item From Cart'
                className='text-red-600 font-extrabold bg-white px-1 rounded-sm'
                onClick={onRemoveCart}
            >X</button>
        </li>
    )
    

  return content
}

function areITemEqual({ item: prevItem }: propsType, { item: nextitem }: propsType) {
    return Object.keys(prevItem).every(key => {
        return prevItem[key as keyof CartItemType] === nextitem[key as keyof CartItemType]
    })
}

const memoizedCartItem = memo<typeof CartItem>(CartItem, areITemEqual)

export default memoizedCartItem
