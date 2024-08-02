import Image from "next/image";
import { ContainerColorWeel } from "./pagina/Color-Wheel/ContainerColorWeel";

export default function Home() {
  return (
    <main className="">
      <h1 className="w-full text-center font-bold">Color Wheel</h1>
      <div className="w-full flex justify-center">
        <ContainerColorWeel/>
      </div>
    </main>
  );
}
