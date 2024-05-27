import {inject} from "@angular/core";
import {CanActivateFn, Router} from "@angular/router";

export const setupGuard: CanActivateFn = (route, state) => {
    let router = inject(Router);

    let value = localStorage.getItem("user");

    if (value == null) {
        return router.navigate(["/auth/"]);
    }

    return true;
};
