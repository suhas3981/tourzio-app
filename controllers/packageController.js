const Package = require('../models/Package');

exports.getAllPackages = async (req, res) => {
  try {
    const { type, location, minPrice, maxPrice, difficulty } = req.query;
    
    let filter = { isActive: true };
    
    if (type) filter.type = type;
    if (location) filter.location = new RegExp(location, 'i');
    if (difficulty) filter.difficulty = difficulty;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const packages = await Package.find(filter).sort({ rating: -1, createdAt: -1 });
    
    res.render('packages', { packages, filters: req.query });
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).render('packages', { 
      packages: [], 
      filters: req.query,
      error: 'Failed to load packages' 
    });
  }
};

exports.getPackageById = async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    
    if (!package) {
      return res.status(404).render('home', { 
        error: 'Package not found' 
      });
    }

    res.render('package-detail', { package });
  } catch (error) {
    console.error('Error fetching package:', error);
    res.status(500).render('home', { 
      error: 'Failed to load package details' 
    });
  }
};

exports.getFeaturedPackages = async (req, res) => {
  try {
    const packages = await Package.find({ isActive: true })
      .sort({ rating: -1 })
      .limit(6);
    
    return packages;
  } catch (error) {
    console.error('Error fetching featured packages:', error);
    return [];
  }
};
