import React from "react";
import { Tag } from "@/components/Tag";

const ItemList = ({ data }) => {
  return (
    <ul className="">
      {data.map((item, index) => (
        <li key={item.id} className="flex justify-between px-7">
          <div className="flex items-center">
            {item.name == "Flagship" ? (
              <span className={`dot bg-indigo-400 mr-1`} />
            ) : (
              <span className={`dot bg-indigo-600 mr-1`} />
            )}
            <p className="text-base">{item.name}</p>
          </div>

          <div className="flex items-center">
            <span className="text-base">{item.value}</span>
          </div>
          <div className="flex items-center">
            {item.change > 0 ? (
              <Tag color="emerald">
                <span className="text-2xs">+{item.change}%</span>
              </Tag>
            ) : (
              <Tag color="rose">
                <span className="text-2xs">{item.change}%</span>
              </Tag>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export const PortfolioAllocationsList = ({
  userWalletAssets,
  userVaultAllocations,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {/* <div className="grid grid-cols-1 gap-4"> */}
      {/* <div className="rounded-3 border p-3"> */}
      {/* <div className="d-flex align-items-center mb-4"> */}
      {/* <span className="dot bg-info bg-opacity-25" /> */}
      {/* <h6 className="mb-0 fw-bold">Fund Allocations</h6> */}
      {/* </div> */}
      <ItemList data={userVaultAllocations} />
      {/* </div> */}
      {/* </div> */}
      {/* <div className="grid grid-cols-1 gap-4 lg:col-span-2">
        <div className="rounded-3 border p-3 h-100">
          <div className="d-flex align-items-center mb-4">
            <span className="dot bg-primary bg-opacity-25" />
            <h6 className="mb-0 fw-bold">Offline Marketing</h6>
          </div>
          <ItemList data={userVaultAllocations} />
        </div>
      </div> */}
    </div>
  );
};

export default PortfolioAllocationsList;
