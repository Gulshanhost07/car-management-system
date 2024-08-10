export default function handler(req, res) {
    const { username, password } = req.body;

    // Hardcoded credentials for demonstration purposes
    const adminCredentials = {
        username: "admin",
        password: "admin123"
    };

    const userCredentials = {
        username: "user",
        password: "user123"
    };

    if (username === adminCredentials.username && password === adminCredentials.password) {
        res.status(200).json({ success: true, role: "admin" });
    } else if (username === userCredentials.username && password === userCredentials.password) {
        res.status(200).json({ success: true, role: "user" });
    } else {
        res.status(401).json({ success: false });
    }
}
