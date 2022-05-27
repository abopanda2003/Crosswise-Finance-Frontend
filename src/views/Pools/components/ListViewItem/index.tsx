import React, { useState } from 'react'

import { Button, Text } from '@crosswise/uikit'
import { useWeb3React } from '@web3-react/core'
import { useThemeManager } from 'state/user/hooks'
import { useTranslation } from 'contexts/Localization'
import { Pool } from 'state/types'
import { IconLinkTo } from 'components/SvgIcons'
import QuestionHelper from 'components/QuestionHelper'
import {
  Container,
  ContentContainer,
  InfoContainer,
  LinksSection,
  EarnedContainer,
  WithdrawBtnSection,
  BlankLink,
  ResponsiveTextBox,
  EarnedBox,
  Divider,
  OverViewContainer,
  BlankFlex,
  MainOverViewContainer,
  OverViewItem,
  FlexText,
} from './styled'
import Header from './Header'

const ListViewItem: React.FC<{ pool: Pool }> = (props) => {
  const { pool } = props
  // const { sousId, stakingToken, earningToken, isFinished, userData } = pool
  const { stakingToken, earningToken } = pool
  const { account } = useWeb3React()
  const [isDark] = useThemeManager()
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)

  const handleToggleExpand = () => {
    setExpanded((prev) => {
      return !prev
    })
  }

  return (
    <Container isDarkTheme={isDark}>
      <Header expanded={expanded} toggle={handleToggleExpand} pool={pool} />

      {/* Main content of card */}
      {!!account && (
        <ContentContainer expanded={expanded}>
          <OverViewContainer>
            <BlankFlex />
            <MainOverViewContainer>
              <OverViewItem>
                <Text color="primaryGray" fontSize="13px" fontWeight="600">
                  {t('Start Date')}
                </Text>
                <Text>01/03/2022</Text>
              </OverViewItem>
              <OverViewItem>
                <FlexText>
                  <Text color="primaryGray" fontSize="13px" fontWeight="600">
                    {t('Duration')}
                  </Text>
                  <QuestionHelper text="This is question helper" />
                </FlexText>
                <Text>30 Days</Text>
              </OverViewItem>
              <OverViewItem alignItems="flex-end">
                <Text color="primaryGray" fontSize="13px" fontWeight="600">
                  {t('Time To Unlock')}
                </Text>
                <Text>30 Days</Text>
              </OverViewItem>
              <OverViewItem alignItems="center">
                <Text color="primaryGray" fontSize="13px" fontWeight="600">
                  {t('Start Thinking')}
                </Text>
                <Button variant={!isDark ? 'secondaryGradient' : 'primaryGradient'} style={{ width: '150px' }}>
                  {t('Start staking')}
                </Button>
              </OverViewItem>
            </MainOverViewContainer>
          </OverViewContainer>

          <InfoContainer>
            <LinksSection>
              <ResponsiveTextBox fSize="13px">
                {t('View Token Info')}
                <BlankLink href="https://google.com" target="_blank">
                  <IconLinkTo />
                </BlankLink>
              </ResponsiveTextBox>
              <ResponsiveTextBox fSize="13px" mt="5px">
                {t('View Token Site')}
                <BlankLink href="https://google.com" target="_blank">
                  <IconLinkTo />
                </BlankLink>
              </ResponsiveTextBox>
              <ResponsiveTextBox fSize="13px" mt="5px">
                {t('View Token Contract')}
                <BlankLink href="https://google.com" target="_blank">
                  <IconLinkTo />
                </BlankLink>
              </ResponsiveTextBox>
            </LinksSection>

            <EarnedContainer isDarkTheme={isDark}>
              <EarnedBox>
                <Text color="#04F8AD" fontWeight="600" fontSize="13px" letterSpacing="0.4px" textTransform="uppercase">
                  {t('$CRSS Earned')}
                </Text>
                <Text bold mt="15px">
                  3,100
                </Text>
                <Text color="primaryGray" fontSize="13px" mt="15px">
                  {t('~ 3,100 USD')}
                </Text>
              </EarnedBox>

              <Divider />

              <EarnedBox>
                <Text color="#04F8AD" fontWeight="600" fontSize="13px" letterSpacing="0.4px" textTransform="uppercase">
                  {t('$XCRSS Earned')}
                </Text>
                <Text bold mt="15px">
                  3,100
                </Text>
                <Text color="primaryGray" fontSize="13px" mt="15px">
                  {t('~ 3,100 USD')}
                </Text>
              </EarnedBox>
            </EarnedContainer>

            <WithdrawBtnSection>
              <Button variant={!isDark ? 'secondaryGradient' : 'primaryGradient'} style={{ width: '150px' }}>
                {t('Withdraw')}
              </Button>
            </WithdrawBtnSection>
          </InfoContainer>
        </ContentContainer>
      )}
      {/* End of Main content */}
    </Container>
  )
}

export default ListViewItem
