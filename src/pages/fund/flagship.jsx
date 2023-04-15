import { FundSummary } from "@/components/FundSummary";
import { FundDepositHistory } from "@/components/FundDepositHistory";
import { RecordsTransferHistory } from "../../components/RecordsTransferHistory";

import { userTransferRecords } from "../../content/userTransferRecords";
import { userWalletAssets } from "@/content/userWalletAssets";
import { userVaultAllocations } from "@/content/userVaultAllocations";

const FlagshipPage = () => {
  return (
    <>
      <FundSummary
        userWalletAssets={userWalletAssets}
        userVaultAllocations={userVaultAllocations}
      />
      <FundDepositHistory userTransferRecords={userTransferRecords} />
    </>
  );
};

export default FlagshipPage;
