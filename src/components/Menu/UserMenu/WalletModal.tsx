import React, { useState } from 'react'
// import { ButtonMenu, ButtonMenuItem, Heading, IconButton, Modal } from '@crosswise/uikit'
import { ButtonMenu, ButtonMenuItem, Modal } from '@crosswise/uikit'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { FetchStatus, useGetBnbBalance } from 'hooks/useTokenBalance'
import WalletInfo from './WalletInfo'
import WalletTransactions from './WalletTransactions'
import { WalletView } from './enums'
import { WalletModalProps } from './interfaces'
import { Tabs, WalletModalBody } from './styled'

export const LOW_BNB_BALANCE = new BigNumber('2000000000') // 2 Gwei

const WalletModal: React.FC<WalletModalProps> = ({ initialView = WalletView.WALLET_INFO, onDismiss }) => {
  const [view, setView] = useState(initialView)
  const { t } = useTranslation()
  const { balance, fetchStatus } = useGetBnbBalance()
  const hasLowBnbBalance = fetchStatus === FetchStatus.SUCCESS && balance.lte(LOW_BNB_BALANCE)

  const handleClick = (newIndex: number) => {
    setView(newIndex)
  }

  return (
    <Modal title={t('Your Wallet')} minWidth="320px" maxWidth="400px" width="100%" onDismiss={onDismiss}>
      <Tabs>
        <ButtonMenu scale="sm" variant="subtle" onItemClick={handleClick} activeIndex={view} fullWidth>
          <ButtonMenuItem>{t('Wallet')}</ButtonMenuItem>
          <ButtonMenuItem>{t('Transactions')}</ButtonMenuItem>
        </ButtonMenu>
      </Tabs>
      <WalletModalBody>
        {view === WalletView.WALLET_INFO && <WalletInfo hasLowBnbBalance={hasLowBnbBalance} onDismiss={onDismiss} />}
        {view === WalletView.TRANSACTIONS && <WalletTransactions />}
      </WalletModalBody>
    </Modal>
  )
}

export default WalletModal
