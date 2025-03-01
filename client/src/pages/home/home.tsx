import { type JSX } from "react";
import shelfImage from "../../assets/shelf.png";

function Home(): JSX.Element {
  return (
    <div className={`flex flex-col gap-8 p-8`}>
      <div className={`relative flex gap-8 flex-wrap justify-around items-end`}>
        <div
          className={`h-76
           flex flex-col gap-4 z-10`}>
          <div className={`text-5xl uppercase font-semibold leading-tight`}>
            Popular <br />
            Bestseller
          </div>
          <div className={`text-lg max-w-xs`}>
            We picked up the most popular books for you, based on your taste.
            <br />
            Check it!
          </div>
          <div className={`flex justify-center items-center`}>
            <button
              className={`px-8 py-2 text-lg bg-tertiary rounded-lg w-fit text-white font-semibold`}>
              Watch full list
            </button>
          </div>
        </div>
        <img
          className={`h-76
             aspect-[3/4] temp object-cover rounded-lg  z-10`}
          src="https://admin.itsnicethat.com/images/XSRykZCRQhGROOBt6Yug8QTbykI=/95588/format-webp%7Cwidth-1440/54e335375c3e3c758b0000f5.jpg"
          alt="book cover"
        />
        <img
          className={`h-64 aspect-[3/4] temp object-cover rounded-lg  z-10`}
          src="https://admin.itsnicethat.com/images/XSRykZCRQhGROOBt6Yug8QTbykI=/95588/format-webp%7Cwidth-1440/54e335375c3e3c758b0000f5.jpg"
          alt="book cover"
        />
        <img
          className={`h-60 aspect-[3/4] temp object-cover rounded-lg  z-10`}
          src="https://admin.itsnicethat.com/images/XSRykZCRQhGROOBt6Yug8QTbykI=/95588/format-webp%7Cwidth-1440/54e335375c3e3c758b0000f5.jpg"
          alt="book cover"
        />
        <img
          className={`h-60 aspect-[3/4] temp object-cover rounded-lg  z-10`}
          src="https://admin.itsnicethat.com/images/XSRykZCRQhGROOBt6Yug8QTbykI=/95588/format-webp%7Cwidth-1440/54e335375c3e3c758b0000f5.jpg"
          alt="book cover"
        />
        {/* <img
          className={`absolute top-16 w-full bg-pink-500 h-96`}
          src={shelfImage}
          alt="bookshelf"
        /> */}
      </div>
    </div>
  );
}

export default Home;
