import { useEffect, useState } from 'react';
import { useGlobalState } from './state';
import { useNFTBalances } from "react-moralis";

export default function Menu() {
  const [userNFTCollections, setUserNFTCollections] = useState([])
  const [currentAccount] = useGlobalState('currentAccount');
  const { getNFTBalances, data, error, isLoading, isFetching } = useNFTBalances();


  useEffect(() => {
    getNFTBalances({
      params:
        { chain: "eth", 
        address: currentAccount
      },
      onSuccess: (data) => {
        const tokenList = data.result.map(t => t.name).filter(name => name && name != '')
        setUserNFTCollections([...new Set(tokenList)])
      }
    });
  }, []);

  return (
    <div>
      Your Spheres 
      <pre>{userNFTCollections.map(collection =>  <li key={collection}>{collection}</li>)}</pre>
    </div>
  )
}
