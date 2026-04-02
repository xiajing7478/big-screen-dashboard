import { memo } from 'react'

interface ItemProps {
  id: number
  name: string
  onSelect: (id: number) => void
}

const Item: React.FC<ItemProps> = ({ id, name, onSelect }) => {
  console.log('render item', id)
  return <div onClick={() => onSelect(id)}>{name}</div>
}

export default memo(Item)
