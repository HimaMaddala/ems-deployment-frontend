import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { NotificationsComponent } from '../../notifications/notifications.component';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, FormsModule, NotificationsComponent],
  providers: [NgModel, NotificationsComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() toggleSidebar: () => void = () => { };
  user_first: any | null = null;
  username: string | null = null;
  showDropdown = false;
  isAdmin: boolean = false;
  email: string | null = null;

  isMenuOpen: boolean = false;

  routes = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      active: false
    },
    {
      name: 'Employees',
      active: false,
      subRoutes: [
        {
          name: "List",
          href: '/admin/employees/list',
        },
        {
          name: "Create",
          href: '/admin/employees/form',
        }
      ]
    },
    {
      name: 'Departments',
      active: false,
      subRoutes: [
        {
          name: "View",
          href: '/admin/departments/list',
        }
      ]
    },
  ];

  expandedRoute: string | null = null;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    const userDetails = this.authService.currentUser;
    console.log(userDetails);
    this.username = userDetails.username;
    this.user_first = this.username?.charAt(0).toLocaleUpperCase();
    this.isAdmin = userDetails.role === 'ADMIN';
    this.email = userDetails.email;
  }

  toggleSubRoutes(routeName: string) {
    if (this.expandedRoute === routeName) {
      this.expandedRoute = null;
    } else {
      this.expandedRoute = routeName;
    }
  }

  getSubRoutes() {
    const route = this.routes.find((r) => r.name === this.expandedRoute);
    return route?.subRoutes || [];
  }

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateToSubRoute(subRouteHref: string) {
    console.log("Navigating to:", subRouteHref);
    this.router.navigate([subRouteHref]);
    this.isMenuOpen = false;
  }


  checkActive(routeHref: string): boolean {
    return this.router.url === routeHref;
  }


  setActive(routeHref: string) {
    this.routes.forEach(route => route.active = false);
    const activeRoute = this.routes.find(route => route.href === routeHref);
    if (activeRoute) {
      activeRoute.active = true;
    }
  }

  goToSearch(): void {
    this.router.navigate(['/search']);
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
}
