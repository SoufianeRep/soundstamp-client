export const openNavigation = () => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.setProperty('--SideNavigation--slideIn', '1');
  }
}

export const closeNavigation = () => {
  if (typeof document !== 'undefined') {
  document.documentElement.style.removeProperty('--SideNavigation--slideIn');
  document.body.style.removeProperty('overflow');
 }
}

export const toggleSidebar = () => {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const slideIn = window.getComputedStyle(document.documentElement).getPropertyValue('--SideNavigation--slideIn');
    if (slideIn) {
      closeNavigation();
    } else {
      openNavigation();
    }
  }
}
