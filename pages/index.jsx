import { ethers } from "ethers";
import Link from "next/link";
import axios from "axios";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import logo from "./Images/Landing/logo.png";
import shpereText from "./Images/Landing/Spheres.png";
import text from "./Images/Landing/Play. Connect. Explore..png";
import connectWalletButton from "./Images/Landing/connectWallet.png";

import { useGlobalState, setCurrentAccount } from "./state";
import { useEffect } from "react";

export default function Home() {
  const [currentAccount] = useGlobalState("currentAccount");

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Make sure you have metamask!");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    /*
     * User can have multiple authorized accounts
     */
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const renderNotConnectedContainer = () => (
    <Image src={connectWalletButton} onClick={connectWallet} />
  );

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div class="flex items-center justify-center h-screen flex-col">
      <div className="mb-2">
        <Image src={logo} />
      </div>
      <div className="mb-0">
        <Image src={shpereText} />
      </div>
      <div className="mb-1">
        <Image src={text} />
      </div>

      {currentAccount === "" ? (
        renderNotConnectedContainer()
      ) : (
        <form className="mt-7 flex items-center gap-3">
          <input
            type="text"
            className="border-2 border-black rounded-sm"
            required
          />
          <div className="bg-black text-white px-4 py-1 rounded-lg">
            <Link href="/menu">Register</Link>
          </div>
        </form>
      )}
    </div>
  );
}
