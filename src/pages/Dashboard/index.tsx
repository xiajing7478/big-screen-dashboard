import { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import useThemeStore from '../../store/useThemeStore'
import styles from './index.module.less'

const metrics = [
  { label: '今日订单', value: 1284, unit: '单', trend: '+12.5%', color: '#00b4ff' },
  { label: '活跃套餐', value: 36, unit: '个', trend: '+3.2%', color: '#00e5a0' },
  { label: '执行计划', value: 58, unit: '项', trend: '+8.1%', color: '#ffb800' },
  { label: '今日营收', value: 98620, unit: '元', trend: '+18.3%', color: '#ff6b9d' },
]

const recentOrders = [
  { id: 'ORD-2024001', user: '张三', pkg: '企业高级版', amount: '¥3,600', status: '已完成' },
  { id: 'ORD-2024002', user: '李四', pkg: '专业版', amount: '¥1,200', status: '进行中' },
  { id: 'ORD-2024003', user: '王五', pkg: '基础版', amount: '¥360', status: '已完成' },
  { id: 'ORD-2024004', user: '赵六', pkg: '企业高级版', amount: '¥3,600', status: '待支付' },
  { id: 'ORD-2024005', user: '陈七', pkg: '专业版', amount: '¥1,200', status: '已完成' },
]

const statusColor: Record<string, string> = {
  已完成: '#00e5a0',
  进行中: '#00b4ff',
  待支付: '#ffb800',
}

const Dashboard = () => {
  const [now, setNow] = useState(new Date())
  const { theme } = useThemeStore()
  const lineRef = useRef<HTMLDivElement>(null)
  const pieRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatDate = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  const formatTime = (d: Date) =>
    `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`

  // 折线图 —— 主题切换时重建
  useEffect(() => {
    if (!lineRef.current) return
    const chart = echarts.init(lineRef.current)
    const isDark = theme === 'dark'
    const primary = isDark ? '#00b4ff' : '#1677ff'
    const labelColor = isDark ? 'rgba(160,210,240,0.65)' : '#5c6b82'
    const gridLine = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'

    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: isDark ? 'rgba(10,14,26,0.92)' : 'rgba(255,255,255,0.96)',
        borderColor: primary,
        textStyle: { color: isDark ? '#e0f4ff' : '#1a1f2e', fontSize: 12 },
      },
      grid: { left: 14, right: 14, top: 20, bottom: 24, containLabel: true },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisLine: { lineStyle: { color: gridLine } },
        axisTick: { show: false },
        axisLabel: { color: labelColor, fontSize: 11 },
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: labelColor, fontSize: 11 },
        splitLine: { lineStyle: { color: gridLine } },
      },
      series: [
        {
          name: '订单量',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          data: [120, 200, 150, 80, 70, 110, 130],
          lineStyle: { color: primary, width: 2 },
          itemStyle: { color: primary, borderWidth: 2, borderColor: isDark ? '#0d1424' : '#fff' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: isDark ? 'rgba(0,180,255,0.28)' : 'rgba(22,119,255,0.18)' },
              { offset: 1, color: 'rgba(0,0,0,0)' },
            ]),
          },
        },
      ],
    })

    const resize = () => chart.resize()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      chart.dispose()
    }
  }, [theme])

  // 环形图 —— 主题切换时重建
  useEffect(() => {
    if (!pieRef.current) return
    const chart = echarts.init(pieRef.current)
    const isDark = theme === 'dark'
    const labelColor = isDark ? 'rgba(160,210,240,0.65)' : '#5c6b82'

    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: isDark ? 'rgba(10,14,26,0.92)' : 'rgba(255,255,255,0.96)',
        textStyle: { color: isDark ? '#e0f4ff' : '#1a1f2e', fontSize: 12 },
        formatter: '{b}: {c}%',
      },
      legend: {
        bottom: 8,
        itemWidth: 10,
        itemHeight: 10,
        borderRadius: 2,
        textStyle: { color: labelColor, fontSize: 12 },
      },
      series: [
        {
          name: '套餐分布',
          type: 'pie',
          radius: ['42%', '68%'],
          center: ['50%', '44%'],
          avoidLabelOverlap: false,
          label: { show: false },
          emphasis: {
            label: {
              show: true,
              fontSize: 13,
              fontWeight: 'bold',
              color: isDark ? '#e0f4ff' : '#1a1f2e',
            },
            scale: true,
            scaleSize: 6,
          },
          data: [
            { value: 60, name: '企业高级版', itemStyle: { color: isDark ? '#00b4ff' : '#1677ff' } },
            { value: 30, name: '专业版', itemStyle: { color: '#00e5a0' } },
            { value: 10, name: '基础版', itemStyle: { color: '#ffb800' } },
          ],
        },
      ],
    })

    const resize = () => chart.resize()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      chart.dispose()
    }
  }, [theme])

  return (
    <div className={styles.screen}>
      {/* 顶部标题栏 */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.dot} />
          <span className={styles.headerTitle}>数据可视化大屏</span>
        </div>
        <div className={styles.headerCenter}>
          <span className={styles.platformName}>大屏数据平台 · 实时监控中心</span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.date}>{formatDate(now)}</span>
          <span className={styles.time}>{formatTime(now)}</span>
        </div>
      </header>

      {/* 指标卡片 */}
      <section className={styles.metrics}>
        {metrics.map((m) => (
          <div
            key={m.label}
            className={styles.metricCard}
            style={{ '--accent': m.color } as React.CSSProperties}
          >
            <div className={styles.metricValue}>
              {m.value.toLocaleString()}
              <span className={styles.metricUnit}>{m.unit}</span>
            </div>
            <div className={styles.metricLabel}>{m.label}</div>
            <div className={styles.metricTrend} style={{ color: m.color }}>
              ↑ {m.trend}
            </div>
            <div className={styles.metricGlow} style={{ background: m.color }} />
          </div>
        ))}
      </section>

      {/* 主要内容区 */}
      <section className={styles.body}>
        {/* 左：折线趋势（ECharts） */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>订单趋势</span>
            <span className={styles.panelTag}>近 7 天</span>
          </div>
          <div ref={lineRef} className={styles.chartArea} />
        </div>

        {/* 中：套餐分布（ECharts环形图） */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>套餐分布</span>
            <span className={styles.panelTag}>本月</span>
          </div>
          <div ref={pieRef} className={styles.chartArea} />
        </div>

        {/* 右：近期订单 */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>近期订单</span>
            <span className={styles.panelTag}>实时</span>
          </div>
          <div className={styles.orderTable}>
            <div className={styles.orderHead}>
              <span>订单号</span>
              <span>用户</span>
              <span>套餐</span>
              <span>状态</span>
            </div>
            {recentOrders.map((o) => (
              <div key={o.id} className={styles.orderRow}>
                <span className={styles.orderId}>{o.id}</span>
                <span>{o.user}</span>
                <span className={styles.orderPkg}>{o.pkg}</span>
                <span style={{ color: statusColor[o.status] ?? 'var(--colorTextMuted)' }}>
                  {o.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
