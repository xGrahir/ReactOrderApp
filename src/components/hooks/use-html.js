import {useState, useCallback} from 'react'

const useHtml = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const fetchData = useCallback(async(requestConfig, processData) => {
		setIsLoading(true)
        setError(null)

		try {
			const res = await fetch(requestConfig.url , {
                method: requestConfig.method ? requestConfig.method : "GET",
                body: requestConfig.body ? JSON.stringify(requestConfig.body): null,
                headers: requestConfig.headers ? requestConfig.headers : {}
            })

			if (!res.ok) {
				throw new Error('request failed')
			}

			const data = await res.json()
			
			processData(data)
            
		} catch (err) {
			setError(err.message || "Something is wrong")
		}

		setIsLoading(false)
    },[])

    return {fetchData, isLoading, error}

}

export default useHtml