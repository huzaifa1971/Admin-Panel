import { lazy } from "react";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout/FullLayout.js"));
/****End Layouts*****/
const Login = lazy(() => import("../views/login/Login.js"));

const ViewUser = lazy(() => import("../views/user/read/UserView.js"))
const CreateUser = lazy(() => import("../views/user/register/UserCreate.js"))
const UpdateUser = lazy(() => import("../views/user/update/UserUpdate.js"))


const Register = lazy(() => import("../views/add-user/register/Register.js"));
const View = lazy(() => import("../views/add-user/user/View.js"))
const Update = lazy(() => import("../views/add-user/update/Update.js"))

const DealerView = lazy(() => import("../views/dealer/read/View.js"))
const DealerCreate = lazy(() => import("../views/dealer/create/Create.js"));
const DealerUpdate = lazy(() => import("../views/dealer/update/Update.js"))

const BergerPaintsVideosView = lazy(() => import("../views/bergeraintsvideos/read/View.js"))
const BergerPaintsVideosCreate = lazy(() => import("../views/bergeraintsvideos/create/CreateVideo.js"))
const BergerPaintsVideosUpdate = lazy(() => import("../views/bergeraintsvideos/update/Update.js"))

const CategoriesView = lazy(() => import("../views/categories/read/ViewCategories.js"))
const CategoriesCreate = lazy(() => import("../views/categories/create/CreateCategories.js"))
const CategoriesUpdate = lazy(() => import("../views/categories/update/UpdateCategories.js"))


const FAQView = lazy(() => import("../views/faq/read/View.js"))
const FAQCreate = lazy(() => import("../views/faq/create/CreateFAQ.js"))
const FAQUpdate = lazy(() => import("../views/faq/update/UpdateFAQ.js"))

const NewsAndEventView = lazy(() => import("../views/news-and-event/read/ViewNewsEvent.js"))
const NewsAndEventCreate = lazy(() => import("../views/news-and-event/create/CreateNewsAndEvent.js"))
const NewsAndEventUpdate = lazy(() => import("../views/news-and-event/update/UpdateNewsAndEvent.js"))

const ProductsView = lazy(() => import("../views/products/read/ViewProducts.js"))
const ProductsCreate = lazy(() => import("../views/products/create/CreateProducts.js"))
const ProductsUpdate = lazy(() => import("../views/products/update/UpdateProduct.js"))


/*****Pages******/
const Dashboard1 = lazy(() => import("../views/dashboards/Dashboard1.js"));

/*****Tables******/
const BasicTable = lazy(() => import("../views/tables/BasicTable.js"));

// form elements
const ExAutoComplete = lazy(() =>
  import("../views/FormElements/ExAutoComplete.js")
);
const ExButton = lazy(() => import("../views/FormElements/ExButton.js"));
const ExCheckbox = lazy(() => import("../views/FormElements/ExCheckbox.js"));
const ExRadio = lazy(() => import("../views/FormElements/ExRadio.js"));
const ExSlider = lazy(() => import("../views/FormElements/ExSlider.js"));
const ExSwitch = lazy(() => import("../views/FormElements/ExSwitch.js"));
// form layouts
const FormLayouts = lazy(() => import("../views/FormLayouts/FormLayouts.js"));

/*****Routes******/

const ThemeRoutes = [
  // Login route without layout
  { path: "/", exact: true, element: <Login /> },

  // Other routes with layout
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/dashboard", element: <Dashboard1 /> },
      { path: "/users/View", element: <ViewUser /> },
      { path: "/users/Create", element: <CreateUser /> },
      { path: "/users/Update/:id", element: <UpdateUser /> },

      { path: "/user/View", element: <View /> },
      { path: "/user/Create", element: <Register /> },
      { path: "/user/Update/:id", element: <Update /> },
      { path: "/dealer/View", element: <DealerView /> },
      { path: "/dealer/Create", element: <DealerCreate /> },
      { path: "/dealer/Update/:id", element: <DealerUpdate /> },
      { path: "/bergeraintsvideos/View", element: <BergerPaintsVideosView /> },
      { path: "/create/CreateVideo", element: <BergerPaintsVideosCreate /> },
      { path: "/videos/Update/:id", element: <BergerPaintsVideosUpdate /> },
      { path: "/faq/View", element: <FAQView /> },
      { path: "/faq/CreateFAQ", element: <FAQCreate /> },
      { path: "/faq/UpdateFAQ/:id", element: <FAQUpdate /> },
      { path: "tables/basic-table", element: <BasicTable /> },
      { path: "/newsandevent/View", element: <NewsAndEventView /> },
      { path: "/newsandevent/Update/:id", element: <NewsAndEventUpdate /> },
      { path: "/newsandevent/Create", element: <NewsAndEventCreate /> },
      { path: "/categories/View", element: <CategoriesView /> },
      { path: "/categories/Create", element: <CategoriesCreate /> },
      { path: "/categories/Update/:id", element: <CategoriesUpdate /> },
      { path: "/products/View", element: <ProductsView /> },
      { path: "/products/Create", element: <ProductsCreate /> },
      { path: "/products/Update/:id", element: <ProductsUpdate /> },
      { path: "/form-layouts/form-layouts", element: <FormLayouts /> },
      { path: "/form-elements/autocomplete", element: <ExAutoComplete /> },
      { path: "/form-elements/button", element: <ExButton /> },
      { path: "/form-elements/checkbox", element: <ExCheckbox /> },
      { path: "/form-elements/radio", element: <ExRadio /> },
      { path: "/form-elements/slider", element: <ExSlider /> },
      { path: "/form-elements/switch", element: <ExSwitch /> },
    ],
  },
];


export default ThemeRoutes;
