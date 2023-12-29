import "./BlogPost.css";
import { forwardRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackIcon } from "../../assets/left-arrow-icon.svg";
import { ReactComponent as ArrowDownIcon } from "../../assets/arrow-down-icon.svg";
import { ReactComponent as CalendarIcon } from "../../assets/calendar-icon.svg";
import { ReactComponent as InforIcon } from "../../assets/info-icon.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DroppableWindow from "./DroppableWindow";
import CatItem from "./CatItem";
import OutsideClickHandler from "../../util/OutsideClickHandler";
import useCostumEffect from "../../util/useCustomEffect";
import Overlay from "./Overlay";

const CostumCalendar = forwardRef(({ value, onClick, status }, ref) => {
    return (
        <div className={`date-picker ${status} `} onClick={onClick} ref={ref}>
            <CalendarIcon className="calendar-icon" />
            {value ? value : "აირჩიეთ თარიღი"}
        </div>
    );
});

function BlogPost({ categories }) {
    // Author validation:
    const [noAuthor, setNoAuthor] = useState(false);
    const [min2words, setMin2words] = useState(false);
    const [onlyGeorgian, setOnlyGeorgian] = useState(false);
    const [min4Chars, setMin4Chars] = useState(false);

    const [author, setAuthor] = useState("");
    const [authorStatus, setAuthorStatus] = useState("gray");

    // Title validation:
    const [noTitle, setNoTitle] = useState(false);
    const [titleMin2Chars, setTitleMin2Chars] = useState(false);

    const [title, setTitle] = useState("");
    const [titleStatus, setTitleStatus] = useState("gray");

    // Description validation:
    const [descMin2Chars, setDescMin2Chars] = useState(false);
    const [noDesc, setNoDesc] = useState(false);

    const [desc, setDesc] = useState("");
    const [descStatus, setDescStatus] = useState("gray");

    // Date validation:
    const [noDate, setNoDate] = useState(false);
    const [oldDate, setOldDate] = useState(false);

    const [date, setDate] = useState(null);
    const [dateStatus, setDateStatus] = useState("gray");

    // Category validation:
    const [noCat, setNoCat] = useState(false);

    // Email validation:
    const [unsupportedEmail, setUnsupportedEmail] = useState(false);
    const [email, setEmail] = useState("");

    // Image validation:
    const [noImage, setNoImage] = useState(false);
    const [image, setImage] = useState(null);

    // selected categories
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [toggleCategories, setToggleCategories] = useState(false);

    // display success overlay message
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const [buttonActive, setButtonActive] = useState(false);

    useEffect(() => {
        // get categories from server

        //     get data from local storage
        const author = JSON.parse(localStorage.getItem("author"));
        const title = JSON.parse(localStorage.getItem("title"));
        const desc = JSON.parse(localStorage.getItem("desc"));
        const date = JSON.parse(localStorage.getItem("date"));
        const selectedCategories = JSON.parse(
            localStorage.getItem("selectedCategories"),
        );
        const image = JSON.parse(localStorage.getItem("image"));
        const email = JSON.parse(localStorage.getItem("email"));

        if (author !== null) {
            setAuthor(author);
        }
        if (title !== null) {
            setTitle(title);
        }
        if (desc !== null) {
            setDesc(desc);
        }
        if (date !== null) {
            setDate(new Date(date));
        }
        if (selectedCategories !== null) {
            setSelectedCategories(selectedCategories);
        }
        if (image !== null) {
            //     data url to blob

            const byteString = atob(image.split(",")[1]);
            const byteNumbers = new Array(byteString.length);
            for (let i = 0; i < byteString.length; i++) {
                byteNumbers[i] = byteString.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const imageType = JSON.parse(
                localStorage.getItem("image_type") ?? "image/jpeg",
            );
            const blob = new Blob([byteArray], { type: imageType });
            const imageName = JSON.parse(
                localStorage.getItem("image_title") ?? "image.jpeg",
            );

            const file = new File([blob], imageName, { type: imageType });
            setImage(file);
            console.log(file, imageType);
        }
        if (email !== null) {
            setEmail(email);
        }
    }, []);

    const handleGoBack = () => {
        window.history.back();
    };

    useEffect(() => {
        console.log(image !== null ? image instanceof Blob : image);
        if (image instanceof Blob) {
            setNoImage(false);

            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result;
                localStorage.setItem("image", JSON.stringify(base64String));
            };
            reader.readAsDataURL(image);

            localStorage.setItem("image_title", JSON.stringify(image.name));
            localStorage.setItem("image_type", JSON.stringify(image.type));
        } else if (image === null) {
            localStorage.removeItem("image");
            localStorage.removeItem("image_title");
            localStorage.removeItem("image_type");
        }
    }, [image]);

    // define author input text change handler
    const handleAuthorChange = (event) => {
        const value = event.target.value;
        setAuthor(value);
    };

    useCostumEffect(() => {
        const value = author;
        // character count
        const charCount = value.replace(/\s/g, "").length;

        // word count
        const wordCount = value
            .replace(/\s\s+/g, " ")
            .trimEnd()
            .split(" ").length;

        // contains only georgian letters
        const georgianRegex = /^[ა-ჰ\s]+$/;
        const onlyGeorgian = georgianRegex.test(value);

        setMin2words(wordCount < 2);
        setOnlyGeorgian(!onlyGeorgian);
        setMin4Chars(charCount < 4);

        if (
            charCount < 4 ||
            wordCount < 2 ||
            !onlyGeorgian ||
            noAuthor ||
            noAuthor
        ) {
            setAuthorStatus("red");
        } else {
            setAuthorStatus("green");
        }

        if (charCount !== 0) {
            setNoAuthor(false);
        }

        //     store in local storage
        localStorage.setItem("author", JSON.stringify(author));
    }, [author, noAuthor]);

    const handleTitleChange = (event) => {
        const value = event.target.value;
        setTitle(value);
    };

    useCostumEffect(() => {
        const charCount = title.replace(/\s/g, "").length;

        setTitleMin2Chars(charCount < 2);

        if (charCount < 2 || noTitle || noTitle) {
            setTitleStatus("red");
        } else {
            setTitleStatus("green");
        }

        if (charCount !== 0) {
            setNoTitle(false);
        }

        localStorage.setItem("title", JSON.stringify(title));
    }, [title, noTitle]);

    const handleDescChange = (event) => {
        const value = event.target.value;
        setDesc(value);
    };

    useCostumEffect(() => {
        const charCount = desc.replace(/\s/g, "").length;

        setDescMin2Chars(charCount < 2);

        if (charCount < 2 || noDesc) {
            setDescStatus("red");
        } else {
            setDescStatus("green");
        }

        if (charCount !== 0) {
            setNoDesc(false);
        }

        localStorage.setItem("desc", JSON.stringify(desc));
    }, [desc, noDesc]);

    const handleDateChange = (date) => {
        setDate(date);
    };

    useCostumEffect(() => {
        const today = new Date();

        if (date < today.setDate(today.getDate() - 1) || noDate) {
            setDateStatus("red");
            setOldDate(true);
        } else {
            setDateStatus("green");
            setOldDate(false);
        }
        setNoDate(false);

        localStorage.setItem("date", JSON.stringify(date));
    }, [date, noDate]);

    const handleCatAdd = (cat) => {
        setSelectedCategories([...selectedCategories, cat]);
    };

    useCostumEffect(() => {
        if (selectedCategories.length !== 0) {
            setNoCat(false);
        }

        localStorage.setItem(
            "selectedCategories",
            JSON.stringify(selectedCategories),
        );
    }, [selectedCategories, noCat]);

    const handleCatRemove = (id) => {
        setSelectedCategories(selectedCategories.filter((c) => c.id !== id));
    };

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
    };

    useCostumEffect(() => {
        const isSupportedEmail = email.toLowerCase().endsWith("@redberry.ge");

        setUnsupportedEmail(!isSupportedEmail && email.length !== 0);
        localStorage.setItem("email", JSON.stringify(email));
    }, [email]);

    useEffect(() => {
        //     determine submit button status
        if (
            authorStatus === "green" &&
            titleStatus === "green" &&
            descStatus === "green" &&
            dateStatus === "green" &&
            selectedCategories.length !== 0 &&
            (email.length === 0 || !unsupportedEmail) &&
            image !== null
        ) {
            setButtonActive(true);
        } else {
            setButtonActive(false);
        }
    }, [
        authorStatus,
        titleStatus,
        descStatus,
        dateStatus,
        selectedCategories,
        image,
        email,
        unsupportedEmail,
    ]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (image === null) {
            setNoImage(true);
        }
        if (author === "") {
            setNoAuthor(true);
        }
        if (title === "") {
            setNoTitle(true);
        }
        if (desc === "") {
            setNoDesc(true);
        }
        if (date === null) {
            setNoDate(true);
        }
        if (selectedCategories.length === 0) {
            setNoCat(true);
        }

        // if any of the validations fail return
        if (
            min2words ||
            onlyGeorgian ||
            min4Chars ||
            titleMin2Chars ||
            descMin2Chars ||
            oldDate ||
            unsupportedEmail ||
            image === null ||
            author === "" ||
            title === "" ||
            desc === "" ||
            date === null ||
            selectedCategories.length === 0
        ) {
            return;
        }

        const token = `ee383d4cbf7503aaf852de7ba37c49d6a3911e1b46002bd9ddc5d9eadaa26889`;
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", desc);
        formData.append("image", image);
        formData.append("author", author);
        const tmp = date.toLocaleDateString().split("/")
        const dateString = tmp[2] + "-" + tmp[0] + "-" + tmp[1]
        formData.append("publish_date", dateString);
        formData.append(
            "categories",
            JSON.stringify(selectedCategories.map((cat) => cat.id)),
        );
        formData.append("email", email);

        const requestOptions = {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        };

        fetch(
            "https://api.blog.redberryinternship.ge/api/blogs",
            requestOptions,
        ).then((response) => {
            if (response.status === 204) {
                setSuccess(true);
                console.log("success");
            } else {
                alert("რაღაც შეცდომა მოხდა, სცადეთ ხელახლა მოგვიანებით <3");
            }
        });
    };

    const handleSuccess = () => {
        setSuccess(false);

        //     clear local storage
        localStorage.removeItem("author");
        localStorage.removeItem("title");
        localStorage.removeItem("desc");
        localStorage.removeItem("date");
        localStorage.removeItem("selectedCategories");
        localStorage.removeItem("image");
        localStorage.removeItem("image_title");
        localStorage.removeItem("image_type");
        localStorage.removeItem("email");

        //     clear state
        //     go back to home page /
        navigate("/");
    };

    return (
        <>
            <BackIcon className="back-icon" onClick={handleGoBack} />
            <div className="main-container">
                <div className="form-container">
                    <h1 className="title">ბლოგის დამატება</h1>
                    <form className="form">
                        <div className="input-container">
                            <DroppableWindow
                                onFileSelect={(file) => setImage(file)}
                                hidden={!(image === null)}
                                title={
                                    image === null
                                        ? "ატვირთეთ ფოტო"
                                        : image.name
                                }
                            />
                            <ul className="error-list">
                                <li
                                    className={`${image === null && "missing"}`}
                                    hidden={!noImage}
                                >
                                    ფოტოს მითითება სავალდებულოა
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="input-container">
                                <h2>ავტორი *</h2>
                                <input
                                    type="text"
                                    placeholder="შეიყვანეთ ავტორი"
                                    value={author}
                                    className={`${
                                        noAuthor ? "red" : authorStatus
                                    }`}
                                    onChange={handleAuthorChange}
                                />
                                <ul className="error-list">
                                    <li
                                        className={`${noAuthor && "missing"}`}
                                        hidden={!noAuthor}
                                    >
                                        • ავტორის მითითება სავალდებულოა
                                    </li>
                                    <li
                                        className={
                                            authorStatus !== "gray" &&
                                            (min4Chars ? "mismatch" : "match")
                                        }
                                    >
                                        • მინიმუმ 4 სიმბოლო
                                    </li>
                                    <li
                                        className={
                                            authorStatus !== "gray" &&
                                            (min2words ? "mismatch" : "match")
                                        }
                                    >
                                        • მინიმუმ ორი სიტყვა
                                    </li>
                                    <li
                                        className={
                                            authorStatus !== "gray" &&
                                            (onlyGeorgian
                                                ? "mismatch"
                                                : "match")
                                        }
                                    >
                                        • მხოლოდ ქართული სიმბოლოები
                                    </li>
                                </ul>
                            </div>
                            <div className="input-container">
                                <h2>სათაური *</h2>
                                <input
                                    type="text"
                                    placeholder="შეიყვანეთ სათაური"
                                    value={title}
                                    className={`${
                                        noTitle ? "red" : titleStatus
                                    }`}
                                    onChange={handleTitleChange}
                                />
                                <ul className="error-list">
                                    <li
                                        className={`${noTitle && "missing"}`}
                                        hidden={!noTitle}
                                    >
                                        სათაურის მითითება სავალდებულოა
                                    </li>
                                    <li
                                        className={
                                            titleStatus !== "gray" &&
                                            (titleMin2Chars
                                                ? "mismatch"
                                                : "match")
                                        }
                                    >
                                        მინიმუმ ორი სიმბოლო
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="input-container">
                            <h2>აღწერა *</h2>
                            <textarea
                                placeholder="შეიყვანეთ აღწერა"
                                className={noDesc ? "red" : descStatus}
                                value={desc}
                                onChange={handleDescChange}
                            />
                            <ul className="error-list">
                                <li
                                    className={` ${noDesc && "missing"}`}
                                    hidden={!noDesc}
                                >
                                    • აღწერის მითითება სავალდებულოა
                                </li>
                                <li
                                    className={
                                        descStatus !== "gray" &&
                                        (descMin2Chars ? "mismatch" : "match")
                                    }
                                >
                                    მინიმუმ ორი სიმბოლო
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="input-container">
                                <h2>გამოქვეყნების თარიღი *</h2>
                                <DatePicker
                                    selected={date}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    customInput={
                                        <CostumCalendar
                                            status={noDate ? "red" : dateStatus}
                                        />
                                    }
                                    onCalendarClose={() =>
                                        setDateStatus(
                                            date === null
                                                ? "gray"
                                                : oldDate
                                                  ? "red"
                                                  : "green",
                                        )
                                    }
                                    onCalendarOpen={() =>
                                        setDateStatus("focus")
                                    }
                                />
                                <ul className="error-list">
                                    <li
                                        className={`${noDate && "missing"}`}
                                        hidden={!noDate}
                                    >
                                        თარიღი სავალდებულოა
                                    </li>
                                    <li
                                        className={`${oldDate && "missing"}`}
                                        hidden={!oldDate}
                                    >
                                        მითითებული თარიღი არის წარსულიდან
                                    </li>
                                </ul>
                            </div>
                            <div className="input-container">
                                <h2>კატეგორია *</h2>
                                <OutsideClickHandler
                                    onOutsideClick={() =>
                                        setToggleCategories(false)
                                    }
                                >
                                    <div
                                        className={`category-container ${
                                            toggleCategories && "focus"
                                        } ${
                                            selectedCategories.length === 0
                                                ? noCat
                                                    ? "red"
                                                    : "gray"
                                                : "green"
                                        }`}
                                    >
                                        <div className="selected-cats">
                                            {selectedCategories.length === 0
                                                ? "აირჩიეთ კატეგორია "
                                                : selectedCategories.map(
                                                      (cat) => (
                                                          <CatItem
                                                              id={cat.id}
                                                              title={cat.title}
                                                              text_color={
                                                                  cat.text_color
                                                              }
                                                              background_color={
                                                                  cat.background_color
                                                              }
                                                              displayIcon={true}
                                                              selected={true}
                                                              onClick={() =>
                                                                  handleCatRemove(
                                                                      cat.id,
                                                                  )
                                                              }
                                                          />
                                                      ),
                                                  )}
                                        </div>
                                        <div className="toggle-button">
                                            <ArrowDownIcon
                                                className={`arrow-down-icon ${
                                                    toggleCategories && "focus"
                                                }`}
                                                onClick={() =>
                                                    setToggleCategories(
                                                        !toggleCategories,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div
                                            className={`categories ${
                                                !toggleCategories
                                                    ? "not-visible"
                                                    : undefined
                                            }`}
                                        >
                                            {
                                                /*{first map selected categories without option to delete them }*/
                                                selectedCategories.map(
                                                    (cat) => (
                                                        <CatItem
                                                            id={cat.id}
                                                            title={cat.title}
                                                            text_color={
                                                                cat.text_color
                                                            }
                                                            background_color={
                                                                cat.background_color
                                                            }
                                                            displayIcon={false}
                                                            selected={true}
                                                            onClick={undefined}
                                                            key={cat.id}
                                                        />
                                                    ),
                                                )
                                            }
                                            {categories
                                                .filter(
                                                    (cat) =>
                                                        !selectedCategories.find(
                                                            (selectedCat) =>
                                                                selectedCat.id ===
                                                                cat.id,
                                                        ),
                                                )
                                                .map((cat) => (
                                                    <CatItem
                                                        key={cat.id} // Add a unique key for each CatItem
                                                        id={cat.id}
                                                        title={cat.title}
                                                        text_color={
                                                            cat.text_color
                                                        }
                                                        background_color={
                                                            cat.background_color
                                                        }
                                                        displayIcon={false}
                                                        selected={false}
                                                        onClick={() =>
                                                            handleCatAdd(cat)
                                                        }
                                                    />
                                                ))}
                                        </div>
                                    </div>
                                </OutsideClickHandler>
                                <ul className="error-list">
                                    <li
                                        className={`${noCat && "missing"}`}
                                        hidden={!noCat}
                                    >
                                        აირჩიეთ კატეგორია
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="input-container">
                            <h2>ელ-ფოსტა</h2>
                            <input
                                type="email"
                                placeholder="Example@redberry.ge"
                                className={` ${
                                    unsupportedEmail
                                        ? "mismatch"
                                        : email.length === 0
                                          ? "gray"
                                          : "match"
                                }`}
                                value={email}
                                onChange={handleEmailChange}
                            />
                            <ul className="error-list">
                                <li
                                    className={`special ${
                                        unsupportedEmail && "mismatch"
                                    } ${!unsupportedEmail && "not-visible"}`}
                                >
                                    <InforIcon className="info-icon" />
                                    მეილი უნდა მთავრდებოდეს @redberry.ge
                                </li>
                            </ul>
                        </div>
                        <div className="input-container right">
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className={buttonActive && "clickable"}
                            >
                                გამოქვეყნება
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Overlay success={success} onClick={handleSuccess} />
        </>
    );
}

export default BlogPost;
