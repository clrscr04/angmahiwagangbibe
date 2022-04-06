$(document).ready(function(){

  var dataToAdd=[];

  $("#inputAddress").text(localStorage.getItem("greetings"));
  $("#inputNotes").text(localStorage.getItem("notes"));
  $("#inputContact").text(localStorage.getItem("contact"));


  if(localStorage.getItem("greetings") === null){

  }else{
    $(".addressLoc").html(localStorage.getItem("greetings"));
    $(".notesDIV").html(localStorage.getItem("notes"));
    $(".contactDIV").html(localStorage.getItem("contact"));
  }


  $("#saveInformation").on("click",function(){
    localStorage.setItem("greetings", $("#inputAddress").val());
    localStorage.setItem("notes", $("#inputNotes").val());
    localStorage.setItem("contact", $("#inputContact").val());

    $(".addressLoc").html(localStorage.getItem("greetings"));
    $(".notesDIV").html(localStorage.getItem("notes"));
    $(".contactDIV").html(localStorage.getItem("contact"));
  });



  if(localStorage.getItem("logoImage") === null){

  }else{
    var retrievedImage = localStorage.getItem("logoImage");
    $('#logoImage').attr('src', retrievedImage);
  }





$("#printQuote").on("click",function(){
  $("#printableDIV").print();
});



$("#updateQuote").on("click", function(){
$("#cNameToPrint").text($("#clientName").val());
$("#cInfoToPrint").text($("#clientContactInfo").val());
$("#dateToPrint").text($("#Date").val());
$("#RfqToPrint").text($("#rfqNumber").val());
$("#nameInfo").text($("#empName").val());
$("#position69").text($("#empPos").val());
});



$(".editableDIV").each(function(){
  this.contentEditable = true;
});


$("#logoUpload").change(function() {
  const file = this.files[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function(event) {
      localStorage.setItem("logoImage", event.target.result);
      $('#logoImage').attr('src', event.target.result);
    }
    reader.readAsDataURL(file);
  }
});

showData();

$("#addUnit").on("click", function() {
  event.preventDefault();
  //compute price and discount depending on quantity
  let subTotal = 0;
  let priceDiscount = Number($("#pDiscount").val());
  let productPrice = Number($("#pPrice").val());
  let productQuantity = Number($("#pQuantity").val());
  if (priceDiscount == "" || priceDiscount == 0) {
    priceDiscount = 0;
    subTotal = productPrice * productQuantity;
  } else {
    subTotal = priceDiscount * productQuantity;
  }
  //create oblject
  let unitObject = {
    Quantity: productQuantity,
    pName: $("#pName").val(),
    pDesc: $("#pSpecs").val(),
    pPrice: productPrice,
    pDiscount: priceDiscount,
    unitSubTotal: subTotal
  };
  //push/add object to array
  dataToAdd.push(unitObject);
  //redisplay data with updated arraylist
  showData();

  //clear fields
  $("#pQuantity").val(1);
  $("#pName").val("");
  $("#pCode").val("");
  $("#pDesc").val("");
  $("#pPrice").val("");
  $("#pDiscount").val("");
});
































//the function we need, but not deserve
function showData() {
  $("#itemList").DataTable({
    "footerCallback": function ( row, data, start, end, display ) {
        var api = this.api();
        // Remove the formatting to get integer data for summation
        var intVal = function ( i ) {
            return typeof i === 'string' ?
                i.replace(/[\$,]/g, '')*1 :
                typeof i === 'number' ?
                    i : 0;
        };
        // Total over all pages
        total = api
            .column( 5 )
            .data()
            .reduce( function (a, b) {
                return intVal(a) + intVal(b);
            }, 0 );
        // Total over this page
        pageTotal = api
            .column( 5, { page: 'current'} )
            .data()
            .reduce( function (a, b) {
                return intVal(a) + intVal(b);
            }, 0 );
        // Update footer
        $( api.column( 5 ).footer() ).html(
            'P'+pageTotal +' ( P'+ total +' total)'
        );
    },
    searching: false,
    info: false,
    paging: false,
    destroy: true,
    pageLength: 10,
    data: dataToAdd,
    columns: [{
        data: "Quantity"
      },
      {
        data: "pName"
      },
      {
        data: "pDesc"
      },
      {
        data: "pPrice"
      },
      {
        data: "pDiscount"
      },
      {
        data: "unitSubTotal"
      }
    ]
  });
};





//delete the row selected on click
  $('#itemList tbody').on('click', 'tr', function() {
    let tableNew = $('#itemList').DataTable();
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
    } else {
      tableNew.$('tr.selected').removeClass('selected');
      $(this).addClass('selected');
    }
    tableNew.row('.selected').remove().draw(false);
  });






});
