import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalsService {
    private modals: any[] = [];

    add(modal: any): any{
        // add modal to array of active modals
        this.modals.push(modal);
    }

    remove(id: string): any {
        // remove modal from array of active modals
        this.modals = this.modals.filter(x => x.id !== id);
    }

    open(id: string): any {
        // open modal specified by id
        const modal = this.modals.find(x => x.id === id);
        modal.open();
    }

    close(id: string): any {
        // close modal specified by id
        const modal = this.modals.find(x => x.id === id);
        modal.close();
    }
}
