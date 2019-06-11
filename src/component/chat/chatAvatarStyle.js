import style from "styled-components";

export const StyledAvatar = style.div`
  border-radius: 10px;
  background-image: url(${({ imagePath }) => imagePath});
  height: 48px;
  width: 48px;
`;
