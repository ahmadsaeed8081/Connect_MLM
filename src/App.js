import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/App.scss";
import Public from "./Routing/PublicRoute";
import ProtectedRoute from "./Routing/ProtectedRoute";
import Home from "./Pages/Home";
import Welcome from "./Pages/Welcome";

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { polygon} from 'wagmi/chains'
import { infuraProvider } from 'wagmi/providers/infura'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import Web3 from "web3";

function App() {

  const [address, set_address] = useState(null);
  const [web3, set_web3] = useState(null);
  const [provider, set_provider] = useState(null);
  const [openWallet, setOpenWallet] = useState(false);
  const [itsview, set_itsview] = useState(false);

  const [isWalletConnected, set_isWalletConnected] = useState(false);
  const [balance, setBalance] = useState(0);
  const [matic, set_matic] = useState(0);

  function set_user(_add, _provider, _web3, balance, matic,itsview) {
    console.log("ihjono " + _add);
    set_address(_add);
    set_itsview(itsview)

    set_isWalletConnected(true);
    set_provider(_provider);
    set_web3(_web3);
    set_matic(matic);
    setBalance(balance);
    console.log("ihjono " + address);
  }
  function search_Data(_add,itsview) {
    console.log("ihjono " + _add);
    set_address(_add);
    set_itsview(itsview)

    set_isWalletConnected(true);
    // // set_provider(_provider);
    // // set_web3(_web3);
    // set_matic(matic);
    // setBalance(balance);
    // console.log("ihjono " + address);
  }


  const chains = [polygon]
  const projectId = 'a4d2f508402063820567e328e758d3ef'
  
  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])


  // const { chains, publicClient } = configureChains(
  //   [polygonMumbai],
  //   [alchemyProvider({ apiKey: 'https://polygon-mumbai.g.alchemy.com/v2/Xr86iyHzmF6-yzBAqV5rd_PW7ds7QKlh' })],
  // )


    const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient
  })
  const ethereumClient = new EthereumClient(wagmiConfig, chains)

  return (
    <div className="App">
          <WagmiConfig config={wagmiConfig}>

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Public>
                <Welcome
                  web3={web3}
                  isWalletConnected={isWalletConnected}
                  matic={matic}
                  balance={balance}
                  address={address}
                  set_user={set_user}

                />
              </Public>
            }
          />
          <Route
            exact
            path="/home"
            element={
              <ProtectedRoute>
                <Home
                  web3={web3}
                  provider={provider}
                  isWalletConnected={isWalletConnected}
                  matic={matic}
                  balance={balance}
                  address={address}
                  search_Data={search_Data}
                  set_user={set_user}
                  itsview={itsview}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>

      </WagmiConfig>

<Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </div>
  );
}
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route exact path="/" element={<Welcome />} />
//           <Route exact path="/home" element={<Home />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

export default App;
