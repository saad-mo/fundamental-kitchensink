import { Component } from '@angular/core';

import { DataService } from '../../services/data.service';

@Component({
    selector: 'table-example',
    templateUrl: './table.component.html'
})
export class TableComponent {

    users: any;

    allSelected: boolean = false;

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        this.loadData();
    }

    loadData() {
        this.users = null;
        this.dataService.getUsers().subscribe(data => {
            setTimeout(()=>{ 
                this.users = this.dataInstrument(data); 
            }, 500)
        });
    }

    dataInstrument(data) {
        return data.map(user => {
            user.selected = false;
            user.visible = true;
            user.locked = false;
            return user;
        });
    }

    toggleSelectedAll(checked) {
        this.users = this.users.map(u => {
            u.selected = checked;
            return u;
        });
    }

    removeSelected() {
        this.users = this.users.filter(u => {
            return !u.selected || u.locked;
        });        
    }

    someSelected() {
        if (!this.users) return false;
        return this.users.find(u => u.selected == true);
    }

    toggleVisibility(index) {
        this.users[index].visible = !this.users[index].visible;
    }

    toggleLocked(index) {
        this.users[index].locked = !this.users[index].locked;
    }

    toggleVisibleSelected(visible) {
        this.users = this.users.map(u => {
            if (u.locked || !u.selected) return u;
            u.visible = visible;
            return u;
        })
    }

    deleteItem(index) {
        this.users.splice(index, 1);
    }


}
