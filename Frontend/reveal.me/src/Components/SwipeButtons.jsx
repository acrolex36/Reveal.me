import love_button from "../images/love_button.png";
import reject_button from "../images/reject_button.png";
import back_button from "../images/back_button.png";

const SwipeButtons = () => {
  return (
    <div>
      <div class="w-auto m-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 class="sr-only">Products</h2>

        <div class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <a href="#" class="group">
            <div class="w-full aspect-w-1 aspect-h-1  overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
              <img
                className="scale-50 hover:scale-75 ease-in duration-150"
                src={back_button}
                alt="back button"
              />
            </div>
          </a>

          <a href="#" class="group">
            <div class="w-full aspect-w-1 aspect-h-1  overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
              <img
                className="scale-50 hover:scale-75 ease-in duration-150"
                src={reject_button}
                alt="reject button"
              />
            </div>
          </a>

          <a href="#" class="group">
            <div class="w-full aspect-w-1 aspect-h-1 overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
              <img
                className="scale-50 hover:scale-75 ease-in duration-75"
                src={love_button}
                alt="love button"
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
export default SwipeButtons;
