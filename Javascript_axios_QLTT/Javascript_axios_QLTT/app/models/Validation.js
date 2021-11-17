function Validation() {
    //Kiểm tra rỗng
    this.checkEmpty = function (value, message, spanID) {
        if (value.trim() != "") {
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        } else {
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
        }
    }

    //Kiểm tra trùng
    this.checkID = function (value, message, spanID, mang) {
        var isExist = false;
        isExist = mang.some(function (phantutrongmang) {
            return value == phantutrongmang.taiKhoan;
        })
        if (isExist) {
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
        } else {
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
    }

    //Kiểm tra ký tự name
    this.checkName = function (value, message, spanID) {
        var pattern = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$";
        var reg = new RegExp(pattern);
        if (value.match(reg)) {
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        } else {
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
        }
    }

    //Kiểm tra định dạng mật khẩu
    this.checkPass = function (value, message, spanID) {
        var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/;
        if (value.match(pattern)) {
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        } else {
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
        }
    }

    //Kiểm tra định dạng email
    this.checkEmail = function (value, message, spanID) {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(pattern)) {
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        } else {
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
        }
    }

    //Kiểm tra select khác rỗng
    this.checkSelect = function (selectID, message, spanID) {
        if (document.getElementById(selectID).selectedIndex != 0) {
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        } else {
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
        }
    }

    //Kiểm tra độ dài Text
    this.checkRange = function (value, message, spanID) {
        if (value.length <= 60) {
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        } else {
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
        }
    }
}