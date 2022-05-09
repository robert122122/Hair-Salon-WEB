import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './login/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userLoggedInSubject$ = new BehaviorSubject<User>({
    id:0,
    firstName:"",
    lastName:"",
    email:"",
    token:""
  });

  user = this.userLoggedInSubject$.asObservable();

  constructor() { }

  // getBookedHeroes() {
  //   this.HeroService.getHeroes().subscribe((heroes) => {
  //     this.bookedHeroesSubject$.next(heroes.filter(hero => { return hero.isBooked === true }));
  //   })
  // }

  // addBookedHero(hero: Hero): void {
  //   const bookedHeroesList = this.bookedHeroesSubject$.value || [];
  //   if(bookedHeroesList.findIndex((bookedHero: Hero) => bookedHero.id === hero.id) !== -1){
  //     return;
  //   }
      
  //   bookedHeroesList.push(hero);

  //   this.bookedHeroesSubject$.next(bookedHeroesList);
  // }

  // removeBookedHero(hero: Hero): void {
  //   let bookedHeroesList = this.bookedHeroesSubject$.value || [];
  //   bookedHeroesList = bookedHeroesList.filter((bookedHero: Hero) => bookedHero.id !== hero.id);

  //   this.bookedHeroesSubject$.next(bookedHeroesList);
  // }


}
