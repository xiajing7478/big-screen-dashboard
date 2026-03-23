import { Table, Tag, Button, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { TableColumnsType } from 'antd'
import styles from './index.module.less'

interface PackageRecord {
  key: string
  id: string
  name: string
  price: number
  duration: string
  features: string[]
  status: '上架' | '下架'
}

const mockData: PackageRecord[] = [
  {
    key: '1',
    id: 'PKG-001',
    name: '基础版',
    price: 360,
    duration: '1年',
    features: ['基础功能', '5用户', '10GB存储'],
    status: '上架',
  },
  {
    key: '2',
    id: 'PKG-002',
    name: '专业版',
    price: 1200,
    duration: '1年',
    features: ['全部功能', '20用户', '100GB存储', '优先支持'],
    status: '上架',
  },
  {
    key: '3',
    id: 'PKG-003',
    name: '企业高级版',
    price: 3600,
    duration: '1年',
    features: ['全部功能', '不限用户', '1TB存储', '专属支持', 'API接入'],
    status: '上架',
  },
  {
    key: '4',
    id: 'PKG-004',
    name: '试用版',
    price: 0,
    duration: '30天',
    features: ['基础功能', '3用户', '1GB存储'],
    status: '下架',
  },
]

const columns: TableColumnsType<PackageRecord> = [
  { title: '套餐ID', dataIndex: 'id', key: 'id', width: 120 },
  { title: '套餐名称', dataIndex: 'name', key: 'name', width: 140 },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    width: 120,
    render: (v: number) => (v === 0 ? '免费' : `¥${v.toLocaleString()}/年`),
  },
  { title: '时长', dataIndex: 'duration', key: 'duration', width: 100 },
  {
    title: '包含功能',
    dataIndex: 'features',
    key: 'features',
    render: (features: string[]) => (
      <Space wrap>
        {features.map((f) => (
          <Tag key={f} color="blue" style={{ fontSize: 12 }}>
            {f}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 90,
    render: (s: string) => <Tag color={s === '上架' ? 'success' : 'default'}>{s}</Tag>,
  },
  {
    title: '操作',
    key: 'action',
    width: 140,
    render: () => (
      <Space>
        <Button type="link" size="small">
          编辑
        </Button>
        <Button type="link" size="small">
          下架
        </Button>
        <Button type="link" size="small" danger>
          删除
        </Button>
      </Space>
    ),
  },
]

const Packages = () => {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>套餐管理</h2>
          <p className={styles.pageDesc}>配置和管理平台套餐信息</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />}>
          新增套餐
        </Button>
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

export default Packages
