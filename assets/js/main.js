document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const carList = document.getElementById('carList');
    const addCarButton = document.getElementById('addCarButton');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (result.success) {
                if (result.role === "admin") {
                    window.location.href = '/admin.html';
                } else {
                    window.location.href = '/user.html';
                }
            } else {
                alert('Invalid credentials');
            }
        });
    }

    if (carList) {
        fetchCars();
    }

    if (addCarButton) {
        addCarButton.addEventListener('click', async () => {
            const car_name = prompt("Enter car name:");
            const manufacturing_year = prompt("Enter manufacturing year:");
            const price = prompt("Enter price:");

            const response = await fetch('/api/addCar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ car_name, manufacturing_year, price }),
            });

            if (response.ok) {
                fetchCars();
            }
        });
    }

    async function fetchCars() {
        const response = await fetch('/api/getCars');
        const cars = await response.json();
        carList.innerHTML = cars.map(car => `
            <tr>
                <td>${car.id}</td>
                <td>${car.car_name}</td>
                <td>${car.manufacturing_year}</td>
                <td>${car.price}</td>
                <td>
                    <button class="btn btn-warning" onclick="editCar(${car.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteCar(${car.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    window.editCar = async function(id) {
        const car_name = prompt("Enter new car name:");
        const manufacturing_year = prompt("Enter new manufacturing year:");
        const price = prompt("Enter new price:");

        const response = await fetch('/api/updateCar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, car_name, manufacturing_year, price }),
        });

        if (response.ok) {
            fetchCars();
        }
    };

    window.deleteCar = async function(id) {
        const response = await fetch('/api/deleteCar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        if (response.ok) {
            fetchCars();
        }
    };
});
