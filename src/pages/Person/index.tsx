import { useCallback, useState } from 'react'
// import Item from './components/Item'
import { CXAButton, NotificationList } from '@xiajing7478/cxa-business-components'
import { type NotificationItem } from '@xiajing7478/cxa-business-components'
import { Button } from 'antd'
const Person: React.FC = () => {
  const [count, setCount] = useState(0)
  // const [items] = useState([
  //   { id: 1, name: 'John' },
  //   { id: 2, name: 'Jane' },
  //   { id: 3, name: 'Doe' },
  // ])

  const handleSelect = useCallback((item: NotificationItem) => {
    console.log('Selected:', item)
  }, [])
  return (
    <div style={{ padding: 140 }}>
      <CXAButton variant="secondary">Increment</CXAButton>
      <Button onClick={() => setCount(count + 1)}>Count is {count}</Button>
      {/* {items.map((item) => (
        <Item key={item.id} name={item.name} id={item.id} onSelect={handleSelect} />
      ))} */}
      <NotificationList onItemClick={handleSelect} />
    </div>
  )
}

export default Person
