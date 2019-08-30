import React, { Component } from 'react';
/** Redux */
import { connect } from 'react-redux';
import { mostrarProductos } from '../actions/productosActions';
import Producto from './Producto';

class Productos extends Component {
    

    /** AL carar el componente hacemos el llamado a la accion del reducers para hacer la peticion  */
    componentDidMount(){
        
        this.props.mostrarProductos();
    }

    render() {
        const {productos} = this.props;

        return (
            <React.Fragment>
                <h2 className="text-center my-5"> Listado de Productos </h2>
                <div className="row justify-content-center">
                    <div className="cold-md-8">
                        <ul>
                            { productos.map( producto => (
                                <Producto
                                    key={producto.id}
                                    info={producto}
                                />
                            ) ) }
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
/**
 * 
 * @param {*} state: variable que almacena la informacion del state
 * nos dirijimos a reducers/index 
 */
const mapStateToProps = (state) => ({
    productos: state.productos.productos
});

export default connect(mapStateToProps, {mostrarProductos}) (Productos);