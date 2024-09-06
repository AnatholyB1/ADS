import React from "react";
const BabylonSnake = React.lazy(() => import("@/components/babylon/snake"));

const Test = () => {
  return (
    <>
      <React.Suspense fallback={<div>Loading...</div>}>
        <BabylonSnake />
      </React.Suspense>
    </>
  );
};

export default Test;
