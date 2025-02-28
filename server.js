const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

// Import models
const Idea = require('./models/Idea');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Routes
app.get('/api/ideas/random', async (req, res) => {
    try {
        const count = await Idea.countDocuments();
        if (count === 0) {
            return res.status(404).json({ message: "No ideas available" });
        }
        
        const random = Math.floor(Math.random() * count);
        const randomIdea = await Idea.findOne().skip(random);
        res.json(randomIdea);
    } catch (error) {
        res.status(500).json({ message: "Error fetching random idea", error: error.message });
    }
});

app.post('/api/ideas', async (req, res) => {
    try {
        const { ideaName, ideaDifficulty, ideaAuthors, ideaDescription } = req.body;
        
        if (!ideaName || !ideaDifficulty || !ideaAuthors || !ideaDescription) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newIdea = new Idea({
            ideaName,
            ideaDifficulty: parseInt(ideaDifficulty),
            ideaAuthors,
            ideaDescription
        });

        await newIdea.save();
        res.status(201).json(newIdea);
    } catch (error) {
        res.status(500).json({ message: "Error creating idea", error: error.message });
    }
});

app.get('/api/ideas', async (req, res) => {
    try {
        const ideas = await Idea.find().sort({ createdAt: -1 });
        res.json(ideas);
    } catch (error) {
        res.status(500).json({ message: "Error fetching ideas", error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
