import React from 'react'
import { Box, Flex } from '@crosswise/uikit'
import HarvestCard from './HarvestCard'
import UserDetail from './UserDetail'
import { StyledCard } from './styled'

const UserBanner = () => {
  return (
    <StyledCard>
      <Box p={['16px', null, null, '24px']}>
        <Flex alignItems="center" justifyContent="center" flexDirection={['column', null, null, 'row']}>
          <Flex flex="1" mr={[null, null, null, '32px']}>
            <UserDetail />
          </Flex>
          <Flex flex="1" width={['100%', null, 'auto']}>
            <HarvestCard />
          </Flex>
        </Flex>
      </Box>
    </StyledCard>
  )
}

export default UserBanner
