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

  return (
    <main className="fbg-green-500 h-screen">
      <nav className="absolute left-0 h-screen z-10 bg-[#20253D] shadow-xl px-6 py-8">
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
      <div
        className="cursor-pointer grid h-full w-full overflow-auto"
        style={{
          gridTemplateColumns: "repeat(35, 50px)",
          gridTemplateRows: "repeat(20, 50px)",
        }}
      >
        {[...Array(35 * 20)].map(() => (
          <div style={{ width: "55px" }}>
            <Image src="/tiles/tile915.svg" height={55} width={55} />
          </div>
        ))}
      </div>

      <div className="m-3 mr-8 absolute right-0 top-0">
        {currentAccount === "" ? (
          <button
            className="rounded-lg px-4 py-2 bg-[#20253D] text-white font-bold"
            onClick={connectWallet}
          >
            Connect to Wallet
          </button>
        ) : (
          <Link href="/menu">
            <button>Wallet connected, please click to continue.</button>
          </Link>
        )}
      </div>

      <div className="absolute flex items-center gap-4 bg-[#20253D] left-1/2 -translate-x-1/2 bottom-10 rounded-full px-7 py-3">
        <button className="flex">
          <Image src="/avatar.svg" className="m-auto" height={25} width={25} />
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
    </main>
  );
}
