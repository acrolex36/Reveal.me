import love_button from "../images/love_button.png";
import reject_button from "../images/reject_button.png";
import back_button from "../images/back_button.png";

const SwipeButtons = () => {
  return (
    <div>
      <div class="w-max fixed bottom-1/3 sm:py-24 sm:px-6 lg:max-w-5xl  ">
        <div class="flex justify-evenly ">
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
