import dumbellIcon from "@/assets/icons/dumbbellicon.jpg";
import cardioIcon from "@/assets/icons/cardioicon.jpg";
import buildIcon from "@/assets/icons/buildicon.jpg";

export const pricingCardElements = [
  {
    title: "Master",
    price: "Ksh 2,000",
    prefered: false,
    image: dumbellIcon,
    tierId: 1,
    items: [
      {
        item: "5 Days In A Week",
        active: true,
      },
      {
        item: "01 Sweatshirt",
        active: true,
      },
      {
        item: "01 Bottle Of Protein",
        active: false,
      },
      {
        item: "Access To Videos",
        active: false,
      },
      {
        item: "Muscle Stretching",
        active: false,
      },
    ],
  },
  {
    title: "Kiongoss",
    price: "Ksh 5,000",
    image: cardioIcon,
    prefered: true,
    tierId: 2,
    items: [
      {
        item: "5 Days In A Week",
        active: true,
      },
      {
        item: "01 Sweatshirt",
        active: true,
      },
      {
        item: "01 Bottle Of Protein",
        active: true,
      },
      {
        item: "Access To Videos",
        active: false,
      },
      {
        item: "Muscle Stretching",
        active: false,
      },
    ],
  },
  {
    title: "Bazuu",
    price: "Ksh 10,000",
    tierId: 3,
    image: buildIcon,
    prefered: false,
    items: [
      {
        item: "5 Days In A Week",
        active: true,
      },
      {
        item: "01 Sweatshirt",
        active: true,
      },
      {
        item: "01 Bottle Of Protein",
        active: true,
      },
      {
        item: "Access To Videos",
        active: true,
      },
      {
        item: "Muscle Stretching",
        active: true,
      },
    ],
  },
];
