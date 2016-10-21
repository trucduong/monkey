export class SidebarItem {
  name: String;
  href: String;
  isActive: Boolean;
  icon: String;
  childs: SidebarItem[];

  constructor(name: String, href: String, isActive: Boolean, icon: String, childs: SidebarItem[]) {
    this.name = name;
    this.isActive = isActive;
    this.href = href;
    this.icon = icon;
    this.childs = childs;
  }
}