import { createBrowserRouter } from "react-router-dom";
// import Root from "../layouts/Root";
import Home from "../Pages/Home/Home";
import Root from "../Layouts/Root/Root";
import About from "../Pages/About/About";
import More from "../Pages/More/More";
import ImgDetails from "../Components/ImgDetails/ImgDetails";
import Page1 from "../Pages/Page1";
import Page2 from "../Pages/Page2";
import Page3 from "../Pages/Page3";
import Page4 from "../Pages/Page4";
import Page5 from "../Pages/Page5";
import Page6 from "../Pages/Page6";
import Page7 from "../Pages/Page7";
import Page8 from "../Pages/Page8";
import Page9 from "../Pages/Page9";
import Page10 from "../Pages/Page10";
import Page11 from "../Pages/Page11";
import ViewUrl from "../Pages/ViewUrl/ViewUrl";
import IPTV from "../Pages/IPTV/IPTV";
import VPlayer from "../Pages/VPlayer/VPlayer";
import SavedChannelsPage from "../Pages/SavedChannelPage/SavedChannelPage";
// import Banner from "../Pages/Banner/Banner";
// import Home from "../Pages/Home/Home";
// import Home from "../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        // children:[
        //     {
        //         path: '/bannerDetails/:id',
        //         element: <ImgDetails></ImgDetails> ,
        //         // loader: ()=> fetch(`banner.json`)
        //     }
        // ]
      },
      {
        path: "/bannerDetails/:id",
        element: <ImgDetails></ImgDetails>,
        // loader: ()=> fetch(`banner.json`)
      },
      {
        path: "/iptv",
        element: <IPTV></IPTV>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/view",
        element: <ViewUrl></ViewUrl>,
      },
      {
        path: "/v-player",
        element: <VPlayer></VPlayer>,
      },
      {
        path: "/saved-channels",
        element: <SavedChannelsPage></SavedChannelsPage>,
      },
      {
        path: "/more",
        element: <More></More>,
      },
      {
        path: "/page1",
        element: <Page1></Page1>,
        // loader: fetch('/page1.json')
      },
      {
        path: "/page2",
        element: <Page2></Page2>,
      },
      {
        path: "/page3",
        element: <Page3></Page3>,
      },
      {
        path: "/page4",
        element: <Page4></Page4>,
      },
      {
        path: "/page5",
        element: <Page5></Page5>,
      },
      {
        path: "/page6",
        element: <Page6></Page6>,
      },
      {
        path: "/page7",
        element: <Page7></Page7>,
      },
      {
        path: "/page8",
        element: <Page8></Page8>,
      },
      {
        path: "/page9",
        element: <Page9></Page9>,
      },
      {
        path: "/page10",
        element: <Page10></Page10>,
      },
      {
        path: "/page11",
        element: <Page11></Page11>,
      },
    ],
  },
]);

export default router;
