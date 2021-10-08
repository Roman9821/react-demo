import './App.css';
import Field from "./Components/Fields/Field";
import axios from "axios";
import style from './Components/form.module.css';
import {useState} from 'react'
import {Multiselect} from "multiselect-react-dropdown";

function App() {
    const [name, setName] = useState('');
    const [options, setOptions] = useState([
        {
            id: "61600b640e39be31f60ef6c3",
            name: "#FF0000"
        },
        {
            id: "61600b720e39be31f60ef6c4",
            name: "#00FF00"
        },
        {
            id: "61600b7c0e39be31f60ef6c5",
            name: "#FFFF00"
        },
        {
            id: "61600b920e39be31f60ef6c6",
            name: "#000000"
        },
        {
            id: "61600b9d0e39be31f60ef6c7",
            name: "#FFFFFF"
        }
    ])
    const [selectedValue, setSelectedValue] = useState('')

    let saveData = async () => {
        const data = {
            name,
            selectedValue
        }
        try {
            const res = await axios.post(`https://jsonplaceholder.typicode.com/users`, data);
            if (res) {

            }
        } catch (e) {
            console.log(e)
        }
    }

    let getColors = async () => {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/getColors`);
        if (res) {
            setOptions();
        }
    }

    // getColors();

    let Select = (selectedList, selectedItem) => {
        setSelectedValue(selectedList)
    }

    let onRemove = (selectedList, removedItem) => {
        setSelectedValue(selectedList)
    }
    return (
        <div className={`App`}>
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
                        options={options}
                        onSelect={Select}
                        onRemove={onRemove}
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
