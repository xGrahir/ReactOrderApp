import styles from './AvailableMeals.module.css'
import Card from '../UI/Card/Card'
import Meal from './Meal'
import {useEffect, useCallback, useState} from 'react'
import useHtml from '../hooks/use-html'

const AvailableMeals = () => {
	let meals
	const [currentMeals, setMeals] = useState()
	const {fetchData, isLoading, error} = useHtml()

	const processData = (data) => {
		let avaiableMeals = []
		for(let pos in data) {
			avaiableMeals.push({id:pos, ...data[pos]})
		}
		
		if(data) {
			setMeals(avaiableMeals)
		}
	}

	const fetchHandler = useCallback(() => {
		fetchData({url:'https://foodorder-96b72-default-rtdb.europe-west1.firebasedatabase.app/meals.json'}, processData)
	}, [fetchData])


	useEffect(() => {
		fetchHandler()
	}, [fetchHandler])

	if (currentMeals) {
		meals = currentMeals.map(meal => <Meal id={meal.id} key={meal.id} meals={meal}></Meal>)
	}

	return (
		<section className={styles.meals}>
			<Card>
				{isLoading ? <p className={styles.loading}>loading...</p> : ''}
				{error && error}
				{currentMeals ?  <ul>{meals}</ul> : ''}
			</Card>
		</section>
	)
}

export default AvailableMeals
