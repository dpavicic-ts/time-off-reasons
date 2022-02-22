import { Button, Form, Input, Select } from 'antd'
import React, { useState } from 'react'
import { CreateTimeOffReason } from '../types'

interface Props {
  onSave?: (reason: CreateTimeOffReason) => void
}

export function CreateUpdateForm({ onSave = () => {} }: Props) {
  const [name, setName] = useState('')
  const [type, setType] = useState<'planned' | 'unplanned'>('planned')

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
        <Button htmlType="reset">Cancel</Button>
        <Button
          htmlType="button"
          type="primary"
          onClick={() => {
            const reason = {
              name,
              type,
            }

            onSave(reason)
          }}
        >
          Add Reason
        </Button>
      </Form.Item>
    </Form>
  )
}
