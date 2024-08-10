const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    const { id, car_name, manufacturing_year, price } = req.body;
    const filePath = path.join(__dirname, '../cars.json');
    let cars = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    cars = cars.map(car => car.id == id ? { id, car_name, manufacturing_year, price } : car);
    fs.writeFileSync(filePath, JSON.stringify(cars, null, 2));
    res.status(200).json(cars);
};
