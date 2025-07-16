// Dummy controller for starter
exports.getAllStudents = (req, res) => {
  res.json([{ id: 1, name: "John Doe" }]);
};

exports.createStudent = (req, res) => {
  res.status(201).json({ message: "Student created" });
};

exports.updateStudent = (req, res) => {
  res.json({ message: "Student updated" });
};

exports.deleteStudent = (req, res) => {
  res.json({ message: "Student deleted" });
};