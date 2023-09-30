import React from "react";
import Banner from '../../assets/images/banner-1.png';
import Grid1 from '../../assets/images/grid1.png';



const Home = () => {



  return (
    <div class="container">
      <div class="row">
        <div class="col-lg-6 back-linear">
          <img
            class="mt-5 ms-4 px-auto d-none d-md-block"
            src={Banner}
            height="450px"
            alt="banner"
          />
          <div class="banner-col-1">
            <img src={Grid1} height="130px" width="130px" alt="" />
          </div>
        </div>
        <div class="col-lg-6 banner-col-2 px-0 d-flex align-items-center">
          <div class="col-lg-10 position-relative">
            <div class="banner-col-2">
              <img
                src={Grid1}
                height="110px"
                width="130px"
                alt=""
              />
            </div>
            <h1 class="text-white">
              Create Your <span> NFT </span>
              <br />
              Dream Gallery
            </h1>
            <p className="mt-4 text-white">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae
              vitae cum natus possimus sunt pariatur, voluptates alias vero.
            </p>
            <div class="col-lg-10 mt-5">
            
              <button class="banner-btn-1">Explore Now</button>
              <button class="banner-btn-2">Create Nft</button>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
 