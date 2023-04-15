import { Heading } from "@/components/Heading";
import { TransferHistory } from "@/components/TransferHistory";

export function RecordsTransferHistory({ userTransferRecords }) {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="resources">
        Transfer History
      </Heading>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        A list of your PnLs from your funds.
      </p>
      <div className="not-prose gap-8 sm:grid-cols-2 xl:grid-cols-1">
        <TransferHistory userTransferRecords={userTransferRecords} />
      </div>
    </div>
  );
}
