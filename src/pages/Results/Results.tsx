import {
  ChangeEvent,
  ReactHTMLElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Header } from "../../components/Header/Header";
import {
  AppButton,
  AppInput,
  EmptyComponent,
  Spacer,
} from "../../components/Layout/Layout";
import { ResultCard } from "../../components/Results/ResultsCard";
import { getComments } from "../../services/apiService";
import { LoadingSpinner } from "../../components/Loader/Loader";
import { CommentsProps } from "../../services/apiService";

export const Results = () => {
  const [data, setData] = useState<CommentsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [filteredResult, setFilteredResult] = useState<CommentsProps[]>([]);
  // const [error, setError] = useState<string>("");

  const searchResult = useCallback(
    (data: []) => {
      return data?.filter(
        (item: CommentsProps) =>
          item.email?.toLowerCase()?.includes(input.toLowerCase()) ||
          item.name?.toLowerCase()?.includes(input.toLowerCase())
      );
    },
    [input]
  );

  const handleSearch = () => {
    setFilteredResult(searchResult(data));
  };

  const pageLaod = async () => {
    try {
      setLoading(true);
      const res = await getComments();
      setData(res);
      setFilteredResult(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    pageLaod();
  }, []);

  return (
    <div>
      <Header />
      <Spacer height={30} />
      <div>
        <div className="width80 margin-auto">
          <p className="text-center fontSize-13em fw600">Results</p>
          <div className="full-width search-wrapper">
            <AppInput
              type="text"
              className=""
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInput(e.target.value)
              }
              placeholder="Search for an article by email or article's name"
              outerClassName="width65"
            />
            <Spacer height={15} />
            <AppButton
              isBusy={false}
              name="Search for Article"
              onClick={() => handleSearch()}
              className="bg-blue px-15 white-text py-10"
            />
          </div>
        </div>
        <Spacer height={60} />
        {loading && (
          <div className="d-flex justify-center align-center">
            <LoadingSpinner />
          </div>
        )}
        {filteredResult && filteredResult.length > 0 ? (
          <div className="width80 margin-auto">
            {filteredResult?.map((item) => (
              <div key={item.id}>
                <ResultCard
                  name={item.name}
                  email={item.email}
                  body={item.body}
                />
                <Spacer height={30} />
              </div>
            ))}
          </div>
        ) : (
          <div className="width80 margin-auto">
            {!loading && <EmptyComponent />}
          </div>
        )}
      </div>
    </div>
  );
};

// {filteredResult && filteredResult !== undefined ? (
//   <div className="width80 margin-auto">
//     {filteredResult?.map((item) => (
//       <div key={item.id}>
//         <ResultCard
//           name={item.name}
//           email={item.email}
//           body={item.body}
//         />
//         <Spacer height={30} />
//       </div>
//     ))}
//   </div>
// ) : (
//   <h1>Not Found</h1>
// )}
