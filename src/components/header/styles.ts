import styled from 'styled-components'

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 0;
  border-bottom: ${({ lookAndFeel, theme }) =>
    `1px solid ${lookAndFeel.headBorderColor || theme.BORDER}`};

  button {
    cursor: pointer;
    color: ${({ lookAndFeel }) => lookAndFeel.headTitleColor};
    background: ${({ lookAndFeel }) =>
      lookAndFeel.headBtnColor || 'transparent'};
  }
`

export { StyledHeader }
