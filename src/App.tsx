import React, { useEffect } from 'react'
import { ConfigProvider, theme as antTheme } from 'antd'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import useThemeStore from './store/useThemeStore'
import themes from './themes/themes'

const App: React.FC = () => {
  const { theme } = useThemeStore()
  const vars = themes[theme].vars

  // 将主题 token 注入到 :root CSS 变量，驱动所有 Less 样式实时响应
  useEffect(() => {
    const root = document.documentElement
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })
  }, [vars])

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
        token: {
          colorPrimary: vars.colorPrimary,
          colorBgContainer: vars.colorBgContainer,
          colorText: vars.colorText,
          colorBorder: vars.colorBorder,
          colorBgBase: vars.colorBgBase,
          ...themes[theme].token,
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
