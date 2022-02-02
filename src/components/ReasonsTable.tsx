import { Table } from 'antd'
import React from 'react'
import { TimeOffReason } from '../types'

interface Props {
  reasons: TimeOffReason[]
}

export function ReasonsTable({ reasons }: Props) {
  return (
    <Table dataSource={reasons} rowKey={reason => reason.id}>
      <Table.Column title="Name" dataIndex="name" />
      <Table.Column title="Type" dataIndex="type" />
    </Table>
  )
}
