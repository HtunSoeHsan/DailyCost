
import prodb, {
    bulkcreate,
    createEle,
    getData,
    SortObj
  } from "./module.js";
  
  
  let db = prodb("Productdb", {
    products: `++id, date`
  });
   

// input tags
const dateId = document.getElementById("date");
const titleId = document.getElementById("title");
const enpentId = document.getElementById("expent");
const remarkId = document.getElementById("remark");

// create button
const btncreate = document.getElementById("btn-create");
const btnread = document.getElementById("btn-read");
const btnupdate = document.getElementById("btn-update");
const btndelete = document.getElementById("btn-delete");

// add data
btncreate.onclick = event =>{
    let flag = bulkcreate(db.products,{
        title: titleId.value,
        expent: enpentId.value,
        remark: remarkId.value,
        date: dateId.value
    })
    // set null
    dateId.value = titleId.value = remarkId.value = enpentId.value = "";

    let insertmsg = document.querySelector(".insertmsg");
  getMsg(flag, insertmsg);

  table()
}


// event listerner for create button
btnread.onclick = table;

// button update
btnupdate.onclick = () => {
  
  if (id) {
    // call dexie update method
    db.products.update(id, {
      title: titleId.value,
      expent: enpentId.value,
      remark: remarkId.value,
      date : dateId.value
    }).then((updated) => {
       let get = updated ? `data updated` : `couldn't update data`;
      // let get = updated ? true : false;

      // display message
      let updatemsg = document.querySelector(".updatemsg");
      getMsg(get, updatemsg);

      proname.value = seller.value = price.value = "";
      console.log(get);
      
    })
    document.location.reload(true);
  } else {
    console.log(`Please Select id: ${id}`);
  }
}

// delete button
btndelete.onclick = () => {
  db.delete();
  db = prodb("Productdb", {
    products: `++id, date`
  });
  db.open();
  table();
  textID(id);
  // display message
  let deletemsg = document.querySelector(".deletemsg");
  getMsg(true, deletemsg);
}

// window.onload = event => {
//   // set id textbox value
//   textID(id);
// };


// create dynamic table
function table() {
  const tbody = document.getElementById("tbody");
  const notfound = document.getElementById("notfound");
  notfound.textContent = "";
  // remove all childs from the dom first
  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.firstChild);
  }


  getData(db.products, (data, index) => {
    if (data) {
      // console.log("indext data",data)
      createEle("tr", tbody, tr => {
        for (const value in data) {
          createEle("td", tr, td => {
            td.textContent = data.expent === data[value] ? `$ ${data[value]}` : data[value];
          });
        }
        createEle("td", tr, td => {
          createEle("i", td, i => {
            i.className += "bi bi-pencil-square";
            i.setAttribute(`data-id`, data.id);
            // store number of edit buttons
            i.onclick = editbtn;
          });
        })
        createEle("td", tr, td => {
          createEle("i", td, i => {
            i.className += "bi bi-trash";
            i.setAttribute(`data-id`, data.id);
            // store number of edit buttons
            i.onclick = deletebtn;
          });
        })
      });
    } else {
      notfound.textContent = "No record found in the database...!";
    }

  });
}
let id = "";
const editbtn = (event) => {
  id = parseInt(event.target.dataset.id);
  db.products.get(id, function (data) {
    let newdata = SortObj(data);
    title.value = newdata.title || "";
    expent.value = newdata.expent || "";
    remark.value = newdata.remark || "";
    date.value = newdata.date || "";
  });
}

// delete icon remove element 
const deletebtn = event => {
  let id = parseInt(event.target.dataset.id);
  db.products.delete(id);
  table();
}

// textbox id
function textID(textboxid) {
  getData(db.products, data => {
    textboxid.value = data.id + 1 || 1;
  });
}

// function msg
function getMsg(flag, element) {
  if (flag) {
    // call msg 
    element.className += " movedown";

    setTimeout(() => {
      element.classList.forEach(classname => {
        classname == "movedown" ? undefined : element.classList.remove('movedown');
      })
    }, 4000);
  }
}
//   using datatable
// $(document).ready( function () {
//     $('#myTable').DataTable();
// } );
// datatable responsive in small screem
$(document).ready(function() {
 
 
    $(window).on('resize', function() {
    isSmallWindow = $(this).width() < 768;
    if(isSmallWindow) {
     
    $('#myTable').DataTable( {
      responsive: {
        details: {
            display: $.fn.dataTable.Responsive.display.childRowImmediate,
            type: 'none',
            target: ''
        }
      }
    } );
     
     
     
    }else {
     
    var table = $('#example').DataTable( {
      scrollY:        "300px",
      scrollX:        true,
      scrollCollapse: true,
      paging:         false,
      fixedColumns:   true
    } );
     
     
    }
    }); 
     
     
     
    } );

const d = new Date();
dateId.placeholder.value = d
document.getElementById("demo").innerHTML = d;