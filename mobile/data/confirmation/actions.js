export const DISPLAY_CONFIRMATION = 'confirmation/display'
export const DISMISS_CONFIRMATION = 'confirmation/dismiss'

export const displayConfirmation = (title, text) => ({
  type: DISPLAY_CONFIRMATION,
  title,
  text,
})

export const dismissConfirmation = (confirmed) => ({
  type: DISMISS_CONFIRMATION,
  confirmed,
})
