const adminCredentials = {
    username: "admin",
    password: "admin123"
};

module.exports = async (req, res) => {
    const { username, password } = req.body;
    if (username === adminCredentials.username && password === adminCredentials.password) {
        return res.status(200).json({ success: true, role: "admin" });
    } else {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
};
