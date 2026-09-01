import React from "react";

const TabComponent = ({
  name,
  itemNumber,
  onSelect,
}: {
  name: String;
  itemNumber: number;
  onSelect: (tab: number) => void;
}) => {
  return <section onClick={() => onSelect(itemNumber)}>{name}</section>;
};

export default TabComponent;
