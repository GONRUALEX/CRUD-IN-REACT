import React, { useEffect, useState } from 'react';
import { helpHttp } from '../helpers/helpHttp';
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';
import Loader from "./Loader";
import Message from "./Message";

const CrudApi = () => {
    const [db, setDb] = useState(null);
    const [dataToEdit, setDataToEdit] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    let url = "http://localhost:5000/caballeros";

    useEffect(() => {
        setLoading(true);
        helpHttp().get(url).then((res) => {
            if (!res.err) {
                setDb(res);
                setError(null);
            } else {
                setError(res);
                setDb(null);
            }
            setLoading(false);
        })
    }, [url]);


    const updateData = (data) => {
        let endpoint = `${url}/${data.id}`
        let options = {
            body: data,
            headers: { "content-type": "application/json" }
        }
        helpHttp().put(endpoint, options).then((res) => {
            if (!res.err) {
                let dbAux = db.map((element) => {
                    return element.id == data.id ? data : element;
                })
                setDb(dbAux);
            } else {
                setError(res);
            }

        });

    }
    const createData = (data) => {
        data.id = Date.now();
        let options = {
            body: data,
            headers: { "content-type": "application/json" }
        }
        helpHttp().post(url, options).then((res) => {
            if (!res.err) {
                setDb([...db, res]);
            } else {
                setError(res);
            }

        });
    }
    const deleteData = (id) => {
         let endpoint = `${url}/${id}`
        
        let isDelete = window.confirm(`Estás seguro de eliminar '$(id)'??`);
        if (isDelete) {
            helpHttp().del(endpoint).then((res) => {
                if (!res.err) {
                    let dbAux = db.filter((element) => { return element.id != id })
                    setDb(dbAux);
                } else {
                    setError(res);
                }
    
            });
            
        }
    }

    return (
        <div>
            <h2>
                Crud app
            </h2>
            <CrudForm createData={createData}
                updateData={updateData}
                dataToEdit={dataToEdit}
                setDataToEdit={setDataToEdit} />
            {loading && <Loader />}
            <hr />
            {error && <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="#dc3545" />}
            {db && <CrudTable data={db}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData} />}
        </div>
    )
}

export default CrudApi;