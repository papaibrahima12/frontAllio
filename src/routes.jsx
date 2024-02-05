import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Bon, Notifications, Campagne, Fidelite } from "@/pages/dashboard";
import {Login, SignUp } from "@/pages/auth";


const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      
      {
        icon: <TableCellsIcon {...icon} />,
        name: "bon de reduction",
        path: "/bon",
        element: <Bon />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "campagne de promo",
        path: "/campagne",
        element: <Campagne />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "programme de fedilite",
        path: "/fidelite",
        element: <Fidelite/>,
      },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "notifications",
      //   path: "/notifications",
      //   element: <Notifications />,
      // },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      }
    ],
  },
  {
    title: "autres pages",
    layout: "auth",
    pages: [
      {
        
        path: "/sign",
        element: <Login/>,
      },
      {
        // icon: <RectangleStackIcon {...icon} />,
        // name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
