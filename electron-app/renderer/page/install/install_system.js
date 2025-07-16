const installApiUrl = "http://localhost:3000/api/install"; // Change to your actual backend endpoint

function get_value(div) {
    return document.getElementById(div).value;
}

function view_install_page() {
    document.getElementById('install_body').innerHTML = `
        <h3 class="register-heading">Setup Database</h3>
        <div class="row register-form">
            <div class="col-md-12">
                <div class="formLabel">Host Name</div>
                <input type="text" class="inputField" id="hostname" placeholder="Hostname" value="" />

                <div class="formLabel">Database User</div>
                <input type="text" class="inputField" id="db_user" placeholder="Database User" value="" />

                <div class="formLabel">Database Password</div>
                <input type="text" class="inputField" id="db_pass" placeholder="Database Password" value="" />

                <div class="formLabel">Database Name</div>
                <input type="text" class="inputField" id="db_name"  placeholder="Database Name" value="" />

                <center>
                    <button class="btnRegister" id="installBtn">Install</button>
                </center>
            </div>
        </div>
    `;

    document.getElementById("installBtn").addEventListener("click", function() {
        install_first_step();
    });
}

function install_first_step() {
    let hostname = get_value("hostname");
    let db_user = get_value("db_user");
    let db_pass = get_value("db_pass");
    let db_name = get_value("db_name");
    let error = "";

    if (hostname == "") {
        error = "Please Enter Host Name";
    } else if (db_user == "") {
        error = "Please Enter db_user";
    } else if (db_name == "") {
        error = "Please Enter db_name";
    }

    if (error != "") {
        alert(error);
        return;
    }

    const data = {
        hostname,
        db_user,
        db_pass,
        db_name
    };

    // Show loader
    loader("install_body", 160);

    // Send request to backend API (you must create this endpoint in Node/Express)
    $.ajax({
        type: 'POST',
        url: installApiUrl,
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function(response) {
            if (response.success) {
                show_success(response.admin_user || "admin", response.admin_pass || "admin");
            } else {
                document.getElementById('install_body').innerHTML = `<div style="color:red;text-align:center;font-size:18px;">${response.message || "System Install Failed"}</div>`;
            }
        },
        error: function(xhr, status, error) {
            document.getElementById('install_body').innerHTML = `<div style="color:red;text-align:center;font-size:18px;">System Install Failed: ${error}</div>`;
        }
    });
}

function show_success(username, password) {
    document.getElementById('install_body').innerHTML = `
        <style type="text/css">
            .loginArea {
                margin-top: 80px;
            }
            i {
                color: #67B869;
                font-size: 6em;
                margin-bottom: 20px;
            }
        </style>
        <center>
            <div style="margin-top: 30px;"></div>
            <font size="30px;" color="#67B869">Success!</font><br/>
            Install Successfully Done<br/><br/>
            <i class="fas fa-check-circle"></i><br/>
            <b>User Name :</b> ${username}<br/>
            <b>Password :</b> ${password}<br/><br/>
            <br/>
            <button class="btn btn-success" style="font-size: 15px;" onclick="window.location.href='../login/login.html'">Login Account</button>
        </center>
    `;
}