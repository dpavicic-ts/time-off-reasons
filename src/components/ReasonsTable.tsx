import { Table } from 'antd'
import React from 'react'
import { TimeOffReason } from '../types'

interface Props {
  reasons: TimeOffReason[]
  onEdit: (reason: TimeOffReason) => void
  onDelete: (reason: TimeOffReason) => void
}

export function ReasonsTable({ reasons, onEdit, onDelete }: Props) {
  return (
    <Table dataSource={reasons} rowKey={reason => reason.id}>
      <Table.Column title="Name" dataIndex="name" />
      <Table.Column title="Type" dataIndex="type" />
      <Table.Column
        title="Action"
        render={reason => (
          <div>
            <button onClick={() => onEdit(reason)}>Edit</button>
            <button onClick={() => onDelete(reason)}>Delete</button>
          </div>
        )}
      />
    </Table>
  )
}
