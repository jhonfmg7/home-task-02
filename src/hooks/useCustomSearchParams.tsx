import { useSearchParams } from "react-router-dom";

interface Search {
    genre?: string,
    sortBy?: string,
    movie?: number
}

const useCustomSearchParams = () => {
    const [search, setSearch] = useSearchParams();
    const searchAsObject: Search = Object.fromEntries(
        new URLSearchParams(search)
    );

    return [searchAsObject, setSearch] as const;
};

export default useCustomSearchParams;