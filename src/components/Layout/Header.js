import React, { useContext, useEffect, useState } from 'react'
import styles from './Header.module.css'
import Image from './Image'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context'

const Header = props => {
	const [btnHighlighted, setBtnHighlighted] = useState(false)
	const context = useContext(CartContext)

	const { items } = context

	const numOfItems = items.reduce((cNum, item) => {
		return cNum + item.amount
	}, 0)

	const btnClasses = `${styles.button} ${btnHighlighted ? styles.bump : ''}`

	useEffect(() => {
		if (items.length === 0) {
			return
		}
		setBtnHighlighted(true)

		const timer = setTimeout(() => setBtnHighlighted(false), 300)

		return () => {
			clearTimeout(timer)
		}
	}, [items])

	return (
		<React.Fragment>
			<header className={styles.header}>
				<div>
					<h2 className={styles.title}>FoodOrder</h2>
				</div>
				<div>
					<button className={btnClasses} onClick={props.onShow}>
						<span>
							<CartIcon />
						</span>
						<span>Koszyk</span>
						<span className={styles.counter}>{numOfItems}</span>
					</button>
				</div>
			</header>
			<Image />
		</React.Fragment>
	)
}

export default Header
