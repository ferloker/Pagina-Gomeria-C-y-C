const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const sharp = require('sharp');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuration for Multer (Memory Storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve static directories (Removed aggressive caching for development visibility)
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin/admin.html'));
});

// API Endpoints
app.post('/api/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No se subió ningún archivo.' });
    }

    const target = req.body.target;
    const fileNameMap = {
        'logo': 'logo.png',
        'motocarro': 'motocarro.jpg',
        'moto': 'moto.jpg',
        'nuevos': 'nuevos.jpg',
        'usados': 'usados.jpg'
    };

    const targetFilename = fileNameMap[target];
    if (!targetFilename) {
        return res.status(400).json({ error: 'Objetivo de imagen no válido.' });
    }

    const uploadDir = path.join(__dirname, 'assets/images');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const outputPath = path.join(uploadDir, targetFilename);

    try {
        let pipeline = sharp(req.file.buffer);

        // Auto-resize if wider than 1200px
        pipeline = pipeline.resize({
            width: 1200,
            withoutEnlargement: true,
            fit: 'inside'
        });

        // Specific logic for different targets
        if (targetFilename.endsWith('.jpg')) {
            pipeline = pipeline.jpeg({ quality: 85, mozjpeg: true });
        } else if (targetFilename.endsWith('.png')) {
            pipeline = pipeline.png({ quality: 85 });
        }

        await pipeline.toFile(outputPath);
        
        console.log(`Imagen Optimizada: ${targetFilename} (Original: ${req.file.originalname})`);
        res.json({ success: true, filename: targetFilename });
    } catch (error) {
        console.error('Error procesando imagen:', error);
        res.status(500).json({ error: 'Error al procesar la imagen.' });
    }
});

// Settings File Path
const settingsFilePath = path.join(__dirname, 'admin', 'settings.json');

// Ensure settings file exists with defaults
const defaultSettings = {
    whatsappNumber: "595973378073",
    whatsappLogoSize: 80,
    buttons: {
        hero: {
            text: "Contactanos por WhatsApp",
            message: "Hola, necesito asistencia mecánica desde la página principal.",
            color: "#25D366"
        },
        auxilioMotocarro: {
            text: "Pedir auxilio ahora",
            message: "Hola 👋\nNecesito solicitar un auxilio.\n\nTipo de vehículo: Motocarro\nProblema:",
            color: "#D72638"
        },
        auxilioMoto: {
            text: "Pedir auxilio ahora",
            message: "Hola 👋\nNecesito solicitar un auxilio.\n\nTipo de vehículo: Moto\nProblema:",
            color: "#D72638"
        },
        neumaticos: {
            text: "Consultar disponibilidad",
            message: "Hola 👋\nQuiero consultar disponibilidad de neumáticos.\n\nVehículo:\nMedida (ej: 175/65 R14):\nNuevo o usado:",
            color: "#25D366"
        }
    }
};

if (!fs.existsSync(settingsFilePath)) {
    fs.mkdirSync(path.join(__dirname, 'admin'), { recursive: true });
    fs.writeFileSync(settingsFilePath, JSON.stringify(defaultSettings, null, 2));
}

// Settings Endpoints
app.use(express.json()); // Essential for parsing JSON bodies

app.get('/api/settings', (req, res) => {
    try {
        const settings = JSON.parse(fs.readFileSync(settingsFilePath, 'utf8'));
        res.json(settings);
    } catch (error) {
        console.error('Error reading settings:', error);
        res.status(500).json({ error: 'Failed to read settings.' });
    }
});

app.post('/api/settings', (req, res) => {
    try {
        const currentSettings = JSON.parse(fs.readFileSync(settingsFilePath, 'utf8'));
        const newSettings = { ...currentSettings, ...req.body };
        fs.writeFileSync(settingsFilePath, JSON.stringify(newSettings, null, 2));
        res.json({ success: true, settings: newSettings });
    } catch (error) {
        console.error('Error saving settings:', error);
        res.status(500).json({ error: 'Failed to save settings.' });
    }
});

app.listen(PORT, () => {
    console.log(`-----------------------------------------------`);
    console.log(`Servidor de Gomería C y C corriendo en:`);
    console.log(`👉 http://localhost:${PORT}`);
    console.log(`👉 http://localhost:${PORT}/admin (Panel de Control)`);
    console.log(`-----------------------------------------------`);
});
