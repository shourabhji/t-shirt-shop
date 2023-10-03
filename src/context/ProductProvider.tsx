import { ReactElement, createContext, useState } from "react"

export type ProductType = {
    itemId: string,
    name: string,
    price: number,
    image:string,
    size : string []
}

const initialState : ProductType[] = [
        {   "itemId":"01",
            "name":"METROID BLACK",
            "price":1000,
            "image":"tshirt1",
            "size":["xl","xs", "m","l","s"]
        },
         {
            "itemId":"02",
            "name":"WHITE DOGI",
            "price":800,
            "image":"tshirt2",
            "size":["xl","xs", "m","l","s"]
        }, {
            "itemId":"03",
            "name":"MCA BLACK",
            "price":100,
            "image":"tshirt3",
            "size":["xl","xs", "m","l","s"]
        }, {
            "itemId":"04",
            "name":"TCA PATRIOTS",
            "price":1250,
            "image":"tshirt4",
            "size":["xl","xs", "m","l","s"]
        }, {
            "itemId":"05",
            "name":"GOLDEN WARRIORS",
            "price":650,
            "image":"tshirt5",
            "size":["xl","xs", "m","l","s"]
        }, {
            "itemId":"06",
            "name":"RED PRINTED",
            "price":950,
            "image":"tshirt6",
            "size":["xl","xs", "m","l","s"]
        }
]
    
export type UseProductContextType = { products: ProductType[] }

const initContextState: UseProductContextType = {
    products : [ ]
}

const ProductContext = createContext<UseProductContextType>(initContextState)

type ChildreanType = { children?: ReactElement | ReactElement[] }


export const ProductProvider = ({ children }:ChildreanType): ReactElement =>{
    const [products] = useState<ProductType[]>(initialState)
    
    return (
        <ProductContext.Provider value={{products}}>
            {children}
     </ProductContext.Provider>
 )   


}

export default ProductContext