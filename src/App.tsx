import styled, { ThemeProvider } from "styled-components";
import SearchableDropdown, {
  DropdownOption,
} from "./components/Dropdown/Dropdown";
import { lightTheme } from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { useCallback, useState } from "react";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const queryClient = new QueryClient();

type RecipesResposne = {
  recipes: Array<{
    name: string;
  }>;
};
function App() {
  const [selectedData, setSelectedData] = useState<Array<string>>([]);

  const dataTransformer = useCallback((ele: RecipesResposne) => {
    return (
      ele.recipes?.map<DropdownOption>((ele) => ({
        label: ele.name,
        value: ele.name,
      })) || []
    );
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={lightTheme}>
          <Wrapper>
            <p>{selectedData.join(",")}</p>
            <SearchableDropdown
              url="https://dummyjson.com/recipes"
              placeholder="Select food name"
              onSelect={setSelectedData}
              multiSelect
              transformData={dataTransformer}
              useExternalSearch
              defaultOptions={[
                {
                  label: "Orange",
                  value: "Orange",
                },
              ]}
              searchQueryFormat="/search?q="
            />
          </Wrapper>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
