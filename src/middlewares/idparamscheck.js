exports.checkidparams = (req, res, next) => {
    const id = req.params.id; // Assuming 'id' is passed as a route parameter

    // Check if 'id' parameter is missing or empty
    if (!id || id.trim() === '') {
        return res.status(400).json({ error: 'Missing or empty "id" parameter' });
    }

    // If 'id' parameter is present, proceed to the next middleware or route handler
    next();
  };