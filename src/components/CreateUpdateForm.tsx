import React from 'react'

export function CreateUpdateForm() {
  return (
    <form action="/" method="post">
      <div>
        <label htmlFor="reasonName">Name</label>
        <input id="reasonName" type="text" placeholder="For ex.: Call Out" />
      </div>
      <div>
        <label htmlFor="reasonType">Type</label>
        <select id="reasonType">
          <option>Planned</option>
          <option>Unplanned</option>
        </select>
      </div>
      <div>
        <button type="reset">Cancel</button>
        <button type="submit">Add Reason</button>
      </div>
    </form>
  )
}
