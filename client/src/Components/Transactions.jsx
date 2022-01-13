import React, { useContext } from "react";

import { TransactionContext } from "../Context/TransactionContext";

import data from "../Utils/data";

import { shortenAddress } from "../Utils/shortenAddress";

const TransactionCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
  url,
}) => {
  return (
    <div className="bg-[#181918] m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px] flex-col p-3 rounded-md hover:shadow-2xl">
        <div className="flex lfex-col items-center w-full mt-3">
    <div className="flex justify-start w-full mb-6">
<a href={`https://ropsten.etherscan.io/address/${addressFrom}`}></a>
    </div>
        </div>
    </div>
  );
};

const Transactions = () => {
  const { CurrentAccounts } = useContext(TransactionContext);
  console.log(CurrentAccounts);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {CurrentAccounts ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect Your Account To See The Latest Trasnactions
          </h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
          {data.reverse().map((transaction, i) => (
            <TransactionCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
