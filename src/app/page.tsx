import Image from "next/image";
import { ContainerColorWeel } from "./pagina/Color-Wheel/ContainerColorWeel";

export default function Home() {
  return (
    <main className="">
      <h1 className="w-full text-center font-bold">Color Wheel</h1>
      <ContainerColorWeel/>
    </main>
  );
}
