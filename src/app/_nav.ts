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
      }
    ]
  }
  
];
