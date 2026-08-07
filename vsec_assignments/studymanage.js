let students = [];


function addStudent()
{
    let name = document.getElementById("name").value.trim();

    let mathInput = document.getElementById("math").value;
    let dbmsInput = document.getElementById("dbms").value;
    let cnInput = document.getElementById("cn").value;
    let javaInput = document.getElementById("java").value;


    // Empty field validation
    if(name == "" || mathInput == "" || dbmsInput == "" || cnInput == "" || javaInput == "")
    {
        alert("Please fill all fields");
        return;
    }


    // Convert marks from string to number
    let math = Number(mathInput);
    let dbms = Number(dbmsInput);
    let cn = Number(cnInput);
    let java = Number(javaInput);



    // Marks validation
    if(math < 0 || math > 100 ||
       dbms < 0 || dbms > 100 ||
       cn < 0 || cn > 100 ||
       java < 0 || java > 100)
    {
        alert("Marks should be between 0 and 100");
        clearfields();
        return;
    }



    // Duplicate name validation
    if(students.includes(name))
    {
        alert("Student name already exists");
        return;
    }


    students.push(name);



    // Calculation
    let total = math + dbms + cn + java;

    let percentage = total / 4;


    let grade;


    if(percentage >= 90)
    {
        grade = "A+";
    }
    else if(percentage >= 80)
    {
        grade = "A";
    }
    else if(percentage >= 70)
    {
        grade = "B";
    }
    else if(percentage >= 60)
    {
        grade = "C";
    }
    else
    {
        grade = "F";
    }



    // Adding data into table

    let table = document.getElementById("tableBody");


    table.innerHTML += `
    
    <tr>
        <td>${name}</td>
        <td>${math}</td>
        <td>${dbms}</td>
        <td>${cn}</td>
        <td>${java}</td>
        <td>${total}</td>
        <td>${percentage}%</td>
        <td>${grade}</td>
    </tr>

    `;



    // Clear input fields
function clearfields()
{
    document.getElementById("name").value = "";
    document.getElementById("math").value = "";
    document.getElementById("dbms").value = "";
    document.getElementById("cn").value = "";
    document.getElementById("java").value = "";
}
}