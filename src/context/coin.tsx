import { createContext, useContext, useState } from "react";

export type CoinContextProps = {
  coins: number;
  addCoin: (coin: number) => void;
};

const CoinContext = createContext<CoinContextProps>({} as CoinContextProps);
export const useCoinContext = (): CoinContextProps => useContext(CoinContext);

const CoinContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [coins, setCoins] = useState<number>(0);

  const addCoin = (coin: number) => {
    setCoins(coins + coin);
  };

  return (
    <CoinContext.Provider value={{ coins, addCoin }}>
      {children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
