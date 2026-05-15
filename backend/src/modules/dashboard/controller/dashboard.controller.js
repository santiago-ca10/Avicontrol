exports.getStats = async (req, res) => {
    try {

        res.json({
            message: 'Stats dashboard'
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};


exports.getDashboard = async (req, res) => {
    try {

        res.json({
            message: 'Dashboard general'
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};