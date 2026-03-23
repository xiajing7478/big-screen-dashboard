import { Table, Tag, Button, Space, Progress } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { TableColumnsType } from 'antd'
import styles from './index.module.less'

interface PlanRecord {
  key: string
  id: string
  name: string
  startDate: string
  endDate: string
  progress: number
  status: '进行中' | '已完成' | '未开始' | '已暂停'
  owner: string
}

const mockData: PlanRecord[] = [
  {
    key: '1',
    id: 'PLN-001',
    name: 'Q1 推广计划',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    progress: 100,
    status: '已完成',
    owner: '张三',
  },
  {
    key: '2',
    id: 'PLN-002',
    name: 'Q2 用户增长计划',
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    progress: 68,
    status: '进行中',
    owner: '李四',
  },
  {
    key: '3',
    id: 'PLN-003',
    name: '产品迭代 v2.0',
    startDate: '2024-05-01',
    endDate: '2024-08-31',
    progress: 35,
    status: '进行中',
    owner: '王五',
  },
  {
    key: '4',
    id: 'PLN-004',
    name: 'Q3 营销计划',
    startDate: '2024-07-01',
    endDate: '2024-09-30',
    progress: 0,
    status: '未开始',
    owner: '赵六',
  },
  {
    key: '5',
    id: 'PLN-005',
    name: '数据迁移专项',
    startDate: '2024-03-01',
    endDate: '2024-05-31',
    progress: 55,
    status: '已暂停',
    owner: '陈七',
  },
]

const statusColorMap: Record<string, string> = {
  进行中: 'processing',
  已完成: 'success',
  未开始: 'default',
  已暂停: 'warning',
}

const columns: TableColumnsType<PlanRecord> = [
  { title: '计划ID', dataIndex: 'id', key: 'id', width: 120 },
  { title: '计划名称', dataIndex: 'name', key: 'name' },
  { title: '负责人', dataIndex: 'owner', key: 'owner', width: 100 },
  { title: '开始时间', dataIndex: 'startDate', key: 'startDate', width: 130 },
  { title: '结束时间', dataIndex: 'endDate', key: 'endDate', width: 130 },
  {
    title: '进度',
    dataIndex: 'progress',
    key: 'progress',
    width: 160,
    render: (v: number) => (
      <Progress
        percent={v}
        size="small"
        strokeColor="var(--colorPrimary)"
        trailColor="var(--colorBorder)"
      />
    ),
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (s: string) => <Tag color={statusColorMap[s]}>{s}</Tag>,
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
          详情
        </Button>
        <Button type="link" size="small" danger>
          删除
        </Button>
      </Space>
    ),
  },
]

const Plans = () => {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>计划管理</h2>
          <p className={styles.pageDesc}>跟踪和管理各类执行计划</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />}>
          新建计划
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

export default Plans
