import style from './field.module.css'

const Field = ({ value, type, label, changeHandler = () => {} }) => {
    const onChangeHandler = (e) => {
        changeHandler(e.target.value);
    }
    return (
        <div className={`${style.mr_3}  ${style.view}`}>
            <label>
                <p className={style.text_left}>{label}</p>
                <input
                    value={value}
                    onChange={onChangeHandler}
                    autoComplete={'off'}
                    className={style.width_100}
                    type={type}
                />
            </label>
        </div>
    );
}

export default Field;
