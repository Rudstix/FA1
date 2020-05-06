import styled from "styled-components";
import Heading from "./Heading";
import HomeNav from "./HomeNav";
import SimpleHeader from "./SimpleHeader";
import SubHeading from "./SubHeading";
import {FoodElements, TopHero, SubHero, TrustSection, PizzaPosition, SaucePosition} from "./Hero";
import {colors} from "../variables";

const AppNav = styled(HomeNav)`
  background-color: ${colors.lightestGrey};
  color: ${colors.grey};
  text-transform: none;
`;

export {
  AppNav,
  Heading,
  TopHero,
  SubHero,
  FoodElements,
  TrustSection,
  SubHeading,
  HomeNav,
  SimpleHeader,
  PizzaPosition,
  SaucePosition,
};
