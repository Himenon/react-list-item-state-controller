import * as React from "react";
import Item, { ItemProps } from "./Item";
import "./App.css";

const longTask = async (): Promise<void> => {
  const randomTimeSeconds = Math.random() * 5000;
  return new Promise<void>((resolve, reject) => {
    window.setTimeout(() => {
      const value = Math.floor(Math.random() * 100);
      const isEvent = value % 2 === 0;
      if (isEvent) {
        resolve();
      } else {
        reject();
      }
    }, randomTimeSeconds);
  });
};

export type AppProps = {};

const App: React.FC<AppProps> = () => {
  console.log("Re-rendering: App");
  const items: ItemProps[] = ["foo", "barr", "bob", "john"].map(
    (name): ItemProps => {
      return {
        title: name,
        onSubmit: (controller) => {
          controller.setLoadingStatus("LOADING");
          longTask()
            .then(() => {
              controller.setLoadingStatus("READY");
              controller.setResult("SUCCESS");
            })
            .catch(() => {
              controller.setLoadingStatus("READY");
              controller.setResult("FAILED");
            })
            .finally(() => {
              controller.setLoadingStatus("READY");
            });
        },
      };
    }
  );

  return (
    <div>
      <h2>List Item Controller sample</h2>
      <ul className="list">
        {items.map((item, index) => {
          return <Item key={index.toString()} {...item} />;
        })}
      </ul>
    </div>
  );
};

export default App;
