import { useCallback, useState } from "react";

type SendRequestFunction = (
  handleResponse?: (response: Response) => void,
  handleError?: (error: Error) => void,
  requestOptions?: RequestInit | undefined,
  urlParameters?: string
) => void;

export default function useHttp(url: string):[SendRequestFunction,boolean] {
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(
    (
      handleResponse: (response: Response) => void = (response: Response) => {},
      handleError: (error: Error) => void = (error: Error) => {},
      requestOptions: RequestInit | undefined = {},
      urlParameters: string = ""
    ) => {
      setIsLoading(true);
      requestOptions = { method: "GET", ...requestOptions };
      fetch(`${url}${urlParameters}`, requestOptions)
        .then((response) => {
          return handleResponse(response);
        })
        .catch((error) => {
          handleError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [url]
  );

  return [sendRequest, isLoading];
}
