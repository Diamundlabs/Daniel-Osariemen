import { useState } from "react";
import "./App.css";
import abi from "./constant/abi.json";
import Web3 from "web3";

function App() {
  const web3 = new Web3(window.ethereum);

  const [contractAddress, setContractAddress] = useState("");
  const [name, setName] = useState("");
  const [supply, setSupply] = useState("");
  const [owner, setOwner] = useState("");
  const [decimals, setDecimals] = useState(0);

  const getDetail = async (e) => {
    try {
      e.preventDefault();
      console.log("TOKEN details:");

      const erc20 = new web3.eth.Contract(abi, contractAddress);

      let tokenSupply = erc20.methods
        .totalSupply()
        .call()
        .then((supply) => {
          setSupply(supply);
          console.log("Token supply:", supply);
        })
        .catch((error) => console.error("Error getting token supply:", error));

      let tokenDecimals = erc20.methods
        .decimals()
        .call()
        .then((deci) => {
          setDecimals(deci);
          console.log("Token deci:", deci);
        })
        .catch((error) => console.error("Error getting token decimal:", error));

      let tokenOwner = erc20.methods
        .owner()
        .call()
        .then((own) => {
          setOwner(own);
          console.log("Token own:", own);
        })
        .catch((error) => console.error("Error getting token supply:", error));

      const tokenName = erc20.methods
        .name()
        .call()
        .then((name) => {
          setName(name);
          console.log("Token Name:", name);
        })
        .catch((error) => console.error("Error getting token name:", error));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="token">
      <h1>Token Details Viewer</h1>
      <form onSubmit={getDetail} className="token__input">
        <input
          type="text"
          onChange={(e) => setContractAddress(e.target.value)}
          placeholder="Enter token contract address"
        />
      </form>

      {name ? (
        <div className="token__details">
          {name && (
            <div className="token__details__item">
              <h2>Token Name</h2>
              <p>{name}</p>
            </div>
          )}
          {owner && (
            <div className="token__details__item">
              <h2>Owner</h2>
              <p className="long-text">{owner}</p>
            </div>
          )}
          {decimals && (
            <div className="token__details__item">
              <h2>Decimals</h2>
              <p>{decimals}</p>
            </div>
          )}
          {supply && (
            <div className="token__details__item">
              <h2>Total Supply </h2>
              <p>{supply}</p>
            </div>
          )}
        </div>
      ) : (
        <p className="no__token"> Enter a contract address to view details</p>
      )}

      <footer className="token__footer">
        <p>DiamundLabs Assessment</p>
        <br />

        <p>Daniel Osariemen Osazee </p>
      </footer>
    </div>
  );
}

export default App;
