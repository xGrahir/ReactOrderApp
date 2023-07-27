import { Fragment } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

const Backdrop = props => {
	return <div className={styles.backdrop} onClick={props.onClose}></div>
}

const ModalOverlay = props => { 
	let inputStyle

	if(props.className === 'form') {
		inputStyle = styles.inuserform // for userform
	} 

	return (
		<div className={`${styles.modal} ${inputStyle}`}>
			<div className={styles.content}>{props.children}</div>
		</div>
	)
}

const Modal = props => {
	return (
		<Fragment>
			{createPortal(<Backdrop onClose={props.onClose}/>, document.getElementById('overlays'))}
			{createPortal(<ModalOverlay className={props.className}>{props.children}</ModalOverlay>, document.getElementById('overlays'))}
		</Fragment>
	)
}

export default Modal
