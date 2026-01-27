import { useState, useEffect } from "react";
import type { ReactElement, ElementType } from "react";
import {
  Drum,
  Van,
  Trees,
  Rocket,
  CupSoda,
  Star,
  Tractor,
  Plane,
  Volleyball,
  ChartSpline,
  SearchAlert,
} from "lucide-react";

interface CardProps {
  emblem: IconName;
  setOnClick: (emblem: string) => void;
  isFlipped: boolean; // controlled flip
  isGuessed: boolean;
  disabled: boolean;
}
type IconName =
  | "None"
  | "Plane"
  | "CupSoda"
  | "ChartSpline"
  | "Trees"
  | "Tractor"
  | "Van"
  | "Volleyball"
  | "Rocket"
  | "Drum";
type BackgroundColor = "white" | "black";
type TextColor = "white" | "black";

const getIconComponent = (iconName: IconName): ElementType => {
  switch (iconName) {
    case "Plane":
      return Plane;
    case "CupSoda":
      return CupSoda;
    case "ChartSpline":
      return ChartSpline;
    case "Trees":
      return Trees;
    case "Tractor":
      return Tractor;
    case "Van":
      return Van;
    case "Volleyball":
      return Volleyball;
    case "Rocket":
      return Rocket;
    case "Drum":
      return Drum;
    default:
      return ChartSpline;
  }
};

export default function Card({
  setOnClick,
  emblem,
  isFlipped,
  isGuessed,
  disabled,
}: CardProps) {
  const [Rotation, setRotation] = useState(0);
  const [color, setColor] = useState<{
    background: BackgroundColor;
    color: TextColor;
  }>({
    background: "white",
    color: "black",
  });
  const IconComponent = getIconComponent(emblem);

  // Animate rotation when isFlipped changes
  useEffect(() => {
    if (isFlipped) {
      setRotation(180);
      setColor({ background: "black", color: "white" });
    } else {
      setRotation(0);
      setColor({ background: "white", color: "black" });
    }
  }, [isFlipped]);

  const bgMap = {
    white: "bg-white",
    black: "bg-black",
  };
  const clMap = {
    black: "text-black",
    white: "text-white",
  };

  return (
    <>
      <button
        className={`${bgMap[color.background]} h-30 w-30 ${clMap[color.color]} cursor-pointer group hover:scale-95 transition-transform duration-200 ease-in-out shadow-lg  flex items-center justify-center`}
        style={{
          transform: `rotateY(${Rotation}deg)`,
        }}
        onClick={() => {
          !isFlipped
            ? setColor({ background: "black", color: "white" })
            : setColor({ background: "white", color: "black" });
          !isFlipped ? setRotation(180) : setRotation(0);
          setOnClick(emblem);
        }}
        disabled={isFlipped || disabled || isGuessed}
      >
        {isFlipped && (
          <IconComponent
            size={80}
            className="text-emerald-500/40 group-hover:text-emerald-500/60 transition-colors duration-300"
          />
        )}
        {isGuessed && (
          <Star
            size={80}
            className="text-black group-hover:text-emerald-500/60 transition-colors duration-300"
          />
        )}
      </button>
    </>
  );
}
