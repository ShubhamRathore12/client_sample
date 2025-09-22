import { styled } from "@mui/material/styles";
import { Swiper } from "swiper/react";

const StyledSwiper = styled(Swiper)`
  & .swiper-pagination {
    margin: 0;
  }

  & .swiper-pagination-bullet {
    background-color: #b7e5cb;
    transition: all 0.5s ease;
    width: 6px;
    height: 6px;
    padding: 0;
    margin: 0 10px !important;
    border-radius: 4px;
    display: inline-block;
    cursor: pointer;
  }

  & .swiper-pagination-bullet-active {
    background-color: ${({ theme }) => theme.palette.primary.green};
    padding: 0;
    width: 20px;
  }

  & .swiper-slide {
    border-radius: 4;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    ${({ theme }) => `${theme.breakpoints.down("sm")} {
      // overflow: hidden;
    }`}
  }

  & .swiper-pagination-bullets {
    display: flex;
    justify-content: center;
    margin-top: 24px;
  }
`;

export default StyledSwiper;
