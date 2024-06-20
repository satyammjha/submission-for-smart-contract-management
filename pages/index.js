import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  }

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait()
      alert("Deposit successful");
      getBalance();
    }
  }

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait()
      alert("Withdrawal successful");
      getBalance();
    }
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p >Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button style={{ padding: '15px', color: "#f2f2f2", backgroundColor: "#01796F", fontFamily: "sans-serif", cursor: "pointer", border: "none", borderRadius: '3px' }} onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div style={{ margin: '7vh -50px', width: "max-content", padding: "20px", backgroundColor: "#f2f2f2" }}>
        <p><span style={{ fontSize: "25px", fontWeight: "bold", fontFamily: 'sans-serif', marginRight: "10px" }}>Your Account:</span><span style={{ backgroundColor: '#01796F', color: 'white', padding: '6px', borderRadius: '10px' }}>{account}</span></p>

        <p><span style={{ fontSize: "25px", fontWeight: "bold", fontFamily: 'sans-serif', marginRight: "10px" }}>Your Balance:</span><span style={{ backgroundColor: '#01796F', color: 'white', padding: '6px', borderRadius: '10px' }}>{balance}</span></p>
        <button onClick={deposit} style={{ backgroundColor: '#01796F', padding: '10px', border: "none", color: 'white', fontFamily: "sans-serif", cursor: "pointer", borderRadius: "3px", marginRight: '10px' }}>Deposit 1 ETH</button>
        <button onClick={withdraw} style={{ backgroundColor: '#01796F', padding: '10px', border: "none", color: 'white', fontFamily: "sans-serif", cursor: "pointer", borderRadius: "3px" }}>Withdraw 1 ETH</button>
      </div>
    )
  }

  useEffect(() => { getWallet(); }, []);

  return (
    <main className="container">
      <header>
        <h1 style={{ color: "#10796F", fontFamily: "sans-serif" }}>The Block ATM !!!</h1>
        <p style={{ marginTop: "-15px", marginLeft: "70px" }}>--satyam kumar</p>
      </header>


      {initUser()}
      <style jsx>{`
        .container {
        margin-left: 40vw;
          text-align: center,
          margin-top: 50px;
        },
        
      `}
      </style>
    </main>
  )
}
