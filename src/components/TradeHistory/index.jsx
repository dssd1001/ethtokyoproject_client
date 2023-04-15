export function TradeHistory({ userTradeRecords }) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl ring-1 ring-zinc-900/7.5 dark:ring-1 dark:ring-white/10">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="min-h-[calc(theme(spacing.12)+1px)] gap-x-4 border-b border-zinc-900/5 bg-zinc-900/5 px-4 dark:border-zinc-800 dark:bg-zinc-900">
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-zinc-900 dark:text-white sm:pl-6"
            >
              Action
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-xs font-semibold text-zinc-900 dark:text-white"
            >
              Contract
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-right text-xs font-semibold text-zinc-900 dark:text-white"
            >
              Quantity
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-right text-xs font-semibold text-zinc-900 dark:text-white"
            >
              Yield
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Txn</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y bg-zinc-50  dark:bg-white/2.5 dark:divide-white/5">
          {userTradeRecords.map((userTradeRecord) => (
            <tr key={userTradeRecord.action}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6 text-zinc-600 dark:text-zinc-400">
                {userTradeRecord.action}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {userTradeRecord.contract}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">
                {userTradeRecord.quantity}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-indigo-500">
                {userTradeRecord.yield}
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <a href="#" className="text-gray-500 hover:text-gray-600">
                  Txn<span className="sr-only">, {userTradeRecord.action}</span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
