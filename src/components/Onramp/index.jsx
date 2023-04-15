import {
  forwardRef,
  Fragment,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Button } from "@/components/Button";
import { Pre, Code } from "@/components/Code";
import { Tag } from "@/components/Tag";

import { useWeb3Auth } from "@/services/web3auth";
import Transak from "@biconomy/transak";

function OnrampOptions({ setStep }) {
  const { provider, login, isLoading, getAddress } = useWeb3Auth();

  const fiatOnramp = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const address = await getAddress();
    const transak = new Transak('PRODUCTION', {
      disableWalletAddressForm: true,
      walletAddress: address,
      cryptoCurrencyCode: 'USDT',
      network: 'polygon',
      themeColor: '000000',
      hideMenu: true,
      exchangeScreenTitle: 'Fund your account with USDT',
    });
    transak.init();
  };

  const selectTransfer = () => {
    setStep(1);
  };

  return (
    <div className="items-center text-center p-5">
      <h3 className="text-md font-semibold text-zinc-900 dark:text-white">Add Funds (USDT)</h3>
      <div>
        <Button
          onClick={provider ? fiatOnramp : login}
          variant="outline"
        >
          {provider ? 'Buy' : 'Log In'}
        </Button>
        <br/>
        <Tag color="indigo">
          Banking
        </Tag>
        <Tag color="indigo">
          Credit Card
        </Tag>
        <Tag color="indigo">
          Mobile Pay
        </Tag>
      </div>
      <h5 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">or</h5>
      <div>
        <Button
          onClick={selectTransfer}
          variant="outline"
        >
          {provider ? 'Transfer' : 'Log In'}
        </Button>
        <br/>
        <Tag color="amber">
          External Crypto Wallet
        </Tag>
      </div>
    </div>
  );
}

function TransferOption({ setStep }) {
  const { provider, getAddress } = useWeb3Auth();
  let [addr, setAddr] = useState('...');

  useEffect(() => {
    (async () => {
      setAddr(await getAddress());
    })();
  }, [provider]);

  const goBack = () => {
    setStep(0);
  };

  return (
    <div className="items-center text-center p-5">
      <h3 className="text-md font-semibold text-zinc-900 dark:text-white">Receive USDT</h3>
      <div>
        {/* <Button
          onClick={()=>{}}
          variant="outline"
        >
          {provider ? 'Transfer' : 'Log In'}
        </Button> */}
        <br/>
        <Tag color="rose">
          Only send USDT (polygon) to this address:
        </Tag>
        <Pre>
          <Code language={'js'}>
            {addr}
          </Code>
        </Pre>
        <Button
          onClick={goBack}
          variant="text"
          arrow="left"
        >
        </Button>
      </div>
    </div>
  );
}

function OnrampDialog({ open, setOpen, className }) {
  let router = useRouter();

  let [step, setStep] = useState(0);

  useEffect(() => {
    if (!open) {
      setStep(0);
      return;
    }

    function onRouteChange() {
      setOpen(false);
    }

    router.events.on("routeChangeStart", onRouteChange);
    router.events.on("hashChangeStart", onRouteChange);

    return () => {
      router.events.off("routeChangeStart", onRouteChange);
      router.events.off("hashChangeStart", onRouteChange);
    };
  }, [open, setOpen, router]);

  useEffect(() => {
    if (open) {
      return;
    }

    function onKeyDown(event) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen(true);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, setOpen]);

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => {}}
    >
      <Dialog
        onClose={setOpen}
        className={clsx("fixed inset-0 z-50", className)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-zinc-400/25 backdrop-blur-sm dark:bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto px-4 py-4 sm:py-20 sm:px-6 md:py-32 lg:px-8 lg:py-[15vh]">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto overflow-hidden rounded-lg bg-zinc-50 shadow-xl ring-1 ring-zinc-900/7.5 dark:bg-zinc-900 dark:ring-zinc-800 sm:max-w-xl">
              {step===0 ? (
                <OnrampOptions setStep={setStep} />
              ) : (
                <TransferOption setStep={setStep} />
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function useOnrampProps() {
  let buttonRef = useRef();
  let [open, setOpen] = useState(false);

  return {
    buttonProps: {
      ref: buttonRef,
      onClick() {
        setOpen(true);
      },
    },
    dialogProps: {
      open,
      setOpen(open) {
        let { width, height } = buttonRef.current.getBoundingClientRect();
        if (!open || (width !== 0 && height !== 0)) {
          setOpen(open);
        }
      },
    },
  };
}

export function Onramp({ showBalance=false }) {
  let { buttonProps, dialogProps } = useOnrampProps();
  const [balance, setBalance] = useState(0);
  const { provider, isLoading, getUSDBalance } = useWeb3Auth();

  useEffect(() => {
    (async () => {
      setBalance(await getUSDBalance());
    })();
  }, [provider]);

  return (
    provider && !isLoading && (
      <div>
        <button
          type="button"
          className="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-500"
          {...buttonProps}
        >
          { showBalance ? (
            'Account Balance: ' + balance + ' USDT'
          ) : 'Add Funds' }
        </button>
        <OnrampDialog {...dialogProps} />
      </div>
    )
  );
}
