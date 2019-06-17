import style from "styled-components";

export const StyledAvatar = style.div`
  border-radius: 50%;
  background-image: url(${({ imagePath }) => imagePath});
  height: 48px;
  width: 48px;
  top: -2rem;
  left: 0.5rem;
  position: absolute;
  background-color: white;
  margin: 0 0 0 1rem;
`;
