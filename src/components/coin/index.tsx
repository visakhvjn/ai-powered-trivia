import React from "react";
import { useCoinContext } from "../../context/coin";
import CoinIcon from "../../assets/coin.svg";

const Coin: React.FC = () => {
  const { coins } = useCoinContext();

  return (
    <div className="flex items-center">
      <span>{coins}&nbsp;</span>
      <img src={CoinIcon} />
    </div>
  );
};

export default Coin;
