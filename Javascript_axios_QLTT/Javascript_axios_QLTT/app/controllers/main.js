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

    isValid &= validation.checkEmpty(taikhoan, "T??i kho???n kh??ng ???????c ????? tr???ng", "spanTaikhoan") && validation.checkID(taikhoan,"T??i kho???n kh??ng ???????c tr??ng","spanTaikhoan",arrData);

    isValid &= validation.checkEmpty(hoten, "H??? t??n kh??ng ???????c ????? tr???ng", "spanHoten") && validation.checkName(hoten,"K?? t??? kh??ng h???p l???","spanHoten");

    isValid &= validation.checkEmpty(matkhau,"M???t kh???u kh??ng ???????c ????? tr???ng","spanPasswork") && validation.checkPass(matkhau,"M???t kh???u g???m 1 k?? t??? Hoa, 1 k?? t??? ?????c bi???t, 1 k?? t??? s???, ????? d??i t??? 6-8 k?? t???","spanPasswork");

    isValid &= validation.checkEmpty(email,"Email kh??ng ???????c ????? tr???ng","spanEmail") && validation.checkEmail(email,"Email kh??ng ????ng ?????nh d???ng","spanEmail");

    isValid &= validation.checkEmpty(hinhanh,"H??nh ???nh kh??ng ???????c ????? tr???ng","spanHinhanh");

    isValid &= validation.checkSelect("loaiNguoiDung","H??y ch???n lo???i ng?????i d??ng","spanLoaiNd");

    isValid &= validation.checkSelect("loaiNgonNgu","H??y ch???n lo???i ng??n ng???","spanLoaingonngu");

    isValid &= validation.checkEmpty(mota,"M?? t??? kh??ng ???????c ????? tr???ng","spanMota") && validation.checkRange(mota,"M?? t??? d?????i 60 k?? t???","spanMota");

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
    //Get Data l??n Modal Edit
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

    isValid &= validation.checkEmpty(taikhoan, "T??i kho???n kh??ng ???????c ????? tr???ng", "spanTaikhoan");

    isValid &= validation.checkEmpty(hoten, "H??? t??n kh??ng ???????c ????? tr???ng", "spanHoten") && validation.checkName(hoten,"K?? t??? kh??ng h???p l???","spanHoten");

    isValid &= validation.checkEmpty(matkhau,"M???t kh???u kh??ng ???????c ????? tr???ng","spanPasswork") && validation.checkPass(matkhau,"M???t kh???u g???m 1 k?? t??? Hoa, 1 k?? t??? ?????c bi???t, 1 k?? t??? s???, ????? d??i t??? 6-8 k?? t???","spanPasswork");

    isValid &= validation.checkEmpty(email,"Email kh??ng ???????c ????? tr???ng","spanEmail") && validation.checkEmail(email,"Email kh??ng ????ng ?????nh d???ng","spanEmail");

    isValid &= validation.checkEmpty(hinhanh,"H??nh ???nh kh??ng ???????c ????? tr???ng","spanHinhanh");

    isValid &= validation.checkSelect("loaiNguoiDung","H??y ch???n lo???i ng?????i d??ng","spanLoaiNd");

    isValid &= validation.checkSelect("loaiNgonNgu","H??y ch???n lo???i ng??n ng???","spanLoaingonngu");

    isValid &= validation.checkEmpty(mota,"M?? t??? kh??ng ???????c ????? tr???ng","spanMota") && validation.checkRange(mota,"M?? t??? d?????i 60 k?? t???","spanMota");

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
