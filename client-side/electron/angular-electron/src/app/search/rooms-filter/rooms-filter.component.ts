import { Component, OnDestroy, OnInit } from '@angular/core';
import { Room, RoomsService } from '../../shared/services/rooms.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rooms-filter',
  templateUrl: './rooms-filter.component.html',
  styleUrls: ['./rooms-filter.component.scss']
})
export class RoomsFilterComponent implements OnInit, OnDestroy {
  private roomSubscription: Subscription = new Subscription();
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
    return Math.round(this.minPrice + (this.rangeValues[0] / 100 * (this.maxPrice - this.minPrice)))
  }

  get maxValuePriceRange(): number {
    return Math.round(this.minPrice + (this.rangeValues[1] / 100 * (this.maxPrice - this.minPrice)))
  }

  public ngOnInit(): void {
    this.waitUntilRoomsLoaded()
  }

  public ngOnDestroy(): void {
    this.roomSubscription.unsubscribe()
  }

  private waitUntilRoomsLoaded(): void {
    this.roomSubscription.add(this._rooms.rooms$.subscribe(data => {
      if (!data || data.length == 0) return;
      this.setMinMaxPrice(data)
      this.setBedTypes(data)
      this.setAmenities(data)
      this.roomSubscription.unsubscribe()
    }))
  }

  private setMinMaxPrice(rooms: Room[]): void {
    const prices = rooms.map(room => parseFloat(room.price));
    this.minPrice = Math.min(...prices)
    this.maxPrice = Math.max(...prices)
  }

  private setAmenities(rooms: Room[]): void {
    const allAmanities = rooms.flatMap(room => room.amenities.map(amenity => amenity.name))
    this.amenities = this.removeArrayDuplications(allAmanities)
  }

  private setBedTypes(rooms: Room[]): void {
    const allBedTypes = rooms.flatMap(room => room.beds.map(bed => bed.name));
    this.beds = this.removeArrayDuplications(allBedTypes)
  }

  private removeArrayDuplications<T>(array: T[]): T[] {
    return Array.from(new Set(array));
  }

  public filter(): void {
    if (this.areFiltersNotSelected()) {
      this._rooms.updateFiltredRooms(this._rooms.rooms)
      return
    }

    this._rooms.updateFiltredRooms(this._rooms.rooms.filter(room => {
      const roomPrice = parseFloat(room.price);
      const minRangePrice = this.minValuePriceRange;
      const maxRangePrice = this.maxValuePriceRange;
      const isPriceInRange = roomPrice >= minRangePrice && roomPrice <= maxRangePrice;
      const hasSelectedBeds = room.beds.some(bed => this.selectedBedTypes.includes(bed.name));
      const hasSelectedAmenities = room.amenities.some(amenity => this.selectedAmenities.includes(amenity.name));
      return isPriceInRange || hasSelectedBeds || hasSelectedAmenities;
    }));
  }

  public areFiltersNotSelected(): boolean {
    const isDefaultPriceRange = this.rangeValues[0] === 0 && this.rangeValues[1] === 100;
    const noAmenitiesSelected = this.selectedAmenities.length === 0;
    const noBedTypesSelected = this.selectedBedTypes.length === 0;
    return isDefaultPriceRange && noAmenitiesSelected && noBedTypesSelected;
  }
}
