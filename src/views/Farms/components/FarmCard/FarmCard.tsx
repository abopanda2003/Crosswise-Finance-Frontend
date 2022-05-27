import React from 'react'
import BigNumber from 'bignumber.js'
import { Text, Skeleton } from '@crosswise/uikit'
import { Farm } from 'state/types'
import { useThemeManager } from 'state/user/hooks'
import { getBscScanLink } from 'utils'
import useTheme from 'hooks/useTheme'
// import { useTranslation } from 'contexts/Localization'
// import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { getAddress } from 'utils/addressHelpers'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'
import {
  StyledCard,
  FarmCardInnerContainer,
  // DetailToggleButton,
  LabelNameText,
  BalanceContainerWrapper,
  BalanceItem,
  EarningsWrapper,
  HorizontalDivider,
} from './styled'
import BalanceContainer from './BalanceContainer'

export interface FarmWithStakedValue extends Farm {
  apr?: number
  lpRewardsApr?: number
  liquidity?: BigNumber
  depositFee?: string
}

interface FarmCardProps {
  farm: FarmWithStakedValue
  displayApr: string
  removed: boolean
  crssPrice?: BigNumber
  account?: string
  index?: number
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, displayApr, removed, crssPrice, account, index }) => {
  // const { t } = useTranslation()
  const { theme } = useTheme()

  const [isDark] = useThemeManager()
  // const [showExpandableSection, setShowExpandableSection] = useState(false)

  // const clickDetailToggleButton = () => {
  //   setShowExpandableSection(!showExpandableSection)
  // }

  const totalValueFormatted =
    farm.liquidity && farm.liquidity.gt(0)
      ? `$${farm.liquidity.toNumber().toLocaleString(undefined, { maximumFractionDigits: 0 })}`
      : ''

  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('CROSSWISE', '')
  // const earnLabel = farm.dual ? farm.dual.earnLabel : t('CRSS')

  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: farm.quoteToken.address,
    tokenAddress: farm.token.address,
  })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`
  const lpAddress = getAddress(farm.lpAddresses)
  const isPromotedFarm = farm.token.symbol === 'CRSS'

  return (
    <StyledCard
      index={index}
      isActive={isPromotedFarm}
      background={
        theme.isDark // #091713
          ? 'linear-gradient(90deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 45.83%, rgba(255, 255, 255, 0) 100%), #25272C'
          : '#FFF'
      }
    >
      <DetailsSection
        removed={removed}
        bscScanAddress={getBscScanLink(lpAddress, 'address')}
        infoAddress={`https://app.crosswise.finance/pool/${lpAddress}`}
        totalValueFormatted={totalValueFormatted}
        lpLabel={lpLabel}
        addLiquidityUrl={addLiquidityUrl}
        // expanded={showExpandableSection}
      />

      <FarmCardInnerContainer>
        <CardHeading
          lpLabel={lpLabel}
          multiplier={farm.multiplier}
          isCommunityFarm={farm.isCommunity}
          token={farm.token}
          quoteToken={farm.quoteToken}
        />
        <HorizontalDivider />
        <BalanceContainerWrapper>
          {/* <BalanceItem>
            <LabelNameText color="#BFC8DA">DEPOSIT FEE</LabelNameText>
            <Text bold>{farm.depositFee ? <Text>{farm.depositFee}</Text> : <Skeleton height={24} />}</Text>
          </BalanceItem> */}
          <BalanceItem alignItems="flex-start">
            <LabelNameText color={isDark ? '#BFC8DA' : '#7a8596'}>Total Liquidity</LabelNameText>
            <Text bold color={isDark ? '#fff' : '#060514'}>
              $285,454,728
            </Text>
          </BalanceItem>
          {!removed && (
            <BalanceItem alignItems="flex-start">
              <LabelNameText color={isDark ? '#BFC8DA' : '#7a8596'}>
                Apr
                <ApyButton
                  lpLabel={lpLabel}
                  addLiquidityUrl={addLiquidityUrl}
                  crssPrice={crssPrice}
                  apr={farm.apr}
                  displayApr={displayApr}
                />
              </LabelNameText>
              <Text bold style={{ display: 'flex', alignItems: 'baseline' }}>
                {farm.apr ? (
                  <Text color={displayApr ? 'textSecondary' : ''} style={{ marginLeft: 5 }}>
                    {displayApr}%
                  </Text>
                ) : (
                  <Skeleton height={24} width={80} />
                )}
              </Text>
            </BalanceItem>
          )}
          <BalanceItem alignItems="flex-end">
            <LabelNameText color={isDark ? '#BFC8DA' : '#7a8596'}>Staked</LabelNameText>
            <Text bold textAlign="right">
              <Text color={isDark ? '#fff' : '#060514'}>2854 CRSS</Text>
              <Text fontSize="14px" color={isDark ? '#BFC8DA' : '#7a8596'}>
                ~ 6,200 USD
              </Text>
            </Text>
          </BalanceItem>
          {/* <BalanceItem>
            <LabelNameText color="#BFC8DA">{t('Total staked')}</LabelNameText>
            <Text bold textAlign="right">
              {totalValueFormatted ? (
                <>
                  <Text>{totalValueFormatted}</Text>
                  <Text fontSize="14px" color="#BFC8DA">{`~ ${totalValueFormatted} USD`}</Text>
                </>
              ) : (
                <Skeleton height={24} />
              )}
            </Text>
          </BalanceItem> */}
          {/* <BalanceItem>
            <LabelNameText>{t('Earn')}</LabelNameText>
            <Text bold>{earnLabel}</Text>
          </BalanceItem>
           */}
        </BalanceContainerWrapper>
        {/* <Divider height={20} /> */}
        <EarningsWrapper>
          <BalanceContainer farm={farm} account={account} />
        </EarningsWrapper>
        <CardActionsContainer farm={farm} account={account} addLiquidityUrl={addLiquidityUrl} />
      </FarmCardInnerContainer>

      {/* <DetailToggleButton onClick={clickDetailToggleButton} expanded={showExpandableSection}>
        <ArrowBackIcon />
      </DetailToggleButton> */}
    </StyledCard>
  )
}

export default FarmCard
