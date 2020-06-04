// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require('./Employee');

// This extends the Employee class to make a Manager
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getRole(){
        return "Manager";
    }
}

// const Bob = new Manager("Bob", 12, 'bob@bob.com', 13);
// console.log(Bob);