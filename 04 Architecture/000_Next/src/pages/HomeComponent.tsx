import React from "react";

interface HomeData {
  data: string;
}

const HomeComponent = ({ data }: HomeData): React.JSX.Element => {
  return (
    <div>
      <h1>Server-Side Rendering Example</h1>
      <p>Data from server: {data}</p>
    </div>
  );
};

interface HomeProps {
  props: HomeData;
}

// Fetch data on the server side
export async function getServerSideProps(): Promise<HomeProps> {
  // Simulate data fetching
  const data = "Hello from the server";
  return {
    props: {
      data,
    },
  };
}

export default HomeComponent;
