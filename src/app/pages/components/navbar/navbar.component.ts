import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  navItems = [
    { path: '/#about', label: 'ABOUT' },
    { path: '/#experience', label: 'EXPERIENCE' },
    { path: '/#skills', label: 'SKILLS' },
    { path: '/#education', label: 'EDUCATION' },
    { path: '/blog', label: 'BLOGS' },
    { path: '/#projects', label: 'PROJECTS' }
  ];
}
