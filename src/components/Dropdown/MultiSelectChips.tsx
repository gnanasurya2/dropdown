import { DropdownOption } from "./Dropdown";
import crossUrl from "../../assets/cross.png";
import styled from "styled-components";

type MultiSelectChipsProps = {
  options: Array<DropdownOption>;
  onClick: (index: number) => void;
  placeholder: string;
};

const Chip = styled.button`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  gap: 8px;
  background-color: ${(props) => props.theme.secondary};
  border: 1px solid ${(props) => props.theme.primary};
  border-radius: 96px;
  text-overflow: ellipsis;
  cursor: pointer;
`;
const MultiSelectChips = ({
  options,
  onClick,
  placeholder,
}: MultiSelectChipsProps) => {
  if (options.length === 0) {
    return <p>{placeholder}</p>;
  }
  return (
    <div data-testId="dropdown-multiselect-wrapper">
      {options.map((ele, index) => (
        <Chip
          key={ele.value}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onClick(index);
          }}
        >
          {ele.label} <img src={crossUrl} width="20px" alt="cross" />
        </Chip>
      ))}
    </div>
  );
};

export default MultiSelectChips;
