import { loader as GloabalUser, Layout } from './routes/Dashboard/Layout'
import { Error } from './component/Error'
import Home from './routes/Dashboard/Home/Home'
import Campaign from './routes/Dashboard/Camapign/Campaign'
import Contact from './routes/Dashboard/Contact/Contact'
import Profile from './routes/Dashboard/Profile/Profile'
import Login from './routes/Login'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { usePocketBase } from './context/PocketbaseProvider'
import { Gallery, loader as GalleryLoader } from './routes/Dashboard/Home/Gallery'
import {AllCamapaign ,loader as AllCamapaignLoader} from './routes/Dashboard/allcamapign/AllCamapaign'
import {CampaignDetail,loader as CampaignLoader } from './routes/Dashboard/allcamapign/CampaignDetail'


export const App = () => {
  const { isValid,pb } = usePocketBase();
  return <RouterProvider router={createBrowserRouter(isValid ? [
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      loader: ()=>GloabalUser({pb}),
      id: "root", 
      children: [
        {
          path: "/home",
          element: <Home />,
          errorElement: <Error />,
  
        },
        {
          path: "/home/:id",
          element: <Gallery />,
          errorElement: <Error />,
          loader: GalleryLoader
        },
        {
          path: "/campaign",
          element: <Campaign />,
          errorElement: <Error />
        },
        {
          path: "/allcampaign",
          element: <AllCamapaign />,
          errorElement: <Error />,
          loader:()=>AllCamapaignLoader({pb})

        },
        {
          path: "/allcampaign/:id",
          element: <CampaignDetail />,
          errorElement: <Error />,
          loader:(e)=>CampaignLoader({...e , pb})
        },
        {
          path: "/contact",
          element: <Contact />,
          errorElement: <Error />
        },
        {
          path: "/contact/:index",
          element: <Contact />,
          errorElement: <Error />
        },
        {
          path: "/profile",
          element: <Profile />,
          errorElement: <Error />
        },
  
      ]
    }
  ]
   : [
    {
      path: "/",
      element: <Login />,
      errorElement: <Error />
  
    }
  ])}  />

}






