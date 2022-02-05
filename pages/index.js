import { ethers } from 'ethers'
import Link from 'next/link'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import { useGlobalState, setCurrentAccount } from './state';


export default function Home() {
  const [currentAccount] = useGlobalState('currentAccount');

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
        <form>
          <input type="text" autoComplete="name" required />
          <Link href="/menu">
            <button>Register</button>
          </Link>
        </form>
      )}
    </div>
  )
}
