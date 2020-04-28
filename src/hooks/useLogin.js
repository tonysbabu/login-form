import { useState } from "react";
import axios from "axios";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const login = async url => {
    setLoading(true);
    try {
      let response = await axios.get(url);
      setLoading(false);
      setTimeout(() => setLoading(false), 1000);
      setResponse(response.data);
      return response;
    } catch (error) {
      setTimeout(() => setLoading(false), 2000);
      throw new Error("Api failed");
    }
  };

  return [login, loading, response];
}
