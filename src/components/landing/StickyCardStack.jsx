import React from "react";

const cards = [
  { title: "Card 1", color: "bg-red-300" },
  { title: "Card 2", color: "bg-blue-300" },
  { title: "Card 3", color: "bg-green-300" },
  { title: "Card 4", color: "bg-yellow-300" },
];

const StickyCardStack = () => {
  return (
 
      <div className="relative mx-auto space-y-40">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`sticky top-0 h-[459px] w-[1060px] rounded-xl shadow-xl text-white text-2xl font-bold flex items-center justify-center ${card.color}`}
          >
            {card.title}
          </div>
        ))}
      </div>

  );
};

export default StickyCardStack;
