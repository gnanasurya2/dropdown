import type { Meta, StoryObj } from "@storybook/react";
import {
  expect,
  fn,
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@storybook/test";

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
  play: async ({ canvasElement }) => {
    queryClient.clear();
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText("Select company name"));

    await expect(
      canvas.getByPlaceholderText("search products"),
    ).toBeInTheDocument();
    await expect(canvas.getByPlaceholderText("search products")).toHaveFocus();

    await expect(canvas.getByTestId("dropdown-loader")).toBeVisible();

    await waitForElementToBeRemoved(canvas.getByTestId("dropdown-loader"));

    const element = canvas.getByRole("listbox");

    await expect(element.children.length).toEqual(30);

    await userEvent.type(
      canvas.getByPlaceholderText("search products"),
      "Powder",
    );

    await waitFor(async () => {
      await expect(element.children.length).toEqual(1);
    });

    await userEvent.clear(canvas.getByPlaceholderText("search products"));

    await waitFor(
      async () => {
        await expect(element.children.length).toEqual(30);
      },
      { interval: 200, timeout: 1200 },
    );

    await userEvent.click(canvas.getByText("Red Lipstick"));

    await expect(canvas.getByText("Red Lipstick")).toBeVisible();
  },
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
  play: async ({ canvasElement }) => {
    queryClient.clear();
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText("Select company name"));

    await expect(
      canvas.getByPlaceholderText("search company"),
    ).toBeInTheDocument();
    await expect(canvas.getByPlaceholderText("search company")).toHaveFocus();

    const element = canvas.getByRole("listbox");

    await expect(element.children.length).toEqual(3);

    await userEvent.type(
      canvas.getByPlaceholderText("search company"),
      "Tesla",
    );

    await waitFor(async () => {
      await expect(element.children.length).toEqual(1);
    });

    await userEvent.clear(canvas.getByPlaceholderText("search company"));

    await waitFor(
      async () => {
        await expect(element.children.length).toEqual(3);
      },
      { interval: 200, timeout: 1200 },
    );

    await userEvent.click(canvas.getByText("Tesla"));

    await expect(canvas.getByText("Tesla")).toBeVisible();
  },
  args: {
    url: "",
    placeholder: "Select company name",
    onSelect: (data) => console.log("data", data),
    transformData: (data) => data,
    inputPlaceholder: "search company",
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
  play: async ({ canvasElement }) => {
    queryClient.clear();
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText("Select receipe name"));

    await expect(
      canvas.getByPlaceholderText("search receipes"),
    ).toBeInTheDocument();

    await expect(canvas.getByPlaceholderText("search receipes")).toHaveFocus();

    await expect(canvas.getByTestId("dropdown-loader")).toBeVisible();

    await waitForElementToBeRemoved(canvas.getByTestId("dropdown-loader"));

    const element = canvas.getByRole("listbox");

    await expect(element.children.length).toEqual(30);

    await userEvent.type(
      canvas.getByPlaceholderText("search receipes"),
      "chicken biryani",
    );

    await waitFor(async () => {
      await expect(element.children.length).toEqual(1);
    });

    await userEvent.clear(canvas.getByPlaceholderText("search receipes"));

    await waitFor(
      async () => {
        await expect(element.children.length).toEqual(30);
      },
      { interval: 200, timeout: 1200 },
    );

    await userEvent.click(canvas.getByText("Classic Margherita Pizza"));

    await expect(canvas.getByText("Classic Margherita Pizza")).toBeVisible();
  },
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
  play: async ({ canvasElement }) => {
    queryClient.clear();
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText("Select receipe name"));

    await expect(
      canvas.getByPlaceholderText("search receipes"),
    ).toBeInTheDocument();

    await expect(canvas.getByPlaceholderText("search receipes")).toHaveFocus();

    await expect(canvas.getByTestId("dropdown-loader")).toBeVisible();

    await waitForElementToBeRemoved(canvas.getByTestId("dropdown-loader"), {
      timeout: 4000,
      interval: 400,
    });

    const element = canvas.getByRole("listbox");

    await expect(element.children.length).toEqual(30);

    await userEvent.type(
      canvas.getByPlaceholderText("search receipes"),
      "chicken",
    );

    await waitFor(
      async () => {
        await expect(element.children.length).toEqual(5);
      },
      { interval: 200, timeout: 1200 },
    );
    const listNode = canvas.getByText("Mango Salsa Chicken");
    await expect(listNode.children.length).toBe(0);
    await userEvent.click(canvas.getByText("Mango Salsa Chicken"));
    await expect(listNode.children.length).toBe(1);

    const listNode2 = canvas.getByText("Chicken Biryani");
    await expect(listNode2.children.length).toBe(0);
    await userEvent.click(canvas.getByText("Chicken Biryani"));
    await expect(listNode2.children.length).toBe(1);

    const chipWrapper = canvas.getByTestId("dropdown-multiselect-wrapper");

    await expect(chipWrapper.children.length).toEqual(2);

    await userEvent.click(
      canvas.getByRole("button", { name: /Mango Salsa Chicken/i }),
    );

    await expect(chipWrapper.children.length).toEqual(1);
  },
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
  play: async ({ canvasElement }) => {
    queryClient.clear();
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText("Select receipe name"));

    await expect(
      canvas.getByPlaceholderText("search receipes"),
    ).toBeInTheDocument();

    await expect(canvas.getByPlaceholderText("search receipes")).toHaveFocus();

    await expect(canvas.getByTestId("dropdown-loader")).toBeVisible();

    await waitForElementToBeRemoved(canvas.getByTestId("dropdown-loader"));

    const element = canvas.getByRole("listbox");

    await expect(element.children.length).toEqual(30);

    await userEvent.type(
      canvas.getByPlaceholderText("search receipes"),
      "chicken biryani",
    );

    await waitFor(async () => {
      await expect(element.children.length).toEqual(1);
    });

    await userEvent.clear(canvas.getByPlaceholderText("search receipes"));

    await waitFor(
      async () => {
        await expect(element.children.length).toEqual(30);
      },
      { interval: 200, timeout: 1200 },
    );

    await userEvent.click(canvas.getByText("Classic Margherita Pizza"));

    await expect(
      canvas.getByRole("button", {
        name: /Classic Margherita Pizza/i,
      }),
    ).toBeVisible();
  },
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
