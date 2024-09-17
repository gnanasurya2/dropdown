import styled, { keyframes } from "styled-components";

type LoaderProps = {
  size: number;
  color?: string;
};

const rotation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;
export const Loader = styled.span<LoaderProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border: 2px solid ${(props) => props.color || props.theme.primary};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`;
