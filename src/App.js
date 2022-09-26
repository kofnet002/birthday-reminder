import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Modal from "./modal";
import img1 from "../src/imgs/img1.png"
import img2 from "../src/imgs/img2.png"

// GETTING SAVED BIRTHDAYS FROM SESSION STORAGE
const getsessionStorage = () => {
  let savedBirthdays = sessionStorage.getItem("Birthday");
  if (savedBirthdays) {
    return JSON.parse(sessionStorage.getItem("Birthday"));
  } else {
    return [];
  }
};

const App = () => {
  // STATE FOR HANDLING INPUTS
  const [person, setPerson] = useState({
    firstName: "",
    lastName: "",
    message: "",
    date: "",
  });

  //STATE FOR MODAL
  const [isModalOpen, setIsModalOpen] = useState({
    state: false,
    modalContent: "",
    alert:""
  });

  // STATE FOR HANDLING DATA FROM INPUTS
  const [people, setPeople] = useState(getsessionStorage());

  // HANDLING ONCHANGE EVENT
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };

  // HANDLING ONCLICK EVENT
  const handleClick = (e) => {
    e.preventDefault();
    if (person.firstName && person.lastName && person.date) {
      const newPerson = { ...person, id: new Date().getTime().toString() };
      setPeople([...people, newPerson]);
      setPerson({ firstName: "", lastName: "", message: "", date: "" });
      setIsModalOpen({
        state: true,
        modalContent: "Birthday Added Successfully!",
        alert:"success"
      });
    } else {
      setIsModalOpen({ state: true, modalContent: "Please add birthday!", alert:"danger"});
    }
  };

  // MARKING BIRTHDAY AS DONE
  const removeData = (id) => {
    const newData = people.filter((data) => data.id !== id);
    setPeople(newData);
    setIsModalOpen({state:true, modalContent:"Event marked as done", alert:"success"})
  };

  //CLOSING MODAL 
  const CloseModal = () => setIsModalOpen({...isModalOpen, state:false})


  // INITIAING SESSION STORAGE
  useEffect(() => {
    sessionStorage.setItem("Birthday", JSON.stringify(people));
  }, [people]);

  return (
    <>
    <div className="text-center mt-5">
     <img src={img1} alt="happy birthday" />
    </div>
      <h4 className="text-center">BIRTHDAY REMINDER</h4>
      {isModalOpen.state && <Modal people={people} modalContent={isModalOpen.modalContent} CloseModal={CloseModal} alert={isModalOpen.alert}/>}
      <div className="card container my-3">
        <div className="card-body py-5 px-3">
          <form action="" className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    className="form-control mb-3"
                    type="text"
                    name="firstName"
                    value={person.firstName}
                    onChange={handleChange}
                    id="floatingInputFirstName"
                    placeholder="First Name"
                    required
                  />
                  <label htmlFor="floatingInputFirstName">First Name</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    className="form-control mb-3"
                    type="text"
                    name="lastName"
                    value={person.lastName}
                    onChange={handleChange}
                    id="floatingInputLastName"
                    placeholder="Last Name"
                    required
                  />
                  <label htmlFor="floatingInputLastName">Last Name</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <textarea
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "#12223a",
                      color: "white",
                      width: "100%",
                    }}
                    name="message"
                    placeholder="Note"
                    value={person.message}
                    onChange={handleChange}
                    id="floatingInputMessage"
                    cols="20"
                    rows="5"
                    className="form-control"
                  ></textarea>
                  <label htmlFor="floatingInputMessage">Note</label>
                </div>
              </div>

              <div className="col-md-6">
                <input
                  type="date"
                  className="mb-5"
                  name="date"
                  id=""
                  value={person.date}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="d-grid">
              <button
                type="submit"
                onClick={handleClick}
                className="btn-lg btn btn-outline-primary"
              >
                Add Birthday
              </button>
            </div>
          </form>
        </div>
      </div>

      <h4 className="text-center mb-5">
       <img id="img2" src={img2} alt="cake" /> You have <span>{people.length}</span> upcoming Birthday(s) <img id="img2" src={img2} alt="cake" />
      </h4>

      {people.map((data) => {
        const { id, firstName, lastName, message, date } = data;
        return (
          <div key={id} className="container card text-center mb-3">
            <div className="card-body">
              <div className="row justify-content-center align-items-center">
                <div className="col-md-3 text-white">
                  {lastName}, {firstName}
                </div>
                <div className="col-md-3 text-white">{date}</div>
                <div className="col-md-4 text-white">{message}</div>
                <button
                  type="submit"
                  onClick={() => removeData(id)}
                  className="col-md-2 btn btn-outline-success"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default App;
