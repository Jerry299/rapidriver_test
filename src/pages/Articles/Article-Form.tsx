import { useState } from "react";
import { Header } from "../../components/Header/Header";
import { AppButton, AppInput, Spacer } from "../../components/Layout/Layout";
import { postComment } from "../../services/apiService";


export const ArticleForm = () => {
  const [senderName, setSenderName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState({
    nameError: "",
    emailError: "",
    textError: "",
  });

  const handleSubmit = async () => {
    // do basic validations
    if (senderName === "") {
      setError((state) => ({ ...state, nameError: "Name cannot be blank" }));
      return;
    } else if (!/^[0-9A-Za-z_@-]+$/.test(senderName)) {
      setError((state) => ({
        ...state,
        nameError:
          "Name must not include space or special characters except '-' ",
      }));
      return;
    } else {
      setError((state) => ({
        ...state,
        nameError: "",
      }));
    }
    if (!email) {
      setError((state) => ({
        ...state,
        emailError: "Email cannot be blank",
      }));
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError((state) => ({
        ...state,
        emailError: "Invalid email format ",
      }));
      return;
    } else {
      setError((state) => ({
        ...state,
        emailError: "",
      }));
    }
    if (!text) {
      setError((state) => ({
        ...state,
        textError: "Snippet cannot be blank",
      }));
      return;
    } else if (text.length < 50) {
      setError((state) => ({
        ...state,
        textError: "Snippet cannot be less than 50",
      }));
      return;
    }
    // clear error fields
    setError({
      nameError: "",
      emailError: "",
      textError: "",
    });
    const data = {
      postId: 2,
      id: 4,
      name: senderName,
      email: email,
      text: text,
    };
    try {
      setLoading(true);
      await postComment(data);
      setSuccess(true);
      setLoading(false);
      
      setTimeout(() => {
        location.replace("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <Header />
      <Spacer height={30} />
      <div className="half-width margin-auto boxShadow pl20">
        <div>
          <Spacer height={30} />
          <p className="fw600 fontSize-13em">Submission Form</p>
          <div>
            <AppInput
              label="Name"
              className=""
              placeholder="Enter your name..."
              type="text"
              name="sender_name"
              onChange={(e) => setSenderName(e.target.value)}
              outerClassName=""
            />
          </div>
          {error.nameError && (
            <small className="error">{error.nameError}</small>
          )}
          <Spacer height={40} />
          <div>
            <AppInput
              label="Email"
              className=""
              placeholder="Enter your email address..."
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              outerClassName=""
            />
          </div>
          {error.emailError && (
            <small className="error">{error.emailError}</small>
          )}
          <Spacer height={40} />
          <div className="full-width">
            <label htmlFor="textarea" className="fw400">
              Snippet
            </label>
            <br />
            <textarea
              name="textarea"
              className="half-width textarea"
              placeholder="Enter a snippet of a law article..."
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          {error.textError && (
            <small className="error">{error.textError}</small>
          )}
          <Spacer height={40} />
          {success && (
            <small className="success">Article Created Successfully</small>
          )}
          <br />
          <AppButton
            name="Submit Article"
            isBusy={loading}
            onClick={() => handleSubmit()}
            className="width600 py-10 white-text bg-blue"
          />

          <Spacer height={40} />
        </div>
      </div>
    </div>
  );
};
