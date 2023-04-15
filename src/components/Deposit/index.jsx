import {
  forwardRef,
  Fragment,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Button } from "@/components/Button";
import { Onramp } from "@/components/Onramp";
import { DollarIcon } from "@/components/icons/DollarIcon";
import { useWeb3Auth } from "@/services/web3auth";

function DepositIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.3213 7.73139V5.50448L20.8455 9.68346L16.3213 13.4543V11.1542H9.65488L9.65488 9.31756C9.65488 8.7395 9.09007 8.39472 8.66841 8.71536L3.32602 13.1083C2.90572 13.4279 2.88875 14.1255 3.29286 14.4712L8.63966 19.3539C9.05795 19.7118 9.65488 19.3713 9.65488 18.7749V16.9095L14.4295 16.9095C14.7446 16.9095 15 16.6541 15 16.3391C15 16.024 14.7446 15.7686 14.4295 15.7686L8.67871 15.7686L8.67871 17.9955L4.1545 13.8165L8.67871 10.0457L8.67871 12.3458L15.3451 12.3458V14.1824C15.3451 14.7605 15.9099 15.1053 16.3316 14.7846L21.674 10.3917C22.0943 10.0721 22.1113 9.37446 21.7071 9.02876L16.3603 4.14606C15.942 3.78822 15.3451 4.12866 15.3451 4.72506V6.59047H10.5705C10.2554 6.59047 10 6.84587 10 7.16093C10 7.47599 10.2554 7.73139 10.5705 7.73139H16.3213Z"
      />
    </svg>

  );
}

const AmountInput = forwardRef(function AmountInput(
  { onClose },
  inputRef
) {

  return (
    <div className="group relative flex h-12 my-8">
      <DollarIcon className="pointer-events-none absolute left-3 top-0 h-full w-5 stroke-zinc-500" />
      <input
        ref={inputRef}
        className={clsx(
          "flex-auto appearance-none bg-zinc-100 dark:bg-zinc-800 outline-none pl-10 text-zinc-900 placeholder:text-zinc-500 focus:w-full focus:flex-none dark:text-white sm:text-sm",
          "pr-4",
        )}
        placeholder="amount"
        required
        onKeyDown={(event) => {
          if (
            event.key === "Escape"
          ) {
            // In Safari, closing the dialog with the escape key can sometimes cause the scroll position to jump to the
            // bottom of the page. This is a workaround for that until we can figure out a proper fix in Headless UI.
            document.activeElement?.blur();

            onClose();
          }
        }}
      />
    </div>
  );
});

function DepositDetails({ amount }) {
  const { provider, getUSDBalance } = useWeb3Auth();

  let [balance, setBalance] = useState(null);
  let [sufficientFunds, setSufficientFunds] = useState(true);
  let [estimatedGasFee, setEstimatedGasFee] = useState(null);
  let [total, setTotal] = useState(null);

  useEffect(() => {
    (async () => {
      setBalance(await getUSDBalance());
    })();
  }, [provider]);

  useEffect(() => {
    if (balance < amount || balance == 0) {
      setSufficientFunds(false);
    }
  }, [balance, amount]);

  useEffect(() => {
    setTotal(amount + estimatedGasFee);
  }, [amount, estimatedGasFee]);

  return (
    <div className="">

      {balance && (
        <p className="text-md font-semibold text-zinc-600 dark:text-zinc-400">
          Your USDC balance
          <span className={ balance == 0 ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400" }> ${ balance }</span>
        </p>
      )}

      {!sufficientFunds && (
        <div className="flex">
          <p className="text-md font-semibold text-zinc-600 dark:text-zinc-400">
            Add more
            <span className="text-indigo-600 dark:text-indigo-400"> USDC </span>
            to continue:
          </p>
          <Onramp showBalance={false} />
        </div>
      )}

      {estimatedGasFee && (
        <p className="text-md font-semibold text-zinc-600 dark:text-zinc-400">
          Estimated gas fee
          <span className="text-black dark:text-white"> ${ estimatedGasFee }</span>
        </p>
      )}

      {total > 0 && (
        <p className="text-md font-semibold text-zinc-600 dark:text-zinc-400">
          Total
          <span className="text-black dark:text-white"> ${ total }</span>
        </p>
      )}
    </div>
  );
}

function DepositDialog({ open, setOpen, className, fundID }) {
  let formRef = useRef();
  let panelRef = useRef();
  let inputRef = useRef();

  let [fundName, setFundName] = useState('');

  useEffect(() => {
    setFundName('FLAGSHIP');
  }, [fundID]);

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
              <div className="p-5">
                <h3 className="text-md font-semibold text-zinc-900 dark:text-white">Deposit</h3>
                <div>
                  <form
                    ref={formRef}
                  >
                    <br/>
                    <h5 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                      You are about to deposit to the <b>{ fundName }</b> fund.
                    </h5>
                    <AmountInput
                      ref={inputRef}
                      onClose={() => setOpen(false)}
                    />
                    <DepositDetails />
                    <br/>
                    <Button
                      onClick={()=>{}}
                      variant="primary"
                    >
                      Deposit
                    </Button>
                  </form>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function useDepositProps() {
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

export function Deposit() {
  let { buttonProps, dialogProps } = useDepositProps();

  return (
    <div className="hidden lg:block lg:max-w-md lg:flex-auto">
      <button
        type="button"
        className="hidden h-8 items-center gap-2 rounded-full bg-white pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 lg:flex focus:[&:not(:focus-visible)]:outline-none"
        {...buttonProps}
      >
        <DepositIcon className="h-5 w-5 stroke-current" />
        Deposit
      </button>
      <DepositDialog className="hidden lg:block" {...dialogProps} />
    </div>
  );
}

export function MobileDeposit() {
  let { buttonProps, dialogProps } = useDepositProps();

  return (
    <div className="contents lg:hidden">
      <button
        type="button"
        className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5 lg:hidden focus:[&:not(:focus-visible)]:outline-none"
        aria-label="Find something..."
        {...buttonProps}
      >
        <DepositIcon className="h-5 w-5 stroke-zinc-900 dark:stroke-white" />
      </button>
      <DepositDialog className="lg:hidden" {...dialogProps} />
    </div>
  );
}
