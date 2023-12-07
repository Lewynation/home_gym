import React from 'react'

type navigationElementsProps = {
    title: string;
}

const NavigationElement:React.FC<navigationElementsProps> = ({ title}) => {
  return (
      <div>{ title}</div>
  )
}

export default NavigationElement