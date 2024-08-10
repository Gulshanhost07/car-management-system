const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    const { car_name, manufacturing_year, price } = req.body;
    const filePath = path.join(__dirname, '../cars.json');
    let cars = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const newCar = {
        id: cars.length + 1,
        car_name,
        manufacturing_year,
        price
    };

    cars.push(newCar);
    fs.writeFileSync(filePath, JSON.stringify(cars, null, 2));
    res.status(200).json(cars);
};
