import { Heading } from "@/components/Heading";
import { TransferHistory } from "@/components/TransferHistory";

export function FundDepositHistory({ userTransferRecords }) {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="resources">
        Deposit History
      </Heading>

      <div className="not-prose gap-8 sm:grid-cols-2 xl:grid-cols-1">
        <TransferHistory userTransferRecords={userTransferRecords} />
      </div>
    </div>
  );
}
