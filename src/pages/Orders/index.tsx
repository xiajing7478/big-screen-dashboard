import { Table, Tag, Button, Input, Space } from 'antd'
import { SearchOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import AppButton from '@/components/AppButton'
import type { TableColumnsType } from 'antd'
import styles from './index.module.less'

interface OrderRecord {
  key: string
  id: string
  user: string
  package: string
  amount: number
  status: '已完成' | '进行中' | '待支付' | '已取消'
  createdAt: string
}

const statusColorMap: Record<string, string> = {
  已完成: 'success',
  进行中: 'processing',
  待支付: 'warning',
  已取消: 'default',
}

const mockData: OrderRecord[] = Array.from({ length: 20 }, (_, i) => ({
  key: String(i + 1),
  id: `ORD-2024${String(i + 1).padStart(3, '0')}`,
  user: ['张三', '李四', '王五', '赵六', '陈七', '周八'][i % 6],
  package: ['企业高级版', '专业版', '基础版'][i % 3],
  amount: [3600, 1200, 360][i % 3],
  status: (['已完成', '进行中', '待支付', '已取消'] as const)[i % 4],
  createdAt: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
}))

const columns: TableColumnsType<OrderRecord> = [
  { title: '订单号', dataIndex: 'id', key: 'id', width: 160 },
  { title: '用户', dataIndex: 'user', key: 'user', width: 100 },
  { title: '套餐', dataIndex: 'package', key: 'package' },
  {
    title: '金额',
    dataIndex: 'amount',
    key: 'amount',
    width: 120,
    render: (v: number) => `¥${v.toLocaleString()}`,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (s: string) => <Tag color={statusColorMap[s]}>{s}</Tag>,
  },
  { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', width: 140 },
  {
    title: '操作',
    key: 'action',
    width: 120,
    render: () => (
      <Space>
        <Button type="link" size="small">
          详情
        </Button>
        <Button type="link" size="small" danger>
          删除
        </Button>
      </Space>
    ),
  },
]

const Orders = () => {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>订单管理</h2>
          <p className={styles.pageDesc}>管理所有用户订单信息</p>
        </div>
        <AppButton type="primary" icon={<PlusOutlined />}>
          新建订单
        </AppButton>
      </div>

      <div className={styles.toolbar}>
        <Input
          placeholder="搜索订单号 / 用户名"
          prefix={<SearchOutlined />}
          className={styles.search}
        />
        <Button icon={<ReloadOutlined />}>刷新</Button>
      </div>

      <div className={styles.tableWrap}>
        <Table
          columns={columns}
          dataSource={mockData}
          pagination={{ pageSize: 10, showSizeChanger: false }}
          size="middle"
        />
      </div>
    </div>
  )
}

export default Orders
