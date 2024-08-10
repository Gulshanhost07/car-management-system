import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const filePath = path.join(process.cwd(), 'cars.json');
    const jsonData = fs.readFileSync(filePath);
    const cars = JSON.parse(jsonData);
    res.status(200).json(cars);
}
