import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ModalsService} from '../../services/modals.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent implements OnInit, OnDestroy {

  @Input() public id: string;
  @Input() mode: string;
  @Input() headertext: string;
  @Input() bodytext: string;
  @Output() closeModalEvent = new EventEmitter();
  private element: any;

  constructor(private modalService: ModalsService, private el: ElementRef, private router: Router) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    this.element.style.display = 'none';
    // ensure id attribute exists
    if (!this.id) {
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', el => {
      if (el.target.className === 'modal') {
        this.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    this.element.style.display = 'block';
  }

  // close modal
  close(): void {
    this.closeModalEvent.emit(null);
    this.element.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
}
