import Navbar from "../components/Navbar";
import Pedigree from "./components/pedigree/Pedigree/Pedigree";

const Introduce = () => {
  return (
    <>
      <Navbar />
      <div className="px-10 mx-auto">
        <div className="w-full h-screen font-light text-[#222] antialiased leading-[1.5]">
          <Pedigree />
        </div>
      </div>
    </>
  );
};

export default Introduce;
