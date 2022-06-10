import styled from 'styled-components'

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 0;
  font-weight: bold;
  color: ${({ lookAndFeel: { colors } }) => colors.headTitleColor};
  button {
    cursor: pointer;
    background: ${({ lookAndFeel: { colors } }) =>
      colors.headBtnColor || 'transparent'};
  }
`

export { StyledHeader }
// border-bottom: ${({ colors, theme }) =>
//   `1px solid ${colors.headBorderColor || theme.BORDER}`};

// font-family: ${({ lookAndFeel: { fontFamily = 'iranyekan' } }) =>
// fontFamily};
