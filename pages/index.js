import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState("");

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      setupEventListener()
    } catch (error) {
      console.log(error);
    }
  }

  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet}>
      Connect to Wallet
    </button>
  );

  return (
    <div className={styles.button}>
      {currentAccount === "" ? (
        renderNotConnectedContainer()
      ) : (
        <Link href="/menu">
          <button>
            Wallet connected, please click to continue.
          </button>
        </Link>
      )}
    </div>
  )
}
