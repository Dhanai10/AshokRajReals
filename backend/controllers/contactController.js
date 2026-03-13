const supabase = require('../models/supabase');

const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address' });
    }

    const { data, error } = await supabase
      .from('contacts')
      .insert([{ name, email, message, created_at: new Date().toISOString() }])
      .select();

    if (error) throw error;

    res.status(201).json({ success: true, message: 'Message sent successfully! We will get back to you soon.' });
  } catch (error) {
    console.error('Error submitting contact:', error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
};

const getContacts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch contacts' });
  }
};

module.exports = { submitContact, getContacts };
