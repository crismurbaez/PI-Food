import { React, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getDiets, getRecipes } from "../../redux/actions";
import imageHome from '../../images/home.png'
import s from './Form.module.css';


const Form = () => {
    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets);
    const [input, setInput] = useState({
        name: "",
        image: "",
        diets: [],
        healthScore: 0,
        summary: "",
        stepByStep: "",
    });
    const [errors, setErrors] = useState({});


    useEffect(() => {
        (diets.length === 0) ? dispatch(getDiets()) : console.log('no despacho las getdiets')
    }, [dispatch, diets]);



    const onHandleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    };

    const onHandleChecked = (e) => {
        if (e.target.checked && !input.diets.includes(e.target.value)) {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value],
            });
        } else if (!e.target.checked) {
            setInput({
                ...input,
                diets: input.diets.filter((d) => d !== e.target.value),
            });
        }
    };

    let validateName = /^[a-zA-Z\s]+$/;
    let validateUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg|webp|avif)/;
    const validate = (input) => {
        let errors = {};
        if (!input.name.length) {
            errors.name = "This field cannot be empty";
        }
        if (!validateName.test(input.name)) {
            errors.name = "Special characters or numbers are not allowed";
        }
        if (input.image && !validateUrl.test(input.image)) {
            errors.image = "This is not a valid URL";
        }
        if (!input.summary.length) {
            errors.summary = "This field cannot be empty";
        }
        if (input.summary.length < 40) {
            errors.summary = "This field must be at least 40 characters";
        }

        if (input.healthScore < 1 || input.healthScore > 100) {
            errors.healthScore = "Number required. Must be a number between 1-100";
        }
        if (!input.stepByStep.length) {
            errors.stepByStep = "This field cannot be empty";
        }
        if (input.stepByStep.length < 40) {
            errors.stepByStep = "This field must be longer than 40 characters";
        }
        return errors;

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0 && input.diets.length > 0) {
            dispatch(postRecipe(input));
            alert("Recipe Created Successfully!");
            setInput({
                name: "",
                image: "",
                diets: [],
                healthScore: 0,
                summary: "",
                stepByStep: '',
            });
            dispatch(getRecipes())
        } else {
            alert("All fields must be completed");
        }
    };

    return (
        <div className={s.container}>
            <Link to={`/home`}>
                <img className={s.imgHome} src={imageHome} alt="Home" />
            </Link>
            <form onSubmit={handleSubmit} className={s.form}>
                <div className={s.display}>
                    <label htmlFor="image">Image: </label>
                    <input
                        type="url"
                        name="image"
                        value={input.image}
                        autoComplete="off"
                        onChange={onHandleChange}
                        placeholder=" URL Image (Optional)..."
                        className={s.input}
                    />
                    {errors.image && <p className={s.errors}>{errors.image}</p>}
                </div>
                <div className={s.display}>
                    <label htmlFor="name">Title: </label>
                    <input
                        type="text"
                        name="name"
                        value={input.name}
                        autoComplete="off"
                        onChange={onHandleChange}
                        className={s.input}
                    />
                    {errors.name && <p className={s.errors}>{errors.name}</p>}
                </div>
                <div className={s.display}>
                    <label htmlFor="summary">Summary: </label>
                    <textarea
                        type="textarea"
                        name="summary"
                        value={input.summary}
                        onChange={onHandleChange}
                        autoComplete="off"
                        className={s.textarea}
                    />
                    {errors.summary && <p className={s.errors}>{errors.summary}</p>}
                </div>
                <div className={s.display}>
                    <label htmlFor="healthScore">Health Score: </label>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        name="healthScore"
                        value={input.healthScore}
                        autoComplete="off"
                        onChange={onHandleChange}
                        className={s.stats}
                    />
                    <span>{input.healthScore}</span>
                    {errors.healthScore && (
                        <p className={s.errors}>{errors.healthScore}</p>
                    )}
                </div>
                <div className={s.display}>
                    <label htmlFor="stepByStep">stepByStep: </label>{" "}
                    <textarea
                        type="textarea"
                        name="stepByStep"
                        value={input.stepByStep}
                        autoComplete="off"
                        onChange={onHandleChange}
                        className={s.textarea}
                    />
                    {errors.stepByStep && (
                        <p className={s.errors}>{errors.stepByStep}</p>
                    )}
                </div>
                <div className={s.checkbox}>
                    <label>Diets: </label> <br />
                    <br />
                    {diets.map((d) => (
                        <label htmlFor={d} key={d}>
                            <input
                                type="checkbox"
                                name={d}
                                value={d}
                                onChange={onHandleChecked}
                            />
                            {d}
                        </label>
                    ))}
                </div>
                <button className={s.btnCreation}>Create Recipe</button>
            </form>
        </div>
    );
};

export default Form;