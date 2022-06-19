import Sidebar from "../Components/Sidebar";
import Profile from "../Components/Profile";
import SwipeButtons from "../Components/SwipeButtons";
const HomePage = () => {
  return (
    <div class="bg-pink grid grid-cols-7">
      <Sidebar></Sidebar>
      <main class="col-span-3 ">
        <div class="flex flex-col h-screen  ">
          <div class="my-auto">
            <div class="flex items-center justify-center">
              <Profile></Profile>{" "}
            </div>
            <div class="flex items-center justify-center" F>
              <SwipeButtons></SwipeButtons>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
