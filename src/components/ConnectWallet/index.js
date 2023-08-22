import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import { Provider } from "web3modal";



const ConnectWallet = (props) => {

  const[hello,set_hello]=useState(false)


  useEffect(()=>{
    let hello;
    try{
       hello=window.ethereum.isMetaMask;
       set_hello(hello);

    }
    catch
    {
      set_hello(false);
    }
    
   },[hello])

  const list = [
    {
      img: "./images/metamask-logo.png",
      name: "Meta Mask",
      desc: "Desktop/ DApp in app",
      id: "1",
    },
    {
      img: "./images/bnb.png",
      name: "Trust Walet",
      desc: "DApp in app mobile",
      id: "2",
    },
    {
      img: "./images/bnb-logo.png",
      name: "Wallet Connect",
      desc: "DApp in app mobile",
      id: "3",
    },
  ];
  return (
    <div className="connect-wallet flex">
      <div className="wallet-wrapper flex flex-col">
        <div className="card-hdr flex items-center justify-center">
          <div className="tag">Select Wallet</div>
        </div>
        <div className="meta flex flex-col">

              
              {hello ? (
                <div
                  className="item flex items-center"
                  key={list[0].id}
                  onClick={() => props.Connect_Wallet(list[0].id)}
                >
                  <div className="img flex items-center justify-center">
                    <img src={list[0].img} />
                  </div>
                  <div className="info flex flex-col">
                    <div className="name">{list[0].name}</div>
                    <div className="desc">{list[0].desc}</div>
                  </div>
                </div>
              ) : (
                <div
                  className="item flex items-center"
                  style={{ backgroundColor: "#7a7a7a" }}

                  key={list[0].id}
                >
                  <div className="img flex items-center justify-center">
                    <img src={list[0].img} />
                  </div>
                  <div className="info flex flex-col">
                    <div className="name">{list[0].name}</div>
                    <div className="desc">{list[0].desc}</div>
                  </div>
                </div>
              )}

          <div style={{ paddingTop: "5px" }}>
            <div
              className="item flex items-center"
              key={list[1].id}
              onClick={() => props.Connect_Wallet(list[2].id)}
            >
              <div className="img flex items-center justify-center">
                <img src={list[2].img} />
              </div>
              <div className="info flex flex-col">
                <div className="name">{list[2].name}</div>
                <div className="desc">{list[2].desc}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
