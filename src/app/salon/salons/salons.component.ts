import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SalonService } from '../salon.service';
import { Salon } from './salon';

@Component({
  selector: 'app-salons',
  templateUrl: './salons.component.html',
  styleUrls: ['./salons.component.css']
})
export class SalonsComponent implements OnInit {

  constructor(private salonService: SalonService) { }


  ratingNumbers: number[] = [1,2,3,4,5];

  selectedRatings: number[] =[];

  panelOpenState = false;

  isSearch = false;
  step = 0;
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  value = '';

  sortingOptions = ["Name Asc", "Name Desc", "Rating Asc", "Rating Desc"];

  selectedSort: any;

  salonsCities: string[] = [];

  selectedCities: string[] = [];

  salons: Salon[] = [];

  searchedSalons: Salon[] = [];

  ngOnInit(): void {
    this.salonService.getSalons().subscribe((data: Salon[]) => {
      this.salons = data;
      for (let i = 0; i < data.length; i++) {
        this.salonsCities.push(this.salons[i].address.city)
      }
      this.salonsCities = [...new Set(this.salonsCities)]
    });
  }

  navigate(salon: any): any {
    window.location.href = "https://www.google.com/maps/place/Strada+"+salon.address.street+"+"+salon.address.number+","+salon.address.city+",";
  }

  searchSalon(): any {
    this.searchedSalons = [];
    this.salons.map((salon: any) => {
      if ((salon.name.toLowerCase()).includes(this.value.toLowerCase())) {
        this.searchedSalons.push(salon);
      }
    })
    this.isSearch = true;
    console.log(this.searchedSalons);
  }

  handleSelectedCity(city: string): any {
    var x = this.selectedCities.findIndex(y => y === city);
    console.log(x);
    console.log(this.selectedCities.findIndex(y => y === city));

    if (x == -1) {
      this.selectedCities.push(city);
      console.log(this.selectedCities);
    }
    else {
      this.selectedCities.splice(x, 1);
      console.log(this.selectedCities);
    }
  }

  handleSelectedRating(rating: number): any {
    var x = this.selectedRatings.findIndex(y => y === rating);
    console.log(x);
    console.log(this.selectedRatings.findIndex(y => y === rating));

    if (x == -1) {
      this.selectedRatings.push(rating);
      console.log(this.selectedRatings);
    }
    else {
      this.selectedRatings.splice(x, 1);
      console.log(this.selectedRatings);
    }
  }

  sortSalons(option: string): any {
    return this.salons.sort((obj1, obj2) => {
      this.selectedSort = option;
      if (option.includes("Asc")) {
        if (option.includes("Name")) {
          if (obj1.name.toLowerCase() > obj2.name.toLowerCase()) {
            return 1;
          }

          if (obj1.name.toLowerCase() < obj2.name.toLowerCase()) {
            return -1;
          }

          return 0;
        }

        else {
          if (obj1.rating > obj2.rating) {
            return 1;
          }

          if (obj1.rating < obj2.rating) {
            return -1;
          }

          return 0;
        }
      }

      else {
        if (option.includes("Name")) {
          if (obj1.name.toLowerCase() > obj2.name.toLowerCase()) {
            return -1;
          }

          if (obj1.name.toLowerCase() < obj2.name.toLowerCase()) {
            return 1;
          }

          return 0;
        }

        else {
          if (obj1.rating > obj2.rating) {
            return -1;
          }

          if (obj1.rating < obj2.rating) {
            return 1;
          }

          return 0;
        }
      }
    })

  }
}
