import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Master',
    url: '/master',
    icon: 'icon-puzzle',
    children: [
      // {
      //   name: 'Role',
      //   url: '/master/role/Role',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'Section',
      //   url: '/master/section/Section',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'Shelf',
      //   url: '/master/shelf/Shelf',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'Audit Type',
      //   url: '/master/audittype/Audit Type',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'Class',
      //   url: '/master/class/Class',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'Category',
      //   url: '/master/category/Category',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'Bottle Type',
      //   url: '/master/bottletype/Bottle Type',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'Price Level',
      //   url: '/master/pricelevel/Price Level',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'Shelf linkup',
      //   url: '/master/shelflinkup',
      //   icon: 'icon-puzzle'
      // },

      // {
      //   name: 'Account',
      //   url: '/master/accountmaster',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'Location',
      //   url: '/master/location',
      //   icon: 'icon-puzzle'
      // },
      {
        name: 'Brand',
        url: '/master/brand',
        icon: 'icon-puzzle'
      },

      {
        name: 'Category',
        url: '/master/category',
        icon: 'icon-puzzle'
      }
      ,
      {
        name: 'Chain Account',
        url: '/master/chainaccount',
        icon: 'icon-puzzle'
      },
      {
        name: 'Class',
        url: '/master/class',
        icon: 'icon-puzzle'
      },

      {
        name: 'Franchise',
        url: '/master/franchise',
        icon: 'icon-puzzle'
      },
      {
        name: 'Outlet',
        url: '/master/outlet',
        icon: 'icon-puzzle'
      },
      {
        name: 'Property',
        url: '/master/property',
        icon: 'icon-puzzle'
      },

      {
        name: 'Quality',
        url: '/master/quality',
        icon: 'icon-puzzle'
      },
      {
        name: 'User',
        url: '/master/user',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Transaction',
    url: '/transaction',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Sales Import',
        url: '/transaction/salesimport',
        icon: 'icon-puzzle'
      }
      // {
      //   name: 'Audit Period',
      //   url: '/transaction/auditperiod',
      //   icon: 'icon-puzzle'
      // },
      {
        name: 'Import Purchase',
        url: '/transaction/importpurchase',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Report',
    url: '/report',
    icon: 'icon-puzzle',
    children: [
      {
        // name: 'Test Report',
        // url: '/report/test',
        // icon: 'icon-puzzle'
      }
    ]
  }
];
