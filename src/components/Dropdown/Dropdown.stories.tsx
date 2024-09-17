import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Dropdown, { DropdownOption } from "./Dropdown";
import { QueryClient, QueryClientProvider } from "react-query";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme } from "../../theme";
import "../../index.css";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const queryClient = new QueryClient();

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={lightTheme}>
          <Wrapper>
            <Story />
          </Wrapper>
        </ThemeProvider>
      </QueryClientProvider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    url: "https://dummyjson.com/products",
    placeholder: "Select company name",
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    url: "https://dummyjson.com/products",
    placeholder: "Select company name",
    onSelect: (data) => console.log("data", data),
    transformData: (data) =>
      data.products?.map<DropdownOption>((ele) => ({
        label: ele.title,
        value: ele.title,
      })) || [],
    inputPlaceholder: "search products",
  },
};

export const localOnlySearch: Story = {
  args: {
    url: "",
    placeholder: "Select company name",
    onSelect: (data) => console.log("data", data),
    transformData: (data) => data,
    inputPlaceholder: "search products",
    defaultOptions: [
      {
        label: "Tesla",
        value: "Tesla",
      },
      {
        label: "Audi",
        value: "Audi",
      },
      {
        label: "porsche",
        value: "porsche",
      },
    ],
  },
};

export const SearchReciepes: Story = {
  args: {
    url: "https://dummyjson.com/recipes",
    placeholder: "Select receipe name",
    inputPlaceholder: "search receipes",
    onSelect: (data) => console.log("data", data),
    transformData: (data) =>
      data.recipes?.map<DropdownOption>((ele) => ({
        label: ele.name,
        value: ele.name,
      })) || [],
  },
};

export const MultiSelect: Story = {
  args: {
    url: "https://dummyjson.com/recipes",
    placeholder: "Select receipe name",
    inputPlaceholder: "search receipes",
    onSelect: (data) => console.log("data", data),
    transformData: (data) =>
      data.recipes?.map<DropdownOption>((ele) => ({
        label: ele.name,
        value: ele.name,
      })) || [],
    multiSelect: true,
    useExternalSearch: false,
  },
};

export const ApiForSearch: Story = {
  args: {
    url: "https://dummyjson.com/recipes",
    placeholder: "Select receipe name",
    inputPlaceholder: "search receipes",
    multiSelect: true,
    useExternalSearch: true,
    onSelect: (data) => console.log("data", data),

    transformData: (data) =>
      data.recipes?.map<DropdownOption>((ele) => ({
        label: ele.name,
        value: ele.name,
      })) || [],

    searchQueryFormat: "/search?q=",
    searchQueryDebounceTime: 400,
  },
};
