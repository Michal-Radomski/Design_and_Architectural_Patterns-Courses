/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import axios, { Method } from "axios";

const useRequest = ({
  url,
  method,
  body,
  onSuccess,
}: {
  url: string;
  method: Method;
  body: { [key: string]: unknown };
  onSuccess: (arg0: string) => void;
}) => {
  const [errors, setErrors] = React.useState<null | React.ReactNode>(null);

  const doRequest = async (): Promise<any> => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      // console.log("response.data:", response.data);

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      // console.log("err:", err);
      setErrors(
        <div className="alert alert-danger">
          <h4>Ooops....</h4>
          <ul className="my-0">
            {(err as any)?.response?.data?.errors?.map((err: Error) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};

export default useRequest;
