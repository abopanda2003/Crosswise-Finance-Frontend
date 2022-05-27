import styled from 'styled-components'

export const CardHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid #c4c4c416;
  padding: 1rem 2rem;
`

export const CardBody = styled.div`
  width: 100%;
  padding: 1rem 2rem;
`

export const StyledTD = styled.td`
  padding: 1rem 0;
`
export const StyledTH = styled.th<{ align?: string }>`
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.04em;
  text-transform: capitalize;
  padding: 1rem 0;
  color: ${({ theme }) => theme.colors.primaryGray};
`
