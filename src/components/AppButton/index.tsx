import { Button } from 'antd'
import type { ButtonProps } from 'antd'

const AppButton = ({ className, ...props }: ButtonProps) => {
  const cls = ['my-button', className].filter(Boolean).join(' ')
  return <Button className={cls} {...props} />
}

export default AppButton
