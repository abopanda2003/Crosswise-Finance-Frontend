import React, { useEffect, useState, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { Modal, Flex } from '@crosswise/uikit'

export const StyledModal = styled(Modal)`
  min-width: 280px;
  max-width: 320px;
`

export const ShortcutButtonsWrapper = styled(Flex)<{ isVisible: boolean }>`
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 24px;
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
`
