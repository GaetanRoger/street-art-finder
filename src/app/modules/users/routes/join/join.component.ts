import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-join',
    templateUrl: './join.component.html',
    styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {
    joinFormGroup: FormGroup;

    constructor(private readonly fb: FormBuilder) {
    }

    get email(): FormControl {
        return this.joinFormGroup.get('email') as FormControl;
    }

    get password(): FormControl {
        return this.joinFormGroup.get('password') as FormControl;
    }

    ngOnInit() {
        this.joinFormGroup = this.fb.group({
            email: this.buildEmailControl(),
            password: this.buildPasswordControl()
        });
    }

    submit(): void {

    }

    private buildEmailControl(): FormControl {
        return this.fb.control('', [
            Validators.required,
            Validators.email
        ]);
    }

    private buildPasswordControl() {
        return this.fb.control('', [
            Validators.required,
            Validators.minLength(5)]
        );
    }
}
