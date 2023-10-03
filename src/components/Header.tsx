import useCart from "../Hooks/useCart"

type propsType = {
    viewCart: boolean;
    setViewcart: React.Dispatch<React.SetStateAction<boolean>>
}


const Header = (props: propsType) => {
    
    const {totalItem , totalPrice }  = useCart()
    const { viewCart, setViewcart } = props
    
    const content = (
        <header  className="text-white bg-slate-900 py-1 px-4 flex justify-between sticky top-0 ">
            <div className="title font-extrabold text-amber-600 mt-3">
                <h1>T-Shirt Shop</h1>
               
            </div>
            <div> <p>Total Items: { totalItem}</p>
                <p>Total Price: { totalPrice}</p>
            </div>
            <div>
                {viewCart ? <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={() => {
                    setViewcart(!viewCart)
                }}>products</button> :
                    <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={() => {
                        setViewcart(!viewCart)
                }}>cart</button>
                }
            </div>
        </header>
    )

  return content
}

export default Header
