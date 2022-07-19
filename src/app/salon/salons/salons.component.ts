import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertService } from 'src/app/alert.service';
import { SalonService } from '../salon.service';
import { Salon } from './salon';

@Component({
  selector: 'app-salons',
  templateUrl: './salons.component.html',
  styleUrls: ['./salons.component.css']
})
export class SalonsComponent implements OnInit {

  constructor(
    private salonService: SalonService,
    private alertService: AlertService,
  ) { }

  imgPath: string = "";

  ratingNumbers: number[] = [1, 2, 3, 4, 5];

  selectedRatings: number[] = [];

  filtersApplied: boolean = false;

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

  filteredSalons: Salon[] = [];


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
    window.location.href = "https://www.google.com/maps/place/Strada+" + salon.address.street + "+" + salon.address.number + "," + salon.address.city + ",";
  }

  searchSalon(): any {
    this.isSearch = false;

    if (this.value.length > 0) {
      this.isSearch = false;
      this.searchedSalons = [];

      this.salons.map((salon: any) => {
        if ((salon.name.toLowerCase()).includes(this.value.toLowerCase())) {
          this.isSearch = true;
          this.searchedSalons.push(salon);
        }
      })

      if (this.isSearch == false) {
        this.alertService.alertWarning("Salon not found");
      }
    }

  }

  handleSelectedCity(city: string): any {
    var x = this.selectedCities.findIndex(y => y === city);

    if (x == -1) {
      this.selectedCities.push(city);
    }
    else {
      this.selectedCities.splice(x, 1);
    }
    this.applyFilters();
  }

  public createImgPath = (serverPath: string): string => {
    this.imgPath = `https://localhost:44396/${serverPath}`;
    this.imgPath = this.imgPath.replace("\\", "/");
    this.imgPath = this.imgPath.replace("\\", "/");
    return this.imgPath;
  }

  checkImage(image: string) {
    if (image.includes('https') == true)
      return true
    else
      return false
  }

  handleSelectedRating(rating: number): any {
    var x = this.selectedRatings.findIndex(y => y === rating);

    if (x == -1) {
      this.selectedRatings.push(rating);
    }
    else {
      this.selectedRatings.splice(x, 1);
    }

    this.applyFilters();
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

  applyFilters() {
    this.filtersApplied = false;
    this.filteredSalons = [];
    this.salons.map((salon) => {
      if (this.selectedCities.length > 0) {
        this.selectedCities.map((city) => {
          if (salon.address.city == city) {
            if (this.selectedRatings.length > 0) {
              this.selectedRatings.map((rating) => {
                if (salon.rating >= rating) {
                  this.filtersApplied = true;
                  this.filteredSalons.push(salon);
                }
              })
            }
            else {
              this.filtersApplied = true;
              this.filteredSalons.push(salon);
            }
          }
        })
      }

      else if (this.selectedRatings.length > 0) {
        this.selectedRatings.map((rating) => {
          if (salon.rating >= rating) {
            this.filteredSalons.push(salon);
            this.filtersApplied = true;
          }
        })
      }
    })

    if (this.filtersApplied == false && this.selectedRatings.length != 0 && this.selectedCities.length != 0) {
      this.alertService.alertWarning("0 salons found with these filters");
    }
  }

}
