import './App.css';
import Field from "./Components/Fields/Field";
import axios from "axios";
import style from './Components/form.module.css';
import {useEffect, useState} from 'react'
import {Multiselect} from "multiselect-react-dropdown";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";

function App() {
    const [name, setName] = useState('');
    const [colors, setColors] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);

    useEffect(() => {
        getColors()
    }, [])

    const saveData = async () => {
        const requestColors = selectedColors.map(el => el.name);
        const data = {
            name,
            color: requestColors,
        }
        try {
            const res = await axios.post(`http://localhost:4000/user`, data);
             toast("Task is Done :)");
        } catch (e) {
            console.log(e)
        }
    }

    const getColors = async () => {
        const res = await axios.get(`http://localhost:4000/color`);
        let items = [];
        if (res) {
            if (res.data.colors && res.data.colors.length) {
                items = res.data.colors.map(el => {
                    return {id: el._id, name: el.name}
                })
            }
            setColors(items);
        }
    }

    const onChange = (selectedList) => {
        setSelectedColors(selectedList)
    }

    return (
        <div className={`App`}>
            <ToastContainer />
            <div className={`${style.fields_flex}`}>
                <Field
                    label={'NAME'}
                    type={'text'}
                    value={name}
                    changeHandler={setName}
                />
                <div>
                    <p className={style.text_left}>Colors</p>
                    <Multiselect
                        options={colors}
                        onSelect={onChange}
                        onRemove={onChange}
                        displayValue="name"
                    />
                </div>
            </div>
            <div className={style.btn}>
                <button onClick={saveData}>
                    <span>SAVE</span>
                </button>
            </div>
        </div>
    );
}

export default App;
