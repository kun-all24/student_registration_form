document.addEventListener('DOMContentLoaded', (event) => {
    loadStudents();
});

function addStudent() {
    const studentName = document.getElementById('studentName').value;
    const studentID = document.getElementById('studentID').value;
    const emailID = document.getElementById('emailID').value;
    const contactNo = document.getElementById('contactNo').value;

    if (!studentName || !studentID || !emailID || !contactNo) {
        alert('All fields are required.');
        return;
    }

    const student = {
        name: studentName,
        id: studentID,
        email: emailID,
        contact: contactNo
    };

    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));

    clearForm();
    loadStudents();
}

function loadStudents() {
    const studentRecords = document.getElementById('student-records');
    studentRecords.innerHTML = '';

    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.forEach((student, index) => {
        let row = document.createElement('tr');

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        studentRecords.appendChild(row);
    });
}

function editStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    let student = students[index];

    document.getElementById('studentName').value = student.name;
    document.getElementById('studentID').value = student.id;
    document.getElementById('emailID').value = student.email;
    document.getElementById('contactNo').value = student.contact;

    deleteStudent(index);
}

function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    loadStudents();
}

function clearForm() {
    document.getElementById('registration-form').reset();
}
