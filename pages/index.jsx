import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState("");

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
      setupEventListener();
    } catch (error) {
      console.log(error);
    }
  };

  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet}>Connect to Wallet</button>
  );

  return (
    <main className="bg-green-500 h-screen flex">
      <nav className="bg-[#20253D] shadow-xl px-6 py-10">
        <ul className="flex flex-col gap-7 h-full">
          <li>
            <button>
              <Image src="/logo.svg" height={30} width={30} />
            </button>
          </li>
          <li className="mt-auto">
            <button
              title="Build"
              className="hover:scale-110 transition-transform"
            >
              <Image src="/hammer.svg" height={35} width={35} />
            </button>
          </li>
          <li>
            <button
              title="Inventory"
              className="hover:scale-110 transition-transform"
            >
              <Image src="/backpack.svg" height={35} width={35} />
            </button>
          </li>
        </ul>
      </nav>
      <section className="relative grow">
        <div className="text-right rounded-sm p-3 bg-[#20253D] inline-block text-white font-bold ml-auto">
          {currentAccount === "" ? (
            renderNotConnectedContainer()
          ) : (
            <Link href="/menu">
              <button>Wallet connected, please click to continue.</button>
            </Link>
          )}
        </div>

        <div className="absolute flex items-center gap-4 bg-[#20253D] left-1/2 -translate-x-1/2 bottom-10 rounded-full px-7 py-3">
          <button className="flex">
            <Image
              src="/avatar.svg"
              className="m-auto"
              height={25}
              width={25}
            />
          </button>
          <p className="text-white min-w-[7rem] font-semibold">Bobvin</p>
          <button className="flex">
            <Image src="/train.svg" className="m-auto" height={20} width={20} />
          </button>
          <button className="flex">
            <Image src="/mic.svg" className="m-auto" height={20} width={20} />
          </button>
          <button className="flex">
            <Image src="/map.svg" className="m-auto" height={20} width={20} />
          </button>
        </div>
      </section>
    </main>
  );
}
