const Students = require('../models/students');
const Personal = require('../models/personal');
const Educational = require('../models/educational');

// Create a new user with personal details and educational information
exports.createUser = async (req, res) => {
    const { student, personal, educational } = req.body;
    try {
        // Create student details
        const stud = new Students({
            name: student.name,
            email: student.email,
            password: student.password,
            mobile: student.mobile,
            role: student.role
        });
        await stud.save();
        
        // Add personal details
        const pers = new Personal({
            address: personal.address,
            biodata: personal.biodata,
            student: stud._id
        });
        await pers.save();
        
        stud.personaldet = pers._id;
        await stud.save();

        // Add educational details
        const edu = new Educational({
            current: educational.current,
            education: educational.education,
            student: stud._id
        });
        await edu.save();

        stud.educationaldet.push(edu._id);
        await stud.save();

        res.status(201).json({
            message: "User created with personal and educational data",
            user: stud,
            personal_details: pers,
            educational_details: edu
        });
    } catch (error) {
        console.error("Error in creation", error);
        res.status(500).json({ error: "Failed" });
    }
};

// Get educational details for specific user id
exports.getEducation = async (req, res) => {
    try {
        const { userId } = req.params;
        const edu = await Students.findById(userId).select('name educationaldet').populate('educationaldet').lean();
        if (!edu || edu === 0) {
            return res.status(404).send({ message: "Student Not found" });
        }
        edu.educationaldet.forEach(item => {
            delete item.student;
            delete item.__v;
        });
        res.send(edu);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
};

// Post an education for an existing student
exports.postEducation = async (req, res) => {
    try {
        const { userId } = req.params;
        const { educational } = req.body;

        const user = await Students.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "Student Not found" });
        }

        // Add education
        const edu = new Educational({
            current: educational.current,
            education: educational.education,
            student: user._id
        });

        await edu.save();
        user.educationaldet.push(edu._id);
        await user.save();
        res.status(201).send({ message: "Education Added to the user", user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server Error" });
    }
};

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Students.find({}).populate('personaldet').populate('educationaldet');
        if (!students) {
            res.status(404).send({ message: "No Students found" });
        }
        res.status(200).send({ message: "All student details are fetched successfully", students });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server error" });
    }
};

// Get one student details
exports.getStudent = async (req, res) => {
    try {
        const { userId } = req.params;
        const student = await Students.findById(userId).select('personaldet educationaldet').populate('personaldet').populate('educationaldet').lean();
        if (!student) {
            res.status(404).send({ message: "Student Not found" });
        }
        student.educationaldet.forEach(item => {
            delete item.student;
            delete item.__v;
            delete item._id;
        });
        delete student.personaldet.student;
        delete student.personaldet.__v;
        delete student.personaldet._id;
        res.status(200).send({ message: "Given Student detail is fetched", student });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

// Update one student
exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { student } = req.body;
        const stud = await Students.findByIdAndUpdate(id, student, { new: true, runValidators: true });
        if (!stud) {
            return res.status(404).send('Student not found');
        }
        await stud.save();
        res.status(200).send({ message: "Updated", stud });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};
