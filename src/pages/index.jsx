import { HeroPattern } from "@/components/HeroPattern";
import { PortfolioSummary } from "@/components/PortfolioSummary";
import { PortfolioTradeHistory } from "@/components/PortfolioTradeHistory";

import { userWalletAssets } from "@/content/userWalletAssets";
import { userVaultAllocations } from "@/content/userVaultAllocations";
import { userTradeRecords } from "@/content/userTradeRecords";

const PortfolioPage = () => {
  return (
    <>
      <HeroPattern />
      <PortfolioSummary
        userWalletAssets={userWalletAssets}
        userVaultAllocations={userVaultAllocations}
      />
      <PortfolioTradeHistory userTradeRecords={userTradeRecords} />
    </>
  );
};

export default PortfolioPage;
