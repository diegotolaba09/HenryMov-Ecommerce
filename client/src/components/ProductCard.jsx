import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../redux/Action'

export default function ProductCard(product) {
	
	const [render, setRen] = useState(true)
	const count = useSelector(store => store.count)
	const dispatch = useDispatch()
	useEffect(() => {
	}, [render, count])
	if (!product) {
		return <div class="spinner-border text-info" role="status">
			<span class="sr-only">Loading...</span>
		</div>
	}
	
	const { name, image, price, description, id } = product

	function handleAdd(product) {
		console.log('PRODUCT1:', product)
		render ? setRen(false) : setRen(true)
	
		let recoveredData = localStorage.getItem('prod')
		let search = JSON.parse(recoveredData)

		if (!recoveredData) {
			let countCart = 1
			localStorage.setItem('count', countCart)
			dispatch(action.countCart())
			return localStorage.setItem('prod', JSON.stringify([product]))
		}

		let fined = search.find(prod => prod.id == id)
		if(fined){
			fined.count++
			let cleanData = search.filter((data) => data.id !== product.id)
			cleanData.push(fined)
			return localStorage.setItem('prod', JSON.stringify(cleanData))
		}
		let data = JSON.parse(recoveredData)
		let newProd = product
		data.push(newProd)
		let countCart = data.length
		localStorage.setItem('count', countCart)
		localStorage.setItem('prod', JSON.stringify(data))
		dispatch(action.countCart())
	}

  
  return (
    <div className="card">
      <Link className="titulo-link" to={`/products/${id}`}>
        <img className="card-img" src={image} alt="imagen producto" />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{`${description.substring(0, 90)}... `}
            <span className="ver-mas">
              ver más
            </span>
          </p>
          <p className="card-text">{`$ ${price}`}</p>
        </div>
      </Link>
      <button type="button" className="btn btn-primary btn-m btn-cart-add" data-toggle="modal" data-target="#exampleModalCenter" data-backdrop="atencion" onClick={()=>handleAdd(product)} ><i className="fas fa-cart-plus"></i></button>
    </div>
  )
}