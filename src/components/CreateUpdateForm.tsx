import { Button, Form, Input, Select } from 'antd'
import React from 'react'

export function CreateUpdateForm() {
  return (
    <Form action="/" method="post">
      <Form.Item label="Name" htmlFor="reasonName">
        <Input id="reasonName" type="text" placeholder="For ex.: Call Out" />
      </Form.Item>
      <Form.Item label="Type" htmlFor="reasonType">
        <Select id="reasonType" value="planned">
          <Select.Option value="planned">Planned</Select.Option>
          <Select.Option value="unplanned">Unplanned</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button htmlType="reset">Cancel</Button>
        <Button htmlType="submit" type="primary">
          Add Reason
        </Button>
      </Form.Item>
    </Form>
  )
}
