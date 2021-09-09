import styled, { css } from "styled-components"
import SearchBox from "./search-box"

const open = css`
  width: 10em;
  background: transparent;
  cursor: text;
  margin-left: -1.6em;
  padding-left: 1.6em;
  visibility: visible;
  padding-top: 5px;

  .dark & {
    color: white;
  }
`

const closed = css`
  width: 0;
  cursor: pointer;
  margin-top: -3px;
  margin-left: -2em;
  padding-left: 2em;
  margin-right: -1em;
  padding-right: 1em;
`

export default styled(SearchBox)`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  align-self: center;
  max-height: 35px;

  .SearchInput {
    display: inline-block;
    outline: none;
    border: ${({ hasFocus }) => (hasFocus ? "auto" : "none")};
    transition: 100ms;
    color: ${({ theme }) => theme.foreground};
    ::placeholder {
      color: ${({ theme }) => theme.faded};
    }
    ${({ hasFocus }) => (hasFocus ? open : closed)}

    .dark & {
      color: white;
    }
  }
`
