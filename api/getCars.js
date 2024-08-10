const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    const filePath = path.join(__dirname, '../cars.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const cars = JSON.parse(jsonData);
    res.status(200).json(cars);
};
