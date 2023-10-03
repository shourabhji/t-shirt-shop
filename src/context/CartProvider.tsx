import { useMemo, useReducer,createContext, ReactElement } from 'react'

export type CartItemType = {
    itemId: string,
    name: string,
    price: number,
    image: string,
    size: string[],
    qty: number
}

type cartStateType = {
    cart: CartItemType[]
}

const initialCartState: cartStateType = { cart: [] }

const REDUCER_ACTION_TYPE = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    QUANTITY: "QUANTITY",
    SUBMIT: "SUBMIT"
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
    type: string,
    payload?: CartItemType
}

const reducer = (state: cartStateType, action: ReducerAction): cartStateType => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.ADD: {
            if (!action.payload) {
                throw new Error("Action Payload is missing")
            }


            const { itemId, name, price, image, size } = action.payload
            
         

            return {
                ...state, cart: [...state.cart,{
                    itemId, name, price, image, size, qty:1
                }]
            }




        }
        case REDUCER_ACTION_TYPE.REMOVE: {
            if (!action.payload) {
                throw new Error("Action Payload is missing")
            }

            const { itemId } = action.payload
            const filteredCart: CartItemType[] = state.cart.filter(item => item.
                itemId !== itemId)
            const itemExists: CartItemType | undefined = state.cart.find(item => item.itemId)

            if (!itemExists) {
                throw new Error("Item must have to exist in order to remove it form cart")
            }

            return { ...state, cart: [...filteredCart] }
        }

        case REDUCER_ACTION_TYPE.QUANTITY: {
            if (!action.payload) {
                throw new Error("Action Payload is missing")
            }

            const { itemId, qty, name, price, image, size } = action.payload

            const itemExists: CartItemType | undefined = state.cart.find(item => item.itemId)
            if (!itemExists) {
                throw new Error("Item must have to exist in order to update quantity in cart")
            }

            const updatedCartItem: CartItemType = {
                itemId, name, price, image, size, qty
            }

            const filteredCart: CartItemType[] = state.cart.filter(item => item.itemId !== itemId)

            return {
                ...state, cart: [...filteredCart, updatedCartItem]
            }


        }
        case REDUCER_ACTION_TYPE.SUBMIT: {
            return { ...state, cart: [] }
        }
        default: {
            throw new Error("unidentified reducer action type")
        }

    }
}


const useCartContext = (initialCartState: cartStateType) => {
    const [state, dispatch] = useReducer(reducer, initialCartState)
    
    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTION_TYPE
    },[])

    const totalItem = state.cart.reduce((previousValue, cartITem) => {
        return previousValue+cartITem.qty
    },0)

    const totalPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(state.cart.reduce((prev, cartItem) => {
        return prev + (cartItem.qty * cartItem.price)
    }, 0))
    const cart = state.cart.sort((a, b) => {
        const itema = Number(a.itemId)
        const itemb = Number(b.itemId)
        return itema-itemb
    })
    return  { dispatch, REDUCER_ACTIONS,totalItem,totalPrice,cart}

}

export type useCartContextType = ReturnType<typeof useCartContext>

const initContextState: useCartContextType = {
    dispatch: () => { },
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    totalItem: 0,
    totalPrice: '',
    cart:[]
}

export const cartContext = createContext<useCartContextType>(initContextState)

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
    return (
        <cartContext.Provider value={useCartContext(initialCartState)}>
{children}
        </cartContext.Provider>
    )
}

export default cartContext