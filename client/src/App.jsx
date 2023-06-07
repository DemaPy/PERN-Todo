import { Todo } from "./components/Todo";
import { useTodos } from "./hooks/useTodos";
import { Skeleton } from 'antd';



function App() {
  const { loading, todo, error } = useTodos()

  // if (loading) {
  //   return (<Skeleton active />)
  // }

  if (error) {
    return <h1>Smth went wrong... {error}</h1>
  }

  return (
    <ul>
      {  
        loading ? <Skeleton loading/> : todo.map(item => <Todo key={item.todo_id} {...item} />)
      }
    </ul>
  )
}

export default App
