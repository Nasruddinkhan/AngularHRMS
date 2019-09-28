/**
 * Created By NK5050747, Nasruddin Khan
 * Created Date Mar 12, 2019 
 */
interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [

{
   name: 'Master Details',
    url: '/master',
    icon: 'icon-user',
    
    children: [
      {
        name: 'Skills',
        url: '/master/userskill',
        icon: 'fa fa-fw fa-cubes',
        
      },
      {
        name: 'SkillElements',
        url: '/master/skillelements',
        icon: 'fa fa-fw fa-user'
      },
     /*  {
        name: 'upload',
        url: '/master/uploadmaster',
        icon: 'fa fa-fw fa-user'
      }, */
      {
        name: 'Role',
        url: '/master/role',
        icon: 'fa fa-fw fa-user'
      },
      {
        name: 'Status',
        url: '/master/status',
        icon: 'fa fa-fw fa-user'
      },
      {
        name: 'Search Employee',
        url: '/master/searchemployee',
        icon: 'fa fa-fw fa-user'
      },
      {
        name: 'Menu Acess',
        url: '/master/asingmenu',
        icon: 'fa fa-fw fa-user'
      }
      ,
      {
        name: 'Menu Master',
        url: '/master/menumaster',
        icon: 'fa fa-fw fa-user'
      },
      {
        name: 'Sub Menu Master',
        url: '/master/submenumaster',
        icon: 'fa fa-fw fa-user'
      }
      
    ]
  },
  {
    name: 'Application',
     url: '/user',
     icon: 'icon-user',
     children: [
       {
         name: 'Personal',
         url: '/user/personal',
         icon: 'fa fa-fw fa-cubes',
         
       },
       {
        name: 'Education',
        url: '/user/education',
        icon: 'fa fa-fw fa-cubes',
      }
     ]
   }
   ,
   {
     name: 'Documents',
      url: '/documents',
      icon: 'icon-user',
      children: [
        {
          name: 'documents',
          url: '/documents/mydoc',
          icon: 'fa fa-fw fa-cubes', 
        }
      ]
    }
    ,
    {
      name: 'Payroll',
       url: '/payemp',
       icon: 'icon-user',
       children: [
         {
           name: 'Genrate Documents',
           url: '/payemp/payroll',
           icon: 'fa fa-fw fa-cubes', 
         }
       ]
     }
    ,
   {
     name: 'Work Remark',
      url: '/workremark',
      icon: 'icon-user',
      children: [
        {
          name: 'Work Status',
          url: '/workremark/workstatus',
          icon: 'fa fa-fw fa-cubes', 
        },
        {
          name: 'InOut Time',
          url: '/workremark/inouttime',
          icon: 'fa fa-fw fa-cubes', 
        }
      ]
    }
];
  