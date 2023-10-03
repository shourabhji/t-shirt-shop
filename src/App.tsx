import Header from "./components/Header"
import Footer from "./components/Footer"
import Products from "./components/Products"
import Cart from "./components/Cart"
import {useState} from 'react'



export default function App() {
  const [viewCart,setViewcart] = useState<boolean>(false)

  const pageContent = viewCart ? <Cart /> : <Products />
  
  const content = (
    <>
      <Header viewCart={viewCart} setViewcart={setViewcart} />
      {pageContent}
      <Footer viewCart={viewCart} />
    </>
  )
  
  
  return content
}