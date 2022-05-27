import React, { useState } from 'react'
import { ExpandableButton, Toggle, Text, useModal } from '@crosswise/uikit'
import { useWeb3React } from '@web3-react/core'
import { useThemeManager } from 'state/user/hooks'
import { Pool } from 'state/types'
import { TokenPairImage } from 'components/TokenImage'
import { useTranslation } from 'contexts/Localization'
import SvgButton from 'components/SvgButton'
import { IconApr } from 'components/SvgIcons'
import ApyCalculatorModal from 'components/ApyCalculatorModal'
import { getAprData } from 'views/Pools/helpers'
import { getAddress } from 'utils/addressHelpers'
import {
  HeaderContainer,
  TitleBox,
  ExpandableBtnContainer,
  PairImageContainer,
  HeaderContentContainer,
  ContentItem,
  ContentItemBox,
  BtnContainer,
  FlexText,
} from './styled'

interface HeaderProps {
  toggle: any
  expanded: boolean
  performanceFee?: number
  pool: Pool
}

const Header: React.FC<HeaderProps> = (props) => {
  const { toggle, expanded, pool, performanceFee } = props
  const [isDark] = useThemeManager()
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const { stakingToken, earningToken, isFinished, apr, earningTokenPrice, isAutoVault } = pool

  const [vesting, setVesting] = useState(false)
  const [autoCom, setAutoCom] = useState(false)

  const { apr: earningsPercentageToDisplay, roundingDecimals, compoundFrequency } = getAprData(pool, performanceFee)

  const apyModalLink = stakingToken.address ? `/swap?outputCurrency=${getAddress(stakingToken.address)}` : '/swap'

  const [onOpenAprCalcModal] = useModal(
    <ApyCalculatorModal
      symbol={stakingToken.symbol}
      tokenPrice={earningTokenPrice}
      apr={apr}
      linkLabel={t('Get %symbol%', { symbol: stakingToken.symbol })}
      linkHref={apyModalLink}
      earningTokenSymbol={earningToken.symbol}
      roundingDecimals={roundingDecimals}
      compoundFrequency={compoundFrequency}
      performanceFee={performanceFee}
    />,
  )

  const onChangeVesting = () => {
    setVesting((prev) => {
      return !prev
    })
  }

  const onChangeAutoCom = () => {
    setAutoCom((prev) => {
      return !prev
    })
  }

  return (
    <HeaderContainer>
      <PairImageContainer>
        <TitleBox>
          <TokenPairImage
            style={{ width: '40px', alignItems: 'flex-start' }}
            primaryToken={earningToken}
            secondaryToken={stakingToken}
            width={64}
            height={64}
          />
          <Text bold mt="3px">
            {earningToken.symbol}-{stakingToken.symbol}
          </Text>
        </TitleBox>
      </PairImageContainer>

      <HeaderContentContainer>
        <ContentItem>
          <Text color="primaryGray" fontSize="13px" fontWeight="600">
            {t('Total Liquidity')}
          </Text>
          <Text>100000000000 CRSS</Text>
          <Text color="primaryGray" fontSize="14px">
            {t('~ 285,454,728 USD')}
          </Text>
        </ContentItem>

        <ContentItemBox>
          <ContentItem>
            <Text color="primaryGray" fontSize="13px" fontWeight="600">
              {t('APR')}
            </Text>
            <Text>65%</Text>
          </ContentItem>
          <BtnContainer>
            <SvgButton onClick={onOpenAprCalcModal}>
              <IconApr />
            </SvgButton>
          </BtnContainer>
        </ContentItemBox>

        <ContentItem alignItems="flex-end">
          <Text color="primaryGray" fontSize="13px" fontWeight="600">
            {t('Staked')}
          </Text>
          <Text>100000000000 CRSS</Text>
          <Text color="primaryGray" fontSize="14px">
            {t('~ 6,200 USD')}
          </Text>
        </ContentItem>

        <ContentItem alignItems="flex-end">
          <FlexText>
            <Text bold fontSize="11px" textTransform="uppercase" color="primaryGray">
              {t('Vesting')}
            </Text>
            <Toggle scale="sm" checked={vesting} onChange={onChangeVesting} />
          </FlexText>
          <FlexText>
            <Text bold fontSize="11px" textTransform="uppercase" color="primaryGray">
              {t('Auto-compound')}
            </Text>
            <Toggle scale="sm" checked={autoCom} onChange={onChangeAutoCom} />
          </FlexText>
        </ContentItem>
      </HeaderContentContainer>

      {!!account && (
        <ExpandableBtnContainer>
          <ExpandableButton direction={expanded ? 'up' : 'down'} onClick={toggle} />
        </ExpandableBtnContainer>
      )}
    </HeaderContainer>
  )
}

export default Header
