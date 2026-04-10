// ==================== JAVASCRIPT CƠ BẢN ====================

function showToast(msg){const x=document.getElementById("toast");x.textContent=msg;x.className="show";setTimeout(function(){x.className=x.className.replace("show","");},3000);}
let dbWood=[],dbFinish=[],dbAccessories=[],dbCore=[],dbPackaging=[];
function toggleDbManager(){const m=document.getElementById('dbManager');if(m.style.display==='none'||!m.style.display){m.style.display='block';renderDbManager();}else{m.style.display='none';}}
function showGuide(){document.getElementById('guideModal').style.display='flex';}
function closeGuide(){document.getElementById('guideModal').style.display='none';}
function renderDbManager() {
  const body = document.getElementById('dbBody');
  if (!body) return;
  body.innerHTML = `
<div class="db-section">
  <div class="db-section-title">🌳 Gỗ <button class="btn-add-new" onclick="toggleAddForm('wood')">➕ Thêm</button></div>
  <div id="addWoodForm" class="add-form" style="display:none;">
    <div class="form-row">
      <input type="text" id="newWoodCode" placeholder="Mã">
      <input type="text" id="newWoodName" placeholder="Tên">
      <input type="number" id="newWoodPrice" placeholder="Giá/m³">
      <input type="number" id="newWoodTlth" placeholder="TLTH" value="1.54">
      <input type="number" id="newWoodThick" placeholder="Dày mm" value="32">
    </div>
    <div class="form-row">
      <button onclick="addWoodFromForm()">Lưu</button>
      <button class="cancel" onclick="toggleAddForm('wood')">Hủy</button>
    </div>
  </div>
  <table class="db-table"><thead><tr><th>Mã</th><th>Tên</th><th>Giá/m³</th><th>TLTH</th><th></th></tr></thead><tbody id="woodList"></tbody></table>
</div>
<div class="db-section">
  <div class="db-section-title">🪵 Ván lõi <button class="btn-add-new" onclick="toggleAddForm('core')">➕ Thêm</button></div>
  <div id="addCoreForm" class="add-form" style="display:none;">
    <div class="form-row">
      <input type="text" id="newCoreCode" placeholder="Mã">
      <input type="text" id="newCoreName" placeholder="Tên">
      <input type="number" id="newCorePrice" placeholder="Giá/tấm">
      <input type="text" id="newCoreSpec" placeholder="Quy cách">
    </div>
    <div class="form-row">
      <button onclick="addCoreFromForm()">Lưu</button>
      <button class="cancel" onclick="toggleAddForm('core')">Hủy</button>
    </div>
  </div>
  <table class="db-table"><thead><tr><th>Mã</th><th>Tên</th><th>Giá/tấm</th><th>Quy cách</th><th></th></tr></thead><tbody id="coreList"></tbody></table>
</div>
<div class="db-section">
  <div class="db-section-title">🎨 Hoàn thiện <button class="btn-add-new" onclick="toggleAddForm('finish')">➕ Thêm</button></div>
  <div id="addFinishForm" class="add-form" style="display:none;">
    <div class="form-row">
      <input type="text" id="newFinishName" placeholder="Tên">
      <input type="number" id="newFinishCost" placeholder="Giá/m²">
    </div>
    <div class="form-row">
      <button onclick="addFinishFromForm()">Lưu</button>
      <button class="cancel" onclick="toggleAddForm('finish')">Hủy</button>
    </div>
  </div>
  <table class="db-table finish-table"><thead><tr><th>Tên</th><th>Giá/m²</th><th></th></tr></thead><tbody id="finishList"></tbody></table>
</div>
<div class="db-section">
  <div class="db-section-title">🔧 Phụ kiện <button class="btn-add-new" onclick="toggleAddForm('accessory')">➕ Thêm</button></div>
  <div id="addAccessoryForm" class="add-form" style="display:none;">
    <div class="form-row">
      <input type="text" id="newAccName" placeholder="Tên">
      <input type="number" id="newAccPrice" placeholder="Giá">
      <input type="text" id="newAccType" placeholder="Loại">
    </div>
    <div class="form-row">
      <button onclick="addAccessoryFromForm()">Lưu</button>
      <button class="cancel" onclick="toggleAddForm('accessory')">Hủy</button>
    </div>
  </div>
  <table class="db-table"><thead><tr><th>Tên</th><th>Giá</th><th>Loại</th><th></th></tr></thead><tbody id="accList"></tbody></table>
</div>
<div class="db-section">
  <div class="db-section-title">📦 Bao bì <button class="btn-add-new" onclick="toggleAddForm('packaging')">➕ Thêm</button></div>
  <div id="addPackagingForm" class="add-form" style="display:none;">
    <div class="form-row">
      <input type="text" id="newPkgType" placeholder="Loại">
      <input type="text" id="newPkgName" placeholder="Mô tả">
      <input type="number" id="newPkgPrice" placeholder="Giá/m³">
    </div>
    <div class="form-row">
      <button onclick="addPackagingFromForm()">Lưu</button>
      <button class="cancel" onclick="toggleAddForm('packaging')">Hủy</button>
    </div>
  </div>
  <table class="db-table"><thead><tr><th>Loại</th><th>Mô tả</th><th>Giá/m³</th><th></th></tr></thead><tbody id="packagingList"></tbody></table>
</div>
<div class="db-actions">
  <input type="file" id="uploadCsvBtn" style="display:none" accept=".csv" onchange="importCSV(event)">
  <label for="uploadCsvBtn">📂 import CSV</label>
  <button onclick="exportDatabase()">💾 export CSV</button>
  <input type="file" id="uploadExcelBtn" style="display:none" accept=".xlsx,.xls" onchange="importExcel(event)">
  <label for="uploadExcelBtn">📂 import Excel</label>
  <button onclick="exportExcelDatabase()">💾 export Excel</button>
  <button onclick="clearDatabase()">🗑️ Xóa hết</button>
  <button onclick="loadDefaultDatabase()">🔄 Mặc định</button>
  <button onclick="toggleDbManager()">✓ Đóng</button>
</div>`;
  renderWoodList();
  renderCoreList();
  renderFinishList();
  renderAccList();
  renderPackagingList();
}

