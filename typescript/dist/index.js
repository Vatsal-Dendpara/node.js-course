"use strict";
class UserAccount {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
    getName() {
        return this.name;
    }
}
const user = new UserAccount("Murphy", 1);
console.log(user.getName());
//# sourceMappingURL=index.js.map