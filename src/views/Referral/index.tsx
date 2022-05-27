import React, { useState } from 'react'
// import { useWeb3React } from '@web3-react/core'
import { Flex, useMatchBreakpoints } from '@crosswise/uikit'
import { useThemeManager } from 'state/user/hooks'
import { AutoColumn } from 'components/Layout/Column'
// import Page from 'components/Layout/Page'
// import { BaseLayout, Heading, Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
// import ConnectWalletButton from 'components/ConnectWalletButton'
import { IconQuestionTag } from 'components/SvgIcons'
import { TextBox, ThemeText, Texter } from 'components/Texts'
// import TotalCard from './components/TotalCard'
// import CommissionsCard from './components/CommissionsCard'
// import ProgramCard from './components/ProgramCard'

import {
  // StyledCenter,
  StyledPage,
  // CardsRow,
  Label,
  ResponsiveHeading,
  ReferralCardWrapper,
  ReferralCard,
  ReferralCardMainInfo,
  ReferralCardIconWrapper,
  ReferralCardIcon,
  ReferralLinkContainer,
  ReferralLinkTitle,
  ReferralUrlContainer,
  StyledIconCopy,
  DropDownIcon,
  ReferralDetailInfo,
  ReferralStatsContainer,
  ReferralStatsItem,
  Divider,
  ReferralClaimButton,
} from './styled'

const Home: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  // const { account } = useWeb3React()
  const { t } = useTranslation()
  const [isDark] = useThemeManager()
  const { isXs, isSm } = useMatchBreakpoints()

  const isMobile = isXs || isSm

  return (
    <>
      <StyledPage>
        <AutoColumn justify="flex-start">
          <ResponsiveHeading
            as="h1"
            scale="xxl"
            mb="24px"
            color="text"
            style={{ fontSize: isMobile ? '64px' : '76px' }}
          >
            {/* {t('Crosswise Referral Program')} */}
            Referrals
          </ResponsiveHeading>
          <Label color={isDark ? '#fff' : '#060514'} fontSize={isMobile ? '16px' : '26px'}>
            {t(
              "Share the referral link below to invite your users and earn 1% of the referred user's earnings FOREVER!",
            )}
          </Label>
        </AutoColumn>
        <ReferralCardWrapper>
          <ReferralCard>
            <ReferralCardMainInfo onClick={() => setIsExpanded(!isExpanded)}>
              <ReferralCardIconWrapper>
                <ReferralCardIcon /> Referrals
              </ReferralCardIconWrapper>
              <ReferralLinkContainer>
                <ReferralLinkTitle>
                  Your Link <IconQuestionTag />
                </ReferralLinkTitle>
                <ReferralUrlContainer>
                  https://crosswise.com/?ref=adsf51a632safd21fad5fs2f0xdf1asaflsjhaf84975n
                  <StyledIconCopy
                    stroke={isDark ? '#fff' : '#060514'}
                    fill={isDark ? '#fff' : '#060514'}
                    onClick={() =>
                      navigator.clipboard.writeText(
                        'https://crosswise.com/?ref=adsf51a632safd21fad5fs2f0xdf1asaflsjhaf84975n',
                      )
                    }
                  />
                </ReferralUrlContainer>
              </ReferralLinkContainer>
            </ReferralCardMainInfo>
            <ReferralDetailInfo expanded={isExpanded}>
              <div />
              <ReferralStatsContainer>
                <ReferralStatsItem>
                  <TextBox fSize="17px" letterSpacing="0.4px" color={isDark ? '#04F8AD' : '#00b8b9'}>
                    Total Number Of Invites
                  </TextBox>
                  <Texter bold mt="15px" fSize="23px">
                    192
                  </Texter>
                </ReferralStatsItem>
                <Divider />
                <ReferralStatsItem>
                  <TextBox fSize="17px" letterSpacing="0.4px" color={isDark ? '#04F8AD' : '#00b8b9'}>
                    Referral Commissions
                  </TextBox>
                  <Texter bold mt="15px" fSize="23px">
                    285.000.000
                  </Texter>
                  <ThemeText mt="18px" isDarkTheme={isDark} colors={['#E0E0FF', '#7A8596']} fSize="16px">
                    {t('~ 3,100 USD')}
                  </ThemeText>
                </ReferralStatsItem>
              </ReferralStatsContainer>
              <Flex justifyContent="center" alignItems="center">
                <ReferralClaimButton>Claim Referral Commissions</ReferralClaimButton>
              </Flex>
            </ReferralDetailInfo>
          </ReferralCard>
          {/* <DropDownIcon onClick={() => setIsExpanded(!isExpanded)} /> */}
          <DropDownIcon />
        </ReferralCardWrapper>
        {/* <CardsRow>
          <TotalCard />
          <CommissionsCard />
        </CardsRow>
        {account !== undefined ? (
          <>
            <ProgramCard />
          </>
        ) : (
          <StyledCenter>
            <ConnectWalletButton variant="primaryGradient" btnString="Unlock Wallet" />
          </StyledCenter>
        )} */}
      </StyledPage>
    </>
  )
}

export default Home
