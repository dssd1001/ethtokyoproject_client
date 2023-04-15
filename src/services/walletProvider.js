import { SafeEventEmitterProvider } from "@web3auth/base";
import Web3 from "web3";
import { AbiItem } from 'web3-utils'

const ethProvider = (provider) => {
  const getAddress = async () => {
    try {
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      return accounts[0];
    } catch (error) {
      return error;
    }
  };

  const getBalance = async () => {
    try {
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
      // Get user's balance in ether
      const balance = web3.utils.fromWei(
        await web3.eth.getBalance(address) // Balance is in wei
      );
      return parseFloat(balance).toFixed(2); // Two decimals
    } catch (error) {
      return error;
    }
  };

  const getUSDBalance = async () => {
    try {
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
      const usdAddress = process.env.NEXT_PUBLIC_ADDRESS_USDC_MATIC;
      const minABI = [
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "balance", type: "uint256" }],
          type: "function",
        },
      ];

      const contract = new web3.eth.Contract(minABI, usdAddress);
      const result = await contract.methods.balanceOf(address).call();
      const balance = parseInt(result) / 10**6;

      return balance.toFixed(0); // No decimals
    } catch (error) {
      return error;
    }
  };

  const signMessage = async () => {
    try {
      const pubKey = (await provider.request({ method: "eth_accounts" }));
      const web3 = new Web3(provider);
      const message = "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";
      (web3.currentProvider)?.send(
        {
          method: "eth_sign",
          params: [pubKey[0], message],
          from: pubKey[0],
        },
        (err, result) => {
          if (err) {
            console.error(err);
          }
          console.log("Eth sign message => true", result);
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const signAndSendTransaction = async () => {
    try {
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();

      const txRes = await web3.eth.sendTransaction({
        from: accounts[0],
        to: accounts[0],
        value: web3.utils.toWei("0.01"),
      });
      console.log("txRes", txRes);
    } catch (error) {
      console.error(error);
    }
  };

  const signTransaction = async () => {
    try {
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      console.log("pubKey", accounts);
      // only supported with social logins (openlogin adapter)
      const txRes = await web3.eth.signTransaction({
        from: accounts[0],
        gas: 21000,
        to: accounts[0],
        value: web3.utils.toWei("0.01"),
      });
      console.log("txRes", txRes);
    } catch (error) {
      console.error(error);
    }
  };
  return { getAddress, getBalance, getUSDBalance, signMessage, signAndSendTransaction, signTransaction };
};

export const getWalletProvider = (provider) => {
  return ethProvider(provider);
};
