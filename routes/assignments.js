let Assignment = require('../model/assignment');

// TP5: Récupérer tous les assignments avec pagination (GET)
async function getAssignments(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const aggregateQuery = Assignment.aggregate();

        const result = await Assignment.aggregatePaginate(aggregateQuery, {
            page: page,
            limit: limit,
        });

        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

// Récupérer un assignment par son id (GET)
async function getAssignment(req, res) {
    try {
        const assignmentId = req.params.id;

        // On cherche par le champ "id" (numérique) comme dans le TP
        const assignment = await Assignment.findOne({ id: assignmentId });
        res.json(assignment);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

// Ajout d'un assignment (POST)
async function postAssignment(req, res) {
    try {
        let assignment = new Assignment();
        assignment.id = req.body.id;
        assignment.nom = req.body.nom;
        assignment.dateDeRendu = req.body.dateDeRendu;
        assignment.rendu = req.body.rendu;

        console.log('POST assignment reçu :');
        console.log(assignment);

        await assignment.save();
        res.json({ message: `${assignment.nom} saved!` });
    } catch (err) {
        console.error(err);
        res.status(500).send('cant post assignment ' + err);
    }
}

// Update d'un assignment (PUT)
async function updateAssignment(req, res) {
    try {
        console.log('UPDATE reçu assignment : ');
        console.log(req.body);

        // On met à jour par _id (Mongo), comme dans le cours
        await Assignment.findByIdAndUpdate(req.body._id, req.body, { new: true });

        res.json({ message: 'updated' });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

// suppression d'un assignment (DELETE)
async function deleteAssignment(req, res) {
    try {
        const deleted = await Assignment.findByIdAndRemove(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'assignment not found' });
        }

        res.json({ message: `${deleted.nom} deleted` });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
