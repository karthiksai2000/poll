// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const logger = require('../Modules/logger');  // Fixed duplicate path issue
// const router = express.Router();

// // Path to the JSON file
// const dataPath = path.join(__dirname, '../Data/students.json');

// // Helper functions to read and write students
// function readStudents() {
//   return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
// }

// function writeStudents(students) {
//   fs.writeFileSync(dataPath, JSON.stringify(students, null, 2));
// }

// // Middleware to log each request
// router.use((req, res, next) => {
//   logger(req.method, req.url);
//   next();
// });

// // GET all students
// router.get('/', (req, res) => {
//   const students = readStudents();
//   res.json(students);
// });

// // GET a student by ID
// router.get('/:id', (req, res) => {
//   const students = readStudents();
//   const student = students.find(s => s.id === parseInt(req.params.id));
//   if (student) {
//     res.json(student);
//   } else {
//     res.status(404).send({ message: 'Student not found' });
//   }
// });

// // POST a new student
// router.post('/', (req, res) => {
//   const students = readStudents();
//   const newStudent = {
//     id: students.length ? students[students.length - 1].id + 1 : 1,
//     name: req.body.name,
//     course: req.body.course,
//     year: req.body.year  // Fixed incorrect key
//   };
//   students.push(newStudent);
//   writeStudents(students);
//   res.status(201).json(newStudent);
// });

// // PUT (update) an existing student
// router.put('/:id', (req, res) => {
//   const students = readStudents();
//   const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));
//   if (studentIndex !== -1) {
//     students[studentIndex] = { ...students[studentIndex], ...req.body };
//     writeStudents(students);
//     res.json(students[studentIndex]);
//   } else {
//     res.status(404).send({ message: 'Student not found' });
//   }
// });

// // DELETE a student
// router.delete('/:id', (req, res) => {
//   let students = readStudents();
//   const id = parseInt(req.params.id);
//   const exist = students.find(s => s.id === id);
//   if (!exist) {
//     return res.status(404).send({ message: 'Student not found' });
//   }
//   students = students.filter(s => s.id !== id);
//   writeStudents(students);
//   res.json({ message: `Student with id=${id} deleted successfully` });
// });

// module.exports = router;
const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Path to JSON file
const dataPath = path.join(__dirname, '../Data/products.json');

// Read/write helpers
function readProducts() {
  return fs.existsSync(dataPath) ? JSON.parse(fs.readFileSync(dataPath, 'utf8')) : [];
}

function writeProducts(products) {
  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
}

// GET all products
router.get('/', (req, res) => {
  const products = readProducts();
  res.json(products);
});

// GET product by ID
router.get('/:id', (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) res.json(product);
  else res.status(404).send({ message: 'Product not found' });
});

// POST new product
router.post('/', (req, res) => {
  const products = readProducts();
  const { name, price } = req.body;

  // Basic validation
  if (!name || typeof price !== 'number') {
    return res.status(400).send({ message: 'Invalid product data' });
  }

  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name,
    price
  };

  products.push(newProduct);
  writeProducts(products);
  res.status(201).json(newProduct);
});

// PUT update product
router.put('/:id', (req, res) => {
  const products = readProducts();
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    writeProducts(products);
    res.json(products[index]);
  } else res.status(404).send({ message: 'Product not found' });
});

// DELETE product
router.delete('/:id', (req, res) => {
  let products = readProducts();
  const id = parseInt(req.params.id);
  if (!products.find(p => p.id === id)) return res.status(404).send({ message: 'Product not found' });
  products = products.filter(p => p.id !== id);
  writeProducts(products);
  res.json({ message: `Product with id=${id} deleted successfully` });
});

module.exports = router;



