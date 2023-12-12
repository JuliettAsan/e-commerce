import { Children } from "react";

export default function Loading({ children }) {
  const arrayChildren = Children.toArray(children);

  return (
    <div className="loading-container">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
