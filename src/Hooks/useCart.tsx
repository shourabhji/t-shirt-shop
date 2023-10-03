import { useContext } from "react";
import cartContext from "../context/CartProvider";
import { useCartContextType
} from "../context/CartProvider";
 
const useCart = (): useCartContextType => {
    return useContext(cartContext)
}

export default useCart