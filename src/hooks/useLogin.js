import { useState } from "react";

export default function useLogin() {
  const [loading, setLoading] = useState(false);

  const login = async url => {
    setLoading(true);
    try {
      let response = await fetch(url);
      setLoading(false);
      setTimeout(() => setLoading(false), 2000);
      return response;
    } catch (error) {
      setTimeout(() => setLoading(false), 2000);
      throw new Error("Api failed");
    }
  };

  return [login, loading];
}
