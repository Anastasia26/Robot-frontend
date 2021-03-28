import {Component, ElementRef, EventEmitter, Input, OnInit, OnDestroy, Output} from '@angular/core';
import {ModalsService} from '../../../services/modals.service';
@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css']
})
export class ModalConfirmComponent implements OnInit, OnDestroy {
  @Input() public id: string;
  @Input() mode: string;
  @Input() headertext: string;
  @Input() btnalertName: string;
  @Input() bodytext: string;
  @Output() closeModalEvent = new EventEmitter();
  @Output() submitAlertContactEvent = new EventEmitter();
  private element: any;
  constructor(private modalService: ModalsService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);
    this.element.style.display = 'none';
    if (!this.id) {
      return;
    }
    // close modal on background click
    this.element.addEventListener('click', el => {
      if (el.target.className === 'modal') {
        this.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

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
