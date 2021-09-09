import styled, { css } from "styled-components"
import SearchResult from "./search-result"

const Popover = css`
  max-height: 66vh;
  width: 80vw;
  max-width: 30em;
  margin-top: 35px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  z-index: 2;
  right: 0;
  top: 100%;

  background-color: rgba(255, 255, 255, .98);
  box-shadow: 0px -5px 35px #f3f3f3;
  padding: 1em;
  border-radius: 10px;
  backdropFilter: blur(8px);

  .dark & {
    background-color: rgba(0, 0, 0, .98);
    box-shadow: none;
    border: 1px solid rgba(31, 41, 55, 1);
  }
`

export default styled(SearchResult)`
  display: ${props => (props.show ? `block` : `none`)};
  ${Popover}

  .HitCount {
    display: flex;
    justify-content: flex-end;
  }

  .Hits {
    ul {
      list-style: none;
      margin-left: 0;
    }

    li.ais-Hits-item {
      margin-bottom: 1em;

      a {
        color: ${({ theme }) => theme.foreground};

        h4 {
          margin-bottom: 0.2em;
        }
      }
    }
  }

  .ais-PoweredBy {
    display: flex;
    justify-content: flex-end;
    align: center;
    align-items: center;
    justify-content: right;

    svg {
      width: 65px;
      padding-left: 5px;
    }
  }
`
