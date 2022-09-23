import { Breadcrumb } from '@ahaui/react'
import React from 'react'

import type { BreadcrumbItemm } from '../../types/types'

type BreadcrumnbProps = {
  items: BreadcrumbItemm[]
}
const CustomBreadcrumnb: React.FC<BreadcrumnbProps> = ({ items }) => {
  return (
    <Breadcrumb style={{ marginBottom: '1rem' }}>
      {items.map((item: BreadcrumbItemm, index: number) => (
        <Breadcrumb.Item href={item.href} key={index}>
          {item.name}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}

export default CustomBreadcrumnb
