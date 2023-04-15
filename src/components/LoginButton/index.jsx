import { Button } from "@/components/Button";
import { LoadingIcon } from "@/components/icons/LoadingIcon";

import { useWeb3Auth } from "@/services/web3auth";

export function LoginButton({ className }) {
  const { provider, login, logout, isLoading } = useWeb3Auth();

  return (
    <div>
      <Button
        onClick={provider ? logout : login}
        className={className} 
      >
        {isLoading ? (
          <LoadingIcon className="h-5 w-5 animate-spin stroke-zinc-200 text-zinc-900 dark:stroke-zinc-800 dark:text-amber-400" />
        ) : (
          provider ? 'Log Out' : 'Log In'
        )}
      </Button>
    </div>
  );
}
