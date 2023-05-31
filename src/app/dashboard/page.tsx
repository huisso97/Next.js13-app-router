import axios from "axios";
import React from "react";

// export const dynamic = "force-dynamic";
export const revalidate = 10;

const page = async ({}) => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts/1"
  );
  return <div>{JSON.stringify(data)}</div>;
};

export default page;
