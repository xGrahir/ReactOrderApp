import { useState, useReducer } from 'react'

const defaultSettings = {
	isValid: false,
}

const dataReducer = (state, action) => {
	if (action.type === 'CHECK_NAME') {
		if (action.value.trim() !== '') {
			return true
		} else {
			return false
		}
	}

	if (action.type === 'CHECK_EMAIL') {
		const validMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		if (action.value.trim().match(validMail)) {
			return true
		} else {
			return false
		}
	}

    if(action.type === "CHECK_NUMBER") {
        const validPhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{3})$/
        if(action.value.trim().match(validPhone)) {
            return true
        } else {
            return false
        }
    }
	return dataReducer
}

const useInput = () => {
	const [enteredValue, setEnteredValue] = useState('')
	const [isTouched, setIsTouched] = useState(false)

	const [isValid, dataDispatch] = useReducer(dataReducer, defaultSettings.isValid)

	const isNotValid = !isValid && isTouched

	const changeValueHandler = (data, type) => {
		setEnteredValue(data)
		dataDispatch({ type: `${type}`, value: data })
	}

	const checkIsTouched = () => {
		setIsTouched(true)
	}

    const uncheckIsTouched = () => {
        setIsTouched(false)
    }

	return { changeValueHandler, checkIsTouched, uncheckIsTouched, enteredValue, isNotValid, isValid }
}

export default useInput
