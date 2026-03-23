import {
  HomeOutlined,
  BuildOutlined,
  ToolOutlined,
  EnvironmentOutlined,
  ProjectOutlined,
  CheckSquareOutlined,
  AppstoreOutlined,
  EyeOutlined,
  MessageOutlined
} from '@ant-design/icons';


const icons = {
  HomeOutlined,
  BuildOutlined,
  ToolOutlined,
  EnvironmentOutlined,
  ProjectOutlined,
  CheckSquareOutlined,
  AppstoreOutlined,
  EyeOutlined,
  MessageOutlined
};


const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("fh_user"));
  return user?.role || "guest";
};

const role = getUserRole();

const isAdmin = role === "admin";
const isContractor = role === "contractor";
const isClient = role === "client";

const operations = {
  id: 'operations',
  title: 'Operations',
  type: 'group',
  children: [

    //  Properties (ALL)
    {
      id: 'properties',
      title: 'Properties',
      type: 'item',
      url: '/properties',
      icon: icons.HomeOutlined,
      breadcrumbs: false
    },

    //  Projects (admin + contractor)
    ...(role === 'admin' || role === 'contractor' ? [{
      id: 'projects',
      title: 'Projects',
      type: 'item',
      url: '/projects',
      icon: icons.ProjectOutlined,
      breadcrumbs: false
    }] : []),

    //  Tasks (admin + contractor)
    ...(role === 'admin' || role === 'contractor' ? [{
      id: 'tasks',
      title: 'Tasks',
      type: 'item',
      url: '/tasks',
      icon: icons.CheckSquareOutlined,
      breadcrumbs: false
    }] : []),

    //  Materials (admin only)
    ...(role === 'admin' ? [{
      id: 'materials',
      title: 'Materials',
      type: 'item',
      url: '/materials',
      icon: icons.AppstoreOutlined,
      breadcrumbs: false
    }] : []),

    //  Sustainability (admin only)
    ...(role === 'admin' ? [{
      id: 'sustainability',
      title: 'Sustainability',
      type: 'item',
      url: '/sustainability',
      icon: icons.EnvironmentOutlined,
      breadcrumbs: false
    }] : []),

    //  AR Viewer (ALL)
    {
      id: 'ar',
      title: 'AR Viewer',
      type: 'item',
      url: '/ar',
      icon: icons.EyeOutlined,
      breadcrumbs: false
    },

    //  Inquiries (admin only)
    ...(role === 'admin' ? [{
      id: 'inquiries',
      title: 'Inquiries',
      type: 'item',
      url: '/inquiries',
      icon: icons.MessageOutlined,
      breadcrumbs: false
    }] : [])
  ]
};

export default operations;