// Các hàm toggle và thêm mới
function toggleAddForm(type) {
  const form = document.getElementById(`add${capitalize(type)}Form`);
  if (form) form.style.display = form.style.display === 'none' ? 'flex' : 'none';
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function addWoodFromForm() {
  const code = document.getElementById('newWoodCode').value.trim();
  const name = document.getElementById('newWoodName').value.trim();
  const price = parseFloat(document.getElementById('newWoodPrice').value);
  const tlth = parseFloat(document.getElementById('newWoodTlth').value) || 1.54;
  const thick = parseInt(document.getElementById('newWoodThick').value) || 32;
  if (!code || !name || isNaN(price)) { showToast('Vui lòng nhập đủ thông tin'); return; }
  if (dbWood.find(w => w.code === code)) { showToast('Mã đã tồn tại'); return; }
  dbWood.push({ code, name, price, tlth, thick });
  saveDatabaseNoAlert();
  renderWoodList();
  toggleAddForm('wood');
  document.getElementById('newWoodCode').value = '';
  document.getElementById('newWoodName').value = '';
  document.getElementById('newWoodPrice').value = '';
  document.getElementById('newWoodTlth').value = '1.54';
  document.getElementById('newWoodThick').value = '32';
  showToast('Thêm gỗ thành công');
}

function addCoreFromForm() {
  const code = document.getElementById('newCoreCode').value.trim();
  const name = document.getElementById('newCoreName').value.trim();
  const price = parseFloat(document.getElementById('newCorePrice').value);
  const spec = document.getElementById('newCoreSpec').value.trim();
  if (!code || !name || isNaN(price)) { showToast('Vui lòng nhập đủ thông tin'); return; }
  if (dbCore.find(c => c.code === code)) { showToast('Mã đã tồn tại'); return; }
  dbCore.push({ code, name, price, spec });
  saveDatabaseNoAlert();
  renderCoreList();
  toggleAddForm('core');
  document.getElementById('newCoreCode').value = '';
  document.getElementById('newCoreName').value = '';
  document.getElementById('newCorePrice').value = '';
  document.getElementById('newCoreSpec').value = '';
  showToast('Thêm ván thành công');
}

function addFinishFromForm() {
  const name = document.getElementById('newFinishName').value.trim();
  const cost = parseFloat(document.getElementById('newFinishCost').value);
  if (!name || isNaN(cost)) { showToast('Vui lòng nhập đủ thông tin'); return; }
  if (dbFinish.find(f => f.name === name)) { showToast('Tên đã tồn tại'); return; }
  dbFinish.push({ name, cost });
  saveDatabaseNoAlert();
  renderFinishList();
  toggleAddForm('finish');
  document.getElementById('newFinishName').value = '';
  document.getElementById('newFinishCost').value = '';
  showToast('Thêm hoàn thiện thành công');
}

function addAccessoryFromForm() {
  const name = document.getElementById('newAccName').value.trim();
  const price = parseFloat(document.getElementById('newAccPrice').value);
  const type = document.getElementById('newAccType').value.trim();
  if (!name || isNaN(price)) { showToast('Vui lòng nhập đủ thông tin'); return; }
  if (dbAccessories.find(a => a.name === name)) { showToast('Tên đã tồn tại'); return; }
  dbAccessories.push({ name, price, type });
  saveDatabaseNoAlert();
  renderAccList();
  toggleAddForm('accessory');
  document.getElementById('newAccName').value = '';
  document.getElementById('newAccPrice').value = '';
  document.getElementById('newAccType').value = '';
  showToast('Thêm phụ kiện thành công');
}

function addPackagingFromForm() {
  const type = document.getElementById('newPkgType').value.trim();
  const name = document.getElementById('newPkgName').value.trim();
  const price = parseFloat(document.getElementById('newPkgPrice').value);
  if (!type || !name || isNaN(price)) { showToast('Vui lòng nhập đủ thông tin'); return; }
  if (dbPackaging.find(p => p.type === type)) { showToast('Loại bao bì đã tồn tại'); return; }
  dbPackaging.push({ type, name, price });
  saveDatabaseNoAlert();
  renderPackagingList();
  updatePackagingSelect();
  toggleAddForm('packaging');
  document.getElementById('newPkgType').value = '';
  document.getElementById('newPkgName').value = '';
  document.getElementById('newPkgPrice').value = '';
  showToast('Thêm bao bì thành công');
}
function loadDatabase(){dbWood=JSON.parse(localStorage.getItem('dbWood'))||[];dbFinish=JSON.parse(localStorage.getItem('dbFinish'))||[];dbAccessories=JSON.parse(localStorage.getItem('dbAccessories'))||[];dbCore=JSON.parse(localStorage.getItem('dbCore'))||[];dbPackaging=JSON.parse(localStorage.getItem('dbPackaging'))||[];updateAllSelects();updatePackagingSelect();}
function saveDatabaseNoAlert(){localStorage.setItem('dbWood',JSON.stringify(dbWood));localStorage.setItem('dbFinish',JSON.stringify(dbFinish));localStorage.setItem('dbAccessories',JSON.stringify(dbAccessories));localStorage.setItem('dbCore',JSON.stringify(dbCore));localStorage.setItem('dbPackaging',JSON.stringify(dbPackaging));updateAllSelects();updatePackagingSelect();calculate();}
function syncWoodInput(){const opt=getOpt('woodType');if(opt){document.getElementById('man_wood_name').value=opt.text.split('—')[0].trim();document.getElementById('man_wood_price').value=opt.dataset.price;document.getElementById('wood_tlth_input').value=opt.dataset.tlth||1.54;document.getElementById('wood_thick_input').value=opt.dataset.thick||32;}calculate();}
function syncCoreInput(){const opt=getOpt('coreBoard');if(opt){document.getElementById('man_core_name').value=opt.text.split('—')[0].trim();document.getElementById('man_core_price').value=opt.dataset.price;}calculate();}
function syncFinishInput(){const opt=getOpt('finish');if(opt){document.getElementById('man_finish_name').value=opt.text.split('—')[0].trim();document.getElementById('man_finish_price').value=opt.dataset.cost;}calculate();}
function addManualWood(){const name=document.getElementById('man_wood_name').value.trim();const price=parseFloat(document.getElementById('man_wood_price').value)||0;if(!name||price===0)return;const tlth=parseFloat(document.getElementById('wood_tlth_input').value)||1.54;const thick=parseInt(document.getElementById('wood_thick_input').value)||32;let existing=dbWood.find(x=>x.name===name);if(existing){existing.price=price;existing.tlth=tlth;existing.thick=thick;}else{dbWood.push({code:'G-M-'+Date.now().slice(-4),name,price,tlth,thick});}saveDatabaseNoAlert();showToast('Đã lưu gỗ');calculate();}
function addManualCore(){const name=document.getElementById('man_core_name').value.trim();const price=parseFloat(document.getElementById('man_core_price').value)||0;if(!name||price===0)return;let existing=dbCore.find(c=>c.name===name);if(existing)existing.price=price;else dbCore.push({code:'C-M-'+Date.now().slice(-4),name,price,spec:''});saveDatabaseNoAlert();showToast('Đã lưu ván');calculate();}
function addManualFinish(){const name=document.getElementById('man_finish_name').value.trim();const price=parseFloat(document.getElementById('man_finish_price').value)||0;if(!name||price===0)return;let existing=dbFinish.find(f=>f.name===name);if(existing)existing.cost=price;else dbFinish.push({name,cost:price});saveDatabaseNoAlert();showToast('Đã lưu hoàn thiện');calculate();}
function addWood(){const code=document.getElementById('wood_code').value.trim();const name=document.getElementById('wood_name').value.trim();const price=parseFloat(document.getElementById('wood_price').value);const tlth=parseFloat(document.getElementById('wood_tlth').value)||1.54;const thick=parseInt(document.getElementById('wood_thick').value)||32;if(!code||!name||isNaN(price)){showToast('Vui lòng điền đủ mã, tên và giá');return;}if(dbWood.find(w=>w.code===code)){showToast('Mã đã tồn tại');return;}dbWood.push({code,name,price,tlth,thick});saveDatabaseNoAlert();renderWoodList();showToast('Thêm gỗ thành công');document.getElementById('wood_code').value='';document.getElementById('wood_name').value='';document.getElementById('wood_price').value='';document.getElementById('wood_tlth').value='1.54';document.getElementById('wood_thick').value='32';}
function editWood(code){const item=dbWood.find(w=>w.code===code);if(!item)return;const newName=prompt('Tên Gỗ mới:',item.name);if(newName!==null)item.name=newName;const newPrice=prompt('Giá mới:',item.price);if(newPrice!==null)item.price=parseFloat(newPrice);const newTlth=prompt('TLTH mới:',item.tlth);if(newTlth!==null)item.tlth=parseFloat(newTlth);const newThick=prompt('Độ dày mới (mm):',item.thick);if(newThick!==null)item.thick=parseInt(newThick);saveDatabaseNoAlert();renderWoodList();showToast('Đã cập nhật gỗ');}
function removeWood(code){if(!confirm('Xóa mã '+code+'?'))return;dbWood=dbWood.filter(w=>w.code!==code);saveDatabaseNoAlert();renderWoodList();showToast('Đã xóa gỗ');}
function addCore(){const code=document.getElementById('core_code').value.trim();const name=document.getElementById('core_name').value.trim();const price=parseFloat(document.getElementById('core_price').value);const spec=document.getElementById('core_spec').value.trim();if(!code||!name||isNaN(price)){showToast('Vui lòng điền đủ mã, tên và giá');return;}if(dbCore.find(c=>c.code===code)){showToast('Mã đã tồn tại');return;}dbCore.push({code,name,price,spec});saveDatabaseNoAlert();renderCoreList();showToast('Thêm ván thành công');document.getElementById('core_code').value='';document.getElementById('core_name').value='';document.getElementById('core_price').value='';document.getElementById('core_spec').value='';}
function editCore(code){const item=dbCore.find(c=>c.code===code);if(!item)return;const newName=prompt('Tên Ván mới:',item.name);if(newName!==null)item.name=newName;const newPrice=prompt('Giá mới:',item.price);if(newPrice!==null)item.price=parseFloat(newPrice);const newSpec=prompt('Quy cách mới:',item.spec);if(newSpec!==null)item.spec=newSpec;saveDatabaseNoAlert();renderCoreList();showToast('Đã cập nhật ván');}
function removeCore(code){if(!confirm('Xóa mã '+code+'?'))return;dbCore=dbCore.filter(c=>c.code!==code);saveDatabaseNoAlert();renderCoreList();showToast('Đã xóa ván');}
function addFinish(){const name=document.getElementById('finish_name').value.trim();const cost=parseFloat(document.getElementById('finish_cost').value);if(!name||isNaN(cost)){showToast('Vui lòng điền đủ tên và giá');return;}if(dbFinish.find(f=>f.name===name)){showToast('Tên đã tồn tại');return;}dbFinish.push({name,cost});saveDatabaseNoAlert();renderFinishList();showToast('Thêm hoàn thiện thành công');document.getElementById('finish_name').value='';document.getElementById('finish_cost').value='';}
function editFinish(name){const item=dbFinish.find(f=>f.name===name);if(!item)return;const newCost=prompt('Giá mới (VND/m²):',item.cost);if(newCost!==null)item.cost=parseFloat(newCost);saveDatabaseNoAlert();renderFinishList();showToast('Đã cập nhật hoàn thiện');}
function removeFinish(name){if(!confirm('Xóa hoàn thiện '+name+'?'))return;dbFinish=dbFinish.filter(f=>f.name!==name);saveDatabaseNoAlert();renderFinishList();showToast('Đã xóa hoàn thiện');}
function addAccessory(){const name=document.getElementById('acc_name').value.trim();const price=parseFloat(document.getElementById('acc_price').value);const type=document.getElementById('acc_type').value.trim();if(!name||isNaN(price)){showToast('Vui lòng điền đủ tên và giá');return;}if(dbAccessories.find(a=>a.name===name)){showToast('Tên đã tồn tại');return;}dbAccessories.push({name,price,type});saveDatabaseNoAlert();renderAccList();showToast('Thêm phụ kiện thành công');document.getElementById('acc_name').value='';document.getElementById('acc_price').value='';document.getElementById('acc_type').value='';}
function editAccessory(name){const item=dbAccessories.find(a=>a.name===name);if(!item)return;const newPrice=prompt('Giá mới:',item.price);if(newPrice!==null)item.price=parseFloat(newPrice);const newType=prompt('Loại mới (cái/bộ/m/m²):',item.type);if(newType!==null)item.type=newType;saveDatabaseNoAlert();renderAccList();showToast('Đã cập nhật phụ kiện');}
function removeAccessory(name){if(!confirm('Xóa phụ kiện '+name+'?'))return;dbAccessories=dbAccessories.filter(a=>a.name!==name);saveDatabaseNoAlert();renderAccList();showToast('Đã xóa phụ kiện');}
function clearDatabase(){if(!confirm('Xác nhận xóa TOÀN BỘ dữ liệu?'))return;dbWood=[];dbCore=[];dbFinish=[];dbAccessories=[];dbPackaging=[];saveDatabaseNoAlert();loadDatabase();renderDbManager();showToast('Đã xóa tất cả Database');}
function addPackaging(){const type=document.getElementById('pkg_type').value.trim();const name=document.getElementById('pkg_name').value.trim();const price=parseFloat(document.getElementById('pkg_price').value);if(!type||!name||isNaN(price)){showToast('Vui lòng điền đủ loại, mô tả và giá');return;}if(dbPackaging.find(p=>p.type===type)){showToast('Loại bao bì đã tồn tại');return;}dbPackaging.push({type,name,price});saveDatabaseNoAlert();renderPackagingList();updatePackagingSelect();showToast('Thêm loại bao bì thành công');document.getElementById('pkg_type').value='';document.getElementById('pkg_name').value='';document.getElementById('pkg_price').value='';}
function editPackaging(type){const item=dbPackaging.find(p=>p.type===type);if(!item)return;const newName=prompt('Mô tả mới:',item.name);if(newName!==null)item.name=newName;const newPrice=prompt('Giá mới (VND/m³):',item.price);if(newPrice!==null)item.price=parseFloat(newPrice);saveDatabaseNoAlert();renderPackagingList();updatePackagingSelect();showToast('Đã cập nhật bao bì');}
function removePackaging(type){if(!confirm('Xóa loại bao bì '+type+'?'))return;dbPackaging=dbPackaging.filter(p=>p.type!==type);saveDatabaseNoAlert();renderPackagingList();updatePackagingSelect();showToast('Đã xóa bao bì');}
function renderPackagingList() {
  const tbody = document.getElementById('packagingList');
  if (!tbody) return;
  tbody.innerHTML = dbPackaging.map(p => `
    <tr>
      <td>${p.type}</td>
      <td>${p.name}</td>
      <td>${new Intl.NumberFormat('vi-VN').format(p.price)}</td>
      <td class="action-icons">
        <span class="edit-icon" onclick="editPackaging('${p.type}')">✏️</span>
        <span class="delete-icon" onclick="removePackaging('${p.type}')">🗑️</span>
      </td>
    </tr>
  `).join('');
}
function updatePackagingSelect(){const sel=document.getElementById('packagingType');if(!sel)return;const cur=sel.value;sel.innerHTML='';if(dbPackaging.length===0){dbPackaging=[{type:'3a',name:'Carton 3 lớp',price:350000},{type:'5a',name:'Carton 5 lớp',price:450000},{type:'6a',name:'Carton 6 lớp / chống ẩm',price:550000}];localStorage.setItem('dbPackaging',JSON.stringify(dbPackaging));renderPackagingList();}dbPackaging.forEach(p=>{const opt=document.createElement('option');opt.value=p.type;opt.textContent=`${p.type} – ${p.name} (${new Intl.NumberFormat('vi-VN').format(p.price)} đ/m³)`;opt.dataset.price=p.price;sel.appendChild(opt);});sel.value=cur||sel.options[0]?.value;updatePackagingRateFromType();}
function updatePackagingRateFromType(){const sel=document.getElementById('packagingType');const selectedOpt=sel.options[sel.selectedIndex];if(selectedOpt&&selectedOpt.dataset.price){document.getElementById('packagingRate').value=parseFloat(selectedOpt.dataset.price);}else{document.getElementById('packagingRate').value=500000;}}
function exportDatabase(){let csv="Type,Code,Name,Price,Spec_or_TLTH_or_Type,Thick\n";dbWood.forEach(w=>csv+=`Wood,${w.code},${w.name},${w.price},${w.tlth},${w.thick}\n`);dbCore.forEach(c=>csv+=`Core,${c.code},${c.name},${c.price},${c.spec||''},\n`);dbFinish.forEach(f=>csv+=`Finish,,${f.name},${f.cost},,\n`);dbAccessories.forEach(a=>csv+=`Accessory,,${a.name},${a.price},${a.type||''},\n`);dbPackaging.forEach(p=>csv+=`Packaging,${p.type},${p.name},${p.price},,\n`);const blob=new Blob([new Uint8Array([0xEF,0xBB,0xBF]),csv],{type:"text/csv;charset=utf-8;"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="Furniture_DB.csv";a.click();URL.revokeObjectURL(url);showToast('Đã xuất Database ra file CSV');}
function importCSV(event){const file=event.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=(e)=>{const lines=e.target.result.split(/\r?\n/);let w=[],c=[],f=[],a=[],p=[];for(let i=1;i<lines.length;i++){const parts=lines[i].split(',');if(parts.length<4)continue;const type=parts[0];if(type==='Wood')w.push({code:parts[1],name:parts[2],price:parseFloat(parts[3]),tlth:parseFloat(parts[4])||1.54,thick:parseInt(parts[5])||32});else if(type==='Core')c.push({code:parts[1],name:parts[2],price:parseFloat(parts[3]),spec:parts[4]||''});else if(type==='Finish')f.push({name:parts[2],cost:parseFloat(parts[3])});else if(type==='Accessory')a.push({name:parts[2],price:parseFloat(parts[3]),type:parts[4]||''});else if(type==='Packaging')p.push({type:parts[1],name:parts[2],price:parseFloat(parts[3])});}if(w.length)dbWood=w;if(c.length)dbCore=c;if(f.length)dbFinish=f;if(a.length)dbAccessories=a;if(p.length)dbPackaging=p;saveDatabaseNoAlert();loadDatabase();showToast('Import CSV thành công');};reader.readAsText(file);}
function exportExcelDatabase(){const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(dbWood),"Wood");XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(dbCore),"Core");XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(dbFinish),"Finish");XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(dbAccessories),"Accessories");XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(dbPackaging),"Packaging");XLSX.writeFile(wb,"Furniture_DB.xlsx");showToast('Đã xuất Database ra Excel');}
function importExcel(event){const file=event.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=(e)=>{try{const data=new Uint8Array(e.target.result);const workbook=XLSX.read(data,{type:'array'});if(workbook.Sheets["Wood"])dbWood=XLSX.utils.sheet_to_json(workbook.Sheets["Wood"]);if(workbook.Sheets["Core"])dbCore=XLSX.utils.sheet_to_json(workbook.Sheets["Core"]);if(workbook.Sheets["Finish"])dbFinish=XLSX.utils.sheet_to_json(workbook.Sheets["Finish"]);if(workbook.Sheets["Accessories"])dbAccessories=XLSX.utils.sheet_to_json(workbook.Sheets["Accessories"]);if(workbook.Sheets["Packaging"])dbPackaging=XLSX.utils.sheet_to_json(workbook.Sheets["Packaging"]);saveDatabaseNoAlert();loadDatabase();showToast('Import Excel thành công');}catch(err){showToast('Lỗi đọc file Excel');}};reader.readAsArrayBuffer(file);}
function toggleAddForm(type) {
  const form = document.getElementById(`add${capitalize(type)}Form`);
  if (form) form.style.display = form.style.display === 'none' ? 'flex' : 'none';
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Wood
function addWoodFromForm() {
  const code = document.getElementById('newWoodCode').value.trim();
  const name = document.getElementById('newWoodName').value.trim();
  const price = parseFloat(document.getElementById('newWoodPrice').value);
  const tlth = parseFloat(document.getElementById('newWoodTlth').value) || 1.54;
  const thick = parseInt(document.getElementById('newWoodThick').value) || 32;
  if (!code || !name || isNaN(price)) { showToast('Vui lòng nhập đủ thông tin'); return; }
  if (dbWood.find(w => w.code === code)) { showToast('Mã đã tồn tại'); return; }
  dbWood.push({ code, name, price, tlth, thick });
  saveDatabaseNoAlert();
  renderWoodList();
  toggleAddForm('wood');
  document.getElementById('newWoodCode').value = '';
  document.getElementById('newWoodName').value = '';
  document.getElementById('newWoodPrice').value = '';
  document.getElementById('newWoodTlth').value = '1.54';
  document.getElementById('newWoodThick').value = '32';
  showToast('Thêm gỗ thành công');
}

// Core
function addCoreFromForm() {
  const code = document.getElementById('newCoreCode').value.trim();
  const name = document.getElementById('newCoreName').value.trim();
  const price = parseFloat(document.getElementById('newCorePrice').value);
  const spec = document.getElementById('newCoreSpec').value.trim();
  if (!code || !name || isNaN(price)) { showToast('Vui lòng nhập đủ thông tin'); return; }
  if (dbCore.find(c => c.code === code)) { showToast('Mã đã tồn tại'); return; }
  dbCore.push({ code, name, price, spec });
  saveDatabaseNoAlert();
  renderCoreList();
  toggleAddForm('core');
  document.getElementById('newCoreCode').value = '';
  document.getElementById('newCoreName').value = '';
  document.getElementById('newCorePrice').value = '';
  document.getElementById('newCoreSpec').value = '';
  showToast('Thêm ván thành công');
}

// Finish
function addFinishFromForm() {
  const name = document.getElementById('newFinishName').value.trim();
  const cost = parseFloat(document.getElementById('newFinishCost').value);
  if (!name || isNaN(cost)) { showToast('Vui lòng nhập đủ thông tin'); return; }
  if (dbFinish.find(f => f.name === name)) { showToast('Tên đã tồn tại'); return; }
  dbFinish.push({ name, cost });
  saveDatabaseNoAlert();
  renderFinishList();
  toggleAddForm('finish');
  document.getElementById('newFinishName').value = '';
  document.getElementById('newFinishCost').value = '';
  showToast('Thêm hoàn thiện thành công');
}

// Accessory
function addAccessoryFromForm() {
  const name = document.getElementById('newAccName').value.trim();
  const price = parseFloat(document.getElementById('newAccPrice').value);
  const type = document.getElementById('newAccType').value.trim();
  if (!name || isNaN(price)) { showToast('Vui lòng nhập đủ thông tin'); return; }
  if (dbAccessories.find(a => a.name === name)) { showToast('Tên đã tồn tại'); return; }
  dbAccessories.push({ name, price, type });
  saveDatabaseNoAlert();
  renderAccList();
  toggleAddForm('accessory');
  document.getElementById('newAccName').value = '';
  document.getElementById('newAccPrice').value = '';
  document.getElementById('newAccType').value = '';
  showToast('Thêm phụ kiện thành công');
}

// Packaging
function addPackagingFromForm() {
  const type = document.getElementById('newPkgType').value.trim();
  const name = document.getElementById('newPkgName').value.trim();
  const price = parseFloat(document.getElementById('newPkgPrice').value);
  if (!type || !name || isNaN(price)) { showToast('Vui lòng nhập đủ thông tin'); return; }
  if (dbPackaging.find(p => p.type === type)) { showToast('Loại bao bì đã tồn tại'); return; }
  dbPackaging.push({ type, name, price });
  saveDatabaseNoAlert();
  renderPackagingList();
  updatePackagingSelect();
  toggleAddForm('packaging');
  document.getElementById('newPkgType').value = '';
  document.getElementById('newPkgName').value = '';
  document.getElementById('newPkgPrice').value = '';
  showToast('Thêm bao bì thành công');
}
function renderWoodList() {
  const tbody = document.getElementById('woodList');
  if (!tbody) return;
  tbody.innerHTML = dbWood.map(w => `
    <tr>
      <td>${w.code}</td>
      <td>${w.name}</td>
      <td>${new Intl.NumberFormat('vi-VN').format(w.price)}</td>
      <td>${w.tlth}</td>
      <td class="action-icons">
        <span class="edit-icon" onclick="editWood('${w.code}')">✏️</span>
        <span class="delete-icon" onclick="removeWood('${w.code}')">🗑️</span>
      </td>
    </tr>
  `).join('');
}
function renderCoreList() {
  const tbody = document.getElementById('coreList');
  if (!tbody) return;
  tbody.innerHTML = dbCore.map(c => `
    <tr>
      <td>${c.code}</td>
      <td>${c.name}</td>
      <td>${new Intl.NumberFormat('vi-VN').format(c.price)}</td>
      <td>${c.spec || ''}</td>
      <td class="action-icons">
        <span class="edit-icon" onclick="editCore('${c.code}')">✏️</span>
        <span class="delete-icon" onclick="removeCore('${c.code}')">🗑️</span>
      </td>
    </tr>
  `).join('');
}
function renderFinishList() {
  const tbody = document.getElementById('finishList');
  if (!tbody) return;
  // thêm class finish-table để điều chỉnh độ rộng cột
  const table = tbody.closest('.db-table');
  if (table) table.classList.add('finish-table');
  tbody.innerHTML = dbFinish.map(f => `
    <tr>
      <td>${f.name}</td>
      <td>${new Intl.NumberFormat('vi-VN').format(f.cost)}</td>
      <td class="action-icons">
        <span class="edit-icon" onclick="editFinish('${f.name}')">✏️</span>
        <span class="delete-icon" onclick="removeFinish('${f.name}')">🗑️</span>
      </td>
    </tr>
  `).join('');
}
function renderAccList() {
  const tbody = document.getElementById('accList');
  if (!tbody) return;
  tbody.innerHTML = dbAccessories.map(a => `
    <tr>
      <td>${a.name}</td>
      <td>${new Intl.NumberFormat('vi-VN').format(a.price)}</td>
      <td>${a.type || ''}</td>
      <td class="action-icons">
        <span class="edit-icon" onclick="editAccessory('${a.name}')">✏️</span>
        <span class="delete-icon" onclick="removeAccessory('${a.name}')">🗑️</span>
      </td>
    </tr>
  `).join('');
}
function updateAllSelects(){
  const populateWood=()=>{const sel=document.getElementById('woodType');if(!sel)return;const cur=sel.value;sel.innerHTML='';dbWood.forEach(w=>{const opt=document.createElement('option');opt.value=w.code;opt.textContent=`${w.name} — ${new Intl.NumberFormat('vi-VN').format(w.price)}/m³`;opt.dataset.price=w.price;opt.dataset.tlth=w.tlth||1.54;opt.dataset.thick=w.thick||32;sel.appendChild(opt);});if(sel.options.length>0)sel.value=cur||sel.options[0].value;};
  const populateCore=()=>{const sel=document.getElementById('coreBoard');if(!sel)return;const cur=sel.value;sel.innerHTML='';dbCore.forEach(c=>{const opt=document.createElement('option');opt.value=c.code;opt.textContent=`${c.name} ${c.spec} — ${new Intl.NumberFormat('vi-VN').format(c.price)}/tấm`;opt.dataset.price=c.price;sel.appendChild(opt);});if(sel.options.length>0)sel.value=cur||sel.options[0].value;};
  const populateFinish=()=>{const sel=document.getElementById('finish');if(!sel)return;const cur=sel.value;sel.innerHTML='';dbFinish.forEach(f=>{const opt=document.createElement('option');opt.value=f.name;opt.textContent=`${f.name} — ${new Intl.NumberFormat('vi-VN').format(f.cost)}/m²`;opt.dataset.cost=f.cost;sel.appendChild(opt);});if(sel.options.length>0)sel.value=cur||sel.options[0].value;};
  populateWood();populateCore();populateFinish();
}
function loadDefaultDatabase(){dbWood=[{code:'G-TR-25',name:'Gỗ Tràm VN',price:3800000,tlth:1.7,thick:32},{code:'G-CS-26',name:'Gỗ Cao su VN',price:7200000,tlth:1.45,thick:32},{code:'G-PO-26',name:'Gỗ Poplar Mỹ',price:13776500,tlth:1.54,thick:32},{code:'G-OA-32',name:'Gỗ W.Oak Mỹ 1C',price:30355000,tlth:1.54,thick:32},{code:'G-WA-32',name:'Gỗ Óc Chó (Walnut) 1C',price:55000000,tlth:1.54,thick:32},{code:'G-AS-32',name:'Gỗ Tần Bì (Ash) 1C',price:16500000,tlth:1.54,thick:32},{code:'G-PI-26',name:'Gỗ Thông (Pine) NewZealand',price:7500000,tlth:1.35,thick:32},{code:'G-EU-26',name:'Gỗ Bạch Đàn (Eucalyptus)',price:5800000,tlth:1.6,thick:32}];dbCore=[{code:'MDF09',name:'MDF CARB P2 09mm',price:220000,spec:'1220×2440mm'},{code:'MDF12',name:'MDF CARB P2 12mm',price:270000,spec:'1220×2440mm'},{code:'MDF15',name:'MDF CARB P2 15mm',price:875000,spec:'1220×2440mm'},{code:'MDF18',name:'MDF CARB P2 18mm',price:380000,spec:'1220×2440mm'},{code:'MDF25',name:'MDF CARB P2 25mm',price:510000,spec:'1220×2440mm'},{code:'PB18',name:'Ván dăm PB 18mm',price:220000,spec:'1220×2440mm'},{code:'RUB18',name:'Cao su ghép 18mm',price:390000,spec:'1220×2440mm'},{code:'PLY12',name:'Plywood Bạch Dương 12mm',price:420000,spec:'1220×2440mm'},{code:'PLY15',name:'Plywood Bạch Dương 15mm',price:520000,spec:'1220×2440mm'},{code:'PLY18',name:'Plywood Bạch Dương 18mm',price:610000,spec:'1220×2440mm'}];dbFinish=[{name:'Sơn PU Trong (Clear)',cost:100000},{name:'Sơn PU Bệt (Pigmented)',cost:120000},{name:'Sơn UV Dây chuyền',cost:140000},{name:'Lau dầu (Oil finish)',cost:160000},{name:'Veneer Oak + PU',cost:200000},{name:'Veneer Walnut + PU',cost:280000},{name:'Veneer Ash + PU',cost:190000},{name:'Phủ Melamine 2 mặt',cost:85000}];dbAccessories = [
  { name: 'Bản lề BGC thường 62×78mm', price: 12000, type: 'cái' },
  { name: 'Bản lề giảm chấn thẳng (Ivan/DTC)', price: 25000, type: 'cái' },
  { name: 'Bản lề giảm chấn cong ít', price: 26000, type: 'cái' },
  { name: 'Ray trượt bi thường L350', price: 80000, type: 'bộ' },
  { name: 'Ray trượt bi 3T L350', price: 140000, type: 'bộ' },
  { name: 'Ray trượt bi 3T L450', price: 160000, type: 'bộ' },
  { name: 'Ray âm giảm chấn L400', price: 210000, type: 'bộ' },
  { name: 'Tay nắm tròn Ø30mm Gỗ', price: 10000, type: 'cái' },
  { name: 'Tay nắm hợp kim mờ 128mm', price: 18000, type: 'cái' },
  { name: 'Tay nắm dây da', price: 25000, type: 'cái' },
  { name: 'Tay nắm thanh nhôm 160mm', price: 22000, type: 'cái' },
  { name: 'Tay nắm núm gốm trắng', price: 15000, type: 'cái' },
  { name: 'Tay nắm ẩn', price: 35000, type: 'cái' },
  { name: 'Chân nhựa đen D50xH20', price: 5000, type: 'cái' },
  { name: 'Chốt cam + chốt gỗ (Bộ)', price: 2500, type: 'bộ' },
  { name: 'Ốc vít gỗ (con)', price: 500, type: 'con' },
  { name: 'Chân sofa', price: 30000, type: 'cái' },
  { name: 'Bulon chân M8×60', price: 800, type: 'con' },
  { name: 'Miếng đệm cao su', price: 2500, type: 'cái' },
  { name: 'Mousse D40', price: 2500000, type: 'm³' },
  { name: 'Mousse D60', price: 3200000, type: 'm³' },
  { name: 'Mousse D80', price: 3800000, type: 'm³' },
  { name: 'Vải bọc', price: 140000, type: 'm²' },
  { name: 'Vải nỉ', price: 180000, type: 'm²' },
  { name: 'Vải da', price: 250000, type: 'm²' }
];
dbPackaging=[{type:'3a',name:'Carton 3 lớp',price:350000},{type:'5a',name:'Carton 5 lớp',price:450000},{type:'6a',name:'Carton 6 lớp / chống ẩm',price:550000}];saveDatabaseNoAlert();loadDatabase();showToast('Đã khôi phục dữ liệu mặc định');}
// ==================== ĐỊNH NGHĨA SẢN PHẨM ====================

let _lastBomItems = [];
let _lastBreakdown = {};
let currentCOGS = 0, currentFOB = 0, currentProfitUSD = 0, currentProfitPct = 0;
let exchangeRateUSD = 26342;
let _currentVolumeM3 = 0;
let currentType = 'cabinet';
let compValues = {};

const SMV_RATES = {
  prep_wood: 45, precision_machining: 60, sanding: 80,
  frame_assembly: 50, drawer_door_assembly: 70,
  finishing_pu: 120, accessory_install: 30, qc_packaging: 40
};

function getOpt(selectId) { const sel = document.getElementById(selectId); return sel?.options[sel.selectedIndex] || null; }
function getSelectedWoodPrice() { const opt = getOpt('woodType'); return opt ? parseFloat(opt.dataset.price) : 0; }
function getSelectedWoodTlth() { return parseFloat(document.getElementById('wood_tlth_input').value) || 1.54; }
function getSelectedWoodThick() { return parseFloat(document.getElementById('wood_thick_input').value) || 32; }
function getSelectedCorePrice() { const opt = getOpt('coreBoard'); return opt ? parseFloat(opt.dataset.price) : 0; }
function getSelectedFinishCost() { const opt = getOpt('finish'); return opt ? parseFloat(opt.dataset.cost) : 0; }
function getLaborRate() { return parseFloat(document.getElementById('laborRateInput').value) || 1250; }
function getSMV() { return parseFloat(document.getElementById('totalSmvInput').value) || 0; }
function getPackagingCost() { const manual = parseFloat(document.getElementById('packagingCost').value); if (!isNaN(manual) && manual > 0) return manual; const rate = parseFloat(document.getElementById('packagingRate').value) || 0; return rate * _currentVolumeM3; }
function getAccPrice(accessoryName, defaultPrice) { const acc = dbAccessories.find(a => a.name === accessoryName); return acc ? acc.price : defaultPrice; }
function calcSolidVolume(qty, w_mm, h_mm, d_mm) { return qty * (w_mm * h_mm * d_mm) / 1e9; }
function getAdjustedCorePrice(basePricePerSheet, targetThickMM, refThickMM = 18) {
  // Tìm trong dbCore xem có loại ván nào khớp với độ dày targetThickMM không
  const exactMatch = dbCore.find(c => {
    const nameMatch = c.name.match(/(\d+)mm/i);
    return nameMatch && parseInt(nameMatch[1], 10) === targetThickMM;
  });

  if (exactMatch && exactMatch.price > 0) {
    return exactMatch.price; // Trả về giá thực tế từ Database nếu tìm thấy
  }
  // Nếu không tìm thấy, mới dùng công thức suy diễn (fallback)
  return basePricePerSheet * (targetThickMM / refThickMM);
}


function getMoussePrice(selectedType) {
  if (selectedType && selectedType.includes('D60')) return getAccPrice('Mousse D60', 3200000);
  if (selectedType && selectedType.includes('D80')) return getAccPrice('Mousse D80', 3800000);
  return getAccPrice('Mousse D40', 2500000);
}
function getFabricPriceFromType(fabricType) {
  return getAccPrice(fabricType, 140000);
}

const PRODUCT_TYPES = {
  cabinet: {
    label: '🗄️ Tủ / Kệ', defaultW: 610, defaultH: 760, defaultD: 400, defaultName: 'TV Stand Cabinet 24"', defaultCode: 'CAB-24-TVS', hasCore: true, sizeHint: '20"=508 | 24"=610 | 30"=762 | 36"=914 | 48"=1219',
    components: [
      { id: 'solid_leg_qty', label: 'Số chân tủ (gỗ solid)', qty: 4, unit: 'cái' },
      { id: 'solid_leg_w', label: 'Rộng chân (mm)', qty: 40, unit: 'mm' },
      { id: 'solid_leg_d', label: 'Sâu chân (mm)', qty: 40, unit: 'mm' },
      { id: 'solid_leg_h', label: 'Cao chân (mm)', qty: 830, unit: 'mm' },
      { id: 'solid_frame_thick', label: 'Độ dày khung tủ (mm)', qty: 25, unit: 'mm' },
      { id: 'solid_frame_width', label: 'Rộng thanh khung (mm)', qty: 60, unit: 'mm' },
      { id: 'solid_h_brace_qty', label: 'Số giằng ngang (khung)', qty: 0, unit: 'cái' },
      { id: 'solid_h_brace_w', label: 'Rộng giằng ngang (mm)', qty: 60, unit: 'mm' },
      { id: 'solid_h_brace_h', label: 'Dày giằng ngang (mm)', qty: 20, unit: 'mm' },
      { id: 'solid_h_brace_l', label: 'Dài giằng ngang (mm) (0=auto)', qty: 0, unit: 'mm' },
      { id: 'solid_v_brace_qty', label: 'Số giằng dọc (khung)', qty: 2, unit: 'cái' },
      { id: 'solid_v_brace_w', label: 'Rộng giằng dọc (mm)', qty: 60, unit: 'mm' },
      { id: 'solid_v_brace_h', label: 'Dày giằng dọc (mm)', qty: 20, unit: 'mm' },
      { id: 'solid_v_brace_l', label: 'Dài giằng dọc (mm) (0=auto)', qty: 0, unit: 'mm' },
      { id: 'core_side_thick', label: 'Độ dày hông (ván lõi mm)', qty: 18, unit: 'mm' },
      { id: 'core_top_thick', label: 'Độ dày nóc (ván lõi mm)', qty: 18, unit: 'mm' },
      { id: 'core_bottom_thick', label: 'Độ dày đáy (ván lõi mm)', qty: 15, unit: 'mm' },
      { id: 'core_back_thick', label: 'Độ dày hậu (ván lõi mm)', qty: 9, unit: 'mm' },
      { id: 'core_shelf_thick', label: 'Độ dày kệ ngang (ván lõi mm)', qty: 18, unit: 'mm' },
      { id: 'core_divider_thick', label: 'Độ dày vách ngăn dọc (ván lõi mm)', qty: 18, unit: 'mm' },
      { id: 'core_door_thick', label: 'Độ dày cánh MDF (ván lõi mm)', qty: 18, unit: 'mm' },
      { id: 'c_drawer_qty', label: 'Số hộc kéo', qty: 2, unit: 'cái' },
      { id: 'drawer_thick', label: 'Độ dày ván hộc kéo (mm)', qty: 12, unit: 'mm' },
      { id: 'drawer_rail_type', label: 'Loại ray trượt', qty: 'standard', isSelect: true, options: [{ val: 'standard', text: 'Ray bi thường (chuẩn)' }, { val: 'premium', text: 'Ray bi 3 tầng (premium)' }] },
      { id: 'c_drawer_rail_len', label: 'Chiều dài ray hộc (mm)', qty: 350, unit: 'mm' },
      { id: 'handle_type', label: 'Loại tay nắm', qty: 'Tay nắm tròn Ø30mm Gỗ', isSelect: true, options: [{ val: 'Tay nắm tròn Ø30mm Gỗ', text: '🔘 Tay nắm tròn gỗ (10k)' }, { val: 'Tay nắm hợp kim mờ 128mm', text: '✨ Tay nắm hợp kim mờ (18k)' }, { val: 'Tay nắm dây da', text: '👜 Tay nắm dây da (25k)' }, { val: 'Tay nắm thanh nhôm 160mm', text: '📏 Tay nắm thanh nhôm (22k)' }, { val: 'Tay nắm núm gốm trắng', text: '⚪ Tay nắm núm gốm (15k)' }, { val: 'Tay nắm ẩn', text: '🔒 Tay nắm ẩn (35k)' }] },
      { id: 'c_divider_qty', label: 'Vách ngăn dọc bên trong', qty: 0, unit: 'cái' },
      { id: 'c_shelf', label: 'Đợt kệ ngang (tấm)', qty: 2, unit: 'tấm' },
      { id: 'c_door', label: 'Cửa (số cánh)', qty: 1, unit: 'cái' },
      { id: 'c_vis', label: 'Vis + ốc + bulon', qty: 60, unit: 'con', defaultPrice: 100 },
      { id: 'c_block_qty', label: 'Bọ gỗ liên kết (cái)', qty: 0, unit: 'cái' },
      { id: 'c_block_l', label: 'Dài bọ gỗ (mm)', qty: 50, unit: 'mm' },
      { id: 'c_block_w', label: 'Rộng bọ gỗ (mm)', qty: 30, unit: 'mm' },
      { id: 'c_block_t', label: 'Dày bọ gỗ (mm)', qty: 30, unit: 'mm' },
      { id: 'c_extra_leg', label: 'Chân phụ bổ sung', qty: 0, unit: 'cái', priceKey: 'Chân nhựa đen D50xH20', defaultPrice: 5000 },
      { id: 'c_rattan_price', label: 'Giá Rattan/Đan dây (đ/m²)', qty: 0, unit: 'đ/m²' },
      { id: 'c_rattan_offset', label: 'Offset viền Rattan (mm)', qty: 50, unit: 'mm' },
      { id: 'c_rattan_front_pct', label: '% Mặt trước Rattan (%)', qty: 100, unit: '%' },
      { id: 'c_rattan_sides', label: 'Số mặt hông Rattan', qty: 0, unit: 'mặt' }
    ],
    calcBOM: function(W, H, D, thick, woodPrice, woodTlth, corePrice, finishCostM2, comps, manualSmv, manualRate) {
      const coreTlth = parseFloat(document.getElementById('core_tlth_input')?.value) || 1.02;
      const finishTlth = parseFloat(document.getElementById('finish_tlth_input')?.value) || 1.05;
      const legVol = calcSolidVolume(comps.solid_leg_qty || 0, comps.solid_leg_w || 40, comps.solid_leg_h || 100, comps.solid_leg_d || 40);
      const framePerimeter = 2 * (W + D);
      const frameVol = (framePerimeter * (comps.solid_frame_width || 80) * (comps.solid_frame_thick || 25)) / 1e9;
      let hBraceVol = 0; let hLen = comps.solid_h_brace_l || 0; if (hLen === 0) hLen = W - 2 * (comps.solid_frame_width || 80); if (comps.solid_h_brace_qty > 0) hBraceVol = comps.solid_h_brace_qty * (comps.solid_h_brace_w || 60) * (comps.solid_h_brace_h || 20) * hLen / 1e9;
      let vBraceVol = 0; let vLen = comps.solid_v_brace_l || 0; if (vLen === 0) vLen = H - 2 * (comps.solid_frame_width || 80); if (comps.solid_v_brace_qty > 0) vBraceVol = comps.solid_v_brace_qty * (comps.solid_v_brace_w || 60) * (comps.solid_v_brace_h || 20) * vLen / 1e9;
      const totalSolidVol = legVol + frameVol + hBraceVol + vBraceVol;
      const blockVol = calcSolidVolume(comps.c_block_qty || 0, comps.c_block_l || 50, comps.c_block_w || 30, comps.c_block_t || 30);
      const totalSolidVolAll = totalSolidVol + blockVol;
      const tileArea = 2.9768;
      let coreItems = [];
      const addCorePart = (name, area_m2, thickness_mm) => { if (area_m2 <= 0 || thickness_mm <= 0) return; const tiles = area_m2 / tileArea; const adjustedPrice = getAdjustedCorePrice(corePrice, thickness_mm, 18); const total = tiles * adjustedPrice * coreTlth; coreItems.push({ name, area_m2, thickness_mm, tiles, pricePerSheet: adjustedPrice, total }); };
      addCorePart('Hông tủ (2 bên)', 2 * H * D / 1e6, comps.core_side_thick || 18);
      addCorePart('Nóc tủ', W * D / 1e6, comps.core_top_thick || 18);
      addCorePart('Đáy tủ', W * D / 1e6, comps.core_bottom_thick || 15);
      addCorePart('Hậu tủ', W * H / 1e6, comps.core_back_thick || 9);
      addCorePart('Kệ ngang', (comps.c_shelf || 2) * W * D / 1e6, comps.core_shelf_thick || 18);
      addCorePart('Vách ngăn dọc', (comps.c_divider_qty || 0) * H * D / 1e6, comps.core_divider_thick || 18);
      const doorQty = comps.c_door || 1; if (doorQty > 0 && comps.core_door_thick > 0) addCorePart('Cánh tủ', doorQty * (W / doorQty) * H / 1e6, comps.core_door_thick || 18);
      const drawerQty = comps.c_drawer_qty || 0; if (drawerQty > 0) { const drawerHeight = 100; const drawerThick = comps.drawer_thick || 12; let totalDrawerAreaM2 = (2 * D * (drawerQty * drawerHeight) + (W * D) + ((drawerQty - 1) * W * 15) + (drawerQty * W * drawerHeight)) / 1e6; totalDrawerAreaM2 *= 1.05; addCorePart('Hộc kéo (hệ thống)', totalDrawerAreaM2, drawerThick); }
      const surfaceM2 = 2 * (W * H + W * D + H * D) / 1e6;
      let rattanAreaM2 = 0; if (comps.c_rattan_price > 0) { const offset = comps.c_rattan_offset || 0; const frontPct = (comps.c_rattan_front_pct || 0) / 100; const sides = comps.c_rattan_sides || 0; let w_clear = Math.max(0, W - 2 * offset), h_clear = Math.max(0, H - 2 * offset), d_clear = Math.max(0, D - 2 * offset); let frontArea = w_clear * h_clear * frontPct; let sideArea2 = sides * (d_clear * h_clear); rattanAreaM2 = (frontArea + sideArea2) / 1e6; }
      let totalSMV = manualSmv > 0 ? manualSmv : (SMV_RATES.prep_wood + SMV_RATES.precision_machining + SMV_RATES.sanding + SMV_RATES.frame_assembly + SMV_RATES.drawer_door_assembly + SMV_RATES.finishing_pu + SMV_RATES.accessory_install + SMV_RATES.qc_packaging);
      if (drawerQty > 0) totalSMV += drawerQty * 7;
      const hingePrice = getAccPrice('Bản lề BGC thường 62×78mm', 12000);
      const railLen = comps.c_drawer_rail_len || 350;
      const railBaseName = (comps.drawer_rail_type === 'premium') ? 'Ray trượt bi 3T L350' : 'Ray trượt bi thường L350';
      const railBasePrice = getAccPrice(railBaseName, (comps.drawer_rail_type === 'premium') ? 140000 : 80000);
      const railPrice = Math.round(railBasePrice * (railLen / 350) / 100) * 100;
      const handleName = comps.handle_type || 'Tay nắm tròn Ø30mm Gỗ';
      const handlePrice = getAccPrice(handleName, 10000);
      const legPrice = getAccPrice('Chân nhựa đen D50xH20', 5000);
      let hingeQty = doorQty * 2; let railQty = drawerQty; let handleQty = (handleName === 'Tay nắm ẩn') ? 0 : (doorQty + drawerQty);
      let items = [];
      if (totalSolidVolAll > 0) items.push({ name: 'Gỗ solid (chân, khung, giằng, bọ gỗ)', spec: `${totalSolidVolAll.toFixed(4)}m³`, qty: totalSolidVolAll.toFixed(4), unit: 'm³', price: woodPrice, tlth: woodTlth, total: totalSolidVolAll * woodPrice * woodTlth });
      for (let it of coreItems) items.push({ name: `Ván lõi: ${it.name}`, spec: `dày ${it.thickness_mm}mm, ${it.area_m2.toFixed(2)}m² (${it.tiles.toFixed(2)} tấm)`, qty: it.tiles.toFixed(2), unit: 'tấm', price: it.pricePerSheet, tlth: coreTlth, total: it.total });
      items.push({ name: 'Hoàn thiện bề mặt', qty: surfaceM2.toFixed(3), unit: 'm²', price: finishCostM2, tlth: finishTlth, total: surfaceM2 * finishCostM2 * finishTlth });
      items.push({ name: 'Bản lề', qty: hingeQty, unit: 'cái', price: hingePrice, tlth: 1.0, total: hingeQty * hingePrice });
      items.push({ name: 'Ray trượt', qty: railQty, unit: 'bộ', price: railPrice, tlth: 1.0, total: railQty * railPrice });
      if (handleQty > 0) items.push({ name: `Tay nắm (${handleName})`, qty: handleQty, unit: 'cái', price: handlePrice, tlth: 1.0, total: handleQty * handlePrice });
      items.push({ name: 'Vis + ốc', qty: comps.c_vis || 0, unit: 'con', price: 100, tlth: 1.0, total: (comps.c_vis || 0) * 100 });
      if (comps.c_extra_leg > 0) items.push({ name: 'Chân phụ', qty: comps.c_extra_leg, unit: 'cái', price: legPrice, tlth: 1.0, total: comps.c_extra_leg * legPrice });
      if (rattanAreaM2 > 0) items.push({ name: 'Ốp Rattan/Đan dây', spec: `${rattanAreaM2.toFixed(3)}m²`, qty: rattanAreaM2.toFixed(3), unit: 'm²', price: comps.c_rattan_price, tlth: 1.1, total: rattanAreaM2 * comps.c_rattan_price * 1.1 });
      items.push({ name: 'Nhân công (SMV)', qty: totalSMV.toFixed(0), unit: 'phút', price: manualRate, tlth: 1.0, total: totalSMV * manualRate });
      return items;
    }
  },
  vanity: {
    label: '🪞 Vanity Cabinet', defaultW: 914, defaultH: 860, defaultD: 480, defaultName: 'Bathroom Vanity 36"', defaultCode: 'VAN-36-001', hasCore: true, sizeHint: '24"=610 | 30"=762 | 36"=914 | 42"=1067 | 48"=1219',
    components: [
      { id: 'solid_leg_qty', label: 'Số chân tủ (gỗ solid)', qty: 4, unit: 'cái' },
      { id: 'solid_leg_w', label: 'Rộng chân (mm)', qty: 40, unit: 'mm' },
      { id: 'solid_leg_d', label: 'Sâu chân (mm)', qty: 40, unit: 'mm' },
      { id: 'solid_leg_h', label: 'Cao chân (mm)', qty: 830, unit: 'mm' },
      { id: 'solid_frame_thick', label: 'Độ dày khung tủ (mm)', qty: 25, unit: 'mm' },
      { id: 'solid_frame_width', label: 'Rộng thanh khung (mm)', qty: 60, unit: 'mm' },
      { id: 'solid_h_brace_qty', label: 'Số giằng ngang (khung)', qty: 0, unit: 'cái' },
      { id: 'solid_h_brace_w', label: 'Rộng giằng ngang (mm)', qty: 60, unit: 'mm' },
      { id: 'solid_h_brace_h', label: 'Dày giằng ngang (mm)', qty: 20, unit: 'mm' },
      { id: 'solid_h_brace_l', label: 'Dài giằng ngang (mm) (0=auto)', qty: 0, unit: 'mm' },
      { id: 'solid_v_brace_qty', label: 'Số giằng dọc (khung)', qty: 0, unit: 'cái' },
      { id: 'solid_v_brace_w', label: 'Rộng giằng dọc (mm)', qty: 60, unit: 'mm' },
      { id: 'solid_v_brace_h', label: 'Dày giằng dọc (mm)', qty: 20, unit: 'mm' },
      { id: 'solid_v_brace_l', label: 'Dài giằng dọc (mm) (0=auto)', qty: 0, unit: 'mm' },
      { id: 'core_side_thick', label: 'Độ dày hông (ván lõi mm)', qty: 18, unit: 'mm' },
      { id: 'core_top_thick', label: 'Độ dày nóc (ván lõi mm)', qty: 18, unit: 'mm' },
      { id: 'core_bottom_thick', label: 'Độ dày đáy (ván lõi mm)', qty: 15, unit: 'mm' },
      { id: 'core_back_thick', label: 'Độ dày hậu (ván lõi mm)', qty: 9, unit: 'mm' },
      { id: 'core_shelf_thick', label: 'Độ dày kệ ngang (ván lõi mm)', qty: 18, unit: 'mm' },
      { id: 'core_divider_thick', label: 'Độ dày vách ngăn dọc (ván lõi mm)', qty: 18, unit: 'mm' },
      { id: 'core_door_thick', label: 'Độ dày cánh MDF (ván lõi mm)', qty: 18, unit: 'mm' },
      { id: 'c_drawer_qty', label: 'Số hộc kéo', qty: 2, unit: 'cái' },
      { id: 'drawer_thick', label: 'Độ dày ván hộc kéo (mm)', qty: 12, unit: 'mm' },
      { id: 'drawer_rail_type', label: 'Loại ray trượt', qty: 'standard', isSelect: true, options: [{ val: 'standard', text: 'Ray bi thường (chuẩn)' }, { val: 'premium', text: 'Ray bi 3 tầng (premium)' }] },
      { id: 'c_drawer_rail_len', label: 'Chiều dài ray hộc (mm)', qty: 350, unit: 'mm' },
      { id: 'handle_type', label: 'Loại tay nắm', qty: 'Tay nắm tròn Ø30mm Gỗ', isSelect: true, options: [{ val: 'Tay nắm tròn Ø30mm Gỗ', text: '🔘 Tay nắm tròn gỗ (10k)' }, { val: 'Tay nắm hợp kim mờ 128mm', text: '✨ Tay nắm hợp kim mờ (18k)' }, { val: 'Tay nắm dây da', text: '👜 Tay nắm dây da (25k)' }, { val: 'Tay nắm thanh nhôm 160mm', text: '📏 Tay nắm thanh nhôm (22k)' }, { val: 'Tay nắm núm gốm trắng', text: '⚪ Tay nắm núm gốm (15k)' }, { val: 'Tay nắm ẩn', text: '🔒 Tay nắm ẩn (35k)' }] },
      { id: 'c_divider_qty', label: 'Vách ngăn dọc', qty: 0, unit: 'cái' },
      { id: 'c_shelf', label: 'Kệ ngang', qty: 1, unit: 'tấm' },
      { id: 'c_door', label: 'Số cửa', qty: 2, unit: 'cái' },
      { id: 'c_leg', label: 'Chân cabinet (cái)', qty: 0, unit: 'cái', priceKey: 'Chân nhựa đen D50xH20', defaultPrice: 5000 },
      { id: 'c_vis', label: 'Vis + ốc', qty: 60, unit: 'con', defaultPrice: 100 },
      { id: 'c_block_qty', label: 'Bọ gỗ liên kết (cái)', qty: 0, unit: 'cái' },
      { id: 'c_block_l', label: 'Dài bọ gỗ (mm)', qty: 50, unit: 'mm' },
      { id: 'c_block_w', label: 'Rộng bọ gỗ (mm)', qty: 30, unit: 'mm' },
      { id: 'c_block_t', label: 'Dày bọ gỗ (mm)', qty: 30, unit: 'mm' },
      { id: 'c_extra_leg', label: 'Chân phụ bổ sung', qty: 0, unit: 'cái', priceKey: 'Chân nhựa đen D50xH20', defaultPrice: 5000 },
      { id: 'c_rattan_price', label: 'Giá Rattan/Đan dây (đ/m²)', qty: 0, unit: 'đ/m²' },
      { id: 'c_rattan_offset', label: 'Offset viền Rattan (mm)', qty: 50, unit: 'mm' },
      { id: 'c_rattan_front_pct', label: '% Mặt trước Rattan (%)', qty: 100, unit: '%' },
      { id: 'c_rattan_sides', label: 'Số mặt hông Rattan', qty: 0, unit: 'mặt' }
    ],
    calcBOM: function(W, H, D, thick, woodPrice, woodTlth, corePrice, finishCostM2, comps, manualSmv, manualRate) {
      const coreTlth = parseFloat(document.getElementById('core_tlth_input')?.value) || 1.02;
      const finishTlth = parseFloat(document.getElementById('finish_tlth_input')?.value) || 1.05;
      const isBare = document.getElementById('bareCabinet')?.checked || false;
      const hasStone = (!isBare && (comps.vanity_stone_price > 0));
      const legVol = calcSolidVolume(comps.solid_leg_qty || 0, comps.solid_leg_w || 40, comps.solid_leg_h || 100, comps.solid_leg_d || 40);
      const framePerimeter = 2 * (W + D);
      const frameVol = (framePerimeter * (comps.solid_frame_width || 80) * (comps.solid_frame_thick || 25)) / 1e9;
      let hBraceVol = 0; let hLen = comps.solid_h_brace_l || 0; if (hLen === 0) hLen = W - 2 * (comps.solid_frame_width || 80); if (comps.solid_h_brace_qty > 0) hBraceVol = comps.solid_h_brace_qty * (comps.solid_h_brace_w || 60) * (comps.solid_h_brace_h || 20) * hLen / 1e9;
      let vBraceVol = 0; let vLen = comps.solid_v_brace_l || 0; if (vLen === 0) vLen = H - 2 * (comps.solid_frame_width || 80); if (comps.solid_v_brace_qty > 0) vBraceVol = comps.solid_v_brace_qty * (comps.solid_v_brace_w || 60) * (comps.solid_v_brace_h || 20) * vLen / 1e9;
      const totalSolidVol = legVol + frameVol + hBraceVol + vBraceVol;
      const blockVol = calcSolidVolume(comps.c_block_qty || 0, comps.c_block_l || 50, comps.c_block_w || 30, comps.c_block_t || 30);
      const totalSolidVolAll = totalSolidVol + blockVol;
      const tileArea = 2.9768;
      let coreItems = [];
      const addCorePart = (name, area_m2, thickness_mm) => { if (area_m2 <= 0 || thickness_mm <= 0) return; const tiles = area_m2 / tileArea; const adjustedPrice = getAdjustedCorePrice(corePrice, thickness_mm, 18); const total = tiles * adjustedPrice * coreTlth; coreItems.push({ name, area_m2, thickness_mm, tiles, pricePerSheet: adjustedPrice, total }); };
      addCorePart('Hông tủ (2 bên)', 2 * H * D / 1e6, comps.core_side_thick || 18);
      addCorePart('Đáy tủ', W * D / 1e6, comps.core_bottom_thick || 15);
      addCorePart('Hậu tủ', W * H / 1e6, comps.core_back_thick || 9);
      addCorePart('Kệ ngang', (comps.c_shelf || 1) * W * D / 1e6, comps.core_shelf_thick || 18);
      addCorePart('Vách ngăn dọc', (comps.c_divider_qty || 0) * H * D / 1e6, comps.core_divider_thick || 18);
      const doorQty = comps.c_door || 2; if (doorQty > 0 && comps.core_door_thick > 0) addCorePart('Cánh tủ', doorQty * (W / doorQty) * H / 1e6, comps.core_door_thick || 18);
      const drawerQty = comps.c_drawer_qty || 0; if (drawerQty > 0) { const drawerHeight = 100; const drawerThick = comps.drawer_thick || 12; let totalDrawerAreaM2 = (2 * D * (drawerQty * drawerHeight) + (W * D) + ((drawerQty - 1) * W * 15) + (drawerQty * W * drawerHeight)) / 1e6; totalDrawerAreaM2 *= 1.05; addCorePart('Hộc kéo (hệ thống)', totalDrawerAreaM2, drawerThick); }
      let surfaceM2 = 2 * (W * H + W * D + H * D) / 1e6;
      if (isBare || hasStone) surfaceM2 -= (W * D) / 1e6;
      let rattanAreaM2 = 0; if (comps.c_rattan_price > 0) { const offset = comps.c_rattan_offset || 0; const frontPct = (comps.c_rattan_front_pct || 0) / 100; const sides = comps.c_rattan_sides || 0; let w_clear = Math.max(0, W - 2 * offset), h_clear = Math.max(0, H - 2 * offset), d_clear = Math.max(0, D - 2 * offset); let frontArea = w_clear * h_clear * frontPct; let sideArea2 = sides * (d_clear * h_clear); rattanAreaM2 = (frontArea + sideArea2) / 1e6; }
      let totalSMV = manualSmv > 0 ? manualSmv : (SMV_RATES.prep_wood + SMV_RATES.sanding + SMV_RATES.frame_assembly + SMV_RATES.drawer_door_assembly + SMV_RATES.finishing_pu + 60);
      if (drawerQty > 0) totalSMV += drawerQty * 7;
      const hingePrice = getAccPrice('Bản lề BGC thường 62×78mm', 12000);
      const railLen = comps.c_drawer_rail_len || 350;
      const railBaseName = (comps.drawer_rail_type === 'premium') ? 'Ray trượt bi 3T L350' : 'Ray trượt bi thường L350';
      const railBasePrice = getAccPrice(railBaseName, (comps.drawer_rail_type === 'premium') ? 140000 : 80000);
      const railPrice = Math.round(railBasePrice * (railLen / 350) / 100) * 100;
      const handleName = comps.handle_type || 'Tay nắm tròn Ø30mm Gỗ';
      const handlePrice = getAccPrice(handleName, 10000);
      const legPrice = getAccPrice('Chân nhựa đen D50xH20', 5000);
      let hingeQty = doorQty * 2; let railQty = drawerQty; let handleQty = (handleName === 'Tay nắm ẩn') ? 0 : (doorQty + drawerQty);
      let items = [];
      if (totalSolidVolAll > 0) items.push({ name: 'Gỗ solid (chân, khung, giằng, bọ gỗ)', spec: `${totalSolidVolAll.toFixed(4)}m³`, qty: totalSolidVolAll.toFixed(4), unit: 'm³', price: woodPrice, tlth: woodTlth, total: totalSolidVolAll * woodPrice * woodTlth });
      for (let it of coreItems) items.push({ name: `Ván lõi: ${it.name}`, spec: `dày ${it.thickness_mm}mm, ${it.area_m2.toFixed(2)}m² (${it.tiles.toFixed(2)} tấm)`, qty: it.tiles.toFixed(2), unit: 'tấm', price: it.pricePerSheet, tlth: coreTlth, total: it.total });
      items.push({ name: 'Hoàn thiện bề mặt', qty: surfaceM2.toFixed(3), unit: 'm²', price: finishCostM2, tlth: finishTlth, total: surfaceM2 * finishCostM2 * finishTlth });
      items.push({ name: 'Bản lề', qty: hingeQty, unit: 'cái', price: hingePrice, tlth: 1.0, total: hingeQty * hingePrice });
      items.push({ name: 'Ray trượt', qty: railQty, unit: 'bộ', price: railPrice, tlth: 1.0, total: railQty * railPrice });
      if (handleQty > 0) items.push({ name: `Tay nắm (${handleName})`, qty: handleQty, unit: 'cái', price: handlePrice, tlth: 1.0, total: handleQty * handlePrice });
      items.push({ name: 'Vis + ốc', qty: comps.c_vis || 0, unit: 'con', price: 100, tlth: 1.0, total: (comps.c_vis || 0) * 100 });
      if (comps.c_leg > 0) items.push({ name: 'Chân cabinet', qty: comps.c_leg, unit: 'cái', price: legPrice, tlth: 1.0, total: comps.c_leg * legPrice });
      if (comps.c_extra_leg > 0) items.push({ name: 'Chân phụ', qty: comps.c_extra_leg, unit: 'cái', price: legPrice, tlth: 1.0, total: comps.c_extra_leg * legPrice });
      if (rattanAreaM2 > 0) items.push({ name: 'Ốp Rattan/Đan dây', spec: `${rattanAreaM2.toFixed(3)}m²`, qty: rattanAreaM2.toFixed(3), unit: 'm²', price: comps.c_rattan_price, tlth: 1.1, total: rattanAreaM2 * comps.c_rattan_price * 1.1 });
      if (hasStone) {
        if (comps.vanity_stone_price > 0) items.push({ name: 'Mặt đá', qty: 1, unit: 'tấm', price: comps.vanity_stone_price, tlth: 1.0, total: comps.vanity_stone_price });
        if (comps.vanity_sink_price > 0) items.push({ name: 'Chậu rửa', qty: comps.vanity_sink_qty, unit: 'cái', price: comps.vanity_sink_price, tlth: 1.0, total: comps.vanity_sink_price * comps.vanity_sink_qty });
        if (comps.vanity_holes > 0) items.push({ name: 'Khoan lỗ', qty: comps.vanity_holes, unit: 'lỗ', price: 15000, tlth: 1.0, total: comps.vanity_holes * 15000 });
      }
      items.push({ name: 'Nhân công (SMV)', qty: totalSMV.toFixed(0), unit: 'phút', price: manualRate, tlth: 1.0, total: totalSMV * manualRate });
      return items;
    }
  },
  table: {
    label: '🪑 Bàn', defaultW: 900, defaultH: 750, defaultD: 600, defaultName: 'Dining Table 36"', defaultCode: 'TBL-36-DIN', hasCore: false, sizeHint: 'Bàn ăn: 740-760mm | Bàn cafe: 420-450mm',
    components: [
  { id: 'c_leg', label: 'Chân bàn', qty: 4, unit: 'cái' },
  { id: 'c_legW', label: 'Tiết diện chân (mm)', qty: 50, unit: 'mm' },
  { id: 'c_apron', label: 'Thanh ngang apron', qty: 4, unit: 'cái' },
  { id: 'c_bolt', label: 'Bulon chân M8×60', qty: 8, unit: 'con', defaultPrice: 800 },
  { id: 'c_pad', label: 'Miếng đệm cao; su', qty: 4, unit: 'cái', defaultPrice: 2500 },
  { id: 'c_block_qty', label: 'Bọ gỗ l.kết (SL)', qty: 0, unit: 'cái' },
  { id: 'c_block_l', label: 'Dài bọ gỗ (mm)', qty: 50, unit: 'mm' },
  { id: 'c_block_w', label: 'Rộng bọ gỗ (mm)', qty: 30, unit: 'mm' },
  { id: 'c_block_t', label: 'Dày bọ gỗ (mm)', qty: 30, unit: 'mm' },
  { id: 'c_screw_qty', label: 'Ốc vít (con)', qty: 20, unit: 'con' }
],
    calcBOM: function(W, H, D, thick, woodPrice, woodTlth, corePrice, finishCostM2, comps, manualSmv, manualRate) {
      const finishTlth = parseFloat(document.getElementById('finish_tlth_input')?.value) || 1.05;
      const legW = comps.c_legW || 50; const legs = comps.c_leg || 4;
      const legVol = legs * legW * legW * (H - thick) / 1e9;
      const apronVol = (2 * (W - 2 * legW) + 2 * (D - 2 * legW)) * 100 * thick / 1e9;
      const topVol = W * D * thick / 1e9;
      const surfaceM2 = (W * D * 2 + 2 * (W + D) * thick + legs * 4 * legW * (H - thick) + (W + D) * 2 * 100 * 2) / 1e6;
      const blockVol = (comps.c_block_qty || 0) * (comps.c_block_l || 50) * (comps.c_block_w || 30) * (comps.c_block_t || 30) / 1e9;
      let totalSMV = manualSmv > 0 ? manualSmv : (SMV_RATES.prep_wood + SMV_RATES.sanding + SMV_RATES.frame_assembly + SMV_RATES.finishing_pu + 30);
      const boltPrice = getAccPrice('Bulon chân M8×60', 800);
      const padPrice = getAccPrice('Miếng đệm cao su', 2500);
      let items = [
        { name: 'Gỗ mặt bàn', qty: topVol.toFixed(4), unit: 'm³', price: woodPrice, tlth: woodTlth, total: topVol * woodPrice * woodTlth },
        { name: 'Gỗ chân bàn', qty: legVol.toFixed(4), unit: 'm³', price: woodPrice, tlth: woodTlth, total: legVol * woodPrice * woodTlth },
        { name: 'Gỗ apron', qty: apronVol.toFixed(4), unit: 'm³', price: woodPrice, tlth: woodTlth, total: apronVol * woodPrice * woodTlth },
        { name: 'Hoàn thiện bề mặt', qty: surfaceM2.toFixed(3), unit: 'm²', price: finishCostM2, tlth: finishTlth, total: surfaceM2 * finishCostM2 * finishTlth },
        { name: 'Bulon chân', qty: comps.c_bolt || 0, unit: 'con', price: boltPrice, tlth: 1.0, total: (comps.c_bolt || 0) * boltPrice },
        { name: 'Đệm cao su', qty: comps.c_pad || 0, unit: 'cái', price: padPrice, tlth: 1.0, total: (comps.c_pad || 0) * padPrice }
      ];
      if (blockVol > 0) items.push({ name: 'Bọ gỗ liên kết', spec: `${comps.c_block_qty} cái`, qty: blockVol.toFixed(4), unit: 'm³', price: woodPrice, tlth: woodTlth, total: blockVol * woodPrice * woodTlth });
      items.push({ name: 'Nhân công (SMV)', qty: totalSMV.toFixed(0), unit: 'phút', price: manualRate, tlth: 1.0, total: totalSMV * manualRate });
// Ốc vít
  const screwQty = comps.c_screw_qty || 0;
  const screwPrice = getAccPrice('Ốc vít gỗ (con)', 500);
  if (screwQty > 0) {
    items.push({ name: 'Ốc vít', qty: screwQty, unit: 'con', price: screwPrice, tlth: 1.0, total: screwQty * screwPrice });
  }
      return items;
    }
  },
  chair: {
    label: '💺 Ghế', defaultW: 450, defaultH: 900, defaultD: 500, defaultName: 'Counter Stool', defaultCode: 'CHR-CS-001', hasCore: false, sizeHint: 'Ghế ăn H=900mm | Counter stool seat H=650-700mm',
    components: [
      { id: 'c_frame_type', label: 'Khung: 1:Kim loại 2:Gỗ', qty: 2, unit: 'loại', isSelect: true, options: [{ val: '1', text: 'Kim loại' }, { val: '2', text: 'Gỗ' }] },
      { id: 'c_metal_price', label: 'Giá khung kim loại (đ/bộ)', qty: 0, unit: 'đ' },
      { id: 'c_leg', label: 'Chân ghế (SL)', qty: 4, unit: 'cái' },
      { id: 'c_legW', label: 'Tiết diện chân (mm)', qty: 38, unit: 'mm' },
      { id: 'c_rung', label: 'Giằng chân (SL)', qty: 4, unit: 'cái' },
      { id: 'c_rungW', label: 'Rộng giằng (mm)', qty: 30, unit: 'mm' },
      { id: 'c_rungT', label: 'Dày giằng (mm)', qty: 20, unit: 'mm' },
      { id: 'c_rungL', label: 'Chiều dài giằng (mm)', qty: 0, unit: 'mm' },
      { id: 'c_seat_apron', label: 'Apron mặt ngồi (SL)', qty: 4, unit: 'cái' },
      { id: 'c_seat_apronW', label: 'Rộng Apron (mm)', qty: 60, unit: 'mm' },
      { id: 'c_seat_apronT', label: 'Dày Apron (mm)', qty: 20, unit: 'mm' },
      { id: 'c_back', label: 'Nan lưng (SL)', qty: 3, unit: 'cái' },
      { id: 'c_backW', label: 'Rộng nan lưng (mm)', qty: 40, unit: 'mm' },
      { id: 'c_backT', label: 'Dày nan lưng (mm)', qty: 20, unit: 'mm' },
      { id: 'c_backL', label: 'Chiều dài nan lưng (mm)', qty: 0, unit: 'mm' },
      { id: 'c_arm', label: 'Tay vịn (SL)', qty: 0, unit: 'cái' },
      { id: 'c_armW', label: 'Rộng tay vịn (mm)', qty: 40, unit: 'mm' },
      { id: 'c_armT', label: 'Dày tay vịn (mm)', qty: 20, unit: 'mm' },
      { id: 'c_seat', label: 'Mặt: 1:Solid 2:Ply 3:Nệm 4:Rat 5:Dây', qty: 3, unit: 'loại', isSelect: true, options: [{ val: '1', text: 'Solid' }, { val: '2', text: 'Plywood' }, { val: '3', text: 'Nệm' }, { val: '4', text: 'Rattan' }, { val: '5', text: 'Dây' }] },
      { id: 'c_seat_rattan_price', label: 'Giá Rattan/Dây mặt ngồi (đ/m²)', qty: 0, unit: 'đ/m²' },
      { id: 'c_back_type', label: 'Lưng: 1:Gỗ 2:Nệm 3:Rat 4:Dây', qty: 2, unit: 'loại', isSelect: true, options: [{ val: '1', text: 'Gỗ' }, { val: '2', text: 'Nệm' }, { val: '3', text: 'Rattan' }, { val: '4', text: 'Dây' }] },
      { id: 'c_back_rattan_price', label: 'Giá Rattan/Dây lưng (đ/m²)', qty: 0, unit: 'đ/m²' },
      { id: 'c_mousse_type', label: 'Loại Mousse', qty: 'D40', isSelect: true, options: [{ val: 'D40', text: 'D40 (2.5tr/m³)' }, { val: 'D60', text: 'D60 (3.2tr/m³)' }, { val: 'D80', text: 'D80 (3.8tr/m³)' }] },
      { id: 'c_fabric_type', label: 'Loại vải', qty: 'Vải bọc', isSelect: true, options: [{ val: 'Vải bọc', text: 'Vải bọc (140k/m²)' }, { val: 'Vải nỉ', text: 'Vải nỉ (180k/m²)' }, { val: 'Vải da', text: 'Vải da (250k/m²)' }] },
      { id: 'c_screw_qty', label: 'Ốc vít (con)', qty: 20, unit: 'con' },
      { id: 'c_block_qty', label: 'Bọ gỗ l.kết (SL)', qty: 0, unit: 'cái' },
      { id: 'c_block_l', label: 'Dài bọ gỗ (mm)', qty: 50, unit: 'mm' },
      { id: 'c_block_w', label: 'Rộng bọ gỗ (mm)', qty: 30, unit: 'mm' },
      { id: 'c_block_t', label: 'Dày bọ gỗ (mm)', qty: 30, unit: 'mm' }
    ],
    calcBOM: function(W, H, D, thick, woodPrice, woodTlth, corePrice, finishCostM2, comps, manualSmv, manualRate) {
      const finishTlth = parseFloat(document.getElementById('finish_tlth_input')?.value) || 1.05;
      const frameType = parseInt(comps.c_frame_type) || 2;
      const legs = comps.c_leg || 4, legW = comps.c_legW || 38;
      const rungs = comps.c_rung || 0, rungW = comps.c_rungW || 30, rungT = comps.c_rungT || 20;
      const backs = comps.c_back || 0, backW = comps.c_backW || 40, backT = comps.c_backT || 20;
      const arms = comps.c_arm || 0, armW = comps.c_armW || 40, armT = comps.c_armT || 20;
      const actRungL = comps.c_rungL > 0 ? comps.c_rungL : (W - 2 * legW);
      const actBackL = comps.c_backL > 0 ? comps.c_backL : (H * 0.35);
      const legVol = frameType === 2 ? legs * legW * legW * (H * 0.72) / 1e9 : 0;
      const rungVol = frameType === 2 ? rungs * rungW * rungT * actRungL / 1e9 : 0;
      const seatType = parseInt(comps.c_seat) || 3;
      const seatAreaM2 = W * (D * 0.85) / 1e6;
      const seatVol = seatType === 1 ? seatAreaM2 * thick / 1000 : 0;
      const apronVol = (comps.c_seat_apron || 0) * (W * 0.8) * (comps.c_seat_apronW || 60) * (comps.c_seat_apronT || 20) / 1e9;
      const backType = parseInt(comps.c_back_type) || 2;
      const backAreaM2 = W * actBackL / 1e6;
      const backVol = backType === 1 ? backs * backW * backT * actBackL / 1e9 : (backs * backW * backT * actBackL / 1e9) * 0.3;
      const armVol = arms * armW * armT * D / 1e9;
      const surfaceM2 = ((frameType === 2 ? legs * 4 * legW * H + rungs * 2 * (rungW + rungT) * W : 0) + (seatType === 1 ? W * D * 2 : 0) + (backType === 1 ? backs * 2 * (backW + backT) * actBackL : 0) + (arms * 2 * (armW + armT) * D) + (comps.c_seat_apron > 0 ? comps.c_seat_apron * 2 * (comps.c_seat_apronW + comps.c_seat_apronT) * (W * 0.8) : 0)) / 1e6;
      const blockVol = (comps.c_block_qty || 0) * (comps.c_block_l || 50) * (comps.c_block_w || 30) * (comps.c_block_t || 30) / 1e9;
      let totalSMV = manualSmv > 0 ? manualSmv : (SMV_RATES.prep_wood + SMV_RATES.precision_machining + SMV_RATES.sanding + SMV_RATES.frame_assembly + SMV_RATES.finishing_pu + 30);
      let items = [];
      if (frameType === 1 && comps.c_metal_price > 0) items.push({ name: 'Khung kim loại', qty: 1, unit: 'bộ', price: comps.c_metal_price, tlth: 1.0, total: comps.c_metal_price });
      else if (frameType === 2) {
        if (legVol > 0) items.push({ name: 'Gỗ chân ghế', qty: legVol.toFixed(4), unit: 'm³', price: woodPrice, tlth: woodTlth, total: legVol * woodPrice * woodTlth });
        if (rungVol > 0) items.push({ name: 'Giằng chân', qty: rungVol.toFixed(4), unit: 'm³', price: woodPrice, tlth: woodTlth, total: rungVol * woodPrice * woodTlth });
      }
      if (apronVol > 0) items.push({ name: 'Gỗ apron mặt ngồi', qty: apronVol.toFixed(4), unit: 'm³', price: woodPrice, tlth: woodTlth, total: apronVol * woodPrice * woodTlth });
      if (seatType === 1) items.push({ name: 'Mặt ngồi (Solid)', qty: seatVol.toFixed(4), unit: 'm³', price: woodPrice, tlth: woodTlth, total: seatVol * woodPrice * woodTlth });
      if (seatType === 2) items.push({ name: 'Mặt ngồi (Plywood)', qty: (seatAreaM2 / 2.9768).toFixed(2), unit: 'tấm', price: corePrice, tlth: 1.02, total: (seatAreaM2 / 2.9768) * corePrice * 1.02 });
      if (seatType === 4 && comps.c_seat_rattan_price > 0) items.push({ name: 'Mặt ngồi Rattan', qty: seatAreaM2.toFixed(3), unit: 'm²', price: comps.c_seat_rattan_price, tlth: 1.1, total: seatAreaM2 * comps.c_seat_rattan_price * 1.1 });
      if (seatType === 3) {
  const mousseThickMM = 50; // 50mm
  // Kích thước khối nệm mặt ngồi: dài = D * 0.85 (mm), rộng = W (mm), dày = mousseThickMM
  const seatLenMM = D * 0.85;
  const seatWidMM = W;
  const { volumeM3, fabricAreaM2 } = calculateUpholstery(seatLenMM, seatWidMM, mousseThickMM, 1.05);
  const moussePrice = getMoussePrice(comps.c_mousse_type);
  const fabricPrice = getFabricPriceFromType(comps.c_fabric_type);
  if (volumeM3 > 0) items.push({ name: 'Mousse nệm mặt ngồi', spec: `${(seatLenMM*seatWidMM/1e6).toFixed(2)}m² x ${mousseThickMM}mm`, qty: volumeM3.toFixed(5), unit: 'm³', price: moussePrice, tlth: 1.0, total: volumeM3 * moussePrice });
  if (fabricAreaM2 > 0) items.push({ name: 'Vải bọc mặt ngồi (6 mặt)', qty: fabricAreaM2.toFixed(3), unit: 'm²', price: fabricPrice, tlth: 1.0, total: fabricAreaM2 * fabricPrice });
}
      if (backVol > 0) items.push({ name: 'Khung/Nan lưng', qty: backVol.toFixed(4), unit: 'm³', price: woodPrice, tlth: woodTlth, total: backVol * woodPrice * woodTlth });
      if (backType === 2) {
  const mousseThickMM = 50;
  const backLenMM = actBackL;   // chiều dài lưng (mm)
  const backWidMM = W;          // rộng lưng = rộng ghế
  const { volumeM3, fabricAreaM2 } = calculateUpholstery(backLenMM, backWidMM, mousseThickMM, 1.05);
  const moussePrice = getMoussePrice(comps.c_mousse_type);
  const fabricPrice = getFabricPriceFromType(comps.c_fabric_type);
  if (volumeM3 > 0) items.push({ name: 'Mousse nệm lưng', spec: `${(backLenMM*backWidMM/1e6).toFixed(2)}m² x ${mousseThickMM}mm`, qty: volumeM3.toFixed(5), unit: 'm³', price: moussePrice, tlth: 1.0, total: volumeM3 * moussePrice });
  if (fabricAreaM2 > 0) items.push({ name: 'Vải bọc lưng (6 mặt)', qty: fabricAreaM2.toFixed(3), unit: 'm²', price: fabricPrice, tlth: 1.0, total: fabricAreaM2 * fabricPrice });
}
      if (backType === 3 && comps.c_back_rattan_price > 0) items.push({ name: 'Lưng Rattan', qty: backAreaM2.toFixed(3), unit: 'm²', price: comps.c_back_rattan_price, tlth: 1.1, total: backAreaM2 * comps.c_back_rattan_price * 1.1 });
      if (armVol > 0) items.push({ name: 'Tay vịn', qty: armVol.toFixed(4), unit: 'm³', price: woodPrice, tlth: woodTlth, total: armVol * woodPrice * woodTlth });
      if (surfaceM2 > 0) items.push({ name: 'Hoàn thiện bề mặt', qty: surfaceM2.toFixed(3), unit: 'm²', price: finishCostM2, tlth: finishTlth, total: surfaceM2 * finishCostM2 * finishTlth });
      if (comps.c_screw_qty > 0) items.push({ name: 'Ốc vít', qty: comps.c_screw_qty, unit: 'con', price: 500, tlth: 1.0, total: comps.c_screw_qty * 500 });
      if (blockVol > 0) items.push({ name: 'Bọ gỗ liên kết', spec: `${comps.c_block_qty} cái`, qty: blockVol.toFixed(4), unit: 'm³', price: woodPrice, tlth: woodTlth, total: blockVol * woodPrice * woodTlth });
      items.push({ name: 'Nhân công (SMV)', qty: totalSMV.toFixed(0), unit: 'phút', price: manualRate, tlth: 1.0, total: totalSMV * manualRate });
      return items;
    }
  },
  bed: {
    label: '🛏️ Giường', defaultW: 1600, defaultH: 1200, defaultD: 2000, defaultName: 'Queen Bed Frame', defaultCode: 'BED-Q-001', hasCore: true, sizeHint: 'Queen: W=1600 | King: W=1800 (D=2000 chuẩn)',
    components: [
      { id: 'c_head_type', label: 'Headboard: 1:Ván 2:Solid 3:Rattan 4:Nệm', qty: 1, unit: 'loại', isSelect: true, options: [{ val: '1', text: 'Ván' }, { val: '2', text: 'Solid' }, { val: '3', text: 'Rattan' }, { val: '4', text: 'Nệm' }] },
      { id: 'c_headH', label: 'Chiều cao đầu giường (mm)', qty: 1200, unit: 'mm' },
      { id: 'c_head_rattan_price', label: 'Giá Rattan/Dây (đ/m²)', qty: 0, unit: 'đ' },
      { id: 'c_footH', label: 'Chiều cao chân giường (mm)', qty: 400, unit: 'mm' },
      { id: 'c_slat', label: 'Nan đỡ nệm (cái)', qty: 14, unit: 'cái' },
      { id: 'c_bolt', label: 'Bulon M10 (con)', qty: 16, unit: 'con', defaultPrice: 1500 },
      { id: 'c_cam', label: 'Cam lock (bộ)', qty: 8, unit: 'bộ', defaultPrice: 10000 },
      { id: 'c_mousse_type', label: 'Loại Mousse (nếu có)', qty: 'D40', isSelect: true, options: [{ val: 'D40', text: 'D40' }, { val: 'D60', text: 'D60' }, { val: 'D80', text: 'D80' }] },
      { id: 'c_fabric_type', label: 'Loại vải (nếu có)', qty: 'Vải bọc', isSelect: true, options: [{ val: 'Vải bọc', text: 'Vải bọc' }, { val: 'Vải nỉ', text: 'Vải nỉ' }, { val: 'Vải da', text: 'Vải da' }] },
      { id: 'c_screw_qty', label: 'Ốc vít (con)', qty: 30, unit: 'con' },
      { id: 'c_block_qty', label: 'Bọ gỗ l.kết (SL)', qty: 0, unit: 'cái' },
      { id: 'c_block_l', label: 'Dài bọ gỗ (mm)', qty: 50, unit: 'mm' },
      { id: 'c_block_w', label: 'Rộng bọ gỗ (mm)', qty: 30, unit: 'mm' },
      { id: 'c_block_t', label: 'Dày bọ gỗ (mm)', qty: 30, unit: 'mm' }
    ],
    calcBOM: function(W, H, D, thick, woodPrice, woodTlth, corePrice, finishCostM2, comps, manualSmv, manualRate) {
      const coreTlth = parseFloat(document.getElementById('core_tlth_input')?.value) || 1.02;
      const finishTlth = parseFloat(document.getElementById('finish_tlth_input')?.value) || 1.05;
      const headType = parseInt(comps.c_head_type) || 1;
      const headAreaM2 = W * (comps.c_headH || 1200) / 1e6;
      let headVol = 0, headCoreM2 = 0;
      if (headType === 1) headCoreM2 = headAreaM2;
      if (headType === 2) headVol = W * (comps.c_headH || 1200) * thick / 1e9;
      if (headType === 3 || headType === 4) { headVol = (W * (comps.c_headH || 1200) * thick / 1e9) * 0.25; headCoreM2 = headAreaM2 * 0.8; }
      const footVol = W * (comps.c_footH || 400) * thick / 1e9;
      const railVol = 2 * D * 200 * thick / 1e9;
      const slatVol = (comps.c_slat || 14) * 70 * 20 * W / 1e9;
      const surfaceM2 = (W * (comps.c_headH || 1200) * 2 + W * (comps.c_footH || 400) * 2 + D * 200 * 2 * 2) / 1e6;
      const blockVol = (comps.c_block_qty || 0) * (comps.c_block_l || 50) * (comps.c_block_w || 30) * (comps.c_block_t || 30) / 1e9;
      let totalSMV = manualSmv > 0 ? manualSmv : (SMV_RATES.prep_wood + SMV_RATES.sanding + SMV_RATES.finishing_pu + 60);
      let items = [];
      if (headVol + footVol > 0) items.push({ name: 'Gỗ khung đầu + chân', qty: (headVol + footVol).toFixed(4), unit: 'm³', price: woodPrice, tlth: woodTlth, total: (headVol + footVol) * woodPrice * woodTlth });
      if (headCoreM2 > 0) items.push({ name: 'Ván lõi Headboard', qty: (headCoreM2 / 2.9768).toFixed(2), unit: 'tấm', price: corePrice, tlth: coreTlth, total: (headCoreM2 / 2.9768) * corePrice * coreTlth });
      if (headType === 3 && comps.c_head_rattan_price > 0) items.push({ name: 'Ốp Rattan Headboard', qty: headAreaM2.toFixed(3), unit: 'm²', price: comps.c_head_rattan_price, tlth: 1.1, total: headAreaM2 * comps.c_head_rattan_price * 1.1 });
      if (headType === 4) {
  const mousseThickMM = 50;
  const headLenMM = W;
  const headHeightMM = comps.c_headH || 1200;
  const { volumeM3, fabricAreaM2 } = calculateUpholstery(headLenMM, headHeightMM, mousseThickMM, 1.05);
  const moussePrice = getMoussePrice(comps.c_mousse_type);
  const fabricPrice = getFabricPriceFromType(comps.c_fabric_type);
  if (volumeM3 > 0) items.push({ name: 'Mousse nệm headboard', spec: `${(headLenMM*headHeightMM/1e6).toFixed(2)}m² x ${mousseThickMM}mm`, qty: volumeM3.toFixed(5), unit: 'm³', price: moussePrice, tlth: 1.0, total: volumeM3 * moussePrice });
  if (fabricAreaM2 > 0) items.push({ name: 'Vải bọc headboard (6 mặt)', qty: fabricAreaM2.toFixed(3), unit: 'm²', price: fabricPrice, tlth: 1.0, total: fabricAreaM2 * fabricPrice });
}
      items.push({ name: 'Thanh dọc', qty: railVol.toFixed(4), unit: 'm³', price: woodPrice, tlth: woodTlth, total: railVol * woodPrice * woodTlth });
      items.push({ name: 'Nan đỡ nệm', qty: slatVol.toFixed(4), unit: 'm³', price: woodPrice, tlth: woodTlth, total: slatVol * woodPrice * woodTlth });
      items.push({ name: 'Hoàn thiện bề mặt', qty: surfaceM2.toFixed(3), unit: 'm²', price: finishCostM2, tlth: finishTlth, total: surfaceM2 * finishCostM2 * finishTlth });
      items.push({ name: 'Bulon liên kết', qty: comps.c_bolt || 0, unit: 'con', price: 1500, tlth: 1.0, total: (comps.c_bolt || 0) * 1500 });
      items.push({ name: 'Cam lock', qty: comps.c_cam || 0, unit: 'bộ', price: 10000, tlth: 1.0, total: (comps.c_cam || 0) * 10000 });
      if (comps.c_screw_qty > 0) items.push({ name: 'Ốc vít', qty: comps.c_screw_qty, unit: 'con', price: 500, tlth: 1.0, total: comps.c_screw_qty * 500 });
      if (blockVol > 0) items.push({ name: 'Bọ gỗ liên kết', spec: `${comps.c_block_qty} cái`, qty: blockVol.toFixed(4), unit: 'm³', price: woodPrice, tlth: woodTlth, total: blockVol * woodPrice * woodTlth });
      items.push({ name: 'Nhân công (SMV)', qty: totalSMV.toFixed(0), unit: 'phút', price: manualRate, tlth: 1.0, total: totalSMV * manualRate });
      return items;
    }
  },
  sofa: {
    label: '🛋️ Sofa', defaultW: 1800, defaultH: 800, defaultD: 850, defaultName: '2-Seater Sofa', defaultCode: 'SOF-2S-001', hasCore: true, sizeHint: '1 chỗ: 800-900 | 2 chỗ: 1500-1800 | 3 chỗ: 2000-2300',
    components: [
      { id: 'c_frame_type', label: 'Khung: 1:Gỗ 2:Kim loại', qty: 1, unit: 'loại', isSelect: true, options: [{ val: '1', text: 'Gỗ' }, { val: '2', text: 'Kim loại' }] },
      { id: 'c_metal_price', label: 'Giá khung kim loại (đ/bộ)', qty: 0, unit: 'đ' },
      { id: 'c_seat', label: 'Mặt ngồi: 1:Solid 2:Ply 3:Nệm 4:Rattan', qty: 3, unit: 'loại', isSelect: true, options: [{ val: '1', text: 'Solid' }, { val: '2', text: 'Plywood' }, { val: '3', text: 'Nệm' }, { val: '4', text: 'Rattan' }] },
      { id: 'c_seat_rattan_price', label: 'Giá Rattan mặt ngồi (đ/m²)', qty: 0, unit: 'đ' },
      { id: 'c_back', label: 'Lưng: 1:Solid 2:Ply 3:Nệm 4:Rattan', qty: 3, unit: 'loại', isSelect: true, options: [{ val: '1', text: 'Solid' }, { val: '2', text: 'Plywood' }, { val: '3', text: 'Nệm' }, { val: '4', text: 'Rattan' }] },
      { id: 'c_back_rattan_price', label: 'Giá Rattan lưng (đ/m²)', qty: 0, unit: 'đ' },
      { id: 'c_arm', label: 'Tay vịn: 0:Không 1:Có', qty: 0, unit: 'cái', isSelect: true, options: [{ val: '0', text: 'Không' }, { val: '1', text: 'Có' }] },
      { id: 'c_leg', label: 'Chân (SL)', qty: 4, unit: 'cái', priceKey: 'Chân sofa', defaultPrice: 30000 },
      { id: 'c_spring', label: 'Lò xo túi (cái)', qty: 0, unit: 'cái', defaultPrice: 12000 },
      { id: 'c_mousse_type', label: 'Loại Mousse', qty: 'D60', isSelect: true, options: [{ val: 'D40', text: 'D40 (2.5tr/m³)' }, { val: 'D60', text: 'D60 (3.2tr/m³)' }, { val: 'D80', text: 'D80 (3.8tr/m³)' }] },
      { id: 'c_fabric_type', label: 'Loại vải', qty: 'Vải bọc', isSelect: true, options: [{ val: 'Vải bọc', text: 'Vải bọc (140k/m²)' }, { val: 'Vải nỉ', text: 'Vải nỉ (180k/m²)' }, { val: 'Vải da', text: 'Vải da (250k/m²)' }] },
      { id: 'c_screw_qty', label: 'Ốc vít (con)', qty: 50, unit: 'con' },
      { id: 'c_block_qty', label: 'Bọ gỗ l.kết (SL)', qty: 0, unit: 'cái' },
      { id: 'c_block_l', label: 'Dài bọ gỗ (mm)', qty: 50, unit: 'mm' },
      { id: 'c_block_w', label: 'Rộng bọ gỗ (mm)', qty: 30, unit: 'mm' },
      { id: 'c_block_t', label: 'Dày bọ gỗ (mm)', qty: 30, unit: 'mm' }
    ],
    calcBOM: function(W, H, D, thick, woodPrice, woodTlth, corePrice, finishCostM2, comps, manualSmv, manualRate) {
      const coreTlth = parseFloat(document.getElementById('core_tlth_input')?.value) || 1.02;
      const finishTlth = parseFloat(document.getElementById('finish_tlth_input')?.value) || 1.05;
      const frameType = parseInt(comps.c_frame_type) || 1;
      const seatType = parseInt(comps.c_seat) || 3;
      const backType = parseInt(comps.c_back) || 3;
      const arm = parseInt(comps.c_arm) || 0;
      const leg = comps.c_leg || 4;
      const frameVol = (frameType === 1) ? (2 * (W + D) * 80 * thick + W * D * thick) / 1e9 : 0;
      const seatArea = W * D / 1e6;
      const backArea = W * (H * 0.4) / 1e6;
      const armArea = (arm === 1) ? (2 * 100 * D / 1e6) : 0;
      const finishArea = (frameType === 1 ? (2 * (W + D) * H / 1e6) : 0) + seatArea * 0.5 + backArea + armArea;
      let coreM2 = 0;
      if (seatType === 2) coreM2 += seatArea;
      if (backType === 2) coreM2 += backArea;
      const coreTiles = coreM2 / 2.9768;
      let rattanSeatM2 = 0, rattanBackM2 = 0;
      if (seatType === 4 && comps.c_seat_rattan_price) rattanSeatM2 = seatArea;
      if (backType === 4 && comps.c_back_rattan_price) rattanBackM2 = backArea;
      const springCost = (comps.c_spring || 0) * 12000;
      const blockVol = (comps.c_block_qty || 0) * (comps.c_block_l || 50) * (comps.c_block_w || 30) * (comps.c_block_t || 30) / 1e9;
      let totalSMV = manualSmv > 0 ? manualSmv : (SMV_RATES.prep_wood + SMV_RATES.frame_assembly + 90 + SMV_RATES.finishing_pu);
      const legPrice = getAccPrice('Chân sofa', 30000);
      let items = [];
      if (frameType === 2 && comps.c_metal_price > 0) items.push({ name: 'Khung kim loại', qty: 1, unit: 'bộ', price: comps.c_metal_price, tlth: 1.0, total: comps.c_metal_price });
      else if (frameType === 1) items.push({ name: 'Gỗ khung sofa', qty: frameVol.toFixed(4), unit: 'm³', price: woodPrice, tlth: woodTlth, total: frameVol * woodPrice * woodTlth });
      if (coreTiles > 0) items.push({ name: 'Ván lõi (Plywood/MDF)', qty: coreTiles.toFixed(2), unit: 'tấm', price: corePrice, tlth: coreTlth, total: coreTiles * corePrice * coreTlth });
      if (rattanSeatM2 > 0) items.push({ name: 'Mặt ngồi Rattan', qty: rattanSeatM2.toFixed(3), unit: 'm²', price: comps.c_seat_rattan_price, tlth: 1.1, total: rattanSeatM2 * comps.c_seat_rattan_price * 1.1 });
      if (rattanBackM2 > 0) items.push({ name: 'Lưng Rattan', qty: rattanBackM2.toFixed(3), unit: 'm²', price: comps.c_back_rattan_price, tlth: 1.1, total: rattanBackM2 * comps.c_back_rattan_price * 1.1 });
      if (seatType === 3) {
  const mousseThickMM = 80; // 80mm
  const seatLenMM = D;
  const seatWidMM = W;
  const { volumeM3, fabricAreaM2 } = calculateUpholstery(seatLenMM, seatWidMM, mousseThickMM, 1.05);
  const moussePrice = getMoussePrice(comps.c_mousse_type);
  const fabricPrice = getFabricPriceFromType(comps.c_fabric_type);
  if (volumeM3 > 0) items.push({ name: 'Mousse nệm mặt ngồi', spec: `${(seatLenMM*seatWidMM/1e6).toFixed(2)}m² x ${mousseThickMM}mm`, qty: volumeM3.toFixed(5), unit: 'm³', price: moussePrice, tlth: 1.0, total: volumeM3 * moussePrice });
  if (fabricAreaM2 > 0) items.push({ name: 'Vải bọc mặt ngồi (6 mặt)', qty: fabricAreaM2.toFixed(3), unit: 'm²', price: fabricPrice, tlth: 1.0, total: fabricAreaM2 * fabricPrice });
}
      if (backType === 3) {
  const mousseThickMM = 60;
  const backLenMM = H * 0.4;   // chiều cao lưng (mm)
  const backWidMM = W;
  const { volumeM3, fabricAreaM2 } = calculateUpholstery(backLenMM, backWidMM, mousseThickMM, 1.05);
  const moussePrice = getMoussePrice(comps.c_mousse_type);
  const fabricPrice = getFabricPriceFromType(comps.c_fabric_type);
  if (volumeM3 > 0) items.push({ name: 'Mousse nệm lưng', spec: `${(backLenMM*backWidMM/1e6).toFixed(2)}m² x ${mousseThickMM}mm`, qty: volumeM3.toFixed(5), unit: 'm³', price: moussePrice, tlth: 1.0, total: volumeM3 * moussePrice });
  if (fabricAreaM2 > 0) items.push({ name: 'Vải bọc lưng (6 mặt)', qty: fabricAreaM2.toFixed(3), unit: 'm²', price: fabricPrice, tlth: 1.0, total: fabricAreaM2 * fabricPrice });
}
      if (arm === 1) {
  const mousseThickMM = 50;
  // Giả định mỗi tay vịn có kích thước: dài = D * 0.2, rộng = 80mm, cao = H
  const armLenMM = D * 0.2;
  const armWidMM = 80;
  const armHeightMM = H;
  const { volumeM3: volOneArm, fabricAreaM2: fabOneArm } = calculateUpholstery(armLenMM, armWidMM, armHeightMM, 1.05);
  const totalVolume = volOneArm * 2;
  const totalFabric = fabOneArm * 2;
  const moussePrice = getMoussePrice(comps.c_mousse_type);
  const fabricPrice = getFabricPriceFromType(comps.c_fabric_type);
  if (totalVolume > 0) items.push({ name: 'Mousse nệm tay vịn (2 bên)', spec: `${(armLenMM*armWidMM/1e6).toFixed(2)}m²/ bên, dày ${mousseThickMM}mm`, qty: totalVolume.toFixed(5), unit: 'm³', price: moussePrice, tlth: 1.0, total: totalVolume * moussePrice });
  if (totalFabric > 0) items.push({ name: 'Vải bọc tay vịn (2 bên, 6 mặt)', qty: totalFabric.toFixed(3), unit: 'm²', price: fabricPrice, tlth: 1.0, total: totalFabric * fabricPrice });
}
      if (springCost > 0) items.push({ name: 'Lò xo túi', qty: comps.c_spring, unit: 'cái', price: 12000, tlth: 1.0, total: springCost });
      if (leg > 0) items.push({ name: 'Chân sofa', qty: leg, unit: 'cái', price: legPrice, tlth: 1.0, total: leg * legPrice });
      if (finishArea > 0 && frameType === 1) items.push({ name: 'Hoàn thiện bề mặt', qty: finishArea.toFixed(3), unit: 'm²', price: finishCostM2, tlth: finishTlth, total: finishArea * finishCostM2 * finishTlth });
      if (comps.c_screw_qty > 0) items.push({ name: 'Ốc vít', qty: comps.c_screw_qty, unit: 'con', price: 500, tlth: 1.0, total: comps.c_screw_qty * 500 });
      if (blockVol > 0) items.push({ name: 'Bọ gỗ liên kết', spec: `${comps.c_block_qty} cái`, qty: blockVol.toFixed(4), unit: 'm³', price: woodPrice, tlth: woodTlth, total: blockVol * woodPrice * woodTlth });
      items.push({ name: 'Nhân công (SMV)', qty: totalSMV.toFixed(0), unit: 'phút', price: manualRate, tlth: 1.0, total: totalSMV * manualRate });
      return items;
    }
  }
};
// ====================  CÁC HÀM XỬ LÝ CHÍNH ====================

// Custom accessories (có đơn vị tính)
let customAccList = [];
function addCustomAcc() { customAccList.push({ name: '', price: 0, unit: 'cái' }); renderCustomAccList(); calculate(); }
function removeCustomAcc(idx) { customAccList.splice(idx, 1); renderCustomAccList(); calculate(); }
function renderCustomAccList() {
  const wrap = document.getElementById('custom-acc-list');
  if (!wrap) return;
  if (customAccList.length === 0) { wrap.innerHTML = ''; return; }
  wrap.innerHTML = customAccList.map((a, i) => `
    <div class="custom-acc-row">
      <input class="custom-acc-name" type="text" placeholder="Tên phụ kiện..." value="${a.name.replace(/"/g, '&quot;')}" oninput="customAccList[${i}].name=this.value; calculate()">
      <input class="custom-acc-price" type="number" placeholder="Giá (đ)" value="${a.price || ''}" oninput="customAccList[${i}].price=parseFloat(this.value)||0; calculate()">
      <input class="custom-acc-unit" type="text" placeholder="ĐVT" value="${a.unit || 'cái'}" oninput="customAccList[${i}].unit=this.value; calculate()">
      <button class="custom-acc-del" onclick="removeCustomAcc(${i})">✕</button>
    </div>
  `).join('');
}

// Hàm gộp kích thước
function parseCombinedSize() {
  const combined = document.getElementById('sizeCombined').value.trim();
  if (!combined) return;
  const parts = combined.split(/[xX*;,\s]+/);
  if (parts.length >= 3) {
    let w = parseFloat(parts[0]), h = parseFloat(parts[1]), d = parseFloat(parts[2]);
    if (!isNaN(w) && !isNaN(h) && !isNaN(d)) {
      document.getElementById('width').value = w;
      document.getElementById('height').value = h;
      document.getElementById('depth').value = d;
      calculate();
    }
  }
}
function syncSizeCombinedFromIndividual() {
  const w = document.getElementById('width').value, h = document.getElementById('height').value, d = document.getElementById('depth').value;
  if (w && h && d) document.getElementById('sizeCombined').value = `${w}x${h}x${d}`;
}

// Render cấu kiện đặc thù theo loại sản phẩm
function renderComponents() {
  const typeDef = PRODUCT_TYPES[currentType];
  if (!typeDef) return;
  const container = document.getElementById('comp-section');
  if (!container) return;
  let html = '';
  for (let comp of typeDef.components) {
    const val = compValues[comp.id] !== undefined ? compValues[comp.id] : comp.qty;
    if (comp.isSelect) {
      html += `<div class="comp-row"><span class="comp-label">${comp.label}</span><select class="comp-select" id="comp_${comp.id}" data-id="${comp.id}" onchange="updateCompValueSelect('${comp.id}', this.value)">`;
      comp.options.forEach(opt => { html += `<option value="${opt.val}" ${val == opt.val ? 'selected' : ''}>${opt.text}</option>`; });
      html += `</select></div>`;
    } else {
      html += `<div class="comp-row"><span class="comp-label">${comp.label}</span><input type="number" class="comp-qty" id="comp_${comp.id}" value="${val}" step="1" min="0" data-id="${comp.id}" oninput="updateCompValue('${comp.id}', this.value)"></div>`;
    }
  }
  container.innerHTML = html;
}
function updateCompValue(id, value) { let num = parseFloat(value); if (isNaN(num)) num = 0; compValues[id] = num; calculate(); }
function updateCompValueSelect(id, value) { compValues[id] = value; calculate(); }

function setType(type) {
  currentType = type;
  document.querySelectorAll('.type-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`type-${type}`).classList.add('active');
  const def = PRODUCT_TYPES[type];
  if (def) {
    document.getElementById('width').value = def.defaultW;
    document.getElementById('height').value = def.defaultH;
    document.getElementById('depth').value = def.defaultD;
    document.getElementById('productName').value = def.defaultName;
    document.getElementById('productCode').value = def.defaultCode;
    document.getElementById('size-hint').innerHTML = def.sizeHint || '';
    const fgCore = document.getElementById('fg-core');
    if (fgCore) fgCore.style.display = def.hasCore ? 'block' : 'none';
    const vanitySec = document.getElementById('vanity-section');
    if (vanitySec) vanitySec.style.display = (type === 'vanity') ? 'block' : 'none';
    syncSizeCombinedFromIndividual();
  }
  customAccList = [];
  renderCustomAccList();
  compValues = {};
  for (let comp of PRODUCT_TYPES[type].components) compValues[comp.id] = comp.qty;
  renderComponents();
  calculate();
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
  document.getElementById(`panel-${tabId}`).classList.add('active');
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`tab-${tabId}`).classList.add('active');
}

// Hàm tính toán chính
// Tính thể tích mousse (m³) và diện tích vải bọc 6 mặt (m²) cho khối nệm hình hộp
function calculateUpholstery(L_mm, W_mm, H_mm, wasteFactor = 1.05) {
  const L = L_mm / 1000;
  const W = W_mm / 1000;
  const H = H_mm / 1000;
  const volumeM3 = L * W * H;
  const fabricAreaM2 = 2 * (L*W + L*H + W*H) * wasteFactor;
  return { volumeM3, fabricAreaM2 };
}
function calculate() {
  const W = parseFloat(document.getElementById('width').value) || 0;
  const H = parseFloat(document.getElementById('height').value) || 0;
  const D = parseFloat(document.getElementById('depth').value) || 0;
  const woodPrice = getSelectedWoodPrice();
  const woodTlth = getSelectedWoodTlth();
  const woodThick = getSelectedWoodThick();
  const corePrice = getSelectedCorePrice();
  const finishCost = getSelectedFinishCost();
  const laborRate = getLaborRate();
  const manualSmv = getSMV();
  let profitPercent = parseFloat(document.getElementById('profitMargin').value) / 100;
  const inflation = parseFloat(document.getElementById('inflationBuffer').value) / 100;
  const overheadPct = parseFloat(document.getElementById('fixedOverheadPerProduct').value) / 100;
  const testCost = parseFloat(document.getElementById('testCost').value) || 0;
  const shippingCost = parseFloat(document.getElementById('shippingCost').value) || 0;
  const exchange = parseFloat(document.getElementById('exchangeRate').value) || exchangeRateUSD;
  exchangeRateUSD = exchange;
  const discountPercent = parseFloat(document.getElementById('discountPercent').value) || 0;

  _currentVolumeM3 = (W * H * D) / 1e9;
  document.getElementById('volume_m3').innerHTML = _currentVolumeM3.toFixed(4) + ' m³';
  document.getElementById('size_in').innerHTML = `${(W / 25.4).toFixed(1)}" x ${(H / 25.4).toFixed(1)}" x ${(D / 25.4).toFixed(1)}"`;

  const typeDef = PRODUCT_TYPES[currentType];
  let bomItems = [];
  if (typeDef) {
    const comps = { ...compValues };
    if (currentType === 'vanity') {
      comps.vanity_stone_price = parseFloat(document.getElementById('vanity_stone_price').value) || 0;
      comps.vanity_sink_price = parseFloat(document.getElementById('vanity_sink_price').value) || 0;
      comps.vanity_sink_qty = parseInt(document.getElementById('vanity_sink_qty').value) || 0;
      comps.vanity_holes = parseInt(document.getElementById('vanity_holes').value) || 0;
    }
    bomItems = typeDef.calcBOM(W, H, D, woodThick, woodPrice, woodTlth, corePrice, finishCost, comps, manualSmv, laborRate);
  }

  _lastBomItems = bomItems;

  let rawBomCost = 0; for (let item of bomItems) rawBomCost += item.total;
  let customAccCost = 0; for (let acc of customAccList) if (acc.price) customAccCost += acc.price;
  const packaging = getPackagingCost();

  let rawMaterialCost = 0, laborCost = 0;
  for (let item of bomItems) {
    if (item.name.includes('Nhân công')) laborCost += item.total;
    else rawMaterialCost += item.total;
  }
  rawMaterialCost += customAccCost + packaging;

  const inflatedMat = rawMaterialCost * (1 + inflation);
  const subtotal = inflatedMat + laborCost + testCost + shippingCost;
  const overhead = subtotal * overheadPct;
  const totalCostVND = subtotal + overhead;

  // === CẬP NHẬT THUẬT TOÁN SCALE FACTOR & MARGIN (SỬA LỖI) ===
  const refVolume = 0.05; // thể tích tham chiếu (m³)
  let scaleFactor = Math.pow(_currentVolumeM3 / refVolume, 0.2);
  scaleFactor = Math.min(1.5, Math.max(0.7, scaleFactor));
  profitPercent = profitPercent * scaleFactor; // điều chỉnh trực tiếp biên lợi nhuận

  let fobUSD_before_discount = (totalCostVND / exchange) * (1 + profitPercent);
  fobUSD_before_discount = Math.ceil(fobUSD_before_discount * 10) / 10;
  let fobUSD = fobUSD_before_discount * (1 - discountPercent / 100);
  fobUSD = Math.ceil(fobUSD * 10) / 10;
  const profitUSD = fobUSD - (totalCostVND / exchange);
  const profitPct = (profitUSD / (totalCostVND / exchange)) * 100;
  currentCOGS = totalCostVND; currentFOB = fobUSD; currentProfitUSD = profitUSD; currentProfitPct = profitPct;

  document.getElementById('cogs_vnd').innerHTML = new Intl.NumberFormat('vi-VN').format(Math.round(totalCostVND));
  document.getElementById('fob_usd').innerHTML = `USD ${fobUSD.toFixed(1)}`;
  document.getElementById('profit_usd').innerHTML = `USD ${profitUSD.toFixed(2)}`;
  document.getElementById('profit_pct').innerHTML = `(${profitPct.toFixed(1)}%)`;

  renderBreakdown(discountPercent, profitPercent, totalCostVND, exchange, fobUSD_before_discount);
  renderBOM();
  renderSensitivity();
  updateQuote(discountPercent);
  updateStickyFooter();
}

function renderBreakdown(discountPercent, profitPercent, totalCostVND, exchange, fobUSD_before_discount) {
  const rowsDiv = document.getElementById('breakdownRows');
  if (!rowsDiv) return;
  let inflatedMat = 0, laborCost = 0, testShip = 0;
  for (let item of _lastBomItems) {
    if (item.name.includes('Nhân công')) laborCost += item.total;
    else inflatedMat += item.total;
  }
  inflatedMat = inflatedMat * (1 + parseFloat(document.getElementById('inflationBuffer').value) / 100);
  testShip = (parseFloat(document.getElementById('testCost').value) || 0) + (parseFloat(document.getElementById('shippingCost').value) || 0);
  const overhead = (inflatedMat + laborCost + testShip) * (parseFloat(document.getElementById('fixedOverheadPerProduct').value) / 100);
  _lastBreakdown = { inflatedMat, laborCost, packaging: getPackagingCost(), overhead, testShip };
  if (!totalCostVND) return;
  const fobVND_before = totalCostVND * (1 + profitPercent);
  const fobVND_after = fobVND_before * (1 - discountPercent / 100);
  const profitVND_after = fobVND_after - totalCostVND;
  let rows = [
    { name: 'Nguyên vật liệu (sau trượt)', amount: inflatedMat, pct: (inflatedMat / totalCostVND) * 100 },
    { name: 'Nhân công trực tiếp', amount: laborCost, pct: (laborCost / totalCostVND) * 100 },
    { name: 'Định phí QLC', amount: overhead, pct: (overhead / totalCostVND) * 100 },
    { name: 'Test & vận chuyển XK', amount: testShip, pct: (testShip / totalCostVND) * 100 }
  ].filter(r => r.amount > 0);
  rows.sort((a, b) => b.amount - a.amount);
  let html = '';
  for (let r of rows) { html += `<div class="bkd-row"><span class="nm">${r.name}</span><span class="am">${new Intl.NumberFormat('vi-VN').format(Math.round(r.amount))} đ</span><span class="pc">${r.pct.toFixed(1)}%</span></div>`; }
  html += `<div class="bkd-row tot"><span class="nm">TỔNG GIÁ THÀNH SX (COGS)</span><span class="am">${new Intl.NumberFormat('vi-VN').format(Math.round(totalCostVND))} đ</span><span class="pc">100%</span></div>`;
  if (discountPercent > 0) {
    html += `<div class="bkd-row" style="background:rgba(200,168,75,0.2);"><span class="nm">🎯 Chiết khấu thương mại (${discountPercent}%)</span><span class="am">- ${new Intl.NumberFormat('vi-VN').format(Math.round(fobVND_before * discountPercent / 100))} đ</span><span class="pc">-${discountPercent}%</span></div>`;
  }
  html += `<div class="bkd-row" style="background:var(--gold2);color:var(--navy)"><span class="nm">💹 Lợi nhuận thực tế (sau CK)</span><span class="am">${new Intl.NumberFormat('vi-VN').format(Math.round(profitVND_after))} đ</span><span class="pc">${(profitVND_after / totalCostVND * 100).toFixed(1)}%</span></div>`;
  html += `<div class="bkd-row" style="background:var(--gold);color:var(--navy);font-weight:bold"><span class="nm">💰 GIÁ FOB (sau chiết khấu)</span><span class="am">${new Intl.NumberFormat('vi-VN').format(Math.round(fobVND_after))} đ</span><span class="pc">USD ${currentFOB.toFixed(2)}</span></div>`;
  rowsDiv.innerHTML = html;
  const barDiv = document.getElementById('barChart');
  if (barDiv) { let bars = ''; for (let r of rows) { bars += `<div class="bar-row"><div class="barlbl">${r.name}</div><div class="bartrk"><div class="barfil" style="width:${Math.min(r.pct, 100)}%"></div></div><div class="barpct">${r.pct.toFixed(0)}%</div></div>`; } barDiv.innerHTML = bars; }
}

function renderBOM() {
  const tbody = document.getElementById('bomBody');
  if (!tbody) return;
  let html = '';
  let total = 0;
  for (let item of _lastBomItems) {
    const priceFormatted = new Intl.NumberFormat('vi-VN').format(Math.round(item.price));
    const totalFormatted = new Intl.NumberFormat('vi-VN').format(Math.round(item.total));
    html += `<tr>
      <td style="font-size:11px">${item.name}</td>
      <td style="font-size:10px">${item.spec || ''}</td>
      <td class="r">${item.qty}</td>
      <td class="r">${item.unit || ''}</td>
      <td class="r">${priceFormatted}</td>
      <td class="r">${item.tlth ? `x${item.tlth}` : ''}</td>
      <td class="r">${totalFormatted} đ</td>
    </tr>`;
    total += item.total;
  }
  for (let acc of customAccList) {
    if (acc.name && acc.price) {
      html += `<tr>
        <td style="font-size:11px">${acc.name}</td>
        <td style="font-size:10px">-</td>
        <td class="r">1</td>
        <td class="r">${acc.unit || 'cái'}</td>
        <td class="r">${new Intl.NumberFormat('vi-VN').format(acc.price)}</td>
        <td class="r">-</td>
        <td class="r">${new Intl.NumberFormat('vi-VN').format(acc.price)} đ</td>
      </tr>`;
      total += acc.price;
    }
  }
  const packagingCost = getPackagingCost();
  if (packagingCost > 0) {
    html += `<tr>
      <td style="font-size:11px">Bao bì & đóng gói</td>
      <td style="font-size:10px">-</td>
      <td class="r">1</td>
      <td class="r">lô</td>
      <td class="r">${new Intl.NumberFormat('vi-VN').format(packagingCost)}</td>
      <td class="r">-</td>
      <td class="r">${new Intl.NumberFormat('vi-VN').format(packagingCost)} đ</td>
    </tr>`;
    total += packagingCost;
  }
  html += `<tr class="tot">
    <td colspan="6" style="text-align:right;font-weight:bold">TỔNG NVL+NC (trước trượt):</td>
    <td class="r">${new Intl.NumberFormat('vi-VN').format(Math.round(total))} đ</td>
  </tr>`;
  tbody.innerHTML = html;
}

function renderSensitivity() {
  const tbody = document.getElementById('sensBody');
  if (!tbody) return;
  const baseCost = currentCOGS;
  const exchange = parseFloat(document.getElementById('exchangeRate').value) || exchangeRateUSD;
  const margins = [10, 12, 15, 18, 20];
  const nvlFluctuations = [-15, -10, -5, 0, 5, 10, 15];
  let html = '';
  for (let fluc of nvlFluctuations) {
    let row = `<tr><td class="rl">NVL ${fluc > 0 ? `+${fluc}` : fluc}%</td`;
    for (let m of margins) {
      let adjustedCost = baseCost * (1 + fluc / 100);
      let fob = (adjustedCost / exchange) * (1 + m / 100);
      fob = Math.ceil(fob * 10) / 10;
      let cls = '';
      if (fluc === 0 && m === 15) cls = 'cur';
      else if (fob < currentFOB) cls = 'lo';
      else if (fob > currentFOB) cls = 'hi2';
      row += `<td class="${cls}">USD ${fob.toFixed(1)}</td`;
    }
    row += `</tr>`;
    html += row;
  }
  tbody.innerHTML = html;
}

function updateQuote(discountPercent) {
  document.getElementById('q_date').innerText = new Date().toLocaleDateString('vi-VN');
  document.getElementById('q_code').innerText = document.getElementById('productCode').value || '—';
  document.getElementById('q_name').innerText = document.getElementById('productName').value || '—';
  document.getElementById('q_type').innerText = PRODUCT_TYPES[currentType]?.label || currentType;
  const W = document.getElementById('width').value, H = document.getElementById('height').value, D = document.getElementById('depth').value;
  document.getElementById('q_size').innerText = `${W} x ${H} x ${D} mm`;
  const woodSel = document.getElementById('woodType'); const woodText = woodSel.options[woodSel.selectedIndex]?.text.split('—')[0] || '';
  const coreSel = document.getElementById('coreBoard'); const coreText = coreSel.options[coreSel.selectedIndex]?.text.split('—')[0] || '';
  document.getElementById('q_material').innerHTML = `Gỗ: ${woodText}<br>Ván: ${coreText}`;
  document.getElementById('q_finish').innerText = document.getElementById('finish').options[document.getElementById('finish').selectedIndex]?.text.split('—')[0] || '';
  document.getElementById('q_qty').innerText = document.getElementById('qty').value;
  const pkgSel = document.getElementById('packagingType'); document.getElementById('q_packaging').innerText = pkgSel.options[pkgSel.selectedIndex]?.text || '';
  document.getElementById('q_discount').innerText = discountPercent > 0 ? `${discountPercent}%` : '0%';
  document.getElementById('q_fob').innerHTML = `USD ${currentFOB.toFixed(2)}`;
}

function updateStickyFooter() {
  document.getElementById('sticky_type').innerText = (PRODUCT_TYPES[currentType]?.label || '').toUpperCase();
  document.getElementById('sticky_cogs').innerHTML = new Intl.NumberFormat('vi-VN').format(Math.round(currentCOGS)) + ' đ';
  document.getElementById('sticky_fob').innerHTML = `USD ${currentFOB.toFixed(1)}`;
}

async function fetchExchangeRate() {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    const rate = data.rates.VND;
    if (rate) { document.getElementById('exchangeRate').value = Math.round(rate); exchangeRateUSD = rate; showToast(`Đã cập nhật tỷ giá: 1 USD = ${new Intl.NumberFormat('vi-VN').format(Math.round(rate))} VND`); calculate(); }
    else showToast('Không lấy được tỷ giá, vui lòng thử lại sau');
  } catch (err) { showToast('Lỗi kết nối, không thể cập nhật tỷ giá'); }
}

