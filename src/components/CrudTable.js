import React,{useState} from "react";
import CrudTableRow from "./CrudTableRow";

const CrudTable = ({data, setDataToEdit, deleteData}) =>{
    return (
        <div>
            <h3>Tabla</h3>
            <table>
                <thead>
                    <tr>
                        <th>
                            nombre
                        </th>
                        <th>
                            Constellation
                        </th>
                        <th>
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                   {data.length > 0 ?(
                   data.map((el)=>{
                      return ( <CrudTableRow key={el.id} data={el}
                      setDataToEdit={setDataToEdit} deleteData={deleteData}/> );
                   })):(<tr colSpan ="3">No data</tr>)}
                </tbody>
            </table>
        </div>
    );

}
export default CrudTable;