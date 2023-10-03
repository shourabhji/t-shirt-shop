import useCart from "../Hooks/useCart"
type propsType = {
    viewCart: boolean;
}


const Footer = (props: propsType) => {

    const { viewCart } = props
    const { totalItem, totalPrice } = useCart()
    const year: number = new Date().getFullYear()

    const pageContent = viewCart ? <p>
        t-shirt-shop &copy; {year}
    </p> : (
        <>
            <p>totalItem: {totalItem}</p>
            <p>totalPrice: {totalPrice}</p>
            <p>
                t-shirt-shop &copy; {year}
            </p>
        </>
    )

    const content = (
        <footer className=" bg-slate-900  text-white p-2 flex justify-evenly" >
            {pageContent}
        </footer>
    )


    return content
}

export default Footer
