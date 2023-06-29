import { useReducer } from 'react'
import CartContext from './cart-context'

const defaultCartState = {
	items: [],
	totalAmount: 0,
}

const CartReducer = (state, action) => {
	if (action.type === 'ADD') {
		const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount
		const existingCartIndex = state.items.findIndex(item => item.id === action.item.id)
		const existingCartItem = state.items[existingCartIndex]
		let updatedItems

		if (existingCartItem) {
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			}
			updatedItems = [...state.items]
			updatedItems[existingCartIndex] = updatedItem
		} else {
			updatedItems = state.items.concat(action.item)
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		}
	}

	if (action.type === 'REMOVE') {
		const existingCartIndex = state.items.findIndex(item => item.id === action.id)
		const existingCartItem = state.items[existingCartIndex]
		const updatedTotalAmount = state.totalAmount - existingCartItem.price
		let updatedItems

		if (existingCartItem.amount === 1) {
			updatedItems = state.items.filter(item => item.id !== action.id)
		} else {
			const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 }
			updatedItems = [...state.items]
			updatedItems[existingCartIndex] = updatedItem
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		}
	}

	return defaultCartState
}

const CartProvider = props => {
	const [cartState, dispatchCartAction] = useReducer(CartReducer, defaultCartState)

	const addItemToCart = item => {
		dispatchCartAction({ type: 'ADD', item: item })

		console.log(cartState)
	}

	const removeItemFromCart = id => {
		dispatchCartAction({ type: 'REMOVE', id: id })
	}

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCart,
		removeItem: removeItemFromCart,
	}

	return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
}

export default CartProvider
