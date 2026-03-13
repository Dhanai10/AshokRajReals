const supabase = require('../models/supabase');

// GET all properties with optional filters
const getProperties = async (req, res) => {
  try {
    const { city, propertyType, minSqft, maxSqft } = req.query;

    let query = supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (city && city.trim()) {
      query = query.ilike('city', `%${city.trim()}%`);
    }
    if (propertyType && propertyType !== 'all') {
      query = query.eq('property_type', propertyType);
    }
    if (minSqft) {
      query = query.gte('sqft', parseInt(minSqft));
    }
    if (maxSqft) {
      query = query.lte('sqft', parseInt(maxSqft));
    }

    const { data, error } = await query;

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch properties' });
  }
};

// POST create new property
const createProperty = async (req, res) => {
  try {
    const { propertyType, city, sqft, description } = req.body;
    const imageUrl = req.file?.path || req.file?.secure_url || null;

    if (!propertyType || !city || !sqft || !description) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const { data, error } = await supabase
      .from('properties')
      .insert([{
        property_type: propertyType,
        city,
        sqft: parseInt(sqft),
        description,
        image_url: imageUrl,
        created_at: new Date().toISOString()
      }])
      .select();

    if (error) throw error;

    res.status(201).json({ success: true, data: data[0], message: 'Property added successfully' });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ success: false, message: 'Failed to create property' });
  }
};

// DELETE property
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ success: false, message: 'Failed to delete property' });
  }
};

module.exports = { getProperties, createProperty, deleteProperty };
