CONSTRUCTION-SYSTEM-BACKEND
.
├── core------------------# Business logic implementation
│ ├── projects.js  
│ ├── employees.js  
│ └── ...-----------------# Other business logic implementations
├── routes  
│ └── routes.js-----------# Define routes and middlewares here
├── database--------------# Data access stuff (Sequalize mostly)
│ ├── index.js------------# Sequalize instantiation
│ └── models--------------# Schema
│ ├── employee.js  
│ └── project.js  
├── package.json  
├── README.md  
└── app.js----------------# App starting point
