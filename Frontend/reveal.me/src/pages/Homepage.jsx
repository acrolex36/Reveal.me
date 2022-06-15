import Sidebar from "../Components/Sidebar"
import Profile from "../Components/Profile";

const Homepage = () => {
  return (
    <div class="grid grid-cols-7">
      <Sidebar></Sidebar>

      <main class="col-span-6">
        <div class="flex h-screen">
          <div class="m-auto">
            <Profile></Profile>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Homepage;
