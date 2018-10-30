import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserCredentials} from '../../../shared/types/user-credentials';

@Component({
    selector: 'streat-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
    @Input() emailPlaceholder: string;
    @Input() passwordPlaceholder: string;

    @Input() secondaryButtonText: string;
    @Input() secondaryButtonRouterLink: string | string[];

    @Input() disabled = false;
    @Input() errorMessage: string;

    @Output() formSubmitted: EventEmitter<UserCredentials> = new EventEmitter();

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
        this.formSubmitted.emit(this.joinFormGroup.value);
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
