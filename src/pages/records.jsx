import { RecordsTransferHistory } from "../components/RecordsTransferHistory";
import { RecordsTradeHistory } from "../components/RecordsTradeHistory";

import { userTransferRecords } from "@/content/userTransferRecords";
import { userTradeRecords } from "@/content/userTradeRecords";

const RecordsPage = () => {
  return (
    <>
      <RecordsTransferHistory userTransferRecords={userTransferRecords} />
      <RecordsTradeHistory userTradeRecords={userTradeRecords} />
    </>
  );
};

export default RecordsPage;
