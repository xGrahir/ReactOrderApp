import React, {useState} from 'react'
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart'
import CartProvider from './store/CartProvider'

function App() {

	const [showModal, setShowModal] = useState(false)

	const showModalHandler = () => {
		setShowModal(true)
	}

	const closeModalHandler = () => {
		setShowModal(false)
	}

	return (
		<CartProvider>
			{showModal && <Cart onClose={closeModalHandler}/>}
			<Header onClose={showModalHandler}></Header>
			<main>
				<Meals></Meals>
			</main>
		</CartProvider>
	)
}

export default App
