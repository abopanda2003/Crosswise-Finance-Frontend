import React from 'react'
import styled from 'styled-components'
import { Text, Button, HelpIcon, Link } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'

export const ButtonText = styled(Text)`
  display: none;
  ${({ theme }) => theme.mediaQueries.xs} {
    display: block;
  }
`

export const StyledLink = styled(Link)`
  margin-right: 16px;
  display: flex;
  justify-content: flex-end;

  &:hover {
    text-decoration: none;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 1;
  }
`
