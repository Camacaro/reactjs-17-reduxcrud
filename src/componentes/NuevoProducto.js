import React, { Component } from 'react';

/** Redux */
import { connect } from 'react-redux';
import { agregarProducto } from '../actions/productosActions';

class NuevoProducto extends Component {
    
    state = {
        nombre: '',
        precio: '',
        error: false,
    }

    nombreProducto = (e) => {
        const nombre = e.target.value;
        this.setState({
            nombre
        })
    }

    precioProducto = (e) => {
        const precio = e.target.value;
        this.setState({
            precio
        })
    }

    nuevoProducto = (e) => {
        e.preventDefault();

        const { nombre, precio } = this.state;

        if( nombre === '' || precio === '' ){
            this.setState({error: true}); 
            return;
        }

        this.setState({error: false}); 

        // Crear nuevo producto
        const infoProducto = {
            nombre: this.state.nombre,
            precio: this.state.precio,
        }

        // Mandar el producto, crear
        this.props.agregarProducto( infoProducto );

        // redireccionar al home
        this.props.history.push('/');


    }

    render() {

        const {error} = this.state;

        return (
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Agregar Nuevo Producto</h2>
                            <form onSubmit={this.nuevoProducto} >
                                <div className="form-group">
                                    <label>Titulo</label>
                                    <input onChange={this.nombreProducto} type="text" className="form-control" placeholder="Titulo" />
                                </div>
                                <div className="form-group">
                                    <label>Precio del Producto</label>
                                    <input onChange={this.precioProducto} type="text" className="form-control" placeholder="Precio" />
                                </div>
                                <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Agregar</button>
                            </form>

                            {error ? 
                                <div className="font-weight-bold alert alert-danger text-center mt-4"> Todos los campos son necesarios </div> 
                                    :
                                ''
                            } 
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, {agregarProducto})(NuevoProducto)