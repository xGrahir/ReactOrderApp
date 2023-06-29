import React, { useRef, useState } from 'react'
import styles from './MealForm.module.css'
import Input from '../UI/Input'

const Form = props => {
    const [isValid, setIsValid] = useState(true)
	const amountInputRef = useRef()

	const submitHandler = e => {
		e.preventDefault()

        const enteredAmount = amountInputRef.current.value
        const enteredAmountNumber = +enteredAmount

        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 0 || enteredAmountNumber > 5) {
            setIsValid(false)
            return
        }
        
        props.onAddToCart(enteredAmountNumber)
	}

	return (
		<form action='' className={styles.form} onSubmit={submitHandler}>
			<Input
				label='Amount'
				ref={amountInputRef}
				input={{
					id: 'amount_' + props.id,
					type: 'number',
					min: '1',
					max: '5',
					step: '1',
					defaultValue: '1',
				}}
			/>
			<button>Add</button>
            {!isValid && <p>Please enter a valid amount</p>}
		</form>
	)
}

export default Form
