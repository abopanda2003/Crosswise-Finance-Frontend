import React, { useEffect } from 'react'
import { Heading, Modal } from '@crosswise/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import { delay } from 'lodash'
import confetti from 'canvas-confetti'
import { LotteryTicketClaimData } from 'config/constants/types'
import { useAppDispatch } from 'state'
import { useLottery } from 'state/lottery/hooks'
import { fetchUserLotteries } from 'state/lottery'
import ClaimPrizesInner from './ClaimPrizesInner'
import { StyledModal, StyledModalHeader, BunnyDecoration } from './styled'

const showConfetti = () => {
  confetti({
    resize: true,
    particleCount: 200,
    startVelocity: 30,
    gravity: 0.5,
    spread: 350,
    origin: {
      x: 0.5,
      y: 0.3,
    },
  })
}

interface ClaimPrizesModalModalProps {
  roundsToClaim: LotteryTicketClaimData[]
  onDismiss?: () => void
}

const ClaimPrizesModal: React.FC<ClaimPrizesModalModalProps> = ({ onDismiss, roundsToClaim }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { currentLotteryId } = useLottery()
  const dispatch = useAppDispatch()

  useEffect(() => {
    delay(showConfetti, 100)
  }, [])

  return (
    <Modal title={t('Collect Winnings')} minWidth="280px" onDismiss={onDismiss}>
      <BunnyDecoration>
        <img src="/images/decorations/prize-bunny.png" alt="bunny decoration" height="124px" width="168px" />
      </BunnyDecoration>
      <ClaimPrizesInner
        onSuccess={() => {
          dispatch(fetchUserLotteries({ account, currentLotteryId }))
          onDismiss()
        }}
        roundsToClaim={roundsToClaim}
      />
    </Modal>
  )
}

export default ClaimPrizesModal
