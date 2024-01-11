import { useState } from "react";

export default function FormProduct({products, dateProduct, keyName}){
    const [stateForm, setStateForm] = useState({product: dateProduct.seledProduct});

    const handlerChange = (event) => {
        setStateForm({...stateForm, [`${event.target.name}`]: event.target.value});
    }

    return(
        <form>
            <div>
                <div>
                    <div>
                        <label htmlFor="product">Productos quimicos</label>
                        <select name="product" value={stateForm.product} onChange={handlerChange}>
                            {products.map((product, index) =>
                                (<option key={`${keyName}_${index}`}>{product}</option>))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="amount">Cantidad, ml/kg</label>
                        <input type="number" name="amount">{dateProduct.amount}</input>
                    </div>
                </div>

                <div>
                    
                </div>
            </div>
        </form>
    );
}