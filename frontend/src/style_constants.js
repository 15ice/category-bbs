import styled from 'styled-components';

export const COLORS = {
  DARK_PRIMARY_BACK: '#0097A7',
  PRIMARY_BACK: '#00BCD4',
  LIGHT_PRIMARY_BACK: '#B2EBF2',
  TEXT: '#FFFFFF',
  PRIMARY_TEXT: '#212121',
  SECONDARY_TEXT: '#757575',
  DIVIDER: '#BDBDBD',
  ACCENT: '#FFC107'
}

// styled
export const DefaultMain = styled.main`
  padding: 15px;
`
export const PageTitle = styled.h1`
  font-size: 1.4rem;
  color: ${COLORS.PRIMARY_TEXT};
  border-bottom: 3px dotted ${COLORS.DARK_PRIMARY_BACK};
`
