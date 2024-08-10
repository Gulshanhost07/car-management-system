document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const carList = document.getElementById('carList');

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
                    <button class="btn btn-warning">Edit</button>
                    <button class="btn btn-danger">Delete</button>
                </td>
            </tr>
        `).join('');
    }
});
