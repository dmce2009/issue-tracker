"use client";
import React, { useState } from "react";
import TabComponent from "./Example";

const ParentComponent = () => {
  const [navSelected, setNavSelected] = useState(0);
  const nav_items = [
    { name: "Account", description: "Account page" },
    { name: "Settings", description: "Settings page" },
  ];
  return (
    <>
      <nav>
        <ul style={{ display: "flex" }}>
          {nav_items.map((item, index) => (
            <li key={item.name}>
              <TabComponent
                name={item.name}
                itemNumber={index}
                onSelect={setNavSelected}
              />
            </li>
          ))}
        </ul>
      </nav>
      <section>{nav_items[navSelected].description}</section>
    </>
  );
};

export default ParentComponent;
