/**
 * Script formulario de servico KPWorld.
 * Fevereiro de 2023
 */

const CATEGORIES = {
  'Categoria 1': [
    'Subcat 1, cat 1',
    'Subcat 2, cat 1',
    // adicione mais subcats aqui
  ],
  'Categoria 2': [
    'Subcat 1, cat 2',
    'Subcat 2, cat 2',
    // adicione mais subcats aqui
  ],
  // adicione mais cats aqui
};

// executa assim que a pagina carrega
function pageLoaded() {
  $('#add-product').click(addProduct);

  $('#levantar').click(function() {
    $(this).prop('checked') ? $('#medidas').show() : $('#medidas').hide();
  });

  ['maquete', 'orcamento', 'produzir'].forEach(function(value) {
    $(`#${value}`).click(function() {
      $(`#${value}`).prop('checked') ? $(`#${value}-prazo`).show() : $(`#${value}-prazo`).hide();
    });
  });

  $(window).bind('beforeprint', function() {
    $('#considerar-text').html($('#considerar').val());
    $('#locallevmed-text').html($('#locallevmed').val());

    ['measures', 'finishing'].forEach(function(value) {
      $(`textarea.product-${value}`).each(function() {
        const txtarea = $(this);
        txtarea.parent().find(`div.product-${value}`).html(txtarea.val());
      });
    });
  });
}

// popula subcategorias a partir de uma categoria selecionada
function populateSubcategories(productElement, category) {
  const subcategorySelect = productElement.children('select.subcategory');
  subcategorySelect.children().remove();
  for (const subcat of CATEGORIES[category]) {
    const subcatOption = $('<option>');
    subcatOption.addClass('subcategory');
    subcatOption.html(subcat);
    subcategorySelect.append(subcatOption);
  }
}

// adiciona produto
function addProduct() {
  // clona produto a partir do template html
  const newProduct = $('#template-product').clone();

  // popula as categorias de produtos
  const categorySelect = newProduct.children('select.category');
  for (const cat of Object.keys(CATEGORIES)) {
    const catOption = $('<option>');
    catOption.addClass('category');
    catOption.html(cat);
    categorySelect.append(catOption);
  }

  // ao mudar uma categoria, popula as respectivas subcategorias
  categorySelect.change(function() {
    populateSubcategories(newProduct, $(this).val());
  });

  // seleciona a primeira categoria e popula as respectivas subcategorias
  const firstCategory = Object.keys(CATEGORIES)[0];
  categorySelect.val(firstCategory);
  populateSubcategories(newProduct, firstCategory);

  // adiciona evento de remover produto e novo produto no container de produtos
  newProduct.children('.remove-product').click(removeProduct);
  $('#products').append(newProduct);

  evaluateProducts();
}

// remove produto da lista
function removeProduct() {
  const id = $(this).parent('fieldset').attr('id');
  $(`#${id}`).remove();
  evaluateProducts();
}

// atualiza lista de produtos apos adicao/remocao
function evaluateProducts() {
  $('#products>.product').each(function(idx) {
    const self = $(this);
    self.children('legend').html(`Item #${++idx}`);
    self.attr('id', `product-${idx}`);
  });
}

function previewImages(inputImagesId) {
  var inputImages = document.getElementById(inputImagesId).files;
  var previewImagesId = "preview-images" + inputImagesId.split("input-images")[1];
  var previewImages = document.getElementById(previewImagesId);

  previewImages.innerHTML = "";

  for (var i = 0; i < inputImages.length; i++) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = document.createElement("img");
      img.src = e.target.result;
      img.style.width = "700px";
      img.style.margin = "0px";
      img.style.display = "block";
      img.style.margin = "0 auto";

      var removeButton = document.createElement("button");
      removeButton.innerHTML = "Remover esta imagem";
      removeButton.style.margin = "10px";
      removeButton.onclick = function() {
        img.remove();
        removeButton.remove();
      };

      previewImages.appendChild(img);
      previewImages.appendChild(removeButton);
    };
    reader.readAsDataURL(inputImages[i]);
  }
}

$(document).ready(pageLoaded);
