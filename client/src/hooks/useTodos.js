import { useEffect, useState } from 'react'
import axios from '../api/todos'





export function useTodos() {
    const [todo, setTodos] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            axios.get('/todos')
            .then(({data}) => {
                setTodos(data)
                setLoading(false)
            }).catch((e) => {
                setError(e.message)
            }).finally(() => {
                setLoading(false)
            })
        }, 5000)
    }, [])

    return {
        todo,
        loading,
        error
    }

}