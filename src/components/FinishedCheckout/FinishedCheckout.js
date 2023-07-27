import {createPortal} from 'react-dom'
import styles from './FinishedCheckout.module.css'

const Background = () => {
    return (
        <div className={styles.background}>
            <p>Your order has been sent</p>
        </div>
    )
}

const FinishedCheckout = () => {
    return (
        createPortal(<Background />, document.getElementById('overlays'))
    )
}

export default FinishedCheckout