import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Button, Tooltip } from 'antd'
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  ScheduleOutlined,
  LogoutOutlined,
  UserOutlined,
  BulbOutlined,
  BulbFilled,
} from '@ant-design/icons'
import useAuthStore from '../../store/useAuthStore'
import useThemeStore from '../../store/useThemeStore'
import styles from './index.module.less'

const menuItems = [
  { key: '/dashboard', icon: <DashboardOutlined />, label: '首页' },
  { key: '/orders', icon: <ShoppingCartOutlined />, label: '订单管理' },
  { key: '/packages', icon: <AppstoreOutlined />, label: '套餐管理' },
  { key: '/plans', icon: <ScheduleOutlined />, label: '计划管理' },
  { key: '/person', icon: <UserOutlined />, label: '个人中心' },
]

const Layout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { userInfo, logout } = useAuthStore()
  const { theme, setTheme } = useThemeStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>◈</span>
          <span className={styles.logoText}>大屏数据平台</span>
        </div>

        <nav className={styles.menu}>
          {menuItems.map((item) => (
            <Tooltip key={item.key} title="" placement="right">
              <div
                className={`${styles.menuItem} ${location.pathname === item.key ? styles.active : ''}`}
                onClick={() => navigate(item.key)}
              >
                <span className={styles.menuIcon}>{item.icon}</span>
                <span className={styles.menuLabel}>{item.label}</span>
                {location.pathname === item.key && <span className={styles.activeBar} />}
              </div>
            </Tooltip>
          ))}
        </nav>

        <div className={styles.userSection}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              <UserOutlined />
            </div>
            <div className={styles.userDetail}>
              <span className={styles.userName}>{userInfo?.username}</span>
              <span className={styles.userRole}>
                {userInfo?.role === 'admin' ? '管理员' : '普通用户'}
              </span>
            </div>
          </div>
          <Tooltip title={theme === 'dark' ? '切换浅色' : '切换深色'} placement="top">
            <Button
              type="text"
              icon={theme === 'dark' ? <BulbOutlined /> : <BulbFilled />}
              className={styles.themeBtn}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            />
          </Tooltip>
          <Tooltip title="退出登录" placement="top">
            <Button
              type="text"
              icon={<LogoutOutlined />}
              className={styles.logoutBtn}
              onClick={handleLogout}
            />
          </Tooltip>
        </div>
      </aside>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
