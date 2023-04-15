import { ADAPTER_EVENTS } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CHAIN_CONFIG } from "@/config/chainConfig";
import { getWalletProvider } from "./walletProvider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";

export const Web3AuthContext = createContext({
  web3Auth: null,
  provider: null,
  isLoading: false,
  chain: "",
  user: null,
  login: async () => {},
  logout: async () => {},
  getUserInfo: async () => {},
  signMessage: async () => {},
  getAddress: async () => {},
  getBalance: async () => {},
  getUSDBalance: async () => {},
  signTransaction: async () => {},
  signAndSendTransaction: async () => {},
});

export function useWeb3Auth() {
  return useContext(Web3AuthContext);
}

export const Web3AuthProvider = ({ children, web3AuthNetwork, chain }) => {
  const [web3Auth, setWeb3Auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const setWalletProvider = useCallback(
    (web3authProvider) => {
      const walletProvider = getWalletProvider(web3authProvider);
      setProvider(walletProvider);
    },
    [chain]
  );

  useEffect(() => {
    const subscribeAuthEvents = (web3auth) => {
      // Can subscribe to all ADAPTER_EVENTS and LOGIN_MODAL_EVENTS
      web3auth.on(ADAPTER_EVENTS.CONNECTED, (data) => {
        console.log("Yeah!, you are successfully logged in", data);
        setUser(data);
        setWalletProvider(web3auth.provider);
      });

      web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
        console.log("connecting");
      });

      web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
        console.log("disconnected");
        setUser(null);
      });

      web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
        console.error("some error or user has cancelled login request", error);
      });
    };

    const currentChainConfig = CHAIN_CONFIG[chain];

    async function init() {
      try {
        const clientId = {
          testnet: "BNqNgWrd6XrNpO4xJNxje7gYQ0X9E7mpzClbYbkp8-2ST2j4OTYJkCLl7Utm2oDrys0HqN2IIOr6PSWpKeqm9zc",
          mainnet: "BGuRjCwdOX1j4PVRl6xu613d9DPG4QBaGcSEQEUxi1taAU3D9x2FSsWtbZNVKKJVu677pwgP0MMgyYyw2Yxm7YY",
        };
        setIsLoading(true);
        const web3AuthInstance = new Web3Auth({
          chainConfig: currentChainConfig,
          clientId: clientId[web3AuthNetwork],
          uiConfig: {
            theme: window.localStorage.theme,
            loginMethodsOrder: ['google', 'apple', 'twitter', 'kakao'],
            // defaultLanguage: 'ko',
          },
          web3AuthNetwork: web3AuthNetwork,
        });

        const adapter = new OpenloginAdapter({ adapterSettings: { network: web3AuthNetwork } });
        web3AuthInstance.configureAdapter(adapter);
        const metamaskAdapter = new MetamaskAdapter({
          sessionTime: 86400, // 1 day in seconds
        });
        web3AuthInstance.configureAdapter(metamaskAdapter);
        subscribeAuthEvents(web3AuthInstance);
        setWeb3Auth(web3AuthInstance);
        await web3AuthInstance.initModal();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, [chain, web3AuthNetwork, setWalletProvider]);

  const login = async () => {
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    try {
      setIsLoading(true);
      const localProvider = await web3Auth.connect();
      setWalletProvider(localProvider);
      console.log('Logged in successfully!');
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    setIsLoading(true);
    await web3Auth.logout();
    setProvider(null);
    setIsLoading(false);
  };

  const getUserInfo = async () => {
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3Auth.getUserInfo();
    console.log(user);
    return user;
  };

  const getAddress = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    return await provider.getAddress();
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    return await provider.getBalance();
  };

  const getUSDBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    return await provider.getUSDBalance();
  };

  const signMessage = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    await provider.signMessage();
  };

  const signTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    await provider.signTransaction();
  };

  const signAndSendTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    await provider.signAndSendTransaction();
  };

  const contextProvider = {
    web3Auth,
    chain,
    provider,
    user,
    isLoading,
    login,
    logout,
    getUserInfo,
    getAddress,
    getBalance,
    getUSDBalance,
    signMessage,
    signTransaction,
    signAndSendTransaction,
  };
  return <Web3AuthContext.Provider value={contextProvider}>{children}</Web3AuthContext.Provider>;
};
