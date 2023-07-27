import React, {useState} from 'react'
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart'
import CartProvider from './store/CartProvider'
import UserForm from './components/UserForm/UserForm'

function App() {

	const [showModal, setShowModal] = useState(false)
	const [showForm, setShowForm] = useState(false)

	const showModalHandler = () => {
		setShowModal(true)
	}

	const closeModalHandler = () => {
		setShowModal(false)
	}

	const showFormHandler = () => {
		setShowForm(true)
		setShowModal(false)
	}

	const closeFormHandler = () => {
		setShowForm(false)
	}

	return (
		<CartProvider>
			{showForm && <UserForm onClose={closeFormHandler}/>}
			{showModal && <Cart onClose={closeModalHandler} showForm={showFormHandler}/>}
			<Header onShow={showModalHandler}></Header>
			<main>
				<Meals></Meals>
			</main>
		</CartProvider>
	)
}

export default App
