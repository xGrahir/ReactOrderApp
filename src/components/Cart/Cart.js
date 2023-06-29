import { useContext } from 'react'
import styles from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'

const Cart = props => {
	const ctx = useContext(CartContext)
	const totalAmount = `$${ctx.totalAmount.toFixed(2)}`

	const cartItemRemoveHandler = id => {
		ctx.removeItem(id)
	}

	const cartItemAddHandler = item => {
		ctx.addItem({...item, amount: 1})
	}

	const cartItems = ctx.items.map(item => (
		<CartItem
			key={item.id}
			name={item.name}
			price={item.price}
			amount={item.amount}
			onRemove={cartItemRemoveHandler.bind(null, item.id)}
			onAdd={cartItemAddHandler.bind(null, item)}
		/>
	))

	return (
		<Modal onClose={props.onClose}>
			<ul className={styles['cart-items']}>{cartItems}</ul>
			<div className={styles.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={styles.actions}>
				<button className={styles['button--alt']} onClick={props.onClose}>
					Close
				</button>
				{ctx.items.length > 0 && <button className={styles.button}>Order</button>}
			</div>
		</Modal>
	)
}

export default Cart
