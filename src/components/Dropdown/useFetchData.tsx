import { useQuery } from "react-query";

const getDropDownData = async (url: string) => {
  const apiData = await fetch(url);
  const dropdownData = await apiData.json();
  return dropdownData;
  console.log("called");
  return [
    { label: "Apple", value: "Apple" },
    { label: "Orange", value: "Orange" },
    { label: "pineApple", value: "pineApple" },
  ];
};

const useFetchData = ({ url, enabled }: { url: string; enabled: boolean }) => {
  const query = useQuery({
    queryKey: ["dropdown", url],
    queryFn: () => getDropDownData(url),
    staleTime: Infinity,
    enabled,
  });
  return query;
};

export default useFetchData;
