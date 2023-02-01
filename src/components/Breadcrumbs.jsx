import React, { useState, useEffect } from 'react'

function Breadcrumbs({parents}) {

  return (
    <div>   
    {parents.map(item => (
        <p key={item.id}>{item.title}</p>
    ))}
    
    </div>
  )
}

export default Breadcrumbs