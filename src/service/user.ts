class UserService {
    private context = null;
    constructor(context) {
        this.context = context
    }
    public sayHello() {
        return "Hello, World"
    }
}

export default UserService
