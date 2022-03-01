import { Button, Form, Input, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { CreateUpdateTimeOffReason, TimeOffReason } from '../types'

interface Props {
  reason: TimeOffReason | null
  onSave?: (reason: CreateUpdateTimeOffReason) => void
  onCancel?: (reason: CreateUpdateTimeOffReason | null) => void
}

export function CreateUpdateForm({ reason, onSave = () => {}, onCancel = () => {} }: Props) {
  const [name, setName] = useState(reason?.name ?? '')
  const [type, setType] = useState<'planned' | 'unplanned'>(reason?.type ?? 'planned')

  const isEdit = reason != null

  useEffect(() => {
    setName(reason?.name ?? '')
    setType(reason?.type ?? 'planned')
  }, [reason])

  return (
    <Form action="/" method="post">
      <Form.Item label="Name" htmlFor="reasonName">
        <Input
          id="reasonName"
          type="text"
          placeholder="For ex.: Call Out"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Type" htmlFor="reasonType">
        <Select id="reasonType" value={type} onChange={value => setType(value)}>
          <Select.Option value="planned">Planned</Select.Option>
          <Select.Option value="unplanned">Unplanned</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button htmlType="reset" onClick={() => onCancel(reason)}>
          Cancel
        </Button>
        <Button
          htmlType="button"
          type="primary"
          onClick={() => {
            onSave(isEdit ? { ...reason, name, type } : { name, type })
          }}
        >
          {isEdit ? 'Edit' : 'Add'} Reason
        </Button>
      </Form.Item>
    </Form>
  )
}
