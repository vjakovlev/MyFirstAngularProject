import { Component, OnChanges, Input, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['/star.component.css']
})
export class StarComponent {
    @Input() rating: number;
    starWidth: number;
    @Output() raitingClicked: EventEmitter<string> = 
            new EventEmitter<string>();

    ngOnChanges(): void {
        this.starWidth = this.rating * 75 / 5;
    }

    onClick(): void {
        this.raitingClicked.emit(`The rating ${this.rating} was clicked!!!`);
    }
}