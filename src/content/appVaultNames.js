import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { CircleStackIcon } from "@heroicons/react/24/outline";

export const appVaultNames = [
  {
    href: "/fund/flagship",
    name: "Flagship",
    description: "Earn through slow and steady gains by trading tiny, predictable movements in price action.",
    icon: CircleStackIcon,
    pattern: {
      y: 16,
      squares: [
        [0, 1],
        [1, 3],
      ],
    },
  },
  {
    href: "/fund/compound",
    name: "Protect",
    description: "Earn by reducing your exposure to volatile market conditions and strong bearish sentiments.",
    icon: ShieldCheckIcon,
    pattern: {
      y: -6,
      squares: [
        [-1, 2],
        [1, 3],
      ],
    },
  },
];
