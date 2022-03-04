import { Button, Table } from 'antd'
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
          <>
            <Button onClick={() => onEdit(reason)}>Edit</Button>{' '}
            <Button danger onClick={() => onDelete(reason)} aria-label="Delete">
              &#10006;
            </Button>
          </>
        )}
      />
    </Table>
  )
}
