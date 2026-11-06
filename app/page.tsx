import HeroLoop from "@/components/home/HeroLoop";
import { Global, Process, Products, Proof, Services } from "@/components/home/home";
import { Agents, Closing, Industries, Why } from "@/components/home/sections";
import "./home.css";

export default function Home() {
  return (
    <>
      <HeroLoop />
      <Proof />
      <Services />
      <Industries />
      <Agents />
      <Products />
      <Process />
      <Global />
      <Why />
      <Closing />
    </>
  );
}
