import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import useFetchData from "./useFetchData";
import { handleKeyBoardMovement } from "./utils/handleKeyboardMovement";
import DropdownMenuOption from "./DropdownMenuOption";
import { useDebounce } from "../../hooks/useDebounce";
import downIcon from "../../assets/downIcon.png";
import { Loader } from "../Loader/Loader";
import MultiSelectChips from "./MultiSelectChips";

const DropdownContainer = styled.div`
  position: relative;
  width: 300px;
`;

const DropdownInput = styled.div`
  padding: 10px;
  width: inherit;
  border: 1px solid ${(props) => props.theme.primary};
  text-align: left;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropDownMenuWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding: 2px;
  margin-top: 2px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 1;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;
const DropdownMenu = styled.ul`
  overflow-y: auto;
  max-height: 200px;
  background-color: white;
  &::-webkit-scrollbar {
    width: 0.5em;
    height: 0.5em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.primary};
    border-radius: 3px;
  }
`;

const SearchInput = styled.input`
  padding: 8px 6px;
  width: inherit;
  border-radius: 4px;
  border: 2px solid ${(props) => props.theme.borderColor};
  &:hover,
  &:focus {
    border: 2px solid ${(props) => props.theme.primary};
  }
`;

export interface DropdownOption {
  label: string;
  value: string;
}

type SearchableDropdownProps<T> = {
  onSelect: (data: Array<string>) => void;
  transformData: (data: T) => Array<DropdownOption>;
  multiSelect?: boolean;
  searchQueryFormat?: string;
  searchQueryDebounceTime?: number;
  placeholder?: string;
  inputPlaceholder?: string;
  url?: string;
  errorText?: string;
  defaultOptions: Array<DropdownOption>;
  useExternalSearch?: boolean;
};

function SearchableDropdown<T>({
  url = "",
  placeholder = "Select an option",
  inputPlaceholder = "Search...",
  errorText = "unable to fetch the data",
  useExternalSearch = false,
  onSelect,
  transformData,
  defaultOptions = [],
  multiSelect = false,
  searchQueryFormat = "?q=",
  searchQueryDebounceTime = 400,
}: SearchableDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<Array<DropdownOption>>(defaultOptions);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<Array<DropdownOption>>(
    [],
  );
  const [searchUrl, setSearchUrl] = useState(url);
  const [keyboardSelectedIdx, setKeyboardSelectedIdx] = useState(-1);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownContentRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listItemRef = useRef<HTMLUListElement>(null);

  const apiResponseRef = useRef<Array<DropdownOption>>(defaultOptions);
  const { isLoading, isError, data } = useFetchData({
    url: searchUrl,
    enabled: Boolean(url && isOpen),
  });

  useEffect(() => {
    onSelect(selectedOptions.map((ele) => ele.value));
  }, [selectedOptions, onSelect]);

  useEffect(() => {
    if (isOpen) {
      searchInputRef.current?.focus();
    } else {
      setKeyboardSelectedIdx(-1);
      dropdownContentRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (data) {
      const transformedData = transformData(data);
      apiResponseRef.current = transformedData;
      setOptions(transformedData);
    }
  }, [data, transformData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const debouncedSearch = useDebounce((searchQuery: string) => {
    if (useExternalSearch) {
      setSearchUrl(`${url}${searchQueryFormat}${searchQuery}`);
    } else {
      setOptions(
        apiResponseRef.current.filter((ele) =>
          ele.value.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
      setKeyboardSelectedIdx(-1);
    }
  }, searchQueryDebounceTime);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleSelect = (option: DropdownOption) => {
    if (multiSelect) {
      const selectedIndex = selectedOptions.findIndex(
        (ele) => ele.value === option.value,
      );
      if (selectedIndex === -1) {
        setSelectedOptions((prev) => [...prev, option]);
      } else {
        setSelectedOptions((prev) => [
          ...prev.slice(0, selectedIndex),
          ...prev.slice(selectedIndex + 1),
        ]);
      }
    } else {
      setSelectedOptions([option]);
      setIsOpen(false);
    }
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLUListElement>,
  ) => {
    if (listItemRef.current) {
      switch (e.key) {
        case "ArrowUp": {
          setKeyboardSelectedIdx(
            handleKeyBoardMovement(keyboardSelectedIdx, listItemRef, "UP"),
          );
          break;
        }
        case "ArrowDown":
        case "Tab": {
          e.preventDefault();
          setKeyboardSelectedIdx(
            handleKeyBoardMovement(keyboardSelectedIdx, listItemRef, "DOWN"),
          );
          break;
        }
        case "Escape": {
          setIsOpen(false);
          break;
        }
        case "Enter": {
          handleSelect(options[keyboardSelectedIdx]);
          break;
        }
      }
    }
  };
  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownInput
        tabIndex={0}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        ref={dropdownContentRef}
      >
        {multiSelect ? (
          <MultiSelectChips
            options={selectedOptions}
            placeholder={placeholder}
            onClick={(index) =>
              setSelectedOptions((prev) => [
                ...prev.slice(0, index),
                ...prev.slice(index + 1),
              ])
            }
          />
        ) : (
          <p style={{ flex: 1 }}>
            {selectedOptions.length ? selectedOptions[0].label : placeholder}
          </p>
        )}

        {isLoading && <Loader size={20} data-testid="dropdown-loader" />}
        <img src={downIcon} width={"20px"} alt="dropdown-arrow" />
      </DropdownInput>
      {isOpen && (
        <DropDownMenuWrapper>
          <SearchInput
            ref={searchInputRef}
            type="text"
            placeholder={inputPlaceholder}
            aria-label={inputPlaceholder}
            value={searchTerm}
            onChange={handleSearch}
            onKeyDown={handleKeyPress}
          />
          {isError && <p>{errorText}</p>}
          <DropdownMenu
            role="listbox"
            aria-label="dropdown options"
            ref={listItemRef}
            onKeyDown={handleKeyPress}
          >
            {options.map((option) => (
              <DropdownMenuOption
                key={option.value}
                value={option.value}
                label={option.label}
                handleSelect={() => handleSelect(option)}
                isSelected={selectedOptions.some(
                  (item) => item.value === option.value,
                )}
              >
                {option.label}
              </DropdownMenuOption>
            ))}
          </DropdownMenu>
        </DropDownMenuWrapper>
      )}
    </DropdownContainer>
  );
}

export default SearchableDropdown;
