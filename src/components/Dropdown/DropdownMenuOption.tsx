import React from "react";
import styled from "styled-components";
import CheckUrl from "../../assets/check.svg";

type OptionProps = {
  selected?: boolean;
};

const Option = styled.li<OptionProps>`
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  background-color: ${(props) =>
    props.selected ? props.theme.secondary : "white"};
  color: black;
  &:hover {
    background-color: ${(props) => props.theme.secondary};
  }
  &:focus {
    border: 2px solid ${(props) => props.theme.primary};
  }
`;

interface DropdownOptionProps {
  children: React.ReactNode;
  value: string;
  label: string;
  handleSelect: () => void;
  isSelected: boolean;
}

const DropdownMenuOption = ({
  children,
  value,
  label,
  handleSelect,
  isSelected,
}: DropdownOptionProps) => {
  return (
    <Option
      key={value}
      role="option"
      aria-label={label}
      aria-selected={isSelected}
      tabIndex={0}
      onClick={handleSelect}
      selected={isSelected}
    >
      {children}
      {isSelected && <img src={CheckUrl} />}
    </Option>
  );
};

export default DropdownMenuOption;
