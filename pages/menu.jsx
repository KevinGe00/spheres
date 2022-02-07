import { useEffect, useState } from "react";
import { useGlobalState } from "./state";
import { useNFTBalances } from "react-moralis";
import Image from "next/image";
import logo from "./Images/Landing/logo.png";
import YourSphere from "./Images/SphereSelection/Your Spheres.png";
import Link from "next/link";

export default function Menu() {
  const [userNFTCollections, setUserNFTCollections] = useState([]);
  const [currentAccount] = useGlobalState("currentAccount");
  const [currentCollection, setCurrentCollection] =
    useGlobalState("currentCollection");
  const { getNFTBalances, data, error, isLoading, isFetching } =
    useNFTBalances();

  useEffect(() => {
    getNFTBalances({
      params: {
        chain: "eth",
        address: "0x8742fa292affb6e5ea88168539217f2e132294f9",
      },
      onSuccess: (data) => {
        console.log(data);
        const tokenList = data.result
          .map((t) => t.name)
          .filter((name) => name && name != "");
        setUserNFTCollections([...new Set(tokenList)]);
      },
    });
  }, []);

  return (
    <div class="flex items-center justify-center h-screen flex-col space-y-4">
      <div className="mb-3">
        <Image src={logo} />
      </div>
      <Image src={YourSphere} />

      {userNFTCollections.length == 0 ? (
        <h2>Fetching your collections...</h2>
      ) : (
        <div class="space-y-2">
          {userNFTCollections.map((collection) => (
            <div className="border-2 border-black rounded-md px-6 py-4 flex items-center gap-5">
              <p className="font-semibold">{collection}</p>
              <Link href="/sphere">
                <button
                  className="ml-auto border-2 border-black rounded-full px-3 py-1"
                  onClick={() => setCurrentCollection(collection)}
                >
                  Join
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
