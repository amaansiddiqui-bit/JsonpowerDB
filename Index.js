var jpdbbaseURL = 'http://api.login2explore.come5577';
var jpdbIRl = '/api/irl';
var jpdbIML = '/api/iml';
var StudentDB = 'SCHOOL-DB';
var StudentRelation = 'Sudent-Relation'
var connToken = '90932547|-31949277618140691|90949280'

$('ROll-No.').focus();

function saveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno',lvData.rec_no);    
}
 function getStudRollasJsonObj(jsonObj){
     var Roll_NoVar = $("#Roll-No.").val();
     var jsonStr = { 
         id: Roll_NoVar};
    return JSON.stringify(jsonStr); 
 }

function fillData (jsonObj){
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#Roll-No").val( record.RollNo);
    $("#Full-Name").val(record.FullName);
    $("#Class").val(record.Class);
    $("#Birth_Date").val(record.BirthDate);
    $("#Adress").val(record.Adress);
    $("#Enrollment-Date").val(record.EnrollmentDate);
    
}
("#Roll-No.").focus();
function validateData() {
    var Roll_NoVar = $("#Roll-No.").val();
    if (Roll_NoVar === "") {
        alert("Roll No. is a Required Value");
        $("#Roll-No.").focus();
        return "";
    }
    var Student_NameVar = $("#Full-Name").val();
    if (Student_NameVar === "") {
        alert("Full Name is Required Value");
        $("#Full-Name").focus();
        return "";
    }
    var Student_ClassVar = $("#Class").val();
    if (Student_ClassVar === "") {
        alert("Student Class is a Required Value");
        $("#Class").focus();
        return "";
    }
    var Birth_DateVar = $("#Birth-Date").val();
    if (Birth_DateVar === "") {
        alert("Birth Date is a Required Value");
        $("#Birth-Date").focus();
        return "";
    }    
    var AddressVar = $("#Address").val();
    if (AddressVar === "") {
        alert("Adress is Required Value");
        $("#Address").focus();
        return ""; 
    }    
    var Enrollment_DateVar = $("#Enrollment_Date").val();
    if (Enrollment_DateVar === "") {
        alert("Student Department is Required Value");
        $("#Course").focus();
        return "";     
    }    
    var jsonStrObj = {
        Roll_No: Roll_NoVar,
        Full_Name: Student_NameVar,
        Class: Student_ClassVar,
        Birth_Date: Birth_DateVar,
        Address: AddressVar,
        Enrollment_Date:  Enrollment_DateVar
    };
    return JSON.stringify(jsonStrObj);
}

function getstud() {
    var studRollJsonObj = getStudRollasJsonObj();
    var getRequest = createGet_BY_KEYRequest(connToken, StudentDB, StudentRelation, studRollJsonObj);
    jQuery.ajaxSetup({async: false});
            var resJsonObj = (executeCommandatGivenBaseUrl(getRequest, jpdbbaseURL, jpdbIRL);
            jQuery.ajaxSetup({async: true});
            if (reJsonObj.status === 400) {
                $("#Save").prop('disabled', false);
                $("#Reset").prop('disabled', false);
                $('Roll-No.').focus();
            } else if (resJsonObj.status === 200) {
                $("#Roll-No.").prop('disabled', false);
                fillData(resJsonObj);
                $("#Change").prop('disabled', false);
                $("#Reset").prop('disabled', false);
                $('Roll-No.').focus();
            }

        }

            
// This method is used to create PUT Json request.
function createPUTRequest(connToken, jsonStrObj, dbName, relName) {
    var putRequest = "{\n"
            + "\"token\" : \""
            + connToken
            + "\","
            + "\"dbName\": \""
            + dbName
            + "\",\n" + "\"cmd\" : \"PUT\",\n"
            + "\"rel\" : \""
            + relName + "\","
            + "\"jsonStr\": \n"
            + jsonStrObj
            + "\n"
            + "}";
    return putRequest;
}

function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
    var url = dbBaseUrl + apiEndPointUrl;
    var jsonObj;
    $.post(url, reqString, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        var dataJsonObj = result.responseText;
        jsonObj = JSON.parse(dataJsonObj);
    });
    return jsonObj;
}

function saveStudent(){
var jsonStr = validateData();
        if (jsonStr === "") {
return;
}
var putReqStr = createPUTRequest(connToken,
        jsonStr, StudentDB, StudentRelation);
        alert(putReqStr);
        jQuery.ajaxSetup({async: false});
        var resultObj = executeCommand(putReqStr,
                jpdbbaseURL, jpdbIML);
        alert(JSON.stringify(resultObj));
        jQuery.ajaxSetup({async: true});
        resetForm();
        $('Roll-No.'.focus()
                };
function resetForm() {
    $("#Roll-No.").val("");
    $("#Full-Name").val("");
    $("#Class").val("");
    $("#Birth_Date").val("");
    $("#Adress").val("");
    $("#Enrollment-Date").val("");
    $('#Roll-No.').prop('disabled', false);
    $("#Save").prop('disabled', true);
    $("#Change").prop('disabled', true);
    $("#Reset").prop('disabled', true);
    EnableOnlyRollno();
    $("#Roll-No.").focus();
}
;
function changeData()
        $('#Change').prop('disable', true);
jsonchg = validateData();
var updateRequest = createUPDATERecordRequest(connToken, jsonchg, StudentDB, StudentRelation, localStorage.getItem(""));
jQuery.ajaxSetup({async: false});
var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbbaseURL, jpdbIML);
jQuery.ajaxSetup({async: false});
console.log(resJsonObj);
resetForm();
$("Roll-No.").focus();


