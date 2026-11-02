
// =================================
// 1. STUDENT DATA
// =================================

const ds = [
    { name: "An", class: "Web1", score: 8 },
    { name: "Binh", class: "Web2", score: 7 },
    { name: "Cuong", class: "Web1", score: 9 },
    { name: "Dung", class: "Web2", score: 5 },
    { name: "Hoa", class: "Web1", score: 6.5 },
    { name: "Lan", class: "Web2", score: 8.5 }
];


// =================================
// 2. ARRAY FUNCTIONS
// =================================

// Calculate average score
export function diemTrungBinh(ds) {
    if (ds.length === 0) {
        return 0;
    }

    const tong = ds.reduce(
        (sum, sv) => sum + sv.score, 0
    );

    return tong / ds.length;
}


// Get and sort student names
export function layTen(ds) {
    return ds
        .map(sv => sv.name)
        .toSorted((a, b) =>
            a.localeCompare(b, "vi")
        );
}


// Classify student
export function xepLoai(diem) {
    if (diem >= 8) {
        return "Gioi";
    } else if (diem >= 6.5) {
        return "Kha";
    } else if (diem >= 5) {
        return "Trung binh";
    } else {
        return "Yeu";
    }
}


// Group students by class
export function nhomTheoLop(ds) {
    return ds.reduce((result, sv) => {

        if (!result[sv.class]) {
            result[sv.class] = [];
        }

        result[sv.class].push(sv);

        return result;

    }, {});
}


// Get top students
export function top(ds, n) {
    return ds
        .toSorted((a, b) => {

            if (b.score !== a.score) {
                return b.score - a.score;
            }

            return a.name.localeCompare(b.name, "vi");

        })
        .slice(0, n);
}


// =================================
// 3. DISPLAY STATISTICS
// =================================

document.getElementById("totalStudents").textContent =
    ds.length;

document.getElementById("averageScore").textContent =
    diemTrungBinh(ds).toFixed(2);

document.getElementById("totalClasses").textContent =
    Object.keys(nhomTheoLop(ds)).length;


// =================================
// 4. DISPLAY STUDENT TABLE
// =================================

const studentTable = document.getElementById("studentTable");

studentTable.innerHTML = ds.map((sv, index) => {

    const rank = xepLoai(sv.score);

    const badgeClass = {
        "Gioi": "gioi",
        "Kha": "kha",
        "Trung binh": "trungbinh",
        "Yeu": "yeu"
    }[rank];

    return `
        <tr>
            <td>${index + 1}</td>
            <td><strong>${sv.name}</strong></td>
            <td>${sv.class}</td>
            <td>${sv.score}</td>
            <td>
                <span class="badge ${badgeClass}">
                    ${rank}
                </span>
            </td>
        </tr>
    `;

}).join("");


// =================================
// 5. DISPLAY CLASS GROUPS
// =================================

const groups = nhomTheoLop(ds);

document.getElementById("classGroups").innerHTML =
    Object.entries(groups).map(([className, students]) => {

        return `
            <div class="group-box">

                <h3>${className}</h3>

                ${students.map(sv => `
                    <div class="student-item">
                        <span>${sv.name}</span>
                        <strong>${sv.score} points</strong>
                    </div>
                `).join("")}

            </div>
        `;

    }).join("");


// =================================
// 6. DISPLAY TOP 3 STUDENTS
// =================================

document.getElementById("topTable").innerHTML =
    top(ds, 3).map((sv, index) => {

        return `
            <tr>
                <td>
                    <span class="rank">${index + 1}</span>
                </td>

                <td><strong>${sv.name}</strong></td>

                <td>${sv.class}</td>

                <td class="score">${sv.score}</td>
            </tr>
        `;

    }).join("");
