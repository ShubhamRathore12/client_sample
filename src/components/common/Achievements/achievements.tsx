import React from "react";
import AwardIconFive from "./icons/awards/AwardIconFive";
import AwardIconFour from "./icons/awards/AwardIconFour";
import AwardIconOne from "./icons/awards/AwardIconOne";
import AwardIconThree from "./icons/awards/AwardIconThree";
import AwardIconTwo from "./icons/awards/AwardIconTwo";

export interface IAchievement {
  id: number;
  Icon: JSX.Element;
  body: string;
}

const achievements: IAchievement[] = [
  {
    id: 1,
    Icon: <AwardIconOne />,
    body: "Lorem ipsum dolor sit amet, consectetuer ligula",
  },
  {
    id: 2,
    Icon: <AwardIconTwo />,
    body: "Lorem ipsum dolor sit amet, consectetuer ligula",
  },
  {
    id: 3,
    Icon: <AwardIconThree />,
    body: "Lorem ipsum dolor sit amet, consectetuer ligula",
  },
  {
    id: 4,
    Icon: <AwardIconFour />,
    body: "Lorem ipsum dolor sit amet, consectetuer ligula",
  },
  {
    id: 5,
    Icon: <AwardIconFive />,
    body: "Lorem ipsum dolor sit amet, consectetuer ligula",
  },
];

export default achievements;
