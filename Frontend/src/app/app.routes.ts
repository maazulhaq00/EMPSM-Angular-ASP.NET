import { Routes } from '@angular/router';
import { EmployeeListComponent } from './Components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './Components/employee-form/employee-form.component';

export const routes: Routes = [
    {
        path: "",
        component: EmployeeListComponent
    },
    {
        path: "employees",
        component: EmployeeListComponent
    },
    {
        path: "add-employee",
        component: EmployeeFormComponent
    },
];
