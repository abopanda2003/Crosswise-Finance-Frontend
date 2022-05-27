import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { NoProfileAvatarIcon, Flex, Heading, Skeleton, Text, Box } from '@crosswise/uikit'
import { useProfile } from 'state/profile/hooks'
import ProfileAvatar from 'views/Profile/components/ProfileAvatar'
import { useTranslation } from 'contexts/Localization'
import truncateWalletAddress from 'utils/truncateWalletAddress'
import { Desktop, Mobile, Sticker, StyledNoProfileAvatarIcon } from './styled'

const UserDetail = () => {
  const { profile, isLoading } = useProfile()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const truncatedAddress = truncateWalletAddress(account)

  const getDesktopHeading = () => {
    if (profile) {
      return <Heading scale="xl">{t('Hi, %userName%!', { userName: profile.username })}</Heading>
    }
    if (isLoading && !profile) {
      return <Skeleton width={200} height={40} my="4px" />
    }
    return <></>
  }

  const getMobileHeading = () => {
    if (profile) {
      return (
        <Heading mb="18px" textAlign="center">
          {t('Hi, %userName%!', { userName: profile.username })}
        </Heading>
      )
    }
    if (isLoading && !profile) {
      return <Skeleton width={120} height={20} mt="2px" mb="18px" />
    }
    return <></>
  }

  return (
    <>
      <Desktop>
        <Box mr="24px">
          <Sticker>{profile ? <ProfileAvatar profile={profile} /> : <StyledNoProfileAvatarIcon />}</Sticker>
        </Box>
        <Flex flexDirection="column">
          {getDesktopHeading()}
          {isLoading || !account ? (
            <Skeleton width={160} height={16} my="4px" />
          ) : (
            <Text fontSize="16px"> {t('Connected with %address%', { address: truncatedAddress })}</Text>
          )}
        </Flex>
      </Desktop>
      <Mobile>{getMobileHeading()}</Mobile>
    </>
  )
}

export default UserDetail