function syncAndRefresh() { saveDatabaseNoAlert(); loadDatabase(); calculate(); showToast('Đã đồng bộ database và tính lại giá'); }
function resetToDefault() { if (confirm('Reset tất cả về giá trị mặc định? Mọi thay đổi trong form sẽ mất.')) { loadDefaultDatabase(); setType(currentType); calculate(); } }
function printQuote() { window.print(); }

// Khởi tạo và lắng nghe sự kiện
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('dbWood')) loadDefaultDatabase(); else loadDatabase();
  const inputs = ['width', 'height', 'depth', 'qty', 'laborRateInput', 'totalSmvInput', 'profitMargin', 'inflationBuffer', 'fixedOverheadPerProduct', 'testCost', 'shippingCost', 'exchangeRate', 'packagingCost', 'vanity_stone_price', 'vanity_sink_price', 'vanity_sink_qty', 'vanity_holes', 'wood_tlth_input', 'wood_thick_input', 'core_tlth_input', 'finish_tlth_input', 'discountPercent'];
  inputs.forEach(id => { const el = document.getElementById(id); if (el) el.addEventListener('input', calculate); });
  document.getElementById('woodType')?.addEventListener('change', calculate);
  document.getElementById('coreBoard')?.addEventListener('change', calculate);
  document.getElementById('finish')?.addEventListener('change', calculate);
  document.getElementById('packagingType')?.addEventListener('change', () => { updatePackagingRateFromType(); calculate(); });
  setType('vanity');
  calculate();
  window.onclick = function (e) {
    const modal = document.getElementById('dbManager'); if (e.target === modal) toggleDbManager();
    const guideModal = document.getElementById('guideModal'); if (e.target === guideModal) closeGuide();
  };
});

console.log('✅ Ứng dụng đã sẵn sàng!');