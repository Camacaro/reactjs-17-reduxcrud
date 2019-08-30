import React, { Component } from 'react';

/** Redux */
import { connect } from 'react-redux';
import { mostrarProducto, editarProducto } from '../actions/productosActions';

class EditarProducto extends Component {
    
    state = {
        nombre: '',
        precio: '',
        error: false,
    }

    componentDidMount() {
        /** Acceder a los parametros de la url */
        const id = this.props.match.params.id;

        this.props.mostrarProducto(id);
    }


    /**
     * Este metodo es ejecutado al recibir los props, o sea al recibir props se ejecuta
     * @param {*} nextProps: saber cuando los props esten llegando
     * @param {*} nextState: saber cuando el state esten llegando 
     */
    componentWillReceiveProps(nextProps, nextState) {
        const { nombre, precio } = nextProps.producto;
        this.setState({
            nombre,
            precio
        })
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

    actualizarProducto = (e) => {
        e.preventDefault();

        const { nombre, precio } = this.state;

        if( nombre === '' || precio === '' ){
            this.setState({error: true}); 
            return;
        }

        this.setState({error: false}); 

        // tomar id
        const {id} = this.props.match.params;

        // actualizar nuevo producto
        const infoProducto = {
            nombre,
            precio,
            id
        }

        // Mandar el producto, actualizar
        this.props.editarProducto( infoProducto );

        // redireccionar al home
        this.props.history.push('/');


    }

    render() {

        const {nombre, precio, error} = this.state;

        return (
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Agregar Nuevo Producto</h2>
                            <form onSubmit={this.actualizarProducto} >
                                <div className="form-group">
                                    <label>Titulo</label>
                                    <input defaultValue={nombre} onChange={this.nombreProducto} type="text" className="form-control" placeholder="Titulo" />
                                </div>
                                <div className="form-group">
                                    <label>Precio del Producto</label>
                                    <input defaultValue={precio} onChange={this.precioProducto} type="text" className="form-control" placeholder="Precio" />
                                </div>
                                <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Guadar Cambios</button>
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

const mapStateToProps = (state) => ({
    producto: state.productos.producto
});

export default connect( mapStateToProps , {mostrarProducto, editarProducto})(EditarProducto)