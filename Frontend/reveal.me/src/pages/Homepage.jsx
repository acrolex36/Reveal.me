import Sidebar from "../Components/Sidebar";
import TinderContainer from "../Components/TinderContainer";
import Header from "../Components/Header";

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col h-screen bg-pink-50 ">
        <Header></Header>
        <div className="flex flex-1">
            <Sidebar></Sidebar>
          <main>
            <TinderContainer></TinderContainer>
          </main>
        </div>
      </div>
    </>
  );
};

export default HomePage;
