import { useCallback, useState } from "react";

export default function useHttp<T>(url: string) {
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(
    (
      handleResponse = (response: Response) => {},
      handleError = (error: Error) => {},
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
