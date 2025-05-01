import React from "react";

interface ITabs {
  onTabClick: (onTabClick: string) => void
}

const Tabs: React.FC<ITabs> = ({ onTabClick }) => {
  return (
    <div className="tabs">
      <button className="btn" onClick={() => onTabClick("python")}>Python</button>
      <button className="btn" onClick={() => onTabClick("javascript")}>JavaScript</button>
    </div>
  );
};

export default Tabs;
