import Sidebar from "../Components/Sidebar";
import Profile from "../Components/Profile";
import SwipeButtons from "../Components/SwipeButtons";
import Header from "../Components/Header";
const HomePage = () => {
  function toggleSidebar() {
    const aside = document.querySelector("aside");
    aside.classList.toggle("sm:hidden");
    aside.classList.toggle("hidden");
  }

  function toggleMobileMenu() {
    const aside = document.querySelector(".mobile-menu");
    aside.classList.toggle("hidden");
  }
  return (
    <>
      <div class="hidden absolute mobile-menu overflow-none flex w-full">
        <div class=" w-64 bg-opacity-90 bg-gray-300">
          mobile menu
          <button
            onClick={toggleMobileMenu}
            class="border h-8 px-2 ml-4 bg-gray-100 shadow rounded-full hover:bg-gray-200"
          >
            toggle mobile
          </button>
        </div>
        <div class="w-full h-screen bg-opacity-80 bg-indigo-300"></div>
      </div>

      <div class="flex flex-col h-screen bg-pink">
        <div>
          <Header></Header>
        </div>

        <div class="flex flex-1">
          <aside class="hidden sm:block">
            <Sidebar></Sidebar>
          </aside>

          <main class="flex flex-col px-4">
            <Profile></Profile>
            <SwipeButtons></SwipeButtons>
          </main>
        </div>
      </div>
    </>
  );
};

export default HomePage;
