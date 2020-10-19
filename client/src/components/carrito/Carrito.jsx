
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as action from '../../redux/Action'
import './Carrito.css';

export default function Carrito() {
    const dispatch = useDispatch()
    let product = JSON.parse(localStorage.getItem('prod'))
    const count = useSelector(store => store.count)
    const [prodId, setProdId] = useState('')
    const [render, setRender] = useState(true)
    useEffect(() => {

    }, [render, count])

    if (product != null) {
        product.sort(function (a, b) {
            if (a.id > b.id) {
                return 1;
            }
            if (a.id < b.id) {
                return -1;
            }
            return 0;
        })
    }


    function subTotal(act) {
        let subtotal = 0
        if (product == null) {
            return 0
        }
        product.map(precio =>
            subtotal = subtotal + precio.price * precio.count,
        )
        let envio = subtotal * 0.1
        let total = subtotal + envio
        switch (act) {
            case 1: return dosDecimales(envio);
            case 2: return subtotal;
            case 3: return dosDecimales(total);
            default: return;
        }
    }
    function dosDecimales(n) {
        let t = n.toString();
        let regex = /(\d*.\d{0,2})/;
        return t.match(regex)[0];
    }


    function aumentar(prod) {
        render ? setRender(false) : setRender(true)
        if (prod.count < prod.stock) {
            prod.count = prod.count + 1
            let recoveredData = localStorage.getItem('prod')
            let data = JSON.parse(recoveredData)
            let newData = data.filter((data) => data.id !== prod.id)
            newData.push(prod)
            localStorage.setItem('prod', JSON.stringify(newData))
        }
        return
    }
    function disminuir(prod) {
        render ? setRender(false) : setRender(true)
        if (prod.count == 1) {
            return
        }
        prod.count = prod.count - 1
        let recoveredData = localStorage.getItem('prod')
        let data = JSON.parse(recoveredData)
        let newData = data.filter((data) => data.id !== prod.id)
        newData.push(prod)
        localStorage.setItem('prod', JSON.stringify(newData))

    }
    function handleDelete(id) {
        render ? setRender(false) : setRender(true)
        dispatch(action.removecountCart())
        let recoveredData = localStorage.getItem('prod')
        let data = JSON.parse(recoveredData)
        let newData = data.filter((data) => data.id !== id)
        let countCart = newData.length
        localStorage.setItem('count', countCart)
        localStorage.setItem('prod', JSON.stringify(newData))
    }
    function deleteAllProd() {
        render ? setRender(false) : setRender(true)
        dispatch(action.removecountCart())
        let countCart = 0
        let newData = []
        localStorage.setItem('count', countCart)
        localStorage.setItem('prod', JSON.stringify(newData))
    }


    return (
        <div>
            <section className="text-center mb-4 mt-4">
                <div className="container">
                    <h1 className="jumbotron-heading">CARRITO HENRY MOV</h1>
                </div>
            </section>
            <div className="container mb-4">
                <div className="row">
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col"> </th>
                                        <th scope="col">Producto</th>
                                        <th scope="col">Diponible</th>
                                        <th scope="col" className="text-center">Cantidad</th>
                                        <th scope="col" className="text-right">Precio Unit</th>
                                        <th scope="col" className="text-right">Precio Final</th>
                                        <th> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product &&
                                        product.map(prod =>
                                            <tr>
                                                <td><Link className="titulo-link" to={`/products/${prod.id}`} ><img src={prod.image} width={80} href='`/product/${id}`' /></Link> </td>
                                                <h5 className='card-title w-auto p-3' >{prod.name.substring(0, 30) + '...'}</h5>
                                                <td>{prod.count < prod.stock ? <div class="alert alert-success" role="alert">
                                                    Disponible
                                            </div> : <div class="alert alert-danger" role="alert">
                                                        Sin stock</div>}</td>
                                                <td><input type="button" class="btn btn-outline-primary" value='-' onClick={() => { disminuir(prod) }} />
                                                    <input class="btn btn-primary" type="button" value={prod.count} />
                                                    <input type="button" class="btn btn-outline-primary" value='+' onClick={() => { aumentar(prod) }} />
                                                </td>
                                                <td className="text-right">$ {prod.price} </td>
                                                <td className="text-right">$ {prod.price * prod.count} </td>
                                                <td className="text-right"><button type="button" class="btn btn-outline-warning" data-toggle="modal" data-target="#exampleModal" onClick={() => setProdId(prod.id)}><i className="fa fa-trash"></i> </button> </td>
                                            </tr>
                                        )}
                                    <div class="modal fade shadow-lg p-2 mb-5 rounded" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="card-header bg-danger text-white " id="exampleModalLabel">IMPORTANTE</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <div class="spinner-grow text-danger" aria-hidden="true" role="status">
                                                            <span class="sr-only" aria-hidden="true">&times;</span>
                                                        </div>
                                                    </button>
                                                </div>
                                                <div class="modal-body p-3 mb-2 bg-warning text-dark">
                                                    Te sugerimos que lo pienses...seguro quieres sacar tu producto del carrito?</div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-outline-danger" data-dismiss="modal" onClick={() => handleDelete(prodId)}> SI  </button>
                                                    <button type="button" class="btn btn-outline-success" data-dismiss="modal">NO</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>Sub-Total</td>
                                        <td className="text-right">$ {subTotal(2)} </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>Envio</td>
                                        <td className="text-right">$ {subTotal(1)} </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td><strong>Total</strong></td>
                                        <td className="text-right"><strong>$ {subTotal(3)} </strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col mb-2">
                        <div className="row">
                            <div className="col-sm-6  col-md-3">
                                {product.length !== 0 && <button type="button" class="btn btn-outline-danger" data-toggle="modal" data-target="#exampleModal1" >Vaciar el carrito</button>}
                            </div>
                            <div class="modal fade shadow-lg p-2 mb-5 rounded" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header bg-danger">
                                            <h5 class="card-header bg-warning text-white " id="exampleModalLabel1">IMPORTANTE</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <div class="spinner-grow text-danger" aria-hidden="true" role="status">
                                                    <span class="sr-only" aria-hidden="true">&times;</span>
                                                </div>

                                            </button>
                                        </div>
                                        <div class="modal-body p-3 mb-2  text-dark">
                                            <p>Estas por vaciar todo tu carrito...</p><p>deseas continuar?</p>
                                        </div>
                                        <div class="modal-footer bg-danger">
                                            <button type="button" class="btn btn-outline-warning" data-dismiss="modal" onClick={() => deleteAllProd()}> SI  </button>
                                            <button type="button" class="btn btn-outline-success" data-dismiss="modal">NO</button>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="col-sm-6  col-md-3">
                                <a className="btn btn-block btn-light" href='./products'>Continuar comprando</a>
                            </div>
                            <div className="col-sm-12 col-md-6 text-right">
                                <button className="btn btn-lg btn-block btn-success text-uppercase" data-toggle="modal" data-target="#exampleModal2" >Pagar</button>
                            </div>
                            <div class="modal fade shadow-lg p-2 mb-5 rounded" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">

                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body p-3 mb-2 bg-warning text-dark">
                                            Debes iniciar sesion para finalizar tu compra
      </div>
                                        <div class="modal-footer">
                                            <a type="button" class="btn btn-outline-primary" href="/register">Resgistrate</a>
                                            <button type="button" class="btn btn-outline-success" data-dismiss="modal">Iniciar sesion</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <footer className="text-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-lg-4 col-xl-3 bg-dark">
                            <h5>About</h5>
                            <hr className="bg-white mb-2 mt-0 d-inline-block mx-auto w-25" />
                            <p className="mb-0">
                                Somos un grupo de estudiantes de Henry dispuestos a dar todo de cada uno para mejorar el futuro nuestro y del mundo
                </p>
                        </div>

                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto bg-dark">
                            <h5>Informations</h5>
                            <hr className="bg-white mb-2 mt-0 d-inline-block mx-auto w-25" />
                            <ul className="list-unstyled">
                                <li><a href="">Link 1</a></li>
                                <li><a href="">Link 2</a></li>
                                <li><a href="">Link 3</a></li>
                                <li><a href="">Link 4</a></li>
                            </ul>
                        </div>

                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto bg-dark">
                            <h5>Others links</h5>
                            <hr className="bg-white mb-2 mt-0 d-inline-block mx-auto w-25" />
                            <ul className="list-unstyled">
                                <li><a href="">Link 1</a></li>
                                <li><a href="">Link 2</a></li>
                                <li><a href="">Link 3</a></li>
                                <li><a href="">Link 4</a></li>
                            </ul>
                        </div>
                        <div className="col-md-4 col-lg-3 col-xl-3 bg-dark">
                            <h5>Contact</h5>
                            <hr className="bg-white mb-2 mt-0 d-inline-block mx-auto w-25" />
                            <ul className="list-unstyled">
                                <li><i className="fa fa-home mr-2"></i> My company</li>
                                <li><i className="fa fa-envelope mr-2"></i> email@example.com</li>
                                <li><i className="fa fa-phone mr-2"></i> + 33 12 14 15 16</li>
                                <li><i className="fa fa-print mr-2"></i> + 33 12 14 15 16</li>
                            </ul>
                        </div>
                        <div className="col-12 copyright mt-3">
                            <p className="float-left">
                                <a href="#">Back to top</a>
                            </p>
                            <p className="text-right text-muted">created with <i className="fa fa-heart"></i> by <a href="https://t-php.fr/43-theme-ecommerce-bootstrap-4.html"><i>Henry</i></a> | <span>Group 05</span></p>
                        </div>
                    </div>
                </div>
            </footer> */}
        </div>
    )
}