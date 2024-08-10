const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    const { id } = req.body;
    const filePath = path.join(__dirname, '../cars.json');
    let cars = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    cars = cars.filter(car => car.id != id);
    fs.writeFileSync(filePath, JSON.stringify(cars, null, 2));
    res.status(200).json(cars);
};
