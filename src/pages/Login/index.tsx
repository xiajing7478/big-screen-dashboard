import { Form, Input, Button, message, ConfigProvider, theme } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate, Navigate } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'
import styles from './index.module.less'

const MOCK_USERS = [
  { username: 'admin', password: '123456', role: 'admin' },
  { username: 'user', password: '123456', role: 'user' },
]

const Login = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const onFinish = (values: { username: string; password: string }) => {
    const user = MOCK_USERS.find(
      (u) => u.username === values.username && u.password === values.password,
    )
    if (user) {
      login({ username: user.username, role: user.role })
      navigate('/dashboard')
    } else {
      message.error('用户名或密码错误')
    }
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#00b4ff',
          colorBgContainer: 'rgba(255,255,255,0.04)',
          colorBorder: 'rgba(0, 180, 255, 0.25)',
          borderRadius: 6,
        },
      }}
    >
      <div className={styles['login-container']}>
        <div className={styles['login-card']}>
          <div className={styles['login-title']}>
            <h1>大屏数据平台</h1>
            <p>Big Screen Dashboard</p>
          </div>
          <Form
            onFinish={onFinish}
            initialValues={{ username: 'admin', password: '123456' }}
            autoComplete="off"
            size="large"
          >
            <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
              <Input prefix={<UserOutlined />} placeholder="用户名" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="密码" />
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="primary" htmlType="submit" block>
                登 录
              </Button>
            </Form.Item>
          </Form>
          <div className={styles['login-hint']}>
            测试账号：admin / 123456 &nbsp;|&nbsp; user / 123456
          </div>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default Login
