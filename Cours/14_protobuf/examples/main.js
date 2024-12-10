const fs = require("fs");

const employees = [];

employees.push({
    name: "Sidi",
    salary: 1000,
    id: 1000,
});

employees.push({
    name: "Ahmed",
    salary: 9000,
    id: 1001,
});

employees.push({
    name: "Omar",
    salary: 5000,
    id: 1002,
});

fs.writeFileSync("./data.json", JSON.stringify(employees, null, 4));
