import React from 'react'

const UrlInput = ({type,style,urlref,placeholder}) => {
  return (
    
      <input type={type} className={style} ref={urlref} placeholder={placeholder} />
   
  )
}

export default UrlInput
