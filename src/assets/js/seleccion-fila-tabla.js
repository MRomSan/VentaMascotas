function seleccionFilas(elemento,multiSeleccion,datosARecoger) {
    var id = elemento.find(".id").html();
    // Selecciono la fila de la tabla, y si ya está seleccionada le quito la selección
    if(elemento.hasClass("selected")) {
        elemento.removeClass("table-primary");
        elemento.removeClass("selected").trigger("classChange");;
        
        // Elimino el dato de la deselección
        if(datosARecoger.length != 0) {
            datosARecoger.splice(jQuery.inArray(id, datosARecoger),1);
        }
    } else {
        //Estas líneas de código son las que hacen que pase de ser multiselección a selección única
        if(multiSeleccion == false){
            $(".selected").removeClass("table-primary");
            $(".selected").removeClass("selected").trigger("classChange");
            datosARecoger.splice(jQuery.inArray(id, datosARecoger),1);
        }
        
        // Marco la fila como seleccionada. El trigger llama a una posible función en otro fichero que recoja la cantidad de filas seleccionadas
        elemento.addClass("table-primary");
        elemento.addClass("selected").trigger("classChange");
        
        // Recojo el DNI a eliminar
        datosARecoger.push(id);
    }
    
    // Si hay fila seleccionada
    if($(".tabla-seleccionable tbody").find(".selected").length > 0){
        // Habilito el botón
        deshabilitarBoton(false);
    } else {
        // Deshabilito el botón
        deshabilitarBoton(true);
    }
    
    // Meto los IDs a eliminar en un campo oculto del formulario al que llama el botón
    $(".recoge-datos").val(datosARecoger);
}

function deshabilitarBoton(condicion) {
	if(condicion == true) {
		$(".desbloquear-btn").attr("aria-disabled", true);
		$(".desbloquear-btn").addClass("disabled");
	} else {
		$(".desbloquear-btn").removeAttr("aria-disabled");
		$(".desbloquear-btn").removeClass("disabled");
	}
}