import { Heading } from "@/components/Heading";
import { Deposit } from "@/components/Deposit";
import { PortfolioAllocationsChart } from "@/components/PortfolioAllocationsChart";
import { PortfolioAllocationsList } from "@/components/PortfolioAllocationsList";
import { PortfolioValueChart } from "@/components/PortfolioValueChart";
import React from "react";

function PortfolioSummaryComponent({ userWalletAssets, userVaultAllocations }) {
  return (
    <div className="not-prose overflow-hidden rounded-2xl ring-1 ring-zinc-900/7.5 dark:ring-1 dark:ring-white/10">
      <h1 className="sr-only">Page title</h1>
      {/* Main 3 column grid */}
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-0">
        {/* Left column */}
        <div className="grid grid-cols-1 gap-4 ">
          <section aria-labelledby="section-1-title">
            <h2 className="sr-only" id="section-1-title">
              Section title
            </h2>
            <div className="overflow-hidden rounded-l-lg bg-zinc-50 dark:bg-white/2.5 border-r dark:border-zinc-800">
              <div className="p-6">
                <PortfolioAllocationsChart
                  userWalletAssets={userWalletAssets}
                  userVaultAllocations={userVaultAllocations}
                />
                {/* <PortfolioAllocationsList
                  userWalletAssets={userWalletAssets}
                  userVaultAllocations={userVaultAllocations}
                /> */}
              </div>
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          <section aria-labelledby="section-2-title">
            <h2 className="sr-only" id="section-2-title">
              Section title
            </h2>
            <div className="overflow-hidden rounded-r-lg  dark:bg-zinc-900">
              <div className="">
                <PortfolioValueChart />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export function FundSummary({ userWalletAssets, userVaultAllocations }) {
  return (
    <div className="my-16 xl:max-w-none">
      <div className="flex justify-between">
        <Heading level={2} id="resources">
          Fund Performance
        </Heading>
        <div className="mt-12">
          <Deposit />
        </div>
      </div>
      <div className="not-prose grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-1">
        <PortfolioSummaryComponent
          userWalletAssets={userWalletAssets}
          userVaultAllocations={userVaultAllocations}
        />
      </div>
    </div>
  );
}
