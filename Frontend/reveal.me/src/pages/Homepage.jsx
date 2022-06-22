import Sidebar from "../Components/Sidebar";
import Profile from "../Components/Profile";
import SwipeButtons from "../Components/SwipeButtons";
import Advanced from "../Components/Advanced";
import Header from "../Components/Header";
import TinderCards from "../Components/TinderCards";
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
      <div className="flex flex-col h-screen bg-pink-50">
        <Header></Header>
        <div className="flex flex-1">
          <aside className="hidden sm:block">
            <Sidebar></Sidebar>
          </aside>
          <main class="">
            <Advanced></Advanced>
          </main>
        </div>
      </div>
    </>
  );
};

export default HomePage;
