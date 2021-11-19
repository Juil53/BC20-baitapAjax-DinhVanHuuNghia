var service = new TeacherService();
var validation = new Validation();
var arrData = [];

function GetTeacherList() {
    service
        .TeacherApi()
        .then(function (result) {
            arrData = result.data;
            console.log(arrData);
            renderData(result.data); 
        })
        .catch(function () {
        })
}
GetTeacherList();



//Render Data
function renderData(data) {
    var content = "";
    data.forEach(function (giaovien, index) {
        content +=
            `<tr>
        <td>${index + 1}</td>
        <td>${giaovien.taiKhoan}</td>
        <td>${giaovien.matKhau}</td>
        <td>${giaovien.hoTen}</td>
        <td>${giaovien.email}</td>
        <td>${giaovien.ngonNgu}</td>
        <td>${giaovien.loaiND}</td>
        <td><button class="btn btn-danger" onclick=deleteData(${giaovien.id})>Delete</button></td>
        <td><button id="btnEdit" class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editData(${giaovien.id})">Edit</button></td>
        </tr>`
    });
    document.getElementById("tblDanhSachNguoiDung").innerHTML = content;
}

//Delete Data
function deleteData(id) {
    service
        .DeleteApi(id)
        .then(function () {
            alert("Deleted")
            GetTeacherList();
        })
        .catch(function () {
        })
}


//Add Modal
document.getElementById("btnThemNguoiDung").addEventListener("click", function () {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Add Teacher";
    var footerModal = `<button class="btn btn-success" onclick="addData()">Add Data</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footerModal;
})
//Add Data
function addData() {
    //Lay value input
    var taikhoan = document.getElementById("TaiKhoan").value;
    var hoten = document.getElementById("HoTen").value;
    var matkhau = document.getElementById("MatKhau").value;
    var email = document.getElementById("Email").value;
    var hinhanh = document.getElementById("HinhAnh").value;
    var loainguoidung = document.getElementById("loaiNguoiDung").value;
    var ngonngu = document.getElementById("loaiNgonNgu").value;
    var mota = document.getElementById("MoTa").value;
    //Check Valid
    var isValid = true;

    isValid &= validation.checkEmpty(taikhoan, "Tài khoản không được để trống", "spanTaikhoan") && validation.checkID(taikhoan,"Tài khoản không được trùng","spanTaikhoan",arrData);

    isValid &= validation.checkEmpty(hoten, "Họ tên không được để trống", "spanHoten") && validation.checkName(hoten,"Ký tự không hợp lệ","spanHoten");

    isValid &= validation.checkEmpty(matkhau,"Mật khẩu không được để trống","spanPasswork") && validation.checkPass(matkhau,"Mật khẩu gồm 1 ký tự Hoa, 1 ký tự đặc biệt, 1 ký tự số, độ dài từ 6-8 ký tự","spanPasswork");

    isValid &= validation.checkEmpty(email,"Email không được để trống","spanEmail") && validation.checkEmail(email,"Email không đúng định dạng","spanEmail");

    isValid &= validation.checkEmpty(hinhanh,"Hình ảnh không được để trống","spanHinhanh");

    isValid &= validation.checkSelect("loaiNguoiDung","Hãy chọn loại người dùng","spanLoaiNd");

    isValid &= validation.checkSelect("loaiNgonNgu","Hãy chọn loại ngôn ngữ","spanLoaingonngu");

    isValid &= validation.checkEmpty(mota,"Mô tả không được để trống","spanMota") && validation.checkRange(mota,"Mô tả dưới 60 ký tự","spanMota");

    if (isValid) {
        var newteacher = new Teacher("", taikhoan, hoten, matkhau, email, loainguoidung, ngonngu, mota, hinhanh);
        service
            .addApi(newteacher)
            .then(function () {
                document.getElementsByClassName("close")[0].click();
                GetTeacherList();
            })
            .catch(function () {
            })
    }
}

// Edit Modal
function editData(giaovienid) {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Edit Teacher";
    var footerModal = `<button class="btn btn-info" onclick="updateData(${giaovienid})">Update Data</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footerModal;
    //Get Data lên Modal Edit
    service
        .getDataApi(giaovienid)
        .then(function (result) {
            console.log(result.data);
            document.getElementById("TaiKhoan").value = result.data.taiKhoan;
            document.getElementById("HoTen").value = result.data.hoTen;
            document.getElementById("MatKhau").value = result.data.matKhau;
            document.getElementById("Email").value = result.data.email;
            document.getElementById("HinhAnh").value = result.data.hinhAnh;
            document.getElementById("loaiNguoiDung").value = result.data.loaiND;
            document.getElementById("loaiNgonNgu").value = result.data.ngonNgu;
            document.getElementById("MoTa").value = result.data.moTa;
        })
        .catch(function (error) {
            console.log(error);
        })
}

// Update Data
function updateData(id) {
    var taikhoan = document.getElementById("TaiKhoan").value;
    var hoten = document.getElementById("HoTen").value;
    var matkhau = document.getElementById("MatKhau").value;
    var email = document.getElementById("Email").value;
    var hinhanh = document.getElementById("HinhAnh").value;
    var loainguoidung = document.getElementById("loaiNguoiDung").value;
    var ngonngu = document.getElementById("loaiNgonNgu").value;
    var mota = document.getElementById("MoTa").value;

    var isValid = true;

    isValid &= validation.checkEmpty(taikhoan, "Tài khoản không được để trống", "spanTaikhoan");

    isValid &= validation.checkEmpty(hoten, "Họ tên không được để trống", "spanHoten") && validation.checkName(hoten,"Ký tự không hợp lệ","spanHoten");

    isValid &= validation.checkEmpty(matkhau,"Mật khẩu không được để trống","spanPasswork") && validation.checkPass(matkhau,"Mật khẩu gồm 1 ký tự Hoa, 1 ký tự đặc biệt, 1 ký tự số, độ dài từ 6-8 ký tự","spanPasswork");

    isValid &= validation.checkEmpty(email,"Email không được để trống","spanEmail") && validation.checkEmail(email,"Email không đúng định dạng","spanEmail");

    isValid &= validation.checkEmpty(hinhanh,"Hình ảnh không được để trống","spanHinhanh");

    isValid &= validation.checkSelect("loaiNguoiDung","Hãy chọn loại người dùng","spanLoaiNd");

    isValid &= validation.checkSelect("loaiNgonNgu","Hãy chọn loại ngôn ngữ","spanLoaingonngu");

    isValid &= validation.checkEmpty(mota,"Mô tả không được để trống","spanMota") && validation.checkRange(mota,"Mô tả dưới 60 ký tự","spanMota");

    if (isValid)

    var newteacher = new Teacher(id, taikhoan, hoten, matkhau, email, loainguoidung, ngonngu, mota, hinhanh);
    service
        .updateApi(newteacher)
        .then(function (result) {
            document.getElementsByClassName("close")[0].click();
            GetTeacherList();
        })
        .catch(function (error) {

        })
}
