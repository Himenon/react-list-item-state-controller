import * as React from "react";

type Loading = "LOADING" | "READY";

type Result = "SUCCESS" | "FAILED" | "UNKNOWN";

type ItemController = {
  setLoadingStatus: (status: Loading) => void;
  setResult: (result: Result) => void;
};

export type ItemProps = {
  title: string;
  onSubmit: (controller: ItemController) => void;
};

const Item: React.FC<ItemProps> = (props) => {
  console.log(`Re-rendering: ${props.title}`);
  const [loadingStatus, setLoadingStatue] = React.useState<Loading>("READY");
  const [result, setResult] = React.useState<Result>("UNKNOWN");

  const itemController: ItemController = {
    setLoadingStatus: (newLoadingStatus) => {
      setLoadingStatue(newLoadingStatus);
    },
    setResult: (newResult) => {
      setResult(newResult);
    },
  };
  const handleClick = () => {
    props.onSubmit(itemController);
  };
  return (
    <li>
      <span className="title">{props.title}</span>
      <span className="loading">Loading: {loadingStatus}</span>
      <span className="result">Result: {result}</span>
      <button onClick={handleClick} disabled={loadingStatus === "LOADING"}>Submit</button>
    </li>
  );
};

export default Item;
