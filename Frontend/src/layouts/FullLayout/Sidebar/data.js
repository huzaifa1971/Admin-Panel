import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined';
import SwitchCameraOutlinedIcon from '@mui/icons-material/SwitchCameraOutlined';
import SwitchLeftOutlinedIcon from '@mui/icons-material/SwitchLeftOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import EventIcon from '@mui/icons-material/Event';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';

const Menuitems = [

  {
    title: "Dashboard",
    icon: DashboardOutlinedIcon,
    href: "/dashboard",
  },
  {
    title: "User",
    icon: PeopleOutlineIcon,
    href: "/users/View",
  },
  // {
  //   title: "Employee",
  //   icon: PeopleOutlineIcon,
  //   href: "/user/View",
  // },
  {
    title: "Dealer",
    icon: PermContactCalendarIcon,
    href: "/dealer/View",
  },
  {
    title: "Berger Paints Videos",
    icon: VideoSettingsIcon,
    href: "/bergeraintsvideos/View",
  },
  {
    title: "FAQs",
    icon: LiveHelpIcon,
    href: "/faq/View",
  },
  {
    title: "News & Event",
    icon: EventIcon,
    href: "/newsandevent/View",
  },
  {
    title: "Categories",
    icon: CategoryIcon,
    href: "/categories/View",
  },
  {
    title: "Products",
    icon: InventoryOutlinedIcon,
    href: "/products/View",
  },
  {
    title: "Autocomplete",
    icon: AddToPhotosOutlinedIcon,
    href: "/form-elements/autocomplete",
  },
  {
    title: "Buttons",
    icon: AspectRatioOutlinedIcon,
    href: "/form-elements/button",
  },
  {
    title: "Checkbox",
    icon: AssignmentTurnedInOutlinedIcon,
    href: "/form-elements/checkbox",
  },
  {
    title: "Radio",
    icon: AlbumOutlinedIcon,
    href: "/form-elements/radio",
  },
  {
    title: "Slider",
    icon: SwitchCameraOutlinedIcon,
    href: "/form-elements/slider",
  },
  {
    title: "Switch",
    icon: SwitchLeftOutlinedIcon,
    href: "/form-elements/switch",
  },
  {
    title: "Form",
    icon: DescriptionOutlinedIcon,
    href: "/form-layouts/form-layouts",
  },
  {
    title: "Table",
    icon: AutoAwesomeMosaicOutlinedIcon,
    href: "/tables/basic-table",
  },
];

export default Menuitems;
