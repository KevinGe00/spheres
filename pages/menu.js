import { useEffect, useState } from 'react';
import { ethers } from "ethers";
import { useGlobalState } from './state';
import { useNFTBalances } from "react-moralis";
import NFT from '../utils/NFT.json';
import Image from 'next/image'
import logo from './Images/Landing/logo.png';
import YourSphere from "./Images/SphereSelection/Your Spheres.png"
import Link from 'next/link'

export default function Menu() {
  const [userNFTCollections, setUserNFTCollections] = useState([])
  const [currentAccount] = useGlobalState('currentAccount');
  const [currentCollection, setCurrentCollection] = useGlobalState('currentCollection');
  const { getNFTBalances, data, error, isLoading, isFetching } = useNFTBalances();
  const CONTRACT_ADDRESS = "0xdcb5dD3BDa620AEd6641A6Fc90961BE78203Fb54";

  const askContractToMintNft = async () => {
    try {
      const { ethereum } = window;
  
      if (ethereum) {
        //const provider = new ethers.providers.Web3Provider(polygon);
        const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com")
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, NFT.abi, signer);
  
        console.log("Going to pop wallet now to pay gas...")
        let nftTxn = await connectedContract.createToken(currentCollection);
          
        console.log("Mining...please wait.")
        await nftTxn.wait();
        
        alert(`Minted :) see transaction: https://mumbai.polygonscan.com/tx/${nftTxn.hash}`);
  
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSelect = (col) => {
    setCurrentCollection(col)
    askContractToMintNft()
  }

  useEffect(() => {
    getNFTBalances({
      params:
      {
        chain: "eth",
        address: '0x8742fa292affb6e5ea88168539217f2e132294f9'
      },
      onSuccess: (data) => {
        console.log(data)
        const tokenList = data.result.map(t => t.name).filter(name => name && name != '')
        setUserNFTCollections([...new Set(tokenList)])
      }
    });
  }, []);

  return (
    <div class="flex flex items-center justify-center h-screen flex-col space-y-4">
      <Image src={logo} />
      <Image src={YourSphere} />


      {userNFTCollections.length == 0 ? (
        <h2>Fetching your collections...</h2>
      ) : (
        <div class='flex-col space-y-2'>
        {userNFTCollections.map(collection => (
          
            <div 
              class='border-2 border-black rounded-md px-8 py-4 flex space-x-4 '
              
            >
              {collection}
              <Link href="/sphere">
              <button class='border-2 border-black rounded-xl p-2' onClick={() => handleSelect(collection)}>
                Join
              </button>
              </Link>
            </div>
        
        ))}
      </div>
      )}

    </div>
  )
}
