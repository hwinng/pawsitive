import React from 'react'
import styled from 'styled-components'

const PageHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #d3d3d3;
`
const PageTitle = styled.h3`
  margin-bottom: 0;
`
const Buttons = styled.div`
  display: flex;
  column-gap: 1rem;
`

type PageHeaderProps = {
  title: string
  children?: JSX.Element | JSX.Element[]
}
const PageHeader: React.FC<PageHeaderProps> = ({ title, children }) => {
  return (
    <PageHeaderWrapper>
      <PageTitle>{title}</PageTitle>
      <Buttons>
        {React.Children.map(children, (child: any) => {
          return typeof child.type === 'string'
            ? child
            : React.cloneElement(child)
        })}
      </Buttons>
    </PageHeaderWrapper>
  )
}

export default PageHeader
