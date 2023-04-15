import { FundCards } from "@/components/FundCards";
import { appVaultNames } from "@/content/appVaultNames";

const FundsPage = () => {
  console.log(appVaultNames);
  return (
    <>
      <FundCards appVaultNames={appVaultNames} />
    </>
  );
};

export default FundsPage;
