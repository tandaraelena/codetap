import styled from "styled-components";

export const StyledChannelMessages = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 5px -5px 5px 0px rgba(0, 0, 0, 0.75);
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  grid-template-columns: 50px auto;
  &:nth-child(even) {
    color: green;
  }
  &:nth-child(odd) {
    color: blue;
    direction: rtl;
    /* grid-auto-flow: dense; */
    &:nth-child(odd) {
      color: red;
      .text {
        color: black;
        direction: ltr;
      }
    }
  }
`;
