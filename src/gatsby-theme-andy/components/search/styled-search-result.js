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
  background-color: rgb(252, 251, 249, .98);
  box-shadow: 0px -5px 35px #f5f2ec;
  padding: 1em;
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 0.75rem;

  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  -moz-backdrop-filter: blur(10px);
  -o-filter: blur(10px);
  -ms-filter: blur(10px);

  .dark & {
    background-color: rgba(2, 3, 6, .95);
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
      margin-left: -1.5rem;
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
      width: 60px;
      padding-left: 5px;
    }
  }
`
