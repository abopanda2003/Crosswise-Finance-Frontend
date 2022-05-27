import React, { useState } from 'react'

import { ExpandableButton, Flex, Text } from '@crosswise/uikit'
import { useThemeManager } from 'state/user/hooks'
import { Pool } from 'state/types'
import { TokenPairImage } from 'components/TokenImage'
import MultiplierTag from 'components/MultiplierTag'

import { Container, TitleBox } from './styled'

interface HeaderProps {
  pool: Pool
  // earningToken: Token
  // stakingToken: Token
}

const Header: React.FC<HeaderProps> = (props) => {
  const { pool } = props
  const { earningToken, stakingToken } = pool
  const [isDark] = useThemeManager()
  const [toggleExpanded, setToggleExpanded] = useState(false)

  const onToggleExpanded = () => {
    setToggleExpanded((prev) => {
      return !prev
    })
  }

  return (
    <Container>
      <TitleBox>
        <TokenPairImage
          style={{ width: '40px' }}
          primaryToken={earningToken}
          secondaryToken={stakingToken}
          width={64}
          height={64}
        />
        <Flex justifyContent="center">
          <Text bold color="white" gradient={isDark ? undefined : 'btngradprimary'}>
            {earningToken.symbol}-{stakingToken.symbol}
          </Text>
        </Flex>
        <MultiplierTag multiValue="40X" />
      </TitleBox>

      <ExpandableButton direction={toggleExpanded ? 'up' : 'down'} onClick={onToggleExpanded} />
    </Container>
  )
}

export default Header
