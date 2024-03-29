import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../shared/services/rooms.service';

@Component({
  selector: 'app-rooms-filter',
  templateUrl: './rooms-filter.component.html',
  styleUrls: ['./rooms-filter.component.scss']
})
export class RoomsFilterComponent implements OnInit {
  public minPrice: number = 0
  public maxPrice: number = 0
  public beds: string[] = []
  public amenities: string[] = []

  public selectedAmenities: string[] = [];
  public selectedBedTypes: string[] = [];
  public rangeValues: number[] = [0, 100];

  constructor(
    private _rooms: RoomsService,
  ) { }

  get minValuePriceRange(): number {
    return this.minPrice + (this.rangeValues[0] / 100 * (this.maxPrice - this.minPrice)) - 1
  }

  get maxValuePriceRange(): number {
    return this.minPrice + (this.rangeValues[1] / 100 * (this.maxPrice - this.minPrice)) + 1
  }

  public ngOnInit(): void {
    this.loadFilters()
  }

  private async loadFilters(): Promise<void> {
    const amenitiesResp = await this._rooms.loadAmenities()
    this.amenities = amenitiesResp.map(amenity => amenity.name)

    const bedTypeResp = await this._rooms.loadBedTypes()
    this.beds = bedTypeResp.map(bed => bed.name)

    const price = await this._rooms.loadPrice()
    this.minPrice = Number(price.min)
    this.maxPrice = Number(price.max)
  }

  public filter(): void {
    if (this.areFiltersNotSelected()) {
      this._rooms.updateFiltredRooms(this._rooms.rooms)
      return
    }

    let rooms = this._rooms.rooms.filter(room => {
      const roomPrice = room.price;
      const isPriceInRange = roomPrice >= this.minValuePriceRange && roomPrice <= this.maxValuePriceRange;
      return isPriceInRange
    })

    if (this.selectedBedTypes.length > 0) {
      rooms = rooms.filter(room => {
        const hasSelectedBeds = room.beds.some(bed => this.selectedBedTypes.includes(bed.name));
        return hasSelectedBeds
      })
    }

    if (this.selectedAmenities.length > 0) {
      rooms = rooms.filter(room => {
        const hasSelectedAmenities = room.amenities.some(amenity => this.selectedAmenities.includes(amenity.name));
        return hasSelectedAmenities
      })
    }

    this._rooms.updateFiltredRooms(rooms)
  }

  public areFiltersNotSelected(): boolean {
    const isDefaultPriceRange = this.rangeValues[0] === 0 && this.rangeValues[1] === 100;
    const noAmenitiesSelected = this.selectedAmenities.length === 0;
    const noBedTypesSelected = this.selectedBedTypes.length === 0;
    return isDefaultPriceRange && noAmenitiesSelected && noBedTypesSelected;
  }
}
