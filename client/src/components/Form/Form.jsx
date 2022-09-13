import { React, useState } from "react";
// , useEffect
import { useDispatch, useSelector } from "react-redux";
import { createRecipe } from "../../redux/actions";
// getRecipes, getDietTypes 
import s from './Form.module.css';
import { useNavigate } from "react-router-dom";
// import NavBar from "../navBar/NavBar";


const Form = () => {
    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // useEffect(() => {
    //     dispatch(getRecipes());
    //     dispatch(getDietTypes());
    // }, [dispatch]);

    const [input, setInput] = useState({
        name: "",
        image: "",
        summary: "",
        diets: [],
        // score: 0,
        healthScore: 0,
        stepByStep: "",
    });

    const handleChange = (e) => {
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

    const handleCheck = (e) => {
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
    let validateUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
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
        // if (input.score < 1 || input.score > 100) {
        //     errors.score = "Number required. Must be a number between 1-100";
    }
    if (input.healthScore < 1 || input.healthScore > 100) {
        errors.healthScore = "Number required. Must be a number between 1-100";
    }
    if (!input.stepByStep.length) {
        errors.stepByStep = "This field cannot be empty";
    }
    if (input.stepByStep.length < 80) {
        errors.stepByStep = "This field must be longer than 80 characters";
    }
    return errors;
};

const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0 && input.diets.length > 0) {
        dispatch(createRecipe(input));
        alert("Recipe Created Successfully!");
        setInput({
            name: "",
            image: "",
            summary: "",
            diets: [],
            score: 0,
            healthScore: 0,
            stepByStep: "",
        });
        navigate("/home");
    } else {
        alert("All fields must be completed");
    }
};

return (
    <div>
        {/* <NavBar /> */}
        <form onSubmit={handleSubmit} className={s.form}>
            <div className={s.display}>
                <label htmlFor="image">Image: </label>
                <input
                    type="url"
                    name="image"
                    value={input.image}
                    autoComplete="off"
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    autoComplete="off"
                    className={s.textarea}
                />
                {errors.summary && <p className={s.errors}>{errors.summary}</p>}
            </div>
            <div className={s.display}>
                <label htmlFor="score">Score: </label>
                <input
                    type="range"
                    min="1"
                    max="100"
                    name="score"
                    value={input.score}
                    autoComplete="off"
                    onChange={handleChange}
                    className={s.stats}
                />
                <span>{input.score}</span>
                {errors.score && <p className={s.errors}>{errors.score}</p>}
            </div>
            <div className={s.display}>
                <label htmlFor="healthScore">Health Level: </label>
                <input
                    type="range"
                    min="1"
                    max="100"
                    name="healthScore"
                    value={input.healthScore}
                    autoComplete="off"
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    <label htmlFor={d.name} key={d.name}>
                        <input
                            type="checkbox"
                            name={d.name}
                            value={d.name}
                            onChange={handleCheck}
                        />
                        {d.name}{" "}
                    </label>
                ))}
            </div>
            <button className={s.btnCreation}>Create Recipe</button>
        </form>
    </div>
);


export default Form;