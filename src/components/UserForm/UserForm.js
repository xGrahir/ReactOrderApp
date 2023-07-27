import Modal from '../UI/Modal'
import styles from './UserForm.module.css'
import { useContext } from 'react'
import useInput from '../hooks/use-input'
import CartContext from '../../store/cart-context'

const UserForm = props => {
	const ctx = useContext(CartContext)

	const {
		changeValueHandler: changeName,
		checkIsTouched: nameIsTouched,
		uncheckIsTouched: uncheckName,
		enteredValue: nameValue,
		isNotValid: nameNotValid,
		isValid: nameValid,
	} = useInput()

	const {
		changeValueHandler: changeAdress,
		checkIsTouched: adressIsTouched,
		uncheckIsTouched: uncheckAdress,
		enteredValue: adressValue,
		isNotValid: adressNotValid,
		isValid: adressValid,
	} = useInput()

	const {
		changeValueHandler: changeNumber,
		checkIsTouched: numberIsTouched,
		uncheckIsTouched: uncheckNumber,
		enteredValue: numberValue,
		isNotValid: numberNotValid,
		isValid: numberValid,
	} = useInput()

	const {
		changeValueHandler: changeEmail,
		checkIsTouched: emailIsTouched,
		uncheckIsTouched: uncheckEmail,
		enteredValue: emailValue,
		isNotValid: emailNotValid,
		isValid: emailValid,
	} = useInput()

	const nameError = nameNotValid ? styles.error : ''
	const adressError = adressNotValid ? styles.error : ''
	const numberError = numberNotValid ? styles.error : ''
	const emailError = emailNotValid ? styles.error : ''

	const nameHandler = e => {
		changeName(e.target.value, "CHECK_NAME")
	}

	const adressHandler = (e) => {
		changeAdress(e.target.value, "CHECK_NAME")
	}

	const phoneHandler = (e) => {
		changeNumber(e.target.value, 'CHECK_NUMBER')
	}

	const emailHandler = (e) => {
		changeEmail(e.target.value, 'CHECK_EMAIL')
	}
 
	const onSubmitHandler = e => {
		e.preventDefault()
		nameIsTouched()
		adressIsTouched()
		numberIsTouched()
		emailIsTouched()

		if(nameValid && adressValid && numberValid && emailValid) {
			let order = []
			for (let item of ctx.items) {
				order.push({ name: item.name, amount: item.amount, price: item.price })
			}
			order.push({totalAmount: ctx.totalAmount.toFixed(2)})

			console.log('your order has been completed');
	
			ctx.clearCart()
			props.onClose()
		}
	}

	return (
		<Modal className='form'>
			<form className={styles.form} onSubmit={onSubmitHandler}>
				<p className={styles.head}>Please enter your details to finish the order</p>
				<div>
					<label htmlFor='name'>Name</label>
					<input type='text' id='name' className={nameError} onChange={nameHandler} onBlur={nameIsTouched} value={nameValue}/>
					{nameError ? <p>Name cannot be empty</p> : ''}
				</div>
				<div>
					<label htmlFor='surname'>Adress</label>
					<input type='text' id='surname' className={adressError} onChange={adressHandler} onBlur={adressIsTouched}value={adressValue}/>
					{adressError ? <p>Adress cannot be empty</p> : ""}
				</div>
				<div>
					<label htmlFor='number'>Phone Number</label>
					<input type='number' id='number' className={numberError} onChange={phoneHandler} onBlur={numberIsTouched} value={numberValue}/>
					{numberError ? <p>Phone number isnt valid</p> : "" }
				</div>
				<div>
					<label htmlFor='email'>E-mail</label>
					<input type='email' id='email' className={emailError} onChange={emailHandler} onBlur={emailIsTouched} value={emailValue}/>
					{emailError ? <p>Email adress is invalid</p> : ""}
				</div>
				<div className={styles.actions}>
					<button className={styles['button--alt']} onClick={props.onClose}>
						Close
					</button>
					<button>Send</button>
				</div>
			</form>
		</Modal>
	)
}

export default UserForm
