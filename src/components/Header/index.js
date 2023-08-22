import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SearchIcon, BackArrowIcon } from "../../assets";
import SearchBox from "../SearchBox";
import Modal from "../Modal";
import Modal1 from "../Modal1";
import ConnectWallet from "../ConnectWallet";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { cont_address, cont_abi, tokenABI, Token_address } from "../config";



const Header = (props) => {
  const [open, setOpen] = useState(false);
  const [openWallet, setOpenWallet] = useState(false);
  const [_address, set_user_address] = useState(null);
  const [_web3, set_web3] = useState(null);

  async function Sign_out() {
    const provider = new WalletConnectProvider({
       rpc: {
         137:"https://polygon-mainnet.g.alchemy.com/v2/bf3cnZO2AQyu_Kv4eBx6uI0Slhs5GhMv"
       },
       chainId: 137,
     });
     try {
       await provider.disconnect();
       window.location.reload("/");
     } catch {
           window.location.reload("/");
 
     }
   }
   async function new_user(_add) {

    const web3 = new Web3(props.provider);
    
    const contract = new web3.eth.Contract(cont_abi, cont_address);

    let address=await contract.methods.idtoAddress(_add.toString().toLowerCase()).call();

    if(address!="0x0000000000000000000000000000000000000000")
    {
      props.search_Data(address,true);


    }
    else
    {
      alert("Sorry! this is not a registered member")
    }
  }





  return (
    <div className="header-camp flex">
      <div className="wrapWidth wrap flex items-center">
        <div className="left flex items-center">
          <Link to="/">
            <img src="./images/logo.svg" className="logo-img" />
          </Link>
        </div>
        <div className="right flex items-center">
        <SearchBox setOpen={setOpen} new_user={new_user}/>
          <div
            className="search-icon-btn flex items-center justify-center"
            onClick={(e) => setOpen(true)}
          >
            <SearchIcon />
          </div>
          <div className="action flex items-center">
          {props.address == null ? (
              <div
                className="btn-connect button"
                onClick={(e) => {
                  e.stopPropagation();
                  // setOpenWalletList(!openWalletList);
                  setOpenWallet(true);
                }}
              >
                <p>Connect Wallet</p>
              </div>
            ) : (
              <>
                <div
                  className="btn-connect button"
                  onClick={(e) => {
                    Sign_out();
                  }}
                >
                  <p>Sign Out</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="search-model flex items-center">
          <div
            className="back-icon flex items-center justify-center mr-3"
            onClick={(e) => setOpen(false)}
          >
            <BackArrowIcon />
          </div>
          <SearchBox setOpen={setOpen} new_user={new_user}/>
        </div>
      </Modal>
      <Modal1 open={openWallet} onClose={() => setOpenWallet(false)}>
        <ConnectWallet setOpenWallet={setOpenWallet} />
      </Modal1>
    </div>
  );
};

export default Header;
