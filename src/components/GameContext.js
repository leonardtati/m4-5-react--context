import React from "react";

import items from "../data";
import useInterval from "../hooks/use-interval.hook";
import usePersistedState from "../hooks/use-persisted-state.hook";

export const GameContext = React.createContext(null);

const GameProvider = ({ children }) => {
  const calculateCookiesPerSecond = purchasedItems => {
    console.log("BRAOOSSPPP");
    return Object.keys(purchasedItems).reduce((acc, itemId) => {
      const numOwned = purchasedItems[itemId];
      const item = items.find(item => item.id === itemId);
      const value = item.value;

      return acc + value * numOwned;
    }, 0);
  };
  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItems);

    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  const [numCookies, setNumCookies] = usePersistedState("numCookies", 1000);

  const [purchasedItems, setPurchasedItems] = usePersistedState(
    "purchasedItems",
    {
      cursor: 0,
      grandma: 0,
      farm: 0
    }
  );
  return (
    <GameContext.Provider
      value={{
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        cookiesPerSecond: calculateCookiesPerSecond(purchasedItems)
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
