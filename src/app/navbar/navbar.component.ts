import { MediaMatcher } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  userRole = '';

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private jwtHelper: JwtHelperService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 769px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  windowScrolled: boolean = false;
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }
  scrollToTop() {
    (() => {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.scrollTo(0, 0);
      }
    })();
  }

  ngOnInit(): void {

  }

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {

      return true;
    }
    return false;
  }
  logOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
  }

  navigateOnRole = () => {
    if (this.isUserAuthenticated()) {
      const token = localStorage.getItem("jwt");
      const decode = this.jwtHelper.decodeToken(token!);
      let str;
      const newObj = {} as any;
      for (let prop in decode) {
        const val = decode[prop];
        if (prop.includes('/')) {
          str = prop.substring(prop.lastIndexOf('/') + 1, prop.length);
        }
        else {
          str = prop;
        }
        newObj[str] = val;
      }
      if (newObj.role === 'User') {
        this.router.navigate(["/settings"]);
      }
      else if (newObj.role == 'Salon') {
        this.router.navigate(["/salons/salon-settings"]);
      }
    }
    else
      this.router.navigate(["/login"]);

  }

}
