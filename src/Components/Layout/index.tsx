import React from 'react'
import styled from 'styled-components'
import { WHITE } from '../../Services/constants'
import { LayoutProps } from './Layout.types'

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <Container>{children} </Container>
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${WHITE};
  font-family: 'Roboto', sans-serif;
  height: 100vh;
  width: 100%;
`

export default Layout
