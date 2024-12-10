const Schema = require("./employees_pb");
const fs = require("fs");

const ahmed = new Schema.Employee();
ahmed.setId(1001);
ahmed.setName("ahmed");
ahmed.setSalary(2000);

const omar = new Schema.Employee();
omar.setId(1002);
omar.setName("omar");
omar.setSalary(9000);

const sidi = new Schema.Employee();
sidi.setId(1003);
sidi.setName("sidi");
sidi.setSalary(5000);

const employees = new Schema.Employees();

employees.addEmployees(ahmed);
employees.addEmployees(omar);
employees.addEmployees(sidi);

const bytes = employees.serializeBinary();

fs.writeFileSync("data_pb", bytes);

const employees2 = Schema.Employees.deserializeBinary(bytes);

// console.log(employees2.getEmployeesList());
console.log(employees2.toString());
// console.log(employees.getEmployeesList());
