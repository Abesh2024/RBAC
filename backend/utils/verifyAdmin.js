const verifyAdmin = (req, res, next) => {
    try {
        // Check if the user's role is "admin"
        
        if (req.user.role !== "admin") {
            return res.status(403).json({
                status: false,
                message: "Access denied. Admins only.",
            });
        }

        // If role is admin, proceed to the next middleware/controller
        next();
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "An error occurred while verifying the role.",
            error: error.message,
        });
    }
};

export default verifyAdmin;
