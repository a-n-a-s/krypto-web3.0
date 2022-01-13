import React, { useState, useEffect } from "react";
import { ether } from "ether";

import { contactAddress, contractABI } from "../Utils/constanst";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.provider.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const TransactionContract = new ethers.Contract(
    contactAddress,
    contractABI,
    signer
  );
  console.log({
    provider,
    signer,
    TransactionContract,
  });
  // return TransactionContract
};

export const TransactionProvider = ({ children }) => {
  const [CurrentAccounts, setCurrentAccounts] = useState("");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transCount, setTransCount] = useState(localStorage.getItem("tCount"));

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.targegt.value }));
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please Install MetaMask");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccounts(accounts[0]);
      } else {
        console.log("No Accounts Found");
      }

      console.log(accounts);
    } catch (error) {
      console.log(error);
    }
  };

  const sendTranaction = async () => {
    try {
      if (!ethereum) return alert("Please Install MetaMask");

      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ether.utils.parsedEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: CurrentAccounts,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      setIsLoading(true);
      console.log(transactionHash.hash);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(transactionHash.hash);

      const transactionCount = await transactionContract.getTransactionCount();

      setTransCount(transactionCount.toNumber());
    } catch (error) {
      console.log(error);

      throw new Error("No Ethereum Object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please Install MetaMask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccounts(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("No Ethereum Object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  });

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        CurrentAccounts,
        formData,
        setFormData,
        handleChange,
        sendTranaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
