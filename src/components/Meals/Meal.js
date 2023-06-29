import React, {useContext} from 'react'
import styles from './Meal.module.css'
import MealForm from './MealForm'
import CartContext from '../../store/cart-context'

const Meal = props => {
    const price = `$${props.meals.price.toFixed(2)}`

    const context = useContext(CartContext)

    const addToCartHandler = amount => {
        context.addItem({
            id: props.id,
            name: props.meals.name,
            amount: amount,
            price:  props.meals.price
        })
    }

	return (
		<li className={styles.meal}>
            <div>
                <h3 className={styles.name}>{props.meals.name}</h3>
                <p className={styles.description}>{props.meals.description}</p>
                <p className={styles.price}>{price}</p>
            </div>
            <div>
                <MealForm onAddToCart={addToCartHandler} id={props.id}></MealForm>
            </div>
		</li>
	)
}

export default Meal
