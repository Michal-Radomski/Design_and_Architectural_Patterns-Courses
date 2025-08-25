import axios, { AxiosInstance, HeadersDefaults } from "axios";
import { NextRequest } from "next/server";

const buildClient = ({ req }: { req: NextRequest }): AxiosInstance => {
  // console.log("req?.headers:", req?.headers);
  // console.log("typeof window:", typeof window);
  if (typeof window === "undefined") {
    // We are on the server
    return axios.create({
      // baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      baseURL: "/",
      headers: req.headers as unknown as HeadersDefaults,
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;
