import styled from "styled-components";

export const StyledChannelMessagesGrouped = styled.div`
  margin-bottom: 2.4rem;
  border: 1px solid black;
  border-radius: 5px;

  :hover {
    box-shadow: 5px -5px 5px 0px #86131a;
  }

  .grouped-elements,
  .grouped-elements-text {
    display: grid;
    grid-template-columns: 70px auto;
    grid-gap: 0.5rem;
  }

  .grouped-elements {
    grid-gap: 0;
  }

  .grouped-elements-text:hover {
    color: black;
    background-color: #f1efef;
    cursor: pointer;
  }
`;

export const StyledChannelMessage = styled.div`
  padding: 0.2rem 0.8rem;
  border: none;
  position: relative;

  :first-child {
    padding-top: 1.5rem;
  }
`;

export const StyledNickName = styled.div`
  overflow: hidden;

  ::after,
  ::before {
    content: attr(data-nice-name);
  }
  ::before {
    position: absolute;
    top: 0;
    left: -100%;
    transition: 0.25s;
  }

  ::after {
    color: transparent;
  }

  :hover {
    ::before {
      left: 10%;
    }
  }
  top: -1rem;
  left: 4.5rem;
  position: absolute;
  background-color: white;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 0 0.5rem 0 1rem;
`;
export const Title = styled.div`
  padding-bottom: 2rem;
  text-align: center;
`;
