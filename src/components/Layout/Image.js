import React from 'react'
import styles from './Image.module.css'
import image from './meals.jpg'

const Image = () => {
    return(
        <div className={styles.imagediv}>
            <img src={image} alt="Stół z jedzeniem" className={styles.image} />
        </div>
    )
}

export default Image